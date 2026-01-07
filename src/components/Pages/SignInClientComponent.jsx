'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SignInClientComponent() {
    const [isSignIn, setIsSignIn] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (isSignIn) {
            // Sign In
            try {
                const res = await fetch('/api/auth/sign-in', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                    }),
                });
                const data = await res.json();
                if (res.ok) {
                    toast.success('Signed in successfully');
                    // Redirect based on role
                    if (data.user.role === 'admin') {
                        router.push('/dashboards/admin');
                    } else {
                        router.push(`/dashboards/investors/${data.user.id}`);
                    }
                } else {
                    toast.error(data.error);
                }
            } catch (error) {
                toast.error('Something went wrong');
            }
        } else {
            // Sign Up
            if (formData.password !== formData.confirmPassword) {
                toast.error('Passwords do not match');
                setLoading(false);
                return;
            }
            try {
                const res = await fetch('/api/auth/sign-up', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                    }),
                });
                const data = await res.json();
                if (res.ok) {
                    toast.success('Account created successfully');
                    setIsSignIn(true);
                } else {
                    toast.error(data.error);
                }
            } catch (error) {
                toast.error('Something went wrong');
            }
        }
        setLoading(false);
    };

    const handleGoogleSignIn = () => {
        signIn('google', { callbackUrl: '/dashboards/investors' });
    };

    return (
        <div className="flex h-screen ">
            {/* Left Side - Image */}
            <div className="hidden md:flex md:w-1/2 items-center justify-center">
                <div className="text-center text-white h-[450px] w-2/3">
                    <Image
                        src="/hero-aircraft.jpg"
                        alt="Auth"
                        width={400}
                        height={400}
                        className="rounded-lg shadow-lg w-full h-3/5 object-cover"
                    />
                    <h2 className="text-3xl font-bold mt-6">Welcome</h2>
                    <p className="text-blue-100 mt-2">Your journey starts here</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-bold text-gray-300 mb-2">
                        {isSignIn ? 'Sign In' : 'Create Account'}
                    </h1>
                    <p className="text-gray-400 mb-8">
                        {isSignIn
                            ? "Don't have an account? "
                            : 'Already have an account? '}
                        <button
                            onClick={() => setIsSignIn(!isSignIn)}
                            className="text-blue-600 font-semibold hover:underline cursor-pointer"
                        >
                            {isSignIn ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isSignIn && (
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required={!isSignIn}
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {!isSignIn && (
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required={!isSignIn}
                                />
                            </div>
                        )}

                        {isSignIn && (
                            <div className="flex justify-end">
                                <button
                                    onClick={() => router.push('/forgot-password')}
                                    className="text-blue-600 text-sm hover:underline"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? 'Loading...' : (isSignIn ? 'Sign In' : 'Sign Up')}
                        </button>
                    </form>

                    {/* Google Sign-In can be implemented with OAuth providers */}

                    <div className="mt-6 text-center text-gray-600 text-sm">
                        By continuing, you agree to our Terms of Service and Privacy Policy
                    </div>
                </div>
            </div>
        </div>
    );
}