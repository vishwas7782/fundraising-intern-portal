// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Loader2 } from 'lucide-react';

const Login = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            navigate('/dashboard');
        }, 1000);
    };

    return (
        <div className="bg-white border border-black rounded-2xl shadow-lg p-8 w-full max-w-md text-center transition-all duration-300">
            <div className="flex justify-center items-center mb-6 gap-3">
                {isLoginView ? (
                    <LogIn className="text-blue-600 h-8 w-8" />
                ) : (
                    <UserPlus className="text-blue-600 h-8 w-8" />
                )}
                <h1 className="text-3xl font-bold text-gray-900">
                    {isLoginView ? 'Intern Login' : 'Create Account'}
                </h1>
            </div>

            <p className="text-gray-500 mb-8">
                {isLoginView
                    ? 'Welcome back! Please log in to continue.'
                    : 'Get started by creating your account.'}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {!isLoginView && (
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        required
                    />
                )}
                <input
                    type="email"
                    placeholder="Email Address"
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                />
                <button
                    type="submit"
                    className="p-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin h-5 w-5" />
                            <span>Processing...</span>
                        </>
                    ) : (
                        <span>{isLoginView ? 'Log In' : 'Sign Up'}</span>
                    )}
                </button>
            </form>

            <div className="mt-6 text-sm">
                <button
                    onClick={() => setIsLoginView(!isLoginView)}
                    className="text-blue-600 hover:underline transition-all"
                >
                    {isLoginView
                        ? "Don't have an account? Sign Up"
                        : 'Already have an account? Log In'}
                </button>
            </div>
        </div>
    );
};

export default Login;
