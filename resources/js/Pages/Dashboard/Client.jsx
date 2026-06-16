import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, projects, projectRequests, invoices }) {
    const user = auth.user;
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Head title="Client Dashboard" />

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
                    
                    {/* Header Action */}
                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Your Dashboard</h2>
                        <Link
                            href="/client/requests/create"
                            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            Start New Project
                        </Link>
                    </div>

                    {/* Pending Requests Section */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-8">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Pending Requests</h3>
                            
                            {projectRequests && projectRequests.length > 0 ? (
                                <ul className="divide-y divide-gray-200">
                                    {projectRequests.map((request) => (
                                        <li key={request.id} className="py-4 flex justify-between items-center">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{request.title}</p>
                                                <p className="text-sm text-gray-500">Service: {request.service?.name} | Package: {request.package?.name}</p>
                                            </div>
                                            <div>
                                                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                                }`}>
                                                    {request.status.replace('_', ' ').toUpperCase()}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500">You have no pending requests. Click "Start New Project" to get started.</p>
                            )}
                        </div>
                    </div>
                    
                    {/* Invoices Section */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-8">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Your Invoices</h3>
                            
                            {invoices && invoices.length > 0 ? (
                                <ul className="divide-y divide-gray-200">
                                    {invoices.map((invoice) => (
                                        <li key={invoice.id} className="py-4 flex justify-between items-center">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{invoice.description}</p>
                                                <p className="text-sm text-gray-500">Amount: ${parseFloat(invoice.amount).toFixed(2)} | Due: {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : 'N/A'}</p>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                                    invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                                                    invoice.status === 'pending_confirmation' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {invoice.status.replace('_', ' ').toUpperCase()}
                                                </span>
                                                {invoice.status === 'unpaid' && (
                                                    <Link
                                                        href={`/client/invoices/${invoice.id}`}
                                                        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700"
                                                    >
                                                        Pay Now
                                                    </Link>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500">You have no invoices.</p>
                            )}
                        </div>
                    </div>

                    {/* Active Projects Section */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Active Projects</h3>
                            {projects && projects.length > 0 ? (
                                <ul className="divide-y divide-gray-200">
                                    {projects.map((project) => (
                                        <li key={project.id} className="py-4 flex justify-between items-center">
                                            <div>
                                                <Link href={`/client/projects/${project.id}`} className="text-sm font-bold text-indigo-600 hover:text-indigo-900">
                                                    {project.name}
                                                </Link>
                                                <p className="text-sm text-gray-500">Assigned Deadline: {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'TBD'}</p>
                                            </div>
                                            <div>
                                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase ${
                                                    project.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    project.status === 'review' ? 'bg-purple-100 text-purple-800' :
                                                    project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {project.status.replace('_', ' ')}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500">No active projects yet.</p>
                            )}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
