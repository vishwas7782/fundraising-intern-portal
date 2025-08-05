
// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Users, Code, IndianRupee, Trophy, CheckCircle2, Lock, Loader2 } from 'lucide-react';

// This component remains the same
const InfoCard = ({ icon, title, value, colorClass }) => (
    <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ type: "spring", stiffness: 300 }} className="bg-white p-6 rounded-2xl border border-brand-gray-100 shadow-lg flex items-center gap-5">
        <div className={`p-4 rounded-xl ${colorClass}`}>{icon}</div>
        <div>
            <p className="text-brand-gray-500 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-brand-gray-900">{value}</p>
        </div>
    </motion.div>
);

// This is the NEW, improved rewards component
const RewardsTimeline = ({ donations }) => {
    const rewards = [
        { goal: 5000, name: 'Certificate of Appreciation' },
        { goal: 15000, name: 'Letter of Recommendation (LOR)' },
        { goal: 50000, name: 'LinkedIn Recommendation' },
    ];

    const currentProgress = rewards.find((r) => donations < r.goal);

    return (
        <div className="space-y-6">
            {rewards.map((reward, index) => {
                const isUnlocked = donations >= reward.goal;
                const isCurrent = !isUnlocked && (!rewards[index - 1] || donations >= rewards[index - 1].goal);

                return (
                    <div key={reward.name} className="flex items-start gap-4 justify-between">
                        <div className="flex items-start gap-4 flex-1">
                            <div className="flex flex-col items-center">
                                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${isUnlocked ? 'bg-green-500' : isCurrent ? 'bg-yellow-400' : 'bg-gray-200'}`}>
                                    {isUnlocked ? (
                                        <CheckCircle2 className="h-6 w-6 text-white" />
                                    ) : (
                                        <Lock className="h-6 w-6 text-white" />
                                    )}
                                </div>
                            </div>
                            <div className="flex-1 pt-1">
                                <p className={`font-bold ${isUnlocked ? 'text-gray-900' : isCurrent ? 'text-yellow-700' : 'text-gray-500'}`}>
                                    {reward.name}
                                </p>
                                {isUnlocked ? (
                                    <p className="text-sm text-green-600">Unlocked!</p>
                                ) : isCurrent ? (
                                    <>
                                        <p className="text-sm text-yellow-600 mb-2">
                                            Almost there! Raise ₹{(reward.goal - donations).toLocaleString('en-IN')} more
                                        </p>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                style={{
                                                    width: `${(donations / reward.goal) * 100}%`,
                                                    height: '0.5rem',
                                                    borderRadius: '9999px',
                                                    backgroundColor: `hsl(120, 60%, ${70 - Math.min((donations / reward.goal) * 50, 50)}%)`,
                                                    transition: 'all 0.3s ease',
                                                }}
                                            ></div>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-sm text-gray-500">Raise ₹{reward.goal.toLocaleString('en-IN')}</p>
                                )}
                            </div>
                        </div>

                        {/* Right-aligned progress for all rewards */}
                        <div className="text-right text-sm text-gray-700 pt-2 min-w-0 max-w-[150px] break-words sm:whitespace-nowrap sm:max-w-none">
    {isCurrent ? (
        <>Raised ₹{donations.toLocaleString('en-IN')} of ₹{reward.goal.toLocaleString('en-IN')}</>
    ) : (
        <>Raised ₹{Math.min(donations, reward.goal).toLocaleString('en-IN')}</>
    )}
</div>

                    </div>
                );
            })}
        </div>
    );
};
const Dashboard = () => {
    const [internData, setInternData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Using the environment variable for the API URL
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/dashboard`);
                setInternData(res.data);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };
        setTimeout(() => fetchData(), 500);
    }, []);

    if (loading) { return <Loader2 className="h-12 w-12 animate-spin text-brand-primary mx-auto" />; }
    if (!internData) { return <div className="text-center p-10 text-red-500"><h1>Error: Could not load intern data.</h1></div>; }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-brand-gray-900">Welcome back, {internData.name.split(' ')[0]}!</h1>
                <p className="text-brand-gray-500 mt-1">Here's your fundraising snapshot.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <InfoCard icon={<IndianRupee className="text-green-800 h-8 w-8" />} title="Total Raised" value={`₹${internData.donations.toLocaleString('en-IN')}`} colorClass="bg-green-100" />
                <InfoCard icon={<Code className="text-blue-800 h-8 w-8" />} title="Referral Code" value={internData.referralCode} colorClass="bg-blue-100" />
                <InfoCard icon={<Trophy className="text-yellow-800 h-8 w-8" />} title="Rank" value="#4" colorClass="bg-yellow-100" />
            </div>

            {/* The layout is now a single column to give the rewards section more space */}
            <div className="grid grid-cols-1 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-brand-gray-100 shadow-lg">
                    <h2 className="text-xl font-bold text-brand-gray-900 mb-6 flex items-center gap-3"><Award className="text-brand-primary" /> Your Rewards</h2>
                    {/* The new component is used here */}
                    <RewardsTimeline donations={internData.donations} />
                    {/* <RewardsTimeline donations={17500} />  */}
                </div>

                <div className="bg-white p-6 rounded-2xl border border-brand-gray-100 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-brand-gray-900 flex items-center gap-3"><Users className="text-brand-primary" /> Leaderboard</h2>
                        <p className="text-brand-gray-500 mt-1">See how you stack up against other interns.</p>
                    </div>
                    <Link
                        to="/leaderboard"
                        className="w-full sm:w-auto flex items-center justify-center h-12 px-8 rounded-xl bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                    >
                        View Full Leaderboard
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
