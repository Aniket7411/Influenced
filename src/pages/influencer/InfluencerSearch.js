import React, { useState, useMemo } from 'react';
import { Search, Filter, Building, DollarSign, Gift, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockClients } from '../../utils/staticData';
import { sectors } from '../../utils/staticData';

const InfluencerSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSectors, setSelectedSectors] = useState([]);
    const [paymentType, setPaymentType] = useState('all');

    const filteredClients = useMemo(() => {
        return mockClients.filter((client) => {
            const matchesSearch =
                client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                client.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                client.sectors.some((sector) => sector.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesSectors =
                selectedSectors.length === 0 ||
                client.sectors.some((sector) => selectedSectors.includes(sector));

            const matchesPayment = paymentType === 'all' || client.paymentType === paymentType;

            return matchesSearch && matchesSectors && matchesPayment;
        });
    }, [searchTerm, selectedSectors, paymentType]);

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
                        Find <span className="text-accent-red">Clients</span>
                    </h1>
                    <p className="text-gray-400">Search and filter clients looking for influencers</p>
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
                                <label className="block text-gray-300 mb-3">Payment Type</label>
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                                        <input
                                            type="radio"
                                            value="all"
                                            checked={paymentType === 'all'}
                                            onChange={(e) => setPaymentType(e.target.value)}
                                            className="text-accent-red"
                                        />
                                        <span>All</span>
                                    </label>
                                    <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                                        <input
                                            type="radio"
                                            value="money"
                                            checked={paymentType === 'money'}
                                            onChange={(e) => setPaymentType(e.target.value)}
                                            className="text-accent-red"
                                        />
                                        <DollarSign size={16} />
                                        <span>Money</span>
                                    </label>
                                    <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                                        <input
                                            type="radio"
                                            value="barter"
                                            checked={paymentType === 'barter'}
                                            onChange={(e) => setPaymentType(e.target.value)}
                                            className="text-accent-red"
                                        />
                                        <Gift size={16} />
                                        <span>Barter</span>
                                    </label>
                                </div>
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
                                    placeholder="Search by company name, product, or sector..."
                                />
                            </div>
                        </motion.div>

                        <div className="mb-4 text-gray-400">
                            Found {filteredClients.length} client{filteredClients.length !== 1 ? 's' : ''}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredClients.map((client) => (
                                <motion.div
                                    key={client.id}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-primary-darkGray border border-accent-red/20 rounded-lg p-6 shadow-lg"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="text-4xl">{client.avatar}</div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white">{client.name}</h3>
                                                <p className="text-gray-400 text-sm">{client.companySize}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-start space-x-2">
                                            <Package className="text-accent-red mt-1" size={16} />
                                            <div>
                                                <p className="text-gray-300 font-semibold">Product</p>
                                                <p className="text-gray-400 text-sm">{client.product}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            {client.paymentType === 'money' ? (
                                                <DollarSign className="text-green-400" size={16} />
                                            ) : (
                                                <Gift className="text-yellow-400" size={16} />
                                            )}
                                            <span className="text-gray-300">
                                                {client.paymentType === 'money' ? 'Money' : 'Barter'}
                                            </span>
                                            {client.budget && (
                                                <span className="text-gray-400">• {client.budget}</span>
                                            )}
                                        </div>

                                        <div>
                                            <p className="text-gray-300 font-semibold mb-1">Expectations</p>
                                            <p className="text-gray-400 text-sm">{client.expectations}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {client.sectors.map((sector) => (
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
                            ))}
                        </div>

                        {filteredClients.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12 text-gray-400"
                            >
                                <p>No clients found matching your criteria</p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default InfluencerSearch;
