import { Head, usePage } from '@inertiajs/react';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import AdminLayout from '@/Layouts/AdminLayout';
import ClientLayout from '@/Layouts/ClientLayout';
import TeamLayout from '@/Layouts/TeamLayout';

export default function Edit() {
    const { auth } = usePage().props;
    
    // Choose layout dynamically based on role
    const Layout = auth.user.role === 'admin' ? AdminLayout 
                   : auth.user.role === 'staff' ? TeamLayout 
                   : ClientLayout;

    return (
        <Layout>
            <Head title="Profile" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="p-4 sm:p-8 bg-[#111118] border border-[#2A2A3A] sm:rounded-2xl">
                        <UpdateProfileInformationForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-[#111118] border border-[#2A2A3A] sm:rounded-2xl">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
