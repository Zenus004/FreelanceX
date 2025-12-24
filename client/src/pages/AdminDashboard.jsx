import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { Users, Briefcase, CheckCircle, DollarSign, LogOut, Shield, Trash2, Ban, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const { logout } = useAuth();
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, usersRes] = await Promise.all([
                    api.get('/admin/stats'),
                    api.get('/users')
                ]);
                setStats(statsRes.data);
                setUsers(usersRes.data);
            } catch (error) {
                console.error('Error fetching admin data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleBanUser = async (userId) => {
        toast((t) => (
            <div className="flex flex-col gap-2">
                <span className="font-medium">Ban this user?</span>
                <div className="flex gap-2 mt-1">
                    <button
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        onClick={() => {
                            toast.dismiss(t.id);
                            confirmBanUser(userId);
                        }}
                    >
                        Ban
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

    const confirmBanUser = async (userId) => {
        try {
            await api.patch(`/admin/users/${userId}/ban`);
            toast.success('User banned successfully');
            setUsers(users.map(u => u._id === userId ? { ...u, isBanned: true } : u));
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to ban user');
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    if (!stats) return <div className="p-8 text-center text-red-500">Error loading data.</div>;

    const jobData = [
        { name: 'Active', value: stats.activeJobs },
        { name: 'In Progress', value: stats.inProgressJobs },
        { name: 'Completed', value: stats.completedJobs },
        { name: 'Cancelled', value: stats.cancelledJobs }
    ];

    const COLORS = ['#6366f1', '#8b5cf6', '#10b981', '#ef4444'];

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Top Navigation */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
                            <span className="text-xl font-bold text-gray-900">Admin Portal</span>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1 variants={itemVariants} className="text-2xl font-bold text-gray-900 mb-8">Dashboard Overview</motion.h1>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            icon={<Users className="w-6 h-6 text-blue-600" />}
                            label="Total Users"
                            value={stats.totalUsers}
                            color="bg-blue-50"
                            borderColor="border-blue-200"
                        />
                        <StatCard
                            icon={<Briefcase className="w-6 h-6 text-indigo-600" />}
                            label="Active Jobs"
                            value={stats.activeJobs}
                            color="bg-indigo-50"
                            borderColor="border-indigo-200"
                        />
                        <StatCard
                            icon={<CheckCircle className="w-6 h-6 text-emerald-600" />}
                            label="Completed Jobs"
                            value={stats.completedJobs}
                            color="bg-emerald-50"
                            borderColor="border-emerald-200"
                        />
                        <StatCard
                            icon={<DollarSign className="w-6 h-6 text-amber-600" />}
                            label="Total Revenue"
                            value={`$${stats.totalRevenue}`}
                            color="bg-amber-50"
                            borderColor="border-amber-200"
                        />
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-6">Top Freelancers by Earnings</h2>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stats.topFreelancers}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                                        <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            cursor={{ fill: '#f9fafb' }}
                                        />
                                        <Bar dataKey="balance" fill="#6366f1" radius={[4, 4, 0, 0]} name="Earnings" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-6">Job Status Distribution</h2>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={jobData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {jobData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>
                    </div>

                    {/* User Management */}
                    <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <h2 className="text-lg font-bold text-gray-900">User Management</h2>
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredUsers.map((user) => (
                                        <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs mr-3">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                        <div className="text-xs text-gray-500">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                                    ${user.role === 'client' ? 'bg-blue-50 text-blue-700' :
                                                        user.role === 'freelancer' ? 'bg-purple-50 text-purple-700' :
                                                            'bg-gray-100 text-gray-800'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                                    ${user.status === 'banned' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'banned' ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                                    {user.status || 'active'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {user.role !== 'admin' && user.status !== 'banned' && (
                                                    <button
                                                        onClick={() => handleBanUser(user._id)}
                                                        className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors"
                                                        title="Ban User"
                                                    >
                                                        <Ban className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
};

const StatCard = ({ icon, label, value, color, borderColor }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
        }}
        className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${borderColor} hover:shadow-md transition-shadow`}
    >
        <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg ${color}`}>
                {icon}
            </div>
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
        <div className="text-sm text-gray-500 font-medium">{label}</div>
    </motion.div>
);

export default AdminDashboard;
