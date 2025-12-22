import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader, Briefcase, Zap, Globe } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || err.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans bg-gray-50">
            {/* Interactive Mouse Glow - Fixed for visibility */}
            <div
                className="fixed w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[100px] z-0 pointer-events-none transition-transform duration-75 mix-blend-multiply"
                style={{
                    left: mousePosition.x - 300,
                    top: mousePosition.y - 300,
                    transform: 'translate(-50%, -50%)'
                }}
            ></div>

            {/* Enhanced Background Layer (z-0) */}
            <div className="absolute inset-0 z-0">
                {/* Background Base */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 opacity-80"></div>

                {/* Grid Pattern - High Contrast */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] animate-grid opacity-60"></div>

                {/* Blobs */}
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-300/30 rounded-full blur-3xl animate-blob mix-blend-multiply"></div>
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-300/30 rounded-full blur-3xl animate-blob animation-delay-2000 mix-blend-multiply"></div>

                {/* Multiple Shooting Stars - Full Screen */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] left-[10%] w-[3px] h-[3px] bg-indigo-600 shadow-[0_0_15px_3px_rgba(99,102,241,0.5)] rounded-full animate-shooting-star">
                        <div className="absolute top-1/2 left-0 w-[150px] h-[2px] bg-gradient-to-r from-transparent to-indigo-600 transform -translate-y-1/2"></div>
                    </div>
                    <div className="absolute top-[5%] right-[20%] w-[2px] h-[2px] bg-purple-600 shadow-[0_0_15px_3px_rgba(168,85,247,0.5)] rounded-full animate-shooting-star" style={{ animationDelay: '2s', animationDuration: '4s' }}>
                        <div className="absolute top-1/2 left-0 w-[120px] h-[2px] bg-gradient-to-r from-transparent to-purple-600 transform -translate-y-1/2"></div>
                    </div>
                    <div className="absolute top-[60%] left-[5%] w-[2px] h-[2px] bg-pink-600 shadow-[0_0_15px_3px_rgba(236,72,153,0.5)] rounded-full animate-shooting-star" style={{ animationDelay: '5s', animationDuration: '3.5s' }}>
                        <div className="absolute top-1/2 left-0 w-[100px] h-[2px] bg-gradient-to-r from-transparent to-pink-600 transform -translate-y-1/2"></div>
                    </div>
                </div>

                {/* Floating Thematic Icons */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <Briefcase className="absolute top-1/4 left-[15%] w-12 h-12 text-indigo-400/20 animate-float rotate-12" />
                    <Zap className="absolute top-1/3 right-[10%] w-10 h-10 text-purple-400/20 animate-float-delayed -rotate-12" />
                    <Globe className="absolute bottom-1/4 left-[10%] w-14 h-14 text-pink-400/20 animate-float rotate-6" style={{ animationDuration: '8s' }} />
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/60 relative z-10 mx-4"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 mb-4">
                        <Lock className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                    <p className="text-gray-500 mt-2">Sign in to continue to FreelanceX</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm flex items-center justify-center border border-red-100"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : 'Sign In'}
                        {!isLoading && <ArrowRight className="w-5 h-5" />}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-indigo-600 font-semibold hover:text-indigo-700 transition">
                            Create Account
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
