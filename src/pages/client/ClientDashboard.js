import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { User, Edit, Search, Package } from 'lucide-react';
import { motion } from 'framer-motion';

const ClientDashboard = () => {
    const { user } = useAuth();

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
                        Welcome back, <span className="text-accent-red">{user?.name || 'Client'}</span>
                    </h1>
                    <p className="text-gray-400">Find the perfect influencers for your brand</p>
                </motion.div>

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
                            Update your company details, products, and campaign requirements
                        </p>
                        <Link
                            to="/client/profile"
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
                                <Search />
                                <span>Find Influencers</span>
                            </h2>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Search and filter influencers by sector, followers, and engagement rate
                        </p>
                        <Link
                            to="/client/search"
                            className="inline-flex items-center space-x-2 bg-accent-red hover:bg-accent-darkRed text-white px-6 py-3 rounded-lg transition-colors"
                        >
                            <Search size={18} />
                            <span>Browse Influencers</span>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default ClientDashboard;
