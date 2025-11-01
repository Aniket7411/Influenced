import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Building, Shield, Search, Filter } from 'lucide-react';

const Home = () => {
    const features = [
        {
            icon: Users,
            title: 'For Influencers',
            description: 'Connect with brands and grow your influence',
            color: 'text-accent-red',
        },
        {
            icon: Building,
            title: 'For Clients',
            description: 'Find the perfect influencers for your brand',
            color: 'text-blue-400',
        },
        {
            icon: Shield,
            title: 'For Admins',
            description: 'Manage platform and user interactions',
            color: 'text-green-400',
        },
    ];

    const benefits = [
        { icon: Search, text: 'Advanced Search & Filter' },
        { icon: Filter, text: 'Sector-Based Matching' },
        { icon: Users, text: 'Verified Profiles' },
        { icon: Building, text: 'Direct Communication' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <div className="min-h-screen bg-primary-black">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container mx-auto px-4 py-16"
            >
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <motion.h1
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-6xl md:text-7xl font-bold text-white mb-4"
                    >
                        Welcome to <span className="text-accent-red">InfluPlatform</span>
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
                    >
                        The ultimate platform connecting influencers with brands. Grow your reach or find the perfect collaboration.
                    </motion.p>
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link
                            to="/login"
                            className="inline-flex items-center space-x-2 bg-accent-red hover:bg-accent-darkRed text-white font-semibold px-8 py-4 rounded-lg transition-colors"
                        >
                            <span>Get Started</span>
                            <ArrowRight size={20} />
                        </Link>
                        <Link
                            to="/signup"
                            className="inline-flex items-center space-x-2 bg-primary-darkGray border border-accent-red text-white font-semibold px-8 py-4 rounded-lg hover:bg-primary-gray transition-colors"
                        >
                            <span>Sign Up</span>
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-primary-darkGray border border-accent-red/20 rounded-lg p-8 shadow-lg"
                            >
                                <Icon className={`${feature.color} w-12 h-12 mb-4`} />
                                <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-r from-accent-red/10 to-primary-darkGray border border-accent-red/20 rounded-lg p-8 shadow-2xl"
                >
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">Why Choose InfluPlatform?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => {
                            const Icon = benefit.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="flex items-center space-x-3"
                                >
                                    <Icon className="text-accent-red w-6 h-6" />
                                    <span className="text-gray-300">{benefit.text}</span>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Home;
