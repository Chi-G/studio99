import { Head, Link } from '@inertiajs/react';

export default function TeamDashboard({ user }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Head title="Team Dashboard" />

            <nav className="bg-gray-800 border-b border-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold">Studio99 Team</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <span>Team Member: {user.name}</span>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="text-sm font-medium text-gray-300 hover:text-white"
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
                            Welcome to the Team Dashboard. Here you can view your assigned projects and upload deliverables.
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
