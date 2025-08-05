// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Users, Code, IndianRupee, Trophy, CheckCircle2, Loader2 } from 'lucide-react';

const InfoCard = ({ icon, title, value, colorClass }) => (
    <motion.div 
        className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <div className={`p-3 rounded-full ${colorClass}`}>
            {icon}
        </div>
        <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </motion.div>
);

const RewardProgress = ({ donations }) => {
    const rewards = [
        { goal: 5000, name: 'Certificate' },
        { goal: 15000, name: 'LOR' },
        { goal: 50000, name: 'LinkedIn Recommendation' },
    ];

    const nextReward = rewards.find(r => donations < r.goal);
    
    if (!nextReward) {
        return (
            <div className="text-center bg-green-500 text-white p-4 rounded-lg">
                <CheckCircle2 className="mx-auto h-8 w-8 mb-2" />
                <p className="font-bold">Congratulations!</p>
                <p className="text-sm">You've unlocked all rewards!</p>
            </div>
        );
    }

    const prevGoal = rewards.slice().reverse().find(r => donations >= r.goal)?.goal || 0;
    const progress = Math.min(((donations - prevGoal) / (nextReward.goal - prevGoal)) * 100, 100);

    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium text-gray-700">Next Reward: {nextReward.name}</p>
                <p className="text-sm font-bold text-blue-600">₹{nextReward.goal.toLocaleString('en-IN')}</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const [internData, setInternData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/dashboard');
                setInternData(res.data);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };
        setTimeout(() => fetchData(), 500);
    }, []);

    if (loading) {
        return <div className="text-center p-10"><Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" /></div>;
    }

    if (!internData) {
        return <div className="text-center p-10 text-red-500"><h1>Error: Could not load intern data.</h1></div>;
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl mx-auto"
        >
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900">Welcome back, {internData.name.split(' ')[0]}!</h1>
                <p className="text-gray-500">Here's your fundraising snapshot.</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <InfoCard 
                    icon={<IndianRupee className="text-green-800 h-6 w-6"/>} 
                    title="Total Raised" 
                    value={`₹${internData.donations.toLocaleString('en-IN')}`}
                    colorClass="bg-green-100"
                />
                <InfoCard 
                    icon={<Code className="text-blue-800 h-6 w-6"/>} 
                    title="Referral Code" 
                    value={internData.referralCode}
                    colorClass="bg-blue-100"
                />
                <InfoCard 
                    icon={<Trophy className="text-yellow-800 h-6 w-6"/>} 
                    title="Rank" 
                    value="#5"
                    colorClass="bg-yellow-100"
                />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Award/> Your Rewards</h2>
                    <RewardProgress donations={internData.donations} />
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-center items-center text-center">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2"><Users/> Leaderboard</h2>
                    <p className="text-gray-500 mb-4">See how you stack up against other interns.</p>
                    <Link to="/leaderboard" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-all">
                        View Leaderboard
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default Dashboard;