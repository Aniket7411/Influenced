import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Save, Facebook, Instagram, Youtube, Music, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { sectors } from '../../utils/staticData';

const InfluencerProfile = () => {
    const { user, updateUser } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        number: user?.number || '',
        followers: {
            facebook: user?.followers?.facebook || 0,
            instagram: user?.followers?.instagram || 0,
            tiktok: user?.followers?.tiktok || 0,
            youtube: user?.followers?.youtube || 0,
        },
        sectors: user?.sectors || [],
        location: user?.location || '',
        engagementRate: user?.engagementRate || 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = { ...user, ...formData };
        updateUser(updatedUser);
        setIsEditing(false);
        alert('Profile updated successfully!');
    };

    const toggleSector = (sector) => {
        if (formData.sectors.includes(sector)) {
            setFormData({
                ...formData,
                sectors: formData.sectors.filter((s) => s !== sector),
            });
        } else {
            setFormData({
                ...formData,
                sectors: [...formData.sectors, sector],
            });
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
        <div className="min-h-screen bg-primary-black py-8 px-4">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container mx-auto max-w-4xl"
            >
                <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold text-white">
                        My <span className="text-accent-red">Profile</span>
                    </h1>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center space-x-2 bg-accent-red hover:bg-accent-darkRed text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        <Edit2 size={18} />
                        <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                    </motion.button>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="bg-primary-darkGray border border-accent-red/20 rounded-lg p-8 shadow-2xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    disabled={!isEditing}
                                    className="w-full bg-primary-dark border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-red disabled:opacity-50"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    disabled={!isEditing}
                                    className="w-full bg-primary-dark border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-red disabled:opacity-50"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    value={formData.number}
                                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                    disabled={!isEditing}
                                    className="w-full bg-primary-dark border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-red disabled:opacity-50"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Location</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    disabled={!isEditing}
                                    className="w-full bg-primary-dark border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-red disabled:opacity-50"
                                    placeholder="City, Country"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Engagement Rate (%)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={formData.engagementRate}
                                    onChange={(e) => setFormData({ ...formData, engagementRate: parseFloat(e.target.value) })}
                                    disabled={!isEditing}
                                    className="w-full bg-primary-dark border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-red disabled:opacity-50"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-4">Social Media Followers</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2 bg-primary-dark border border-gray-600 rounded-lg px-4 py-3">
                                    <Facebook className="text-blue-500" size={20} />
                                    <input
                                        type="number"
                                        value={formData.followers.facebook}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                followers: { ...formData.followers, facebook: parseInt(e.target.value) || 0 },
                                            })
                                        }
                                        disabled={!isEditing}
                                        className="flex-1 bg-transparent text-white focus:outline-none disabled:opacity-50"
                                        placeholder="Facebook followers"
                                    />
                                </div>

                                <div className="flex items-center space-x-2 bg-primary-dark border border-gray-600 rounded-lg px-4 py-3">
                                    <Instagram className="text-pink-500" size={20} />
                                    <input
                                        type="number"
                                        value={formData.followers.instagram}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                followers: { ...formData.followers, instagram: parseInt(e.target.value) || 0 },
                                            })
                                        }
                                        disabled={!isEditing}
                                        className="flex-1 bg-transparent text-white focus:outline-none disabled:opacity-50"
                                        placeholder="Instagram followers"
                                    />
                                </div>

                                <div className="flex items-center space-x-2 bg-primary-dark border border-gray-600 rounded-lg px-4 py-3">
                                    <Music className="text-black" size={20} />
                                    <input
                                        type="number"
                                        value={formData.followers.tiktok}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                followers: { ...formData.followers, tiktok: parseInt(e.target.value) || 0 },
                                            })
                                        }
                                        disabled={!isEditing}
                                        className="flex-1 bg-transparent text-white focus:outline-none disabled:opacity-50"
                                        placeholder="TikTok followers"
                                    />
                                </div>

                                <div className="flex items-center space-x-2 bg-primary-dark border border-gray-600 rounded-lg px-4 py-3">
                                    <Youtube className="text-red-500" size={20} />
                                    <input
                                        type="number"
                                        value={formData.followers.youtube}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                followers: { ...formData.followers, youtube: parseInt(e.target.value) || 0 },
                                            })
                                        }
                                        disabled={!isEditing}
                                        className="flex-1 bg-transparent text-white focus:outline-none disabled:opacity-50"
                                        placeholder="YouTube subscribers"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-4">Sectors</label>
                            <div className="flex flex-wrap gap-2">
                                {sectors.map((sector) => (
                                    <motion.button
                                        key={sector}
                                        type="button"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => isEditing && toggleSector(sector)}
                                        disabled={!isEditing}
                                        className={`px-4 py-2 rounded-lg transition-colors ${formData.sectors.includes(sector)
                                            ? 'bg-accent-red text-white'
                                            : 'bg-primary-dark text-gray-300 border border-gray-600'
                                            } ${!isEditing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent-darkRed'}`}
                                    >
                                        {sector}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {isEditing && (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-accent-red hover:bg-accent-darkRed text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                            >
                                <Save size={18} />
                                <span>Save Changes</span>
                            </motion.button>
                        )}
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default InfluencerProfile;
