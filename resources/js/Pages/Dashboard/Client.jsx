import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ user }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Head title="Dashboard" />

            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-800">Studio99</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600">Welcome, {user.name} ({user.role})</span>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="text-sm font-medium text-red-600 hover:text-red-900"
                            >
                                Log out
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-1 py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You are logged into the Client Dashboard. Here you can view your Projects, submit Files, and manage Payments.
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
