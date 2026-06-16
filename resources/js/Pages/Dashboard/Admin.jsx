import { Head, Link } from '@inertiajs/react';

export default function AdminDashboard({ auth }) {
    const user = auth.user;
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Head title="Admin Dashboard" />

            <nav className="bg-blue-800 border-b border-blue-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold">Studio99 Admin</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <span>Admin: {user.name}</span>
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                    {/* STATS ROW */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                                <dd className="mt-1 text-3xl font-semibold text-gray-900">{formatCurrency(total_revenue)}</dd>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <dt className="text-sm font-medium text-gray-500 truncate">Total Active Projects</dt>
                                <dd className="mt-1 text-3xl font-semibold text-gray-900">{active_projects}</dd>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <dt className="text-sm font-medium text-gray-500 truncate">Total Projects (All-Time)</dt>
                                <dd className="mt-1 text-3xl font-semibold text-gray-900">{total_projects}</dd>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                                <dd className="mt-1 text-3xl font-semibold text-gray-900">{total_users}</dd>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* RECENT REQUESTS */}
                        <div className="bg-white shadow-sm sm:rounded-lg border border-gray-100">
                            <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Project Requests</h3>
                                <Link href="/admin/requests" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    View all
                                </Link>
                            </div>
                            <div className="p-4">
                                {recent_requests && recent_requests.length > 0 ? (
                                    <ul className="divide-y divide-gray-200">
                                        {recent_requests.map((req) => (
                                            <li key={req.id} className="py-3 flex justify-between items-center">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{req.service?.name}</p>
                                                    <p className="text-xs text-gray-500">From: {req.client?.name}</p>
                                                </div>
                                                <div className="flex flex-col items-end gap-1">
                                                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                                                        req.status === 'paid' ? 'bg-green-100 text-green-800' :
                                                        req.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {req.status.toUpperCase()}
                                                    </span>
                                                    {req.status === 'paid' && (
                                                        <Link href={`/admin/requests/${req.id}`} className="text-xs text-indigo-600 font-bold hover:underline">
                                                            Review & Assign &rarr;
                                                        </Link>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500">No recent requests.</p>
                                )}
                            </div>
                        </div>

                        {/* RECENT PROJECTS */}
                        <div className="bg-white shadow-sm sm:rounded-lg border border-gray-100">
                            <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Projects</h3>
                                <Link href="/admin/projects" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    View all
                                </Link>
                            </div>
                            <div className="p-4">
                                {recent_projects && recent_projects.length > 0 ? (
                                    <ul className="divide-y divide-gray-200">
                                        {recent_projects.map((project) => (
                                            <li key={project.id} className="py-3 flex justify-between items-center">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{project.name}</p>
                                                    <p className="text-xs text-gray-500">Client: {project.client?.name}</p>
                                                </div>
                                                <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">
                                                    {project.status.toUpperCase()}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500">No recent projects.</p>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
