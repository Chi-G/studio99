import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Show({ auth, project }) {
    const user = auth.user;

    // Status Update Form
    const { data: statusData, setData: setStatusData, patch, processing: statusProcessing } = useForm({
        status: project.status,
    });

    const handleStatusChange = (e) => {
        setStatusData('status', e.target.value);
        patch(`/team/projects/${project.id}/status`);
    };

    // Project Update Timeline Form
    const { data: updateData, setData: setUpdateData, post: postUpdate, processing: updateProcessing, reset: resetUpdate, errors: updateErrors } = useForm({
        content: '',
    });

    const submitUpdate = (e) => {
        e.preventDefault();
        postUpdate(`/team/projects/${project.id}/updates`, {
            onSuccess: () => resetUpdate(),
        });
    };

    // File Upload Form
    const { data: fileData, setData: setFileData, post: postFile, processing: fileProcessing, reset: resetFile, errors: fileErrors } = useForm({
        deliverable: null,
    });

    const submitFile = (e) => {
        e.preventDefault();
        postFile(`/team/projects/${project.id}/files`, {
            onSuccess: () => resetFile(),
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <Head title={`Workspace: ${project.name}`} />

            <nav className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/dashboard" className="text-gray-500 hover:text-gray-700 mr-4">
                                &larr; Back to Dashboard
                            </Link>
                            <h1 className="text-xl font-bold text-gray-800">Workspace: {project.name}</h1>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* LEFT COLUMN: Project Details & Files */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Details Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Project Details</h2>
                                    <p className="text-sm text-gray-500 mt-1">Client: {project.client?.name}</p>
                                </div>
                                <div className="text-right">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                                    <select
                                        value={statusData.status}
                                        onChange={handleStatusChange}
                                        disabled={statusProcessing}
                                        className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="review">Needs Review</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="prose max-w-none text-gray-700 text-sm">
                                <h3 className="text-sm font-semibold text-gray-900">Original Request Description</h3>
                                <p className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md border border-gray-200 mt-2">
                                    {project.request?.description || "No description provided."}
                                </p>
                            </div>
                        </div>

                        {/* Files Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Project Files</h2>
                            
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Upload Deliverable</h3>
                                <form onSubmit={submitFile} className="flex gap-4 items-end">
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            onChange={e => setFileData('deliverable', e.target.files[0])}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                        />
                                        {fileErrors.deliverable && <p className="text-xs text-red-600 mt-1">{fileErrors.deliverable}</p>}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={fileProcessing || !fileData.deliverable}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        Upload
                                    </button>
                                </form>
                            </div>

                            {project.files && project.files.length > 0 ? (
                                <ul className="divide-y divide-gray-200 border-t border-gray-200">
                                    {project.files.map(file => (
                                        <li key={file.id} className="py-3 flex justify-between items-center">
                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                                                <div>
                                                    <a href={`/storage/${file.file_url}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-indigo-600 hover:text-indigo-900">
                                                        {file.file_url.split('/').pop()}
                                                    </a>
                                                    <p className="text-xs text-gray-500">Uploaded by {file.uploader?.name}</p>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded uppercase">{file.type}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500">No files uploaded yet.</p>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Timeline Updates */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Post an Update</h2>
                            <form onSubmit={submitUpdate}>
                                <textarea
                                    value={updateData.content}
                                    onChange={e => setUpdateData('content', e.target.value)}
                                    rows={3}
                                    className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder-gray-400"
                                    placeholder="Write a quick update or note..."
                                ></textarea>
                                {updateErrors.content && <p className="text-xs text-red-600 mt-1">{updateErrors.content}</p>}
                                <div className="mt-3 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={updateProcessing || !updateData.content}
                                        className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
                                    >
                                        Post Update
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-6">Timeline</h2>
                            
                            {project.updates && project.updates.length > 0 ? (
                                <div className="flow-root">
                                    <ul className="-mb-8">
                                        {project.updates.map((update, idx) => (
                                            <li key={update.id}>
                                                <div className="relative pb-8">
                                                    {idx !== project.updates.length - 1 ? (
                                                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                                                    ) : null}
                                                    <div className="relative flex space-x-3">
                                                        <div>
                                                            <span className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center ring-8 ring-white">
                                                                <span className="text-indigo-600 font-bold text-xs">{update.user?.name?.charAt(0)}</span>
                                                            </span>
                                                        </div>
                                                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                                            <div>
                                                                <p className="text-sm text-gray-900">{update.content}</p>
                                                            </div>
                                                            <div className="text-right text-xs whitespace-nowrap text-gray-500">
                                                                <time dateTime={update.created_at}>{new Date(update.created_at).toLocaleDateString()}</time>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">No updates posted yet.</p>
                            )}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
