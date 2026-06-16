import React from 'react';
import { Head, Link } from '@inertiajs/react';
import ChatBox from '@/Components/ChatBox';

export default function Show({ auth, project }) {
    const user = auth.user;

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <Head title={`Project: ${project.name}`} />

            <nav className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/dashboard" className="text-gray-500 hover:text-gray-700 mr-4">
                                &larr; Back to Dashboard
                            </Link>
                            <h1 className="text-xl font-bold text-gray-800">Project: {project.name}</h1>
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
                                    <h2 className="text-xl font-bold text-gray-900">Project Overview</h2>
                                    <p className="text-sm text-gray-500 mt-1">Assigned Team Member: {project.assigned_staff?.name || 'Not yet assigned'}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase ${
                                        project.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        project.status === 'review' ? 'bg-purple-100 text-purple-800' :
                                        project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {project.status.replace('_', ' ')}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="prose max-w-none text-gray-700 text-sm">
                                <h3 className="text-sm font-semibold text-gray-900">Your Request Description</h3>
                                <p className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md border border-gray-200 mt-2">
                                    {project.request?.description || "No description provided."}
                                </p>
                            </div>
                        </div>

                        {/* Files Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Deliverables & Files</h2>
                            
                            {project.files && project.files.length > 0 ? (
                                <ul className="divide-y divide-gray-200">
                                    {project.files.map(file => (
                                        <li key={file.id} className="py-3 flex justify-between items-center">
                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                                                <div>
                                                    <a href={`/storage/${file.file_url}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-indigo-600 hover:text-indigo-900">
                                                        {file.file_url.split('/').pop()}
                                                    </a>
                                                    <p className="text-xs text-gray-500">Uploaded on {new Date(file.created_at).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded uppercase">{file.type}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500">No deliverables uploaded yet.</p>
                            )}
                        </div>

                        {/* ChatBox Component */}
                        <div className="mt-8">
                            <ChatBox project={project} currentUser={user} />
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Timeline Updates */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-6">Project Timeline</h2>
                            
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
                                <p className="text-sm text-gray-500">No timeline updates yet.</p>
                            )}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
