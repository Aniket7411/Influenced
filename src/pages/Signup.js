import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Lock, Mail, Phone, UserPlus, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        number: '',
        role: 'influencer',
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        // Mock signup - will be replaced with API call
        const userData = {
            id: Date.now().toString(),
            name: formData.name,
            email: formData.email,
            number: formData.number,
            role: formData.role,
            ...(formData.role === 'influencer' && {
                followers: {
                    facebook: 0,
                    instagram: 0,
                    tiktok: 0,
                    youtube: 0,
                },
                sectors: [],
                avatar: '👤',
            }),
            ...(formData.role === 'client' && {
                product: '',
                budget: '',
                paymentType: 'money',
                expectations: '',
                sectors: [],
                avatar: '🏢',
            }),
        };

        login(userData);
        navigate(`/${formData.role}/dashboard`);
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
                        Join <span className="text-accent-red">InfluPlatform</span>
                    </h1>
                    <p className="text-gray-400">Create your account</p>
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

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-300 mb-2">Role</label>
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full bg-primary-dark border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-red"
                            >
                                <option value="influencer">Influencer</option>
                                <option value="client">Client/Vendor</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-2 flex items-center space-x-2">
                                <User size={16} />
                                <span>Name</span>
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-primary-dark border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-red"
                                placeholder="Enter your name"
                                required
                            />
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
                                <Phone size={16} />
                                <span>Phone Number</span>
                            </label>
                            <input
                                type="tel"
                                value={formData.number}
                                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                className="w-full bg-primary-dark border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-red"
                                placeholder="Enter your phone number"
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
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-2 flex items-center space-x-2">
                                <Lock size={16} />
                                <span>Confirm Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="w-full bg-primary-dark border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-accent-red"
                                    placeholder="Confirm your password"
                                    required
                                />
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-accent-red transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </motion.button>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-accent-red hover:bg-accent-darkRed text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 mt-6"
                        >
                            <UserPlus size={18} />
                            <span>Sign Up</span>
                        </motion.button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Already have an account?{' '}
                            <Link to="/login" className="text-accent-red hover:text-accent-lightRed">
                                Login
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Signup;
