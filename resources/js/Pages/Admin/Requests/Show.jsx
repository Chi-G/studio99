import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

export default function Show({ auth, projectRequest, staff }) {
    const convertForm = useForm({
        assigned_to: '',
        deadline: '',
    });

    const quoteForm = useForm({
        amount: '',
    });

    const handleConvert = (e) => {
        e.preventDefault();
        convertForm.post(`/admin/requests/${projectRequest.id}/convert`, {
            onSuccess: () => {
                toast.success('Project created and assigned successfully.');
            }
        });
    };

    const handleQuote = (e) => {
        e.preventDefault();
        quoteForm.post(`/admin/requests/${projectRequest.id}/quotation`, {
            onSuccess: () => {
                toast.success('Quotation sent to client successfully.');
                quoteForm.reset();
            }
        });
    };

    const formatNaira = (amount) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const isReviewed = projectRequest.status === 'reviewed';
    const isAssigned = projectRequest.status === 'assigned';
    const isPaid = projectRequest.invoice?.status === 'paid';

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Head title={`Review Request: ${projectRequest.title}`} />

            <nav className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/admin/requests" className="text-gray-500 hover:text-gray-700 mr-4 font-medium text-sm">
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
                        
                        {/* LEFT COLUMN: Request & Client Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Client & Company Info */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Inquiry & Client Profile</h2>
                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                                    <div>
                                        <dt className="text-xs font-bold text-gray-500 uppercase">Client Name</dt>
                                        <dd className="mt-1 text-sm text-gray-900 font-semibold">{projectRequest.client?.name}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-bold text-gray-500 uppercase">Email Address</dt>
                                        <dd className="mt-1 text-sm text-gray-900 font-semibold">{projectRequest.client?.email}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-bold text-gray-500 uppercase">Company/Business Name</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{projectRequest.company_name || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-bold text-gray-500 uppercase">Website URL</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {projectRequest.website ? (
                                                <a href={projectRequest.website} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
                                                    {projectRequest.website}
                                                </a>
                                            ) : 'N/A'}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-bold text-gray-500 uppercase">Preferred Contact Method</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{projectRequest.preferred_contact || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-bold text-gray-500 uppercase">How they heard about us</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{projectRequest.hear_about_us || 'N/A'}</dd>
                                    </div>
                                </dl>
                            </div>

                            {/* Project Specifications */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Project Brief</h2>
                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                                    <div className="sm:col-span-2">
                                        <dt className="text-xs font-bold text-gray-500 uppercase">Project Title</dt>
                                        <dd className="mt-1 text-sm text-gray-900 font-semibold">{projectRequest.title}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-bold text-gray-500 uppercase">Requested Service</dt>
                                        <dd className="mt-1 text-sm text-gray-900 font-medium">{projectRequest.service?.name}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-bold text-gray-500 uppercase">Estimated Budget Range</dt>
                                        <dd className="mt-1 text-sm text-gray-900 font-medium">{projectRequest.budget_range || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-bold text-gray-500 uppercase">Timeline Start Preference</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{projectRequest.timeline || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-bold text-gray-500 uppercase">Desired Completion Date</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{projectRequest.deadline || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-bold text-gray-500 uppercase">Business Goals</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{projectRequest.business_goals || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-bold text-gray-500 uppercase">Existing Branding?</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{projectRequest.existing_branding ? 'Yes' : 'No'}</dd>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <dt className="text-xs font-bold text-gray-500 uppercase">Description / Requirements</dt>
                                        <dd className="mt-1 text-sm text-gray-900 bg-gray-50 p-4 rounded border border-gray-200 whitespace-pre-wrap leading-relaxed">
                                            {projectRequest.description}
                                        </dd>
                                    </div>
                                    {projectRequest.reference_links && (
                                        <div className="sm:col-span-2">
                                            <dt className="text-xs font-bold text-gray-500 uppercase">Inspiration Links</dt>
                                            <dd className="mt-1 text-sm">
                                                <a href={projectRequest.reference_links} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline font-medium">
                                                    {projectRequest.reference_links}
                                                </a>
                                            </dd>
                                        </div>
                                    )}
                                    {projectRequest.additional_info && (
                                        <div className="sm:col-span-2">
                                            <dt className="text-xs font-bold text-gray-500 uppercase">Additional Info / Notes</dt>
                                            <dd className="mt-1 text-sm text-gray-900 bg-gray-50 p-4 rounded border border-gray-200 whitespace-pre-wrap leading-relaxed">
                                                {projectRequest.additional_info}
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </div>

                            {/* Reference Attachments */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Reference Attachments</h2>
                                {projectRequest.reference_files && projectRequest.reference_files.length > 0 ? (
                                    <ul className="divide-y divide-gray-100 border border-gray-200 rounded-lg overflow-hidden">
                                        {projectRequest.reference_files.map((file, idx) => (
                                            <li key={idx} className="flex justify-between items-center p-3 text-sm">
                                                <span className="text-gray-700 font-medium truncate max-w-md">{file}</span>
                                                <a href={`/storage/${file}`} target="_blank" rel="noreferrer" className="text-indigo-600 font-bold hover:underline">
                                                    Download
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500">No attachments provided.</p>
                                )}
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Actions (Quotation & Assignment) */}
                        <div className="space-y-6">
                            
                            {/* Quotation Panel */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Quotation & Invoice</h2>
                                
                                {projectRequest.status === 'pending' ? (
                                    <form onSubmit={handleQuote} className="space-y-4">
                                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-xs text-blue-700 leading-relaxed mb-2">
                                            This request is pending. Review the requirements and send a customized quotation to generate the client's invoice.
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Quote Price (₦)</label>
                                            <input 
                                                type="number"
                                                required
                                                min="0"
                                                placeholder="e.g. 50000"
                                                value={quoteForm.data.amount}
                                                onChange={e => quoteForm.setData('amount', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                            {quoteForm.errors.amount && <p className="mt-1 text-sm text-red-600">{quoteForm.errors.amount}</p>}
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={quoteForm.processing}
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50"
                                        >
                                            {quoteForm.processing ? 'Sending...' : 'Send Quotation'}
                                        </button>
                                    </form>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded border border-gray-200">
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">Quotation Price</p>
                                                <p className="text-base font-black text-indigo-600">{formatNaira(projectRequest.budget || 0)}</p>
                                            </div>
                                            <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase ${
                                                projectRequest.status === 'assigned' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {projectRequest.status}
                                            </span>
                                        </div>

                                        {projectRequest.invoice ? (
                                            <div className="bg-gray-50 p-4 rounded border border-gray-200 space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-gray-500">Invoice Status:</span>
                                                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                                                        isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {projectRequest.invoice.status}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-xs text-gray-700">
                                                    <span>Invoice ID:</span>
                                                    <span className="font-bold">#{projectRequest.invoice.id}</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-500">No invoice generated.</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Project Conversion Panel */}
                            {projectRequest.status !== 'pending' && (
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h2 className="text-lg font-bold text-gray-900 mb-4">Convert to Project</h2>
                                    
                                    {!isPaid && !isAssigned ? (
                                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                                            <p className="text-xs text-yellow-700 leading-relaxed">
                                                This quotation has not been paid yet. Wait for the client to pay the deposit before converting it to an active project.
                                            </p>
                                        </div>
                                    ) : isAssigned ? (
                                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                                            <p className="text-xs text-blue-700 leading-relaxed">
                                                This request is active and has been assigned to a team member.
                                            </p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleConvert} className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Assign to Team Member</label>
                                                <select
                                                    value={convertForm.data.assigned_to}
                                                    onChange={e => convertForm.setData('assigned_to', e.target.value)}
                                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                    required
                                                >
                                                    <option value="" disabled>Select a team member...</option>
                                                    {staff.map(member => (
                                                        <option key={member.id} value={member.id}>{member.name}</option>
                                                    ))}
                                                </select>
                                                {convertForm.errors.assigned_to && <p className="mt-1 text-sm text-red-600">{convertForm.errors.assigned_to}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Internal Deadline</label>
                                                <input
                                                    type="date"
                                                    value={convertForm.data.deadline}
                                                    onChange={e => convertForm.setData('deadline', e.target.value)}
                                                    className="mt-1 block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                    required
                                                />
                                                {convertForm.errors.deadline && <p className="mt-1 text-sm text-red-600">{convertForm.errors.deadline}</p>}
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={convertForm.processing}
                                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50"
                                            >
                                                {convertForm.processing ? 'Converting...' : 'Convert & Assign'}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
