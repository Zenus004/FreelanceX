const Proposal = require('../models/Proposal');
const Job = require('../models/Job');
const Engagement = require('../models/Engagement');

const submitProposal = async (req, res) => {
    try {
        const { jobId, price, deliveryDays, coverLetter } = req.body;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (job.status !== 'open') {
            return res.status(400).json({ message: 'Job is not open for proposals' });
        }

        const proposalExists = await Proposal.findOne({ job: jobId, freelancer: req.user._id });
        if (proposalExists) {
            return res.status(400).json({ message: 'You have already submitted a proposal for this job' });
        }

        const proposal = await Proposal.create({
            job: jobId,
            freelancer: req.user._id,
            price,
            deliveryDays,
            coverLetter
        });

        res.status(201).json(proposal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProposalsByJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (job.client.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const proposals = await Proposal.find({ job: jobId })
            .populate('freelancer', 'name profile.rating profile.skills');

        res.json(proposals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProposalStatus = async (req, res) => {
    try {
        const { status } = req.body; // accepted, rejected
        const proposal = await Proposal.findById(req.params.id).populate('job');

        if (!proposal) {
            return res.status(404).json({ message: 'Proposal not found' });
        }

        if (proposal.job.client.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        proposal.status = status;
        await proposal.save();

        if (status === 'accepted') {
            // Create Engagement
            const engagement = await Engagement.create({
                job: proposal.job._id,
                client: proposal.job.client,
                freelancer: proposal.freelancer,
                proposal: proposal._id,
                totalAmount: proposal.price,
                escrowBalance: 0 // Initial balance, funds added later
            });

            // Update Job status
            await Job.findByIdAndUpdate(proposal.job._id, { status: 'in_progress' });

            return res.json({ proposal, engagement });
        }

        res.json(proposal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProposalsByFreelancer = async (req, res) => {
    try {
        const proposals = await Proposal.find({ freelancer: req.user._id }).populate('job', 'title status budget');
        res.json(proposals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    submitProposal,
    getProposalsByJob,
    updateProposalStatus,
    getProposalsByFreelancer
};
