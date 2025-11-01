import React, { useState, useMemo } from 'react';
import { Search, Filter, Facebook, Instagram, Youtube, Music, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockInfluencers } from '../../utils/staticData';
import { sectors } from '../../utils/staticData';

const ClientSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSectors, setSelectedSectors] = useState([]);
    const [minFollowers, setMinFollowers] = useState('');
    const [maxFollowers, setMaxFollowers] = useState('');

    const filteredInfluencers = useMemo(() => {
        return mockInfluencers.filter((influencer) => {
            const matchesSearch =
                influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                influencer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                influencer.sectors.some((sector) => sector.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesSectors =
                selectedSectors.length === 0 ||
                influencer.sectors.some((sector) => selectedSectors.includes(sector));

            const totalFollowers =
                influencer.followers.facebook +
                influencer.followers.instagram +
                influencer.followers.tiktok +
                influencer.followers.youtube;

            const matchesFollowers =
                (!minFollowers || totalFollowers >= parseInt(minFollowers)) &&
                (!maxFollowers || totalFollowers <= parseInt(maxFollowers));

            return matchesSearch && matchesSectors && matchesFollowers;
        });
    }, [searchTerm, selectedSectors, minFollowers, maxFollowers]);

    const toggleSector = (sector) => {
        if (selectedSectors.includes(sector)) {
            setSelectedSectors(selectedSectors.filter((s) => s !== sector));
        } else {
            setSelectedSectors([...selectedSectors, sector]);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
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
                        Find <span className="text-accent-red">Influencers</span>
                    </h1>
                    <p className="text-gray-400">Search and filter influencers based on your requirements</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-1 bg-primary-darkGray border border-accent-red/20 rounded-lg p-6 shadow-lg"
                    >
                        <div className="flex items-center space-x-2 mb-6">
                            <Filter className="text-accent-red" size={20} />
                            <h2 className="text-xl font-bold text-white">Filters</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-gray-300 mb-2">Min Followers</label>
                                <input
                                    type="number"
                                    value={minFollowers}
                                    onChange={(e) => setMinFollowers(e.target.value)}
                                    className="w-full bg-primary-dark border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-red"
                                    placeholder="0"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Max Followers</label>
                                <input
                                    type="number"
                                    value={maxFollowers}
                                    onChange={(e) => setMaxFollowers(e.target.value)}
                                    className="w-full bg-primary-dark border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-red"
                                    placeholder="No limit"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-3">Sectors</label>
                                <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
                                    {sectors.map((sector) => (
                                        <motion.button
                                            key={sector}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => toggleSector(sector)}
                                            className={`px-3 py-1 rounded-lg text-sm transition-colors ${selectedSectors.includes(sector)
                                                ? 'bg-accent-red text-white'
                                                : 'bg-primary-dark text-gray-300 border border-gray-600 hover:border-accent-red'
                                                }`}
                                        >
                                            {sector}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="lg:col-span-3">
                        <motion.div variants={itemVariants} className="mb-6">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-primary-darkGray border border-gray-600 rounded-lg px-12 py-4 text-white focus:outline-none focus:border-accent-red"
                                    placeholder="Search by name, location, or sector..."
                                />
                            </div>
                        </motion.div>

                        <div className="mb-4 text-gray-400">
                            Found {filteredInfluencers.length} influencer{filteredInfluencers.length !== 1 ? 's' : ''}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredInfluencers.map((influencer) => {
                                const totalFollowers =
                                    influencer.followers.facebook +
                                    influencer.followers.instagram +
                                    influencer.followers.tiktok +
                                    influencer.followers.youtube;

                                return (
                                    <motion.div
                                        key={influencer.id}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.02 }}
                                        className="bg-primary-darkGray border border-accent-red/20 rounded-lg p-6 shadow-lg"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="text-4xl">{influencer.avatar}</div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-white">{influencer.name}</h3>
                                                    <p className="text-gray-400 text-sm">{influencer.location}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div className="flex items-center space-x-2 text-sm">
                                                <Facebook className="text-blue-500" size={16} />
                                                <span className="text-gray-300">{influencer.followers.facebook.toLocaleString()}K</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm">
                                                <Instagram className="text-pink-500" size={16} />
                                                <span className="text-gray-300">{influencer.followers.instagram.toLocaleString()}K</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm">
                                                <Music className="text-black" size={16} />
                                                <span className="text-gray-300">{influencer.followers.tiktok.toLocaleString()}K</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm">
                                                <Youtube className="text-red-500" size={16} />
                                                <span className="text-gray-300">{influencer.followers.youtube.toLocaleString()}K</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-2">
                                                <Users className="text-accent-red" size={16} />
                                                <span className="text-gray-300 font-semibold">{(totalFollowers / 1000).toFixed(0)}K</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <TrendingUp className="text-green-400" size={16} />
                                                <span className="text-gray-300 font-semibold">{influencer.engagementRate}%</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {influencer.sectors.map((sector) => (
                                                <span
                                                    key={sector}
                                                    className="px-2 py-1 bg-accent-red/20 text-accent-red text-xs rounded"
                                                >
                                                    {sector}
                                                </span>
                                            ))}
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-full bg-accent-red hover:bg-accent-darkRed text-white font-semibold py-2 rounded-lg transition-colors"
                                        >
                                            View Details
                                        </motion.button>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {filteredInfluencers.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12 text-gray-400"
                            >
                                <p>No influencers found matching your criteria</p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ClientSearch;
