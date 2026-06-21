import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import headerLogo from '../../../images/logo.jpeg';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post('/reset-password', {
            onSuccess: () => {
                toast.success('Password successfully reset! You can now log in.', {
                    position: 'top-center',
                    duration: 5000,
                });
            }
        });
    };

    return (
        <div className="min-h-screen bg-bg-base flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Reset Password" />

            <div className="max-w-md w-full space-y-8 bg-bg-card border border-bg-border p-8 rounded-2xl">
                <div className="flex flex-col items-center">
                    <img src={headerLogo} alt="Studio99 Logo" className="h-12 w-auto rounded-sm mb-4" />
                    <h2 className="text-center text-3xl font-black text-white">
                        Create New Password
                    </h2>
                    <p className="mt-2 text-center text-sm text-text-secondary">
                        Please enter your new password below.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={submit}>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-white block mb-2">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full bg-bg-base border border-bg-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors opacity-50 cursor-not-allowed"
                                required
                                readOnly
                            />
                            {errors.email && <span className="text-brand-red text-xs mt-1 block">{errors.email}</span>}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-white block mb-2">New Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full bg-bg-base border border-bg-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && <span className="text-brand-red text-xs mt-1 block">{errors.password}</span>}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-white block mb-2">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="w-full bg-bg-base border border-bg-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password_confirmation && <span className="text-brand-red text-xs mt-1 block">{errors.password_confirmation}</span>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-brand-red text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center justify-center disabled:opacity-50"
                    >
                        {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}
