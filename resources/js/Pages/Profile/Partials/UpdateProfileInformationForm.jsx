import { useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({ className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-white">Profile Information</h2>
                <p className="mt-1 text-sm text-[#94A3B8]">
                    Update your account's profile information.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#94A3B8]">Name</label>
                    <input
                        id="name"
                        type="text"
                        className="mt-1 block w-full rounded-md border-[#2A2A3A] bg-[#1A1A28] text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 sm:text-base"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                    />
                    {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#94A3B8]">Email (Cannot be changed)</label>
                    <input
                        id="email"
                        type="email"
                        className="mt-1 block w-full rounded-md border-[#2A2A3A] bg-[#0A0A0F] text-[#94A3B8] shadow-sm cursor-not-allowed py-3 px-4 sm:text-base"
                        value={data.email}
                        disabled
                        readOnly
                    />
                    {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
                </div>
                
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#94A3B8]">Phone (Optional)</label>
                    <input
                        id="phone"
                        type="text"
                        className="mt-1 block w-full rounded-md border-[#2A2A3A] bg-[#1A1A28] text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 sm:text-base"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        autoComplete="tel"
                    />
                    {errors.phone && <p className="mt-2 text-sm text-red-500">{errors.phone}</p>}
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
