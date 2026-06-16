import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Show({ auth, projectRequest, staff }) {
    const { data, setData, post, processing, errors } = useForm({
        assigned_to: '',
        deadline: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(`/admin/requests/${projectRequest.id}/convert`);
    };

    const isPaid = projectRequest.status === 'paid';
    const isAssigned = projectRequest.status === 'assigned';

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Head title={`Request: ${projectRequest.service?.name}`} />

            <nav className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/admin/requests" className="text-gray-500 hover:text-gray-700 mr-4">
                                &larr; Back to Requests
                            </Link>
                            <h1 className="text-xl font-bold text-gray-800">Review Request</h1>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-1 py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* LEFT COLUMN: Request Details */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Request Details</h2>
                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Client</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{projectRequest.client?.name} ({projectRequest.client?.email})</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Service & Package</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{projectRequest.service?.name} - {projectRequest.package?.name}</dd>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <dt className="text-sm font-medium text-gray-500">Project Brief / Description</dt>
                                        <dd className="mt-1 text-sm text-gray-900 bg-gray-50 p-4 rounded border border-gray-200 whitespace-pre-wrap">
                                            {projectRequest.description}
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Invoice & Payment</h2>
                                {projectRequest.invoice ? (
                                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded border border-gray-200">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Invoice #{projectRequest.invoice.id}</p>
                                            <p className="text-sm text-gray-500">Amount: ${(projectRequest.invoice.amount / 100).toFixed(2)}</p>
                                        </div>
                                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase ${
                                            projectRequest.invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {projectRequest.invoice.status}
                                        </span>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">No invoice generated yet.</p>
                                )}
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Assignment Action */}
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Convert to Project</h2>
                                
                                {!isPaid && !isAssigned ? (
                                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                                        <p className="text-sm text-yellow-700">
                                            This request has not been paid yet. Wait for the client to complete payment before assigning a team member.
                                        </p>
                                    </div>
                                ) : isAssigned ? (
                                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                                        <p className="text-sm text-blue-700">
                                            This request has already been assigned and converted into an active project.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={submit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Assign to Team Member</label>
                                            <select
                                                value={data.assigned_to}
                                                onChange={e => setData('assigned_to', e.target.value)}
                                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                required
                                            >
                                                <option value="" disabled>Select a team member...</option>
                                                {staff.map(member => (
                                                    <option key={member.id} value={member.id}>{member.name}</option>
                                                ))}
                                            </select>
                                            {errors.assigned_to && <p className="mt-1 text-sm text-red-600">{errors.assigned_to}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Internal Deadline</label>
                                            <input
                                                type="date"
                                                value={data.deadline}
                                                onChange={e => setData('deadline', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                required
                                            />
                                            {errors.deadline && <p className="mt-1 text-sm text-red-600">{errors.deadline}</p>}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                        >
                                            Convert & Assign
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
