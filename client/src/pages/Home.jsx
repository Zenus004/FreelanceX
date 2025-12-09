import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, Zap, Globe, ArrowRight, Star, Users, Briefcase } from 'lucide-react';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const Home = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <a href="" className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md shadow-indigo-200">F</a>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">FreelanceX</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Features</a>
                            <a href="#how-it-works" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">How it Works</a>
                            <Link to="/login" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Log In</Link>
                            <Link to="/register" className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-full font-medium hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transform hover:-translate-y-0.5">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Interactive Mouse Glow - Global Fixed Background */}
            <div
                className="fixed w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[100px] -z-0 pointer-events-none transition-transform duration-75 mix-blend-multiply"
                style={{
                    left: mousePosition.x - 300,
                    top: mousePosition.y - 300,
                    transform: 'translate(-50%, -50%)' // Center on cursor
                }}
            ></div>

            {/* Hero Section */}
            <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Enhanced Background Layer 1: Blobs & Grid (z-0) */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-40 mix-blend-multiply animate-blob"></div>
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-40 mix-blend-multiply animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-32 left-0 w-[800px] h-[800px] bg-gradient-to-br from-pink-100 to-indigo-100 rounded-full blur-3xl opacity-40 mix-blend-multiply animate-blob animation-delay-4000"></div>

                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] animate-grid opacity-30"></div>
                </div>

                {/* Enhanced Background Layer 2: Stars & Icons (z-0, on top of blobs) */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    {/* Shooting Stars - High Visibility */}
                    <div className="absolute top-[10%] right-[10%] w-[4px] h-[4px] bg-indigo-600 shadow-[0_0_15px_3px_rgba(99,102,241,0.6)] rounded-full animate-shooting-star">
                        <div className="absolute top-1/2 left-0 w-[200px] h-[2px] bg-gradient-to-r from-transparent to-indigo-600 transform -translate-y-1/2"></div>
                    </div>
                    <div className="absolute top-[20%] right-[20%] w-[4px] h-[4px] bg-purple-600 shadow-[0_0_15px_3px_rgba(168,85,247,0.6)] rounded-full animate-shooting-star" style={{ animationDelay: '2s', animationDuration: '4s' }}>
                        <div className="absolute top-1/2 left-0 w-[160px] h-[2px] bg-gradient-to-r from-transparent to-purple-600 transform -translate-y-1/2"></div>
                    </div>

                    {/* Floating Thematic Icons - High Visibility */}
                    <Briefcase className="absolute top-1/4 left-[10%] w-16 h-16 text-indigo-400/30 animate-float rotate-12" />
                    <Zap className="absolute top-1/3 right-[15%] w-10 h-10 text-purple-400/30 animate-float-delayed -rotate-12" />
                    <Globe className="absolute bottom-1/4 left-[20%] w-20 h-20 text-pink-400/30 animate-float rotate-6" style={{ animationDuration: '8s' }} />
                </div>

                {/* Floating Dots */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-indigo-500 rounded-full animate-float opacity-80"></div>
                    <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-purple-500 rounded-full animate-float-delayed opacity-80"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-pink-500 rounded-full animate-float opacity-80" style={{ animationDuration: '7s' }}></div>
                    <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-indigo-400 rounded-full animate-float-delayed opacity-80" style={{ animationDuration: '5s' }}></div>
                    <div className="absolute bottom-1/3 right-10 w-3 h-3 bg-purple-400 rounded-full animate-float opacity-80"></div>
                    <div className="absolute top-20 left-20 w-2 h-2 bg-pink-400 rounded-full animate-float-delayed opacity-80"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 font-medium text-sm mb-8 border border-indigo-200/50 shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            The #1 Platform for Micro-Freelancing
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
                            Hire the best talent for <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-gradient">
                                any project, anytime.
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Connect with top-tier freelancers instantly. Secure payments, verified talent, and zero headaches. Start building your dream project today.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all shadow-xl shadow-indigo-200/50 hover:shadow-2xl hover:shadow-indigo-300/50 transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
                                Hire Talent
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/jobs" className="px-8 py-4 bg-white text-gray-700 text-lg font-semibold border-2 border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                                Find Work
                            </Link>
                        </motion.div>

                        {/* Enhanced Stats */}
                        <motion.div variants={fadeInUp} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-200 pt-8 bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                            <StatItem number="10k+" label="Freelancers" />
                            <StatItem number="50k+" label="Projects Done" />
                            <StatItem number="99%" label="Satisfaction" />
                            <StatItem number="$5M+" label="Paid Out" />
                        </motion.div>
                    </motion.div>
                </div>
            </header>

            <section id="features" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
                {/* Decorative Shapes */}
                <div className="absolute top-20 left-10 w-20 h-20 border-4 border-indigo-100 rounded-full animate-spin-slow opacity-60"></div>
                <div className="absolute bottom-20 right-10 w-16 h-16 border-4 border-purple-100 rotate-45 animate-spin-reverse opacity-60"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl animate-pulse-slow -z-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <div className="inline-block px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">FEATURES</div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose FreelanceX?</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">We provide the tools and security you need to focus on what matters most: the work.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Shield className="w-8 h-8 text-indigo-600" />}
                            title="Secure Escrow"
                            description="Your money is held safely until you approve the work. Release funds only when you're 100% satisfied."
                            gradient="from-indigo-500/10 to-indigo-600/10"
                            borderColor="border-indigo-200/50"
                        />
                        <FeatureCard
                            icon={<Zap className="w-8 h-8 text-purple-600" />}
                            title="Lightning Fast"
                            description="Post a job and get proposals in minutes. Our matching algorithm connects you with the right talent instantly."
                            gradient="from-purple-500/10 to-purple-600/10"
                            borderColor="border-purple-200/50"
                        />
                        <FeatureCard
                            icon={<Globe className="w-8 h-8 text-pink-600" />}
                            title="Global Talent Pool"
                            description="Access a diverse network of verified professionals from over 100 countries, ready to work 24/7."
                            gradient="from-pink-500/10 to-pink-600/10"
                            borderColor="border-pink-200/50"
                        />
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-24 bg-gray-50 relative overflow-hidden">
                {/* Animated Background Stripes */}
                <div className="absolute inset-0 animate-stripes opacity-30"></div>

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                {/* Geometric Decorations */}
                <div className="absolute top-10 right-20 w-24 h-24 border-8 border-dashed border-indigo-200/50 rounded-full animate-spin-slow"></div>
                <div className="absolute bottom-10 left-20 w-16 h-16 bg-purple-200/30 rounded-xl animate-bounce-gentle rotate-12"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <div className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">HOW IT WORKS</div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-xl text-gray-600">Get your project done in three simple steps.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 relative">
                        {/* Enhanced Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-1 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-full -z-10"></div>

                        <Step
                            number="1"
                            title="Post a Job"
                            description="Create a detailed job post. It's free and takes less than 2 minutes."
                        />
                        <Step
                            number="2"
                            title="Hire Freelancers"
                            description="Review proposals, chat with candidates, and hire the best fit."
                        />
                        <Step
                            number="3"
                            title="Get Work Done"
                            description="Receive files, approve milestones, and pay securely."
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-12 text-center text-white shadow-2xl shadow-indigo-200/50 relative overflow-hidden">
                        {/* Decorative Pattern */}
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                        {/* Gradient Orbs */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-glow"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse-glow animation-delay-2000"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to get started?</h2>
                            <p className="text-indigo-100 text-xl mb-10 max-w-2xl mx-auto">Join thousands of businesses and freelancers building the future together.</p>
                            <Link to="/register" className="inline-block px-10 py-4 bg-white text-indigo-600 text-lg font-bold rounded-full hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105">
                                Create Your Account
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200">F</div>
                        <span className="text-xl font-bold text-gray-900">FreelanceX</span>
                    </div>
                    <div className="text-gray-500 text-sm">
                        © 2025 FreelanceX. All rights reserved.
                    </div>
                    <div className="flex space-x-8">
                        <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">Terms</a>
                        <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">Privacy</a>
                        <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">Contact</a>
                    </div>
                </div>
            </footer>


        </div>
    );
};

const FeatureCard = ({ icon, title, description, gradient, borderColor }) => (
    <motion.div
        whileHover={{ y: -10, scale: 1.02 }}
        className={`p-8 bg-gradient-to-br ${gradient} to-white rounded-2xl shadow-xl border-2 ${borderColor} hover:shadow-2xl transition-all duration-300 backdrop-blur-sm`}
    >
        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-lg">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
);

const Step = ({ number, title, description }) => (
    <div className="text-center relative bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-indigo-200 relative z-10">
            {number}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const StatItem = ({ number, label }) => (
    <div className="text-center">
        <div className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-1">{number}</div>
        <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">{label}</div>
    </div>
);

export default Home;