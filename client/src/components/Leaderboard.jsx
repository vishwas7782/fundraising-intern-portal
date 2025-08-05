// src/components/Leaderboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Crown, Medal, Award, Loader2 } from 'lucide-react';

const Leaderboard = () => {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentUser = "Vishwas Singh";

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await axios.get('/api/leaderboard');
                setLeaders(res.data);
            } catch (err) {
                console.error("Error fetching leaderboard data:", err);
            } finally {
                setLoading(false);
            }
        };
        setTimeout(() => fetchLeaderboard(), 500);
    }, []);

    const getRankIcon = (index) => {
        if (index === 0) return <Crown className="text-yellow-500 h-6 w-6" />;
        if (index === 1) return <Medal className="text-gray-500 h-6 w-6" />;
        if (index === 2) return <Award className="text-orange-400 h-6 w-6" />;
        return <span className="font-bold text-gray-500 w-6 text-center">{index + 1}</span>;
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl"
        >
            <div className="flex items-center justify-between mb-6">
                <Link to="/dashboard" className="text-gray-500 hover:text-blue-600 transition-colors">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 text-center">Top Fundraisers</h1>
                <div className="w-6"></div>
            </div>
            
            {loading ? (
                <div className="flex justify-center p-10">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                </div>
            ) : (
                <div className="space-y-3">
                    {leaders.map((leader, index) => (
                        <motion.div 
                            key={leader._id} 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={`flex items-center p-4 rounded-xl transition-all ${
                                leader.name === currentUser ? 'bg-blue-100 scale-105 shadow-lg' : 'bg-gray-50'
                            }`}
                        >
                           <div className="w-12 flex justify-center">{getRankIcon(index)}</div>
                           <div className={`flex-grow font-semibold ${
                                leader.name === currentUser ? 'text-blue-600' : 'text-gray-800'
                           }`}>
                                {leader.name} {leader.name === currentUser && "(You)"}
                           </div>
                           <div className="text-lg font-bold text-green-600">
                               ₹{leader.donations.toLocaleString('en-IN')}
                           </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default Leaderboard;