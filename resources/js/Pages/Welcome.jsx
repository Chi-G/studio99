import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome to Studio99" />
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-gray-900">
                <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                    <div className="md:w-1/2 bg-blue-600 p-12 text-white flex flex-col justify-center">
                        <h1 className="text-4xl font-bold mb-4">Studio99 Digital</h1>
                        <p className="text-lg text-blue-100 mb-8">
                            Your comprehensive Agency Operating System and Client Portal.
                            Manage projects, files, subscriptions, and more in one place.
                        </p>
                        <div className="mt-auto">
                            <p className="text-sm text-blue-200">© 2026 Studio99 Digital</p>
                        </div>
                    </div>
                    <div className="md:w-1/2 p-12 flex flex-col justify-center items-center">
                        <h2 className="text-3xl font-semibold mb-6">Client Portal</h2>
                        <div className="w-full flex flex-col gap-4">
                            <a
                                href="/login"
                                className="w-full text-center bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition"
                            >
                                Log In
                            </a>
                            <a
                                href="/register"
                                className="w-full text-center bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-200 hover:bg-gray-200 transition"
                            >
                                Create an Account
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
