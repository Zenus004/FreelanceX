import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import {
    DollarSign,
    Clock,
    Briefcase,
    MapPin,
    User,
    Calendar,
    CheckCircle,
    AlertCircle,
    Send,
    Star,
    MessageSquare,
    FileText
} from 'lucide-react';
import StatusBadge from '../components/dashboard/StatusBadge';

const JobDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);

    // Proposal Form State
    const [price, setPrice] = useState('');
    const [deliveryDays, setDeliveryDays] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const [engagementId, setEngagementId] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const { data } = await api.get(`/jobs/${id}`);
                setJob(data);

                // If client and owner, fetch proposals
                if (user && user.role === 'client' && data.client._id === user._id) {
                    const proposalsRes = await api.get(`/proposals/job/${id}`);
                    setProposals(proposalsRes.data);
                }

                // If freelancer, fetch their proposals to check status
                if (user && user.role === 'freelancer') {
                    const myProposalsRes = await api.get('/proposals/freelancer/me');
                    setProposals(myProposalsRes.data);
                }

                // Check for engagement
                if (data.status === 'in_progress' || data.status === 'completed' || data.status === 'closed') {
                    try {
                        const engRes = await api.get(`/engagements/job/${id}`);
                        setEngagementId(engRes.data._id);
                    } catch (err) {
                        // Engagement might not be accessible if not authorized
                    }
                }
            } catch (error) {
                console.error('Error fetching job:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id, user]);

    const handleSubmitProposal = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitError('');
        try {
            await api.post('/proposals', {
                jobId: id,
                price: Number(price),
                deliveryDays: Number(deliveryDays),
                coverLetter
            });
            alert('Proposal submitted successfully!');
            navigate('/dashboard');
        } catch (err) {
            setSubmitError(err.response?.data?.message || 'Failed to submit proposal');
            setSubmitting(false);
        }
    };

    const handleAcceptProposal = async (proposalId) => {
        if (!confirm('Are you sure you want to accept this proposal? This will start the engagement.')) return;
        try {
            await api.patch(`/proposals/${proposalId}`, { status: 'accepted' });
            alert('Proposal accepted! Engagement created.');
            // Refresh proposals
            const proposalsRes = await api.get(`/proposals/job/${id}`);
            setProposals(proposalsRes.data);
            // Refresh job status
            const jobRes = await api.get(`/jobs/${id}`);
            setJob(jobRes.data);
        } catch (err) {
            alert('Failed to accept proposal');
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

    if (!job) return <div className="p-8 text-center">Job not found</div>;

    const myProposal = user?.role === 'freelancer'
        ? proposals.find(p => (p.freelancer === user._id || p.freelancer._id === user._id) && (p.job === id || p.job._id === id))
        : null;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto"
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content (Left Column) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Job Header */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                                    <div className="flex items-center text-gray-500 text-sm space-x-4">
                                        <div className="flex items-center">
                                            <Briefcase className="w-4 h-4 mr-1" />
                                            {job.category}
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            Posted {new Date(job.createdAt).toLocaleDateString()}
                                        </div>
                                        <StatusBadge status={job.status} />
                                    </div>
                                </div>
                            </div>

                            <div className="prose max-w-none text-gray-700 whitespace-pre-wrap mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                                {job.description}
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">Skills Required</h3>
                                <div className="flex flex-wrap gap-2">
                                    {job.skills.map((skill, index) => (
                                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-50 text-indigo-700 font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Client: Received Proposals */}
                        {user && user.role === 'client' && job.client._id === user._id && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-6 border-b border-gray-100 bg-gray-50">
                                    <h2 className="text-xl font-bold text-gray-900">Received Proposals ({proposals.length})</h2>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {proposals.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500">
                                            No proposals received yet.
                                        </div>
                                    ) : (
                                        proposals.map((proposal) => (
                                            <div key={proposal._id} className="p-6 hover:bg-gray-50 transition-colors">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-start">
                                                        <div className="bg-indigo-100 p-2 rounded-full mr-4">
                                                            <User className="w-6 h-6 text-indigo-600" />
                                                        </div>
                                                        <div>
                                                            <Link to={`/profile/${proposal.freelancer._id}`} className="font-bold text-lg text-gray-900 hover:text-indigo-600 hover:underline">
                                                                {proposal.freelancer.name}
                                                            </Link>
                                                            <p className="text-gray-500 text-sm flex items-center">
                                                                <Star className="w-3 h-3 text-yellow-400 mr-1 fill-current" />
                                                                {proposal.freelancer.profile?.rating || 'New'} Rating
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-xl text-gray-900">${proposal.price}</p>
                                                        <p className="text-sm text-gray-500">in {proposal.deliveryDays} days</p>
                                                    </div>
                                                </div>

                                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Cover Letter</h4>
                                                    <p className="text-gray-600 italic">"{proposal.coverLetter}"</p>
                                                </div>

                                                <div className="flex justify-end items-center gap-3">
                                                    {proposal.status === 'pending' && job.status === 'open' && (
                                                        <button
                                                            onClick={() => handleAcceptProposal(proposal._id)}
                                                            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
                                                        >
                                                            <CheckCircle className="w-4 h-4 mr-2" />
                                                            Accept Proposal
                                                        </button>
                                                    )}
                                                    {proposal.status === 'accepted' && (
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                                                            <CheckCircle className="w-4 h-4 mr-2" />
                                                            Accepted
                                                        </span>
                                                    )}
                                                    <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                                                        <MessageSquare className="w-4 h-4 mr-2" />
                                                        Message
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar (Right Column) */}
                    <div className="space-y-6">
                        {/* Engagement CTA */}
                        {engagementId && (
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white text-center">
                                <h3 className="text-lg font-bold mb-2">Project in Progress</h3>
                                <p className="text-green-100 mb-4 text-sm">Active engagement exists for this job.</p>
                                <Link
                                    to={`/engagements/${engagementId}`}
                                    className="block w-full py-3 bg-white text-green-600 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-sm"
                                >
                                    Go to Workspace
                                </Link>
                            </div>
                        )}

                        {/* Job Details Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Job Details</h3>

                            <div className="space-y-5">
                                <div className="flex items-center">
                                    <div className="p-2 bg-green-100 rounded-lg mr-4">
                                        <DollarSign className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Budget Range</p>
                                        <p className="font-bold text-gray-900">${job.budget.min} - ${job.budget.max}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="p-2 bg-blue-100 rounded-lg mr-4">
                                        <User className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Client</p>
                                        <Link to={`/profile/${job.client._id}`} className="font-bold text-gray-900 hover:text-indigo-600 hover:underline">
                                            {job.client.name}
                                        </Link>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="p-2 bg-purple-100 rounded-lg mr-4">
                                        <MapPin className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Location</p>
                                        <p className="font-bold text-gray-900">Remote</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Freelancer Action Card */}
                        {user && user.role === 'freelancer' && !engagementId && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                {myProposal ? (
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-4">Your Proposal</h3>
                                        <div className={`p-4 rounded-lg mb-4 flex items-center ${myProposal.status === 'accepted' ? 'bg-green-50 text-green-700' :
                                            myProposal.status === 'rejected' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'
                                            }`}>
                                            {myProposal.status === 'accepted' ? <CheckCircle className="w-5 h-5 mr-3" /> : <Clock className="w-5 h-5 mr-3" />}
                                            <span className="font-medium uppercase">{myProposal.status}</span>
                                        </div>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex justify-between">
                                                <span>Bid Amount:</span>
                                                <span className="font-bold text-gray-900">${myProposal.price}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Delivery:</span>
                                                <span className="font-bold text-gray-900">{myProposal.deliveryDays} Days</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="text-lg font-bold text-gray-900 mb-4">Submit a Proposal</h3>
                                        {submitError && (
                                            <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-start">
                                                <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                                                {submitError}
                                            </div>
                                        )}
                                        <form onSubmit={handleSubmitProposal} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Bid ($)</label>
                                                <input
                                                    type="number"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery (Days)</label>
                                                <input
                                                    type="number"
                                                    value={deliveryDays}
                                                    onChange={(e) => setDeliveryDays(e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
                                                <textarea
                                                    value={coverLetter}
                                                    onChange={(e) => setCoverLetter(e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 h-32 resize-none"
                                                    placeholder="Why are you the best fit for this job?"
                                                    required
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                {submitting ? 'Submitting...' : 'Send Proposal'}
                                                {!submitting && <Send className="ml-2 w-4 h-4" />}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default JobDetail;
