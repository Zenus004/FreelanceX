const Job = require('../models/Job');

const createJob = async (req, res) => {
    try {
        const { title, description, budget, skills, category, attachments } = req.body;

        const job = await Job.create({
            title,
            description,
            budget,
            skills,
            category,
            attachments,
            client: req.user._id
        });

        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getJobs = async (req, res) => {
    try {
        const { search, category, skill, minBudget, maxBudget, page = 1, limit = 10 } = req.query;
        const query = { status: 'open' };

        if (search) {
            query.$text = { $search: search };
        }

        if (category) {
            query.category = category;
        }

        if (skill) {
            query.skills = skill;
        }

        if (minBudget || maxBudget) {
            query['budget.min'] = {};
            if (minBudget) query['budget.min'].$gte = Number(minBudget);
            // Logic for budget overlap can be complex, simplifying to min budget check
        }

        const jobs = await Job.find(query)
            .populate('client', 'name profile.rating')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Job.countDocuments(query);

        res.json({
            jobs,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('client', 'name email profile');

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (job.client.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (job.client.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await job.deleteOne();
        res.json({ message: 'Job removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getJobsByClient = async (req, res) => {
    try {
        const jobs = await Job.find({ client: req.user._id }).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
    getJobsByClient
};
