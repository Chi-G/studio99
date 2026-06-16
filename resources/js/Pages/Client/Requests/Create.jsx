import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ auth, services }) {
    const { data, setData, post, processing, errors } = useForm({
        service_id: '',
        package_id: '',
        title: '',
        description: '',
        reference_files: [],
    });

    const [availablePackages, setAvailablePackages] = useState([]);

    useEffect(() => {
        if (data.service_id) {
            const selectedService = services.find(s => s.id === parseInt(data.service_id));
            if (selectedService) {
                setAvailablePackages(selectedService.packages);
                setData('package_id', '');
            }
        } else {
            setAvailablePackages([]);
        }
    }, [data.service_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('client.requests.store'));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Start New Project" />

            <div className="max-w-3xl mx-auto">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Start a New Project</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Service Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">What type of service do you need?</label>
                            <select
                                value={data.service_id}
                                onChange={e => setData('service_id', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="">Select a service...</option>
                                {services.map(service => (
                                    <option key={service.id} value={service.id}>
                                        {service.name}
                                    </option>
                                ))}
                            </select>
                            {errors.service_id && <p className="mt-1 text-sm text-red-600">{errors.service_id}</p>}
                        </div>

                        {/* Package Selection */}
                        {availablePackages.length > 0 && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Select a Package</label>
                                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {availablePackages.map(pkg => (
                                        <div
                                            key={pkg.id}
                                            onClick={() => setData('package_id', pkg.id)}
                                            className={`relative flex cursor-pointer rounded-lg px-5 py-4 shadow-sm focus:outline-none border ${data.package_id === pkg.id ? 'border-indigo-500 ring-2 ring-indigo-500 bg-indigo-50' : 'border-gray-300 bg-white hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="flex w-full items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="text-sm">
                                                        <p className={`font-medium ${data.package_id === pkg.id ? 'text-indigo-900' : 'text-gray-900'}`}>
                                                            {pkg.name}
                                                        </p>
                                                        <div className={`inline-flex mt-1 text-xs ${data.package_id === pkg.id ? 'text-indigo-700' : 'text-gray-500'}`}>
                                                            ${pkg.price} {pkg.billing_type === 'monthly' ? '/ month' : 'one-time'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {errors.package_id && <p className="mt-1 text-sm text-red-600">{errors.package_id}</p>}
                            </div>
                        )}

                        {/* Project Details */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Project Title</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="E.g., Redesign our corporate website"
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Project Description</label>
                            <textarea
                                rows={4}
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Describe what you need in detail..."
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                        </div>

                        {/* Reference Files */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Reference Files (Optional)</label>
                            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                <div className="space-y-1 text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="flex text-sm text-gray-600 justify-center">
                                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                                            <span>Upload a file</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                multiple
                                                className="sr-only"
                                                onChange={e => setData('reference_files', e.target.files)}
                                            />
                                        </label>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                                    {data.reference_files.length > 0 && (
                                        <p className="text-xs text-green-600 font-medium mt-2">{data.reference_files.length} file(s) selected</p>
                                    )}
                                </div>
                            </div>
                            {errors.reference_files && <p className="mt-1 text-sm text-red-600">{errors.reference_files}</p>}
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                            >
                                {processing ? 'Submitting...' : 'Submit Request'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
