import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Save, Edit2, DollarSign, Gift } from 'lucide-react';
import { motion } from 'framer-motion';
import { sectors } from '../../utils/staticData';

const ClientProfile = () => {
    const { user, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        number: user?.number || '',
        product: user?.product || '',
        budget: user?.budget || '',
        paymentType: user?.paymentType || 'money',
        expectations: user?.expectations || '',
        sectors: user?.sectors || [],
        companySize: user?.companySize || '',
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
                                <label className="block text-gray-300 mb-2">Company Name</label>
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
                                <label className="block text-gray-300 mb-2">Company Size</label>
                                <select
                                    value={formData.companySize}
                                    onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                                    disabled={!isEditing}
                                    className="w-full bg-primary-dark border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-red disabled:opacity-50"
                                >
                                    <option value="">Select Size</option>
                                    <option value="Small">Small (1-50)</option>
                                    <option value="Medium">Medium (51-200)</option>
                                    <option value="Large">Large (201+)</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-2">Product/Service</label>
                            <input
                                type="text"
                                value={formData.product}
                                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                                disabled={!isEditing}
                                className="w-full bg-primary-dark border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-red disabled:opacity-50"
                                placeholder="Describe your product or service"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-300 mb-2">Budget</label>
                                <input
                                    type="text"
                                    value={formData.budget}
                                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                    disabled={!isEditing}
                                    className="w-full bg-primary-dark border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-red disabled:opacity-50"
                                    placeholder="e.g., $5,000 - $10,000"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Payment Type</label>
                                <div className="flex space-x-4 mt-2">
                                    <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                                        <input
                                            type="radio"
                                            value="money"
                                            checked={formData.paymentType === 'money'}
                                            onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })}
                                            disabled={!isEditing}
                                            className="disabled:opacity-50"
                                        />
                                        <DollarSign size={18} />
                                        <span>Money</span>
                                    </label>
                                    <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                                        <input
                                            type="radio"
                                            value="barter"
                                            checked={formData.paymentType === 'barter'}
                                            onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })}
                                            disabled={!isEditing}
                                            className="disabled:opacity-50"
                                        />
                                        <Gift size={18} />
                                        <span>Barter</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-2">Expectations</label>
                            <textarea
                                value={formData.expectations}
                                onChange={(e) => setFormData({ ...formData, expectations: e.target.value })}
                                disabled={!isEditing}
                                rows="4"
                                className="w-full bg-primary-dark border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-red disabled:opacity-50"
                                placeholder="Describe what you're looking for in influencers"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-4">Target Sectors</label>
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

export default ClientProfile;
