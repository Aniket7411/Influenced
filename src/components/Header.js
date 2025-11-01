import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Home, Search, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getNavigationLinks = () => {
        if (!user) return [];

        switch (user.role) {
            case 'admin':
                return [
                    { path: '/admin/dashboard', label: 'Dashboard', icon: Home },
                    { path: '/admin/influencers', label: 'Influencers', icon: User },
                    { path: '/admin/clients', label: 'Clients', icon: User },
                ];
            case 'influencer':
                return [
                    { path: '/influencer/dashboard', label: 'Dashboard', icon: Home },
                    { path: '/influencer/profile', label: 'Profile', icon: User },
                    { path: '/influencer/search', label: 'Find Clients', icon: Search },
                ];
            case 'client':
                return [
                    { path: '/client/dashboard', label: 'Dashboard', icon: Home },
                    { path: '/client/profile', label: 'Profile', icon: User },
                    { path: '/client/search', label: 'Find Influencers', icon: Search },
                ];
            default:
                return [];
        }
    };

    const navLinks = getNavigationLinks();

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="bg-primary-dark border-b border-accent-red/20 sticky top-0 z-50"
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link to={user ? `/${user.role}/dashboard` : '/'} className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-accent-red">INFLU</span>
                            <span className="text-2xl font-bold text-white">PLATFORM</span>
                        </Link>
                    </motion.div>

                    {user && (
                        <nav className="hidden md:flex items-center space-x-6">
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className="flex items-center space-x-1 text-gray-300 hover:text-accent-red transition-colors"
                                    >
                                        <Icon size={18} />
                                        <span>{link.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    )}

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <div className="flex items-center space-x-2 text-gray-300">
                                    <User size={18} />
                                    <span className="hidden sm:inline">{user.name}</span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLogout}
                                    className="flex items-center space-x-1 bg-accent-red hover:bg-accent-darkRed text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    <LogOut size={18} />
                                    <span className="hidden sm:inline">Logout</span>
                                </motion.button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="text-accent-red hover:text-accent-lightRed transition-colors"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
