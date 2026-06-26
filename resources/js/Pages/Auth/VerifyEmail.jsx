import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import headerLogo from '../../../images/logo.jpeg';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post('/email/verification-notification');
    };

    return (
        <div className="min-h-screen bg-bg-base flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Email Verification" />

            <div className="max-w-md w-full space-y-8 bg-bg-card border border-bg-border p-8 rounded-2xl text-center">
                <div className="flex flex-col items-center">
                    <img src={headerLogo} alt="Studio99 Logo" className="h-12 w-auto rounded-sm mb-4" />
                    <h2 className="text-3xl font-black text-text-primary">
                        Verify Your Email
                    </h2>
                </div>

                <div className="mt-4 text-text-secondary text-sm space-y-4">
                    <p>We've sent a verification link to your email address.</p>
                    <p>Please check your inbox and click the link to activate your account.</p>
                </div>

                {status === 'verification-link-sent' && (
                    <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-sm font-medium mt-6">
                        A new verification link has been sent to the email address you provided during registration.
                    </div>
                )}

                <form onSubmit={submit} className="mt-8 flex flex-col items-center justify-between gap-4">
                    <p className="text-sm font-medium text-text-primary">Didn't receive the email?</p>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-brand-red text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center justify-center disabled:opacity-50"
                    >
                        {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Resend Verification Email"}
                    </button>

                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="text-sm text-text-secondary hover:text-text-primary underline underline-offset-4 transition-colors mt-2"
                    >
                        Log Out
                    </Link>
                </form>
            </div>
        </div>
    );
}
