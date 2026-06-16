import { Head, Link } from '@inertiajs/react';

export default function TeamDashboard({ auth }) {
    const user = auth.user;
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
                    
                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Assigned Projects</h2>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {assignedProjects && assignedProjects.length > 0 ? (
                                <ul className="divide-y divide-gray-200">
                                    {assignedProjects.map((project) => (
                                        <li key={project.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                            <div>
                                                <Link href={`/team/projects/${project.id}`} className="text-lg font-medium text-indigo-600 hover:text-indigo-900">
                                                    {project.name}
                                                </Link>
                                                <p className="text-sm text-gray-500 mt-1">Client: {project.client?.name} | Service: {project.service_type}</p>
                                                <p className="text-xs text-gray-400 mt-1">Deadline: {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'No deadline set'}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold leading-5 ${
                                                    project.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    project.status === 'review' ? 'bg-purple-100 text-purple-800' :
                                                    project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {project.status.replace('_', ' ').toUpperCase()}
                                                </span>
                                                <Link
                                                    href={`/team/projects/${project.id}`}
                                                    className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                                                >
                                                    Open Workspace
                                                </Link>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500">You currently have no assigned projects.</p>
                            )}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
