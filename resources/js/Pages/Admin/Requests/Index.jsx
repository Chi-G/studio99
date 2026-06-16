import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, requests }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Head title="All Project Requests" />

            <nav className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/dashboard" className="text-gray-500 hover:text-gray-700 mr-4">
                                &larr; Back to Dashboard
                            </Link>
                            <h1 className="text-xl font-bold text-gray-800">All Project Requests</h1>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-1 py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg border border-gray-100">
                        <div className="p-0">
                            {requests && requests.length > 0 ? (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service & Package</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {requests.map((req) => (
                                            <tr key={req.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{req.client?.name}</div>
                                                    <div className="text-sm text-gray-500">{req.client?.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{req.service?.name}</div>
                                                    <div className="text-sm text-gray-500">{req.package?.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                                                        req.status === 'paid' ? 'bg-green-100 text-green-800' :
                                                        req.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {req.status.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(req.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link href={`/admin/requests/${req.id}`} className="text-indigo-600 hover:text-indigo-900 font-bold">
                                                        View & Assign
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-sm text-gray-500 p-6">No requests found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
