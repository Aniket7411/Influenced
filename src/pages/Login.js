import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Lock, Mail, LogIn, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockAdmins, mockInfluencers, mockClients } from '../utils/staticData';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'influencer',
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Mock authentication - will be replaced with API call
        let user = null;
        if (formData.role === 'admin') {
            user = mockAdmins.find((a) => a.email === formData.email);
        } else if (formData.role === 'influencer') {
            user = mockInfluencers.find((i) => i.email === formData.email);
        } else if (formData.role === 'client') {
            user = mockClients.find((c) => c.email === formData.email);
        }

        if (user && formData.password === 'password123') {
            const userData = { ...user, role: formData.role };
            login(userData);
            navigate(`/${formData.role}/dashboard`);
        } else {
            setError('Invalid credentials. Use password123 for demo.');
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-black via-primary-dark to-primary-darkGray py-12 px-4">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md"
            >
                <motion.div variants={itemVariants} className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Welcome to <span className="text-accent-red">InfluPlatform</span>
                    </h1>
                    <p className="text-gray-400">Login to your account</p>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="bg-primary-darkGray border border-accent-red/20 rounded-lg p-8 shadow-2xl"
                >
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded text-red-300 text-sm"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-300 mb-2">Role</label>
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full bg-primary-dark border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-red"
                            >
                                <option value="influencer">Influencer</option>
                                <option value="client">Client/Vendor</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-2 flex items-center space-x-2">
                                <Mail size={16} />
                                <span>Email</span>
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-primary-dark border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-red"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-2 flex items-center space-x-2">
                                <Lock size={16} />
                                <span>Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-primary-dark border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-accent-red"
                                    placeholder="Enter your password"
                                    required
                                />
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-accent-red transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </motion.button>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">Demo: Use password123</p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-accent-red hover:bg-accent-darkRed text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                        >
                            <LogIn size={18} />
                            <span>Login</span>
                        </motion.button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-accent-red hover:text-accent-lightRed">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Login;
