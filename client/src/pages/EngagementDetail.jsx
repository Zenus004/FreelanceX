import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Chat from './Chat';
import { motion } from 'framer-motion';
import {
    CheckCircle,
    Circle,
    Clock,
    DollarSign,
    Shield,
    Plus,
    AlertCircle,
    User,
    Briefcase,
    Star,
    X,
    MessageSquare,
    AlertTriangle,
    FileText,
    Send
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import ErrorBoundary from '../components/ErrorBoundary';

const EngagementDetailContent = () => {
    const { id } = useParams();
    const { user, refreshProfile } = useAuth();
    const [engagement, setEngagement] = useState(null);
    const [milestones, setMilestones] = useState([]);
    const [loading, setLoading] = useState(true);

    // Milestone Form
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    // Review Form State
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState('');
    const [submittingReview, setSubmittingReview] = useState(false);

    const fetchEngagement = async () => {
        try {
            const { data } = await api.get(`/engagements/${id}`);
            setEngagement(data.engagement);
            setMilestones(data.milestones || []);
            console.log('Engagement Data Loaded:', data);
        } catch (error) {
            console.error('Error fetching engagement:', error);
            console.error('Response Data:', error.response?.data);
            toast.error('Failed to load engagement details.');
            setMilestones([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEngagement();
    }, [id]);

    const handleCreateMilestone = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/engagements/${id}/milestones`, {
                description,
                amount: Number(amount)
            });
            setDescription('');
            setAmount('');
            toast.success('Milestone created successfully!');
            fetchEngagement(); // Refresh
            refreshProfile();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create milestone');
        }
    };

    const handleApproveMilestone = async (milestoneId) => {
        try {
            await api.patch(`/engagements/milestones/${milestoneId}/approve`);
            toast.success('Milestone approved and funds released!');
            fetchEngagement(); // Refresh
            refreshProfile();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to approve milestone');
        }
    };

    const handleCompleteContract = async () => {
        toast((t) => (
            <div className="flex flex-col gap-2">
                <span className="font-medium">Complete this contract?</span>
                <span className="text-sm text-gray-500">This will close the job.</span>
                <div className="flex gap-2 mt-1">
                    <button
                        className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700"
                        onClick={() => {
                            toast.dismiss(t.id);
                            confirmCompleteContract();
                        }}
                    >
                        Confirm
                    </button>
                    <button
                        className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300"
                        onClick={() => toast.dismiss(t.id)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), { duration: 5000 });
    };

    const confirmCompleteContract = async () => {
        try {
            await api.patch(`/engagements/${id}/complete`);
            toast.success('Contract completed successfully!');
            fetchEngagement();
            refreshProfile();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to complete engagement');
        }
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setSubmittingReview(true);
        try {
            await api.post('/reviews', {
                engagementId: id,
                rating: reviewRating,
                comment: reviewComment
            });
            setShowReviewModal(false);
            toast.success('Review submitted successfully!');
            fetchEngagement();
        } catch (error) {
            console.error('Review Error:', error);
            if (error.response?.data?.message?.includes('E11000') || error.response?.data?.message?.includes('duplicate key')) {
                toast.error('You have already reviewed this engagement.');
            } else {
                toast.error(error.response?.data?.message || 'Failed to submit review');
            }
        } finally {
            setSubmittingReview(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-4 bg-gray-200 rounded w-48 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
        </div>
    );

    if (!engagement) return <div className="p-8 text-center">Engagement not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Card */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <div className="flex items-center text-indigo-600 mb-1">
                                <Briefcase className="w-4 h-4 mr-2" />
                                <span className="text-sm font-semibold uppercase tracking-wide">Active Engagement</span>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">{engagement?.job?.title || 'Untitled Job'}</h1>
                            <div className="flex items-center text-gray-500 text-sm mt-1 space-x-4">
                                <span className="flex items-center">
                                    <User className="w-4 h-4 mr-1" />
                                    {user.role === 'client' ? (
                                        engagement.freelancer ? (
                                            <Link to={`/profile/${engagement.freelancer._id}`} className="hover:underline hover:text-indigo-600">
                                                {engagement.freelancer.name}
                                            </Link>
                                        ) : (
                                            <span className="text-gray-500">Unknown Freelancer</span>
                                        )
                                    ) : (
                                        engagement.client ? (
                                            <Link to={`/profile/${engagement.client._id}`} className="hover:underline hover:text-indigo-600">
                                                {engagement.client.name}
                                            </Link>
                                        ) : (
                                            <span className="text-gray-500">Unknown Client</span>
                                        )
                                    )}
                                </span>
                                <span className={`flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${engagement?.status === 'active' ? 'bg-green-100 text-green-700' :
                                    engagement?.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                    <span className={`w-2 h-2 rounded-full mr-1.5 ${engagement?.status === 'active' ? 'bg-green-500' :
                                        engagement?.status === 'completed' ? 'bg-blue-500' : 'bg-gray-500'
                                        }`}></span>
                                    {engagement?.status?.toUpperCase() || 'UNKNOWN'}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-right p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Total Value</p>
                                <p className="text-xl font-bold text-gray-900">${engagement?.totalAmount || 0}</p>
                            </div>
                            <div className="text-right p-3 bg-green-50 rounded-lg border border-green-100">
                                <p className="text-xs text-green-600 uppercase tracking-wide flex items-center justify-end">
                                    <Shield className="w-3 h-3 mr-1" /> In Escrow
                                </p>
                                <p className="text-xl font-bold text-green-700">${engagement?.escrowBalance || 0}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Milestones */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Actions */}
                        {user.role === 'client' && engagement?.status !== 'completed' && (
                            <div className="space-y-6">
                                {/* Add Milestone Card */}
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h2 className="text-lg font-bold text-gray-900 mb-4">Add New Milestone</h2>
                                    <form onSubmit={handleCreateMilestone} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                                        <div className="md:col-span-7">
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                                placeholder="e.g. Phase 2 Approval"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="md:col-span-3">
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Amount ($)</label>
                                            <input
                                                type="number"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                                placeholder="0.00"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center font-medium text-sm">
                                                <Plus className="w-4 h-4 mr-1" /> Add
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* Contract Actions */}
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900">Contract Actions</h2>
                                        <p className="text-sm text-gray-500">End the contract when all work is done.</p>
                                    </div>
                                    <button
                                        onClick={handleCompleteContract}
                                        className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 font-medium text-sm transition-colors"
                                    >
                                        Mark as Complete
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Leave Review CTA (For both parties if completed) */}
                        {engagement?.status === 'completed' && (
                            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-center">
                                <h3 className="font-bold text-gray-900 mb-2">Engagement Completed</h3>
                                <p className="text-gray-600 text-sm mb-4">Don't forget to rate your experience!</p>
                                <button
                                    onClick={() => setShowReviewModal(true)}
                                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
                                >
                                    Leave a Review
                                </button>
                            </div>
                        )}

                        {/* Milestones List */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900">Project Milestones</h2>
                            </div>
                            <div className="p-6 space-y-6">
                                {milestones.length === 0 ? (
                                    <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-100 rounded-lg">
                                        No milestones created yet.
                                    </div>
                                ) : (
                                    milestones?.map((milestone, index) => (
                                        <motion.div
                                            key={milestone._id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="relative pl-8 pb-6 last:pb-0"
                                        >
                                            {/* Timeline Line */}
                                            {index !== milestones.length - 1 && (
                                                <div className="absolute top-4 left-[11px] w-0.5 h-full bg-gray-200"></div>
                                            )}

                                            {/* Status Dot */}
                                            <div className={`absolute top-1 left-0 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white z-10 ${milestone.status === 'completed' ? 'border-green-500 text-green-500' :
                                                'border-gray-300 text-gray-300'
                                                }`}>
                                                {milestone.status === 'completed' ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                                            </div>

                                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-indigo-100 transition-colors">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">{milestone.description}</h3>
                                                        <p className="text-xs text-gray-500 uppercase mt-1">Status: <span className={`${milestone.status === 'completed' ? 'text-green-600 font-bold' : 'text-orange-600 font-medium'
                                                            }`}>{milestone.status}</span></p>
                                                    </div>
                                                    <span className="font-bold text-lg text-gray-900">${milestone.amount}</span>
                                                </div>

                                                {user.role === 'client' && milestone.status === 'pending' && (
                                                    <div className="mt-3 flex justify-end">
                                                        <button
                                                            onClick={() => handleApproveMilestone(milestone._id)}
                                                            className="flex items-center px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition shadow-sm"
                                                        >
                                                            <CheckCircle className="w-4 h-4 mr-1.5" />
                                                            Approve & Release Funds
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Chat */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6">
                            <Chat roomId={id} />
                        </div>
                    </div>
                </div>

                {/* Review Modal */}
                {showReviewModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-900">Leave a Review</h2>
                                <button onClick={() => setShowReviewModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmitReview}>
                                <div className="mb-6 flex flex-col items-center">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                                    <div className="flex space-x-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setReviewRating(star)}
                                                className={`p-1 transition-colors ${star <= reviewRating ? 'text-yellow-400' : 'text-gray-300'}`}
                                            >
                                                <Star className="w-8 h-8 fill-current" />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                                    <textarea
                                        value={reviewComment}
                                        onChange={(e) => setReviewComment(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 h-32 resize-none"
                                        placeholder="Share your experience working on this project..."
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submittingReview}
                                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition disabled:opacity-50"
                                >
                                    {submittingReview ? 'Submitting...' : 'Post Review'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

const EngagementDetail = () => (
    <ErrorBoundary>
        <EngagementDetailContent />
    </ErrorBoundary>
);

export default EngagementDetail;
