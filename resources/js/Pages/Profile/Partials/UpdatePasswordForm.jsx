import { useRef } from 'react';
import { useForm } from '@inertiajs/react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('profile.password'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-white">Update Password</h2>
                <p className="mt-1 text-sm text-[#94A3B8]">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <label htmlFor="current_password" className="block text-sm font-medium text-[#94A3B8]">Current Password</label>
                    <input
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full rounded-md border-[#2A2A3A] bg-[#1A1A28] text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 sm:text-base"
                        autoComplete="current-password"
                    />
                    {errors.current_password && <p className="mt-2 text-sm text-red-500">{errors.current_password}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-[#94A3B8]">New Password</label>
                    <input
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full rounded-md border-[#2A2A3A] bg-[#1A1A28] text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 sm:text-base"
                        autoComplete="new-password"
                    />
                    {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password}</p>}
                </div>

                <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-[#94A3B8]">Confirm Password</label>
                    <input
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        className="mt-1 block w-full rounded-md border-[#2A2A3A] bg-[#1A1A28] text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 sm:text-base"
                        autoComplete="new-password"
                    />
                    {errors.password_confirmation && <p className="mt-2 text-sm text-red-500">{errors.password_confirmation}</p>}
                </div>

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Save
                    </button>

                    {recentlySuccessful && (
                        <p className="text-sm text-[#94A3B8] transition ease-in-out duration-1000">Saved.</p>
                    )}
                </div>
            </form>
        </section>
    );
}
