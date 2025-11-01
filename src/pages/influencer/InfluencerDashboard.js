import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { User, Edit, TrendingUp, Users, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const InfluencerDashboard = () => {
    const { user } = useAuth();

    const stats = [
        { label: 'Total Followers', value: '675K', icon: Users, color: 'text-accent-red' },
        { label: 'Engagement Rate', value: '4.8%', icon: TrendingUp, color: 'text-green-400' },
        { label: 'Profile Views', value: '1.2K', icon: Eye, color: 'text-blue-400' },
    ];

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
        <div className="min-h-screen bg-primary-black py-8 px-4">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container mx-auto max-w-7xl"
            >
                <motion.div variants={itemVariants} className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Welcome back, <span className="text-accent-red">{user?.name || 'Influencer'}</span>
                    </h1>
                    <p className="text-gray-400">Manage your profile and connect with brands</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                className="bg-primary-darkGray border border-accent-red/20 rounded-lg p-6 shadow-lg"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <Icon className={`${stat.color} w-8 h-8`} />
                                    <span className="text-3xl font-bold text-white">{stat.value}</span>
                                </div>
                                <p className="text-gray-400">{stat.label}</p>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                        variants={itemVariants}
                        className="bg-primary-darkGray border border-accent-red/20 rounded-lg p-6 shadow-lg"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                                <User />
                                <span>Profile Management</span>
                            </h2>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Update your profile information, follower counts, and sectors
                        </p>
                        <Link
                            to="/influencer/profile"
                            className="inline-flex items-center space-x-2 bg-accent-red hover:bg-accent-darkRed text-white px-6 py-3 rounded-lg transition-colors"
                        >
                            <Edit size={18} />
                            <span>Edit Profile</span>
                        </Link>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="bg-primary-darkGray border border-accent-red/20 rounded-lg p-6 shadow-lg"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                                <Eye />
                                <span>Find Clients</span>
                            </h2>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Browse and connect with brands looking for influencers
                        </p>
                        <Link
                            to="/influencer/search"
                            className="inline-flex items-center space-x-2 bg-accent-red hover:bg-accent-darkRed text-white px-6 py-3 rounded-lg transition-colors"
                        >
                            <Eye size={18} />
                            <span>Browse Clients</span>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default InfluencerDashboard;
