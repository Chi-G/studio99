import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-50">
            <Head title="Register" />

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>

                <form onSubmit={submit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            autoComplete="name"
                            required
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <span className="text-red-600 text-sm">{errors.name}</span>}
                    </div>

                    <div className="mt-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            autoComplete="username"
                            required
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && <span className="text-red-600 text-sm">{errors.email}</span>}
                    </div>

                    <div className="mt-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone (Optional)
                        </label>
                        <input
                            id="phone"
                            type="text"
                            name="phone"
                            value={data.phone}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            autoComplete="tel"
                            onChange={(e) => setData('phone', e.target.value)}
                        />
                        {errors.phone && <span className="text-red-600 text-sm">{errors.phone}</span>}
                    </div>

                    <div className="mt-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            autoComplete="new-password"
                            required
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password && <span className="text-red-600 text-sm">{errors.password}</span>}
                    </div>

                    <div className="mt-4">
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            autoComplete="new-password"
                            required
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />
                        {errors.password_confirmation && <span className="text-red-600 text-sm">{errors.password_confirmation}</span>}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <Link
                            href="/login"
                            className="font-medium text-indigo-600 hover:text-indigo-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Already registered?
                        </Link>

                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-25"
                            disabled={processing}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
