import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { motion } from 'framer-motion';
import {
    LogOut,
    LayoutDashboard,
    User,
    Wallet,
    Briefcase,
    Plus,
    Shield,
    FileText,
    CheckCircle,
    Search,
    Clock,
    DollarSign,
    Star
} from 'lucide-react';
import toast from 'react-hot-toast';
import StatCard from '../components/dashboard/StatCard';
import StatusBadge from '../components/dashboard/StatusBadge';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100
        }
    }
};

const ClientDashboard = () => {
    const { user, logout, refreshProfile } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addFundsAmount, setAddFundsAmount] = useState('');
    const [showFundsModal, setShowFundsModal] = useState(false);

    const handleAddFunds = async (e) => {
        e.preventDefault();
        const amount = parseFloat(addFundsAmount);
        if (isNaN(amount) || amount <= 0) {
            return toast.error('Please enter a valid positive amount.');
        }

        try {
            await api.post('/users/deposit', { amount });
            toast.success('Funds added successfully!');
            await refreshProfile();
            setShowFundsModal(false);
            setAddFundsAmount('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add funds');
        }
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { data } = await api.get('/jobs/client/me');
                setJobs(data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between items-center mb-8"
                >
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{user.name}</span>
                        </h1>
                        <p className="text-gray-500 mt-1 flex items-center">
                            <LayoutDashboard className="w-4 h-4 mr-2" />
                            Client Dashboard
                        </p>
                    </div>
                    <div className="flex space-x-4">
                        <Link
                            to="/profile/me"
                            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                        >
                            <User className="w-4 h-4 mr-2" />
                            View Profile
                        </Link>
                        <button
                            onClick={logout}
                            className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard
                            icon={Shield}
                            title="Account Role"
                            value="Client"
                            bgColor="#a855f7" // purple-500
                        />

                        <StatCard
                            icon={Wallet}
                            title="Wallet Balance"
                            value={`$${user.balance.toLocaleString()}`}
                            bgColor="#22c55e" // green-500
                            action={
                                <button
                                    onClick={() => setShowFundsModal(true)}
                                    className="flex items-center px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                                >
                                    <Plus className="w-4 h-4 mr-1.5" />
                                    Add Funds
                                </button>
                            }
                        />

                        <StatCard
                            icon={Briefcase}
                            title="Posted Jobs"
                            value={jobs.length}
                            bgColor="#3b82f6" // blue-500
                        />
                    </div>

                    {/* Content Section */}
                    <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Recent Job Postings
                            </h2>
                            <Link
                                to="/jobs/create"
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Post New Job
                            </Link>
                        </div>

                        {loading ? (
                            <div className="p-8 text-center text-gray-500">Loading...</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Job Title
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Budget Range
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {jobs.length > 0 ? (
                                            jobs.map((job) => (
                                                <tr key={job._id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{job.title}</div>
                                                        <div className="text-xs text-gray-500">{job.category}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        ${job.budget.min} - ${job.budget.max}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <StatusBadge status={job.status} />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <Link to={`/jobs/${job._id}`} className="text-indigo-600 hover:text-indigo-900 font-medium">
                                                            Manage
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                                                    <Briefcase className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                                                    <p>No jobs posted yet.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </motion.div>
                </motion.div>

                {/* Add Funds Modal */}
                {showFundsModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Add Funds</h2>
                            <form onSubmit={handleAddFunds}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount ($)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">$</span>
                                        </div>
                                        <input
                                            type="number"
                                            className="block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 py-2 border"
                                            placeholder="0.00"
                                            value={addFundsAmount}
                                            onChange={(e) => setAddFundsAmount(e.target.value)}
                                            step="0.01"
                                            min="0.01"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowFundsModal(false)}
                                        className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition"
                                    >
                                        Add Funds
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientDashboard;
