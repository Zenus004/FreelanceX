import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    DollarSign,
    Briefcase,
    Clock,
    ArrowRight,
    Tag,
    LayoutGrid,
    SlidersHorizontal
} from 'lucide-react';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        minBudget: ''
    });

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filters.search) params.append('search', filters.search);
            if (filters.category) params.append('category', filters.category);
            if (filters.minBudget) params.append('minBudget', filters.minBudget);

            const { data } = await api.get(`/jobs?${params.toString()}`);
            setJobs(data.jobs);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchJobs();
        }, 500); // Debounce search

        return () => clearTimeout(timeoutId);
    }, [filters]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                        <Briefcase className="w-8 h-8 mr-3 text-indigo-600" />
                        Find Your Next Project
                    </h1>
                    <p className="mt-2 text-gray-500">Explore thousands of job opportunities and find the perfect match.</p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Filters */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <SlidersHorizontal className="w-5 h-5 mr-2" />
                                    Filters
                                </h2>
                                <button
                                    onClick={() => setFilters({ search: '', category: '', minBudget: '' })}
                                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                                >
                                    Reset
                                </button>
                            </div>

                            <div className="space-y-4">
                                {/* Search */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1.5 uppercase tracking-wide">Search</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Search className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="search"
                                            placeholder="Keywords..."
                                            className="block w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                            value={filters.search}
                                            onChange={handleFilterChange}
                                        />
                                    </div>
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1.5 uppercase tracking-wide">Category</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LayoutGrid className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <select
                                            name="category"
                                            className="block w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                            value={filters.category}
                                            onChange={handleFilterChange}
                                        >
                                            <option value="">All Categories</option>
                                            <option value="Web Development">Web Development</option>
                                            <option value="Mobile Development">Mobile Development</option>
                                            <option value="Design">Design</option>
                                            <option value="Writing">Writing</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="Data Science">Data Science</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Budget */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1.5 uppercase tracking-wide">Min Budget</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <DollarSign className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="number"
                                            name="minBudget"
                                            placeholder="0"
                                            className="block w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                            value={filters.minBudget}
                                            onChange={handleFilterChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Job List */}
                    <div className="lg:col-span-3">
                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-40 animate-pulse">
                                        <div className="h-6 bg-gray-100 rounded w-1/3 mb-4"></div>
                                        <div className="h-4 bg-gray-50 rounded w-2/3 mb-2"></div>
                                        <div className="h-4 bg-gray-50 rounded w-1/2"></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-sm text-gray-500">
                                        Showing <span className="font-semibold text-gray-900">{jobs.length}</span> jobs
                                    </p>
                                </div>

                                <AnimatePresence>
                                    {jobs.length === 0 ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-center py-12 bg-white rounded-xl border border-gray-200 border-dashed"
                                        >
                                            <Search className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                                            <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
                                            <p className="text-gray-500 mt-1">Try adjusting your filters or search terms.</p>
                                        </motion.div>
                                    ) : (
                                        jobs.map((job, index) => (
                                            <motion.div
                                                key={job._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-100 transition-all group relative overflow-hidden"
                                            >
                                                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                                <Tag className="w-3 h-3 mr-1" />
                                                                {job.category}
                                                            </span>
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                                                                <Clock className="w-3 h-3 mr-1" />
                                                                {new Date(job.createdAt).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                        <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                                            {job.title}
                                                        </h2>
                                                        <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                                                            {job.description}
                                                        </p>

                                                        <div className="flex flex-wrap gap-2">
                                                            {job.skills.map((skill, i) => (
                                                                <span key={i} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col items-start md:items-end gap-4 min-w-[140px]">
                                                        <div className="text-right">
                                                            <p className="text-sm text-gray-500 mb-1">Budget</p>
                                                            <p className="text-lg font-bold text-gray-900 flex items-center md:justify-end">
                                                                <DollarSign className="w-4 h-4 text-green-500 mr-1" />
                                                                ${job.budget.min} - ${job.budget.max}
                                                            </p>
                                                        </div>

                                                        <Link
                                                            to={`/jobs/${job._id}`}
                                                            className="w-full md:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                                        >
                                                            View Details
                                                            <ArrowRight className="ml-2 -mr-1 h-4 w-4" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default JobList;
