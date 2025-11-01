import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-primary-dark border-t border-accent-red/20 mt-auto"
        >
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-accent-red">INFLU</span>
                        <span className="text-xl font-bold text-white">PLATFORM</span>
                    </div>

                    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                        <Link to="/about" className="text-gray-400 hover:text-accent-red transition-colors">
                            About Us
                        </Link>
                        <Link to="/contact" className="text-gray-400 hover:text-accent-red transition-colors">
                            Contact
                        </Link>
                        <Link to="/terms" className="text-gray-400 hover:text-accent-red transition-colors">
                            Terms of Service
                        </Link>
                        <Link to="/privacy" className="text-gray-400 hover:text-accent-red transition-colors">
                            Privacy Policy
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <motion.a
                            whileHover={{ scale: 1.2, y: -2 }}
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-accent-red transition-colors"
                        >
                            <Facebook size={20} />
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.2, y: -2 }}
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-accent-red transition-colors"
                        >
                            <Instagram size={20} />
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.2, y: -2 }}
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-accent-red transition-colors"
                        >
                            <Twitter size={20} />
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.2, y: -2 }}
                            href="mailto:contact@influplatform.com"
                            className="text-gray-400 hover:text-accent-red transition-colors"
                        >
                            <Mail size={20} />
                        </motion.a>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-accent-red/20 text-center text-gray-500">
                    <p>&copy; {currentYear} InfluPlatform. All rights reserved.</p>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
