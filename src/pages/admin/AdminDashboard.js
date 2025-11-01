import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Users, UserCheck, Building, TrendingUp, Eye, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockInfluencers, mockClients } from '../../utils/staticData';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedRole, setSelectedRole] = useState('all');

    const stats = [
        { label: 'Total Influencers', value: mockInfluencers.length, icon: UserCheck, color: 'text-accent-red' },
        { label: 'Total Clients', value: mockClients.length, icon: Building, color: 'text-blue-400' },
        { label: 'Total Users', value: mockInfluencers.length + mockClients.length, icon: Users, color: 'text-green-400' },
    ];

    const filteredData = selectedRole === 'all'
        ? [...mockInfluencers, ...mockClients]
        : selectedRole === 'influencer'
            ? mockInfluencers
            : mockClients;

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
                        Admin <span className="text-accent-red">Dashboard</span>
                    </h1>
                    <p className="text-gray-400">Manage all users and platform data</p>
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

                <motion.div
                    variants={itemVariants}
                    className="bg-primary-darkGray border border-accent-red/20 rounded-lg p-6 shadow-lg"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white">All Users</h2>
                        <div className="flex items-center space-x-2">
                            <Filter className="text-gray-400" size={18} />
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="bg-primary-dark border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-red"
                            >
                                <option value="all">All Users</option>
                                <option value="influencer">Influencers</option>
                                <option value="client">Clients</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredData.map((item) => (
                            <motion.div
                                key={item.id}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                className="bg-primary-dark border border-gray-600 rounded-lg p-4 shadow-md"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="text-3xl">{item.avatar || '👤'}</div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">{item.name}</h3>
                                            <p className="text-gray-400 text-sm">{item.email}</p>
                                            <p className="text-gray-500 text-xs">{item.role || (item.followers ? 'Influencer' : 'Client')}</p>
                                        </div>
                                    </div>
                                </div>

                                {item.followers && (
                                    <div className="mb-3">
                                        <p className="text-gray-400 text-sm mb-1">Total Followers</p>
                                        <p className="text-white font-semibold">
                                            {(
                                                item.followers.facebook +
                                                item.followers.instagram +
                                                item.followers.tiktok +
                                                item.followers.youtube
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                )}

                                {item.product && (
                                    <div className="mb-3">
                                        <p className="text-gray-400 text-sm mb-1">Product</p>
                                        <p className="text-white text-sm">{item.product}</p>
                                    </div>
                                )}

                                {item.sectors && item.sectors.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {item.sectors.slice(0, 3).map((sector) => (
                                            <span
                                                key={sector}
                                                className="px-2 py-1 bg-accent-red/20 text-accent-red text-xs rounded"
                                            >
                                                {sector}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full bg-accent-red hover:bg-accent-darkRed text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                                >
                                    <Eye size={16} />
                                    <span>View Details</span>
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default AdminDashboard;
