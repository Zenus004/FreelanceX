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
    return (
        <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <a href="" className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">F</a>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">FreelanceX</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-600 hover:text-indigo-600 font-medium transition">Features</a>
                            <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 font-medium transition">How it Works</a>
                            <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium transition">Log In</Link>
                            <Link to="/register" className="px-5 py-2.5 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transform hover:-translate-y-0.5">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-indigo-50 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob"></div>
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-50 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-32 left-0 w-[800px] h-[800px] bg-pink-50 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-4000"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-medium text-sm mb-8 border border-indigo-100">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            The #1 Platform for Micro-Freelancing
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
                            Hire the best talent for <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                                any project, anytime.
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Connect with top-tier freelancers instantly. Secure payments, verified talent, and zero headaches. Start building your dream project today.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/register" className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-full hover:bg-indigo-700 transition shadow-xl shadow-indigo-200 hover:shadow-2xl hover:shadow-indigo-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
                                Hire Talent
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/jobs" className="px-8 py-4 bg-white text-gray-700 text-lg font-semibold border border-gray-200 rounded-full hover:bg-gray-50 transition shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                                Find Work
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div variants={fadeInUp} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-100 pt-8">
                            <StatItem number="10k+" label="Freelancers" />
                            <StatItem number="50k+" label="Projects Done" />
                            <StatItem number="99%" label="Satisfaction" />
                            <StatItem number="$5M+" label="Paid Out" />
                        </motion.div>
                    </motion.div>
                </div>
            </header>

            {/* Features Section */}
            <section id="features" className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose FreelanceX?</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">We provide the tools and security you need to focus on what matters most: the work.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Shield className="w-8 h-8 text-indigo-600" />}
                            title="Secure Escrow"
                            description="Your money is held safely until you approve the work. Release funds only when you're 100% satisfied."
                        />
                        <FeatureCard
                            icon={<Zap className="w-8 h-8 text-purple-600" />}
                            title="Lightning Fast"
                            description="Post a job and get proposals in minutes. Our matching algorithm connects you with the right talent instantly."
                        />
                        <FeatureCard
                            icon={<Globe className="w-8 h-8 text-pink-600" />}
                            title="Global Talent Pool"
                            description="Access a diverse network of verified professionals from over 100 countries, ready to work 24/7."
                        />
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-xl text-gray-600">Get your project done in three simple steps.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gray-200 -z-10"></div>

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
                    <div className="bg-indigo-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to get started?</h2>
                            <p className="text-indigo-100 text-xl mb-10 max-w-2xl mx-auto">Join thousands of businesses and freelancers building the future together.</p>
                            <Link to="/register" className="inline-block px-10 py-4 bg-white text-indigo-600 text-lg font-bold rounded-full hover:bg-gray-50 transition shadow-lg transform hover:-translate-y-1">
                                Create Your Account
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">F</div>
                        <span className="text-xl font-bold text-gray-900">FreelanceX</span>
                    </div>
                    <div className="text-gray-500 text-sm">
                        © 2025 FreelanceX. All rights reserved.
                    </div>
                    <div className="flex space-x-8">
                        <a href="#" className="text-gray-500 hover:text-indigo-600 transition">Terms</a>
                        <a href="#" className="text-gray-500 hover:text-indigo-600 transition">Privacy</a>
                        <a href="#" className="text-gray-500 hover:text-indigo-600 transition">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className="p-8 bg-white rounded-2xl shadow-lg shadow-gray-100 border border-gray-50 hover:border-indigo-100 transition-all duration-300"
    >
        <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
);

const Step = ({ number, title, description }) => (
    <div className="text-center relative bg-white p-6 rounded-xl md:bg-transparent">
        <div className="w-16 h-16 bg-white border-4 border-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-sm relative z-10">
            {number}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const StatItem = ({ number, label }) => (
    <div className="text-center">
        <div className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1">{number}</div>
        <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">{label}</div>
    </div>
);

export default Home;
