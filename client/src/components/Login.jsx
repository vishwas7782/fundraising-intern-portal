// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Loader2 } from 'lucide-react'; // Added UserPlus icon

const Login = () => {
    const [isLoginView, setIsLoginView] = useState(true); // State to toggle views
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // In a real app, you'd have different logic for login vs signup
        // For this dummy task, both will just navigate to the dashboard
        setTimeout(() => {
            navigate('/dashboard');
        }, 1000);
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
            <div className="flex justify-center items-center mb-6 gap-3">
                {isLoginView ? <LogIn className="text-blue-600 h-8 w-8"/> : <UserPlus className="text-blue-600 h-8 w-8"/>}
                <h1 className="text-3xl font-bold text-gray-900">
                    {isLoginView ? 'Intern Login' : 'Create Account'}
                </h1>
            </div>
            <p className="text-gray-500 mb-8">
                {isLoginView ? 'Welcome back! Please log in to continue.' : 'Get started by creating your account.'}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                {/* --- Conditionally render Full Name for Signup --- */}
                {!isLoginView && (
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required 
                    />
                )}

                <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required 
                />
                <button 
                    type="submit"
                    className="p-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin h-5 w-5"/>
                            <span>Processing...</span>
                        </>
                    ) : (
                        <span>{isLoginView ? 'Log In' : 'Sign Up'}</span>
                    )}
                </button>
            </form>

            {/* --- Toggle Link at the bottom --- */}
            <div className="mt-6 text-sm">
                <button onClick={() => setIsLoginView(!isLoginView)} className="text-blue-600 hover:underline">
                    {isLoginView ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
                </button>
            </div>
        </div>
    );
};

export default Login;