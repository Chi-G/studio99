import React, { useState, useRef } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ClientLayout from '@/Layouts/ClientLayout';
import TeamLayout from '@/Layouts/TeamLayout';
import { 
  Camera, 
  ShieldCheck, 
  Settings, 
  Mail, 
  Trash2, 
  Download,
  ChevronRight
} from 'lucide-react';

export default function Edit() {
    const { auth } = usePage().props;
    const user = auth.user;
    
    // Choose layout dynamically based on role
    const Layout = user.role === 'admin' ? AdminLayout 
                   : user.role === 'team' ? TeamLayout 
                   : ClientLayout;

    // Profile Info Form
    const { 
        data: profileData, 
        setData: setProfileData, 
        patch: updateProfile, 
        processing: profileProcessing, 
        recentlySuccessful: profileSuccessful 
    } = useForm({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        company: '',
        job_title: '',
        language: 'English',
        timezone: '(GMT-05:00) Eastern Time (US & Canada)',
        about: ''
    });

    const submitProfile = (e) => {
        e.preventDefault();
        updateProfile(route('profile.update'));
    };

    // Toggles state
    const [toggles, setToggles] = useState({
        email: true,
        sms: true,
        marketing: false,
    });

    const toggleSetting = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));

    return (
        <Layout>
            <Head title="Profile Settings | Studio99" />

            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Profile Settings</h1>
                    <p className="text-[#9CA3AF] text-sm">Manage your account information, security and preferences.</p>
                </div>
            </div>

            {/* Nav Tabs */}
            <div className="flex items-center gap-8 border-b border-[#2A2A2A] mb-8 overflow-x-auto custom-scrollbar">
                <button className="text-white font-bold text-sm border-b-2 border-brand-red pb-4 whitespace-nowrap">My Profile</button>
                <button className="text-[#9CA3AF] hover:text-white font-bold text-sm pb-4 border-b-2 border-transparent hover:border-[#3A3A3A] transition-all whitespace-nowrap">Security</button>
                <button className="text-[#9CA3AF] hover:text-white font-bold text-sm pb-4 border-b-2 border-transparent hover:border-[#3A3A3A] transition-all whitespace-nowrap">Notification Preferences</button>
                <button className="text-[#9CA3AF] hover:text-white font-bold text-sm pb-4 border-b-2 border-transparent hover:border-[#3A3A3A] transition-all whitespace-nowrap">Account Settings</button>
            </div>

            <div className="flex flex-col xl:flex-row gap-6">
                
                {/* Left Column: Profile Information */}
                <div className="flex-1 bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6 lg:p-8">
                    <h2 className="text-white font-bold text-lg mb-8">Profile Information</h2>

                    <form onSubmit={submitProfile} className="space-y-6">
                        
                        {/* Avatar Upload */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                            <div className="relative">
                                <img 
                                    src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&color=FFFFFF&background=111111`} 
                                    alt={user.name} 
                                    className="w-24 h-24 rounded-full object-cover border-4 border-[#1A1A1A]"
                                />
                                <button type="button" className="absolute bottom-0 right-0 w-8 h-8 bg-[#1A1A1A] border border-[#2A2A2A] rounded-full flex items-center justify-center text-white hover:bg-[#2A2A2A] transition-colors">
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="p-4 border border-dashed border-[#2A2A2A] rounded-xl flex-1 max-w-sm flex items-center gap-4 hover:border-[#3A3A3A] transition-colors cursor-pointer bg-[#151515]">
                                <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white text-sm font-medium">Upload Photo</p>
                                    <p className="text-[#9CA3AF] text-xs mt-0.5">JPG, PNG or GIF. Max size 2MB.</p>
                                </div>
                            </div>
                        </div>

                        {/* Grid Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#9CA3AF]">Full Name</label>
                                <input 
                                    type="text" 
                                    value={profileData.name}
                                    onChange={e => setProfileData('name', e.target.value)}
                                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white focus:ring-brand-red focus:border-brand-red transition-colors"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#9CA3AF]">Email Address</label>
                                <input 
                                    type="email" 
                                    value={profileData.email}
                                    readOnly
                                    className="w-full bg-[#151515] border border-[#2A2A2A] rounded-xl px-4 py-3 text-[#4A4A4A] focus:outline-none cursor-not-allowed"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#9CA3AF]">Phone Number</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-[#2A2A2A] bg-[#1A1A1A] text-white">
                                        🇺🇸
                                    </span>
                                    <input 
                                        type="text" 
                                        value={profileData.phone}
                                        onChange={e => setProfileData('phone', e.target.value)}
                                        placeholder="+1 (555) 123-4567"
                                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-r-xl px-4 py-3 text-white focus:ring-brand-red focus:border-brand-red transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#9CA3AF]">Company Name (Optional)</label>
                                <input 
                                    type="text" 
                                    value={profileData.company}
                                    onChange={e => setProfileData('company', e.target.value)}
                                    placeholder="Acme Solutions"
                                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white focus:ring-brand-red focus:border-brand-red transition-colors"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#9CA3AF]">Job Title (Optional)</label>
                                <input 
                                    type="text" 
                                    value={profileData.job_title}
                                    onChange={e => setProfileData('job_title', e.target.value)}
                                    placeholder="Marketing Manager"
                                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white focus:ring-brand-red focus:border-brand-red transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#9CA3AF]">Preferred Language</label>
                                <select 
                                    value={profileData.language}
                                    onChange={e => setProfileData('language', e.target.value)}
                                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white focus:ring-brand-red focus:border-brand-red transition-colors appearance-none"
                                >
                                    <option>English</option>
                                    <option>Spanish</option>
                                    <option>French</option>
                                </select>
                            </div>
                        </div>

                        {/* Full Width Fields */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#9CA3AF]">Time Zone</label>
                            <select 
                                value={profileData.timezone}
                                onChange={e => setProfileData('timezone', e.target.value)}
                                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white focus:ring-brand-red focus:border-brand-red transition-colors appearance-none"
                            >
                                <option>(GMT-05:00) Eastern Time (US & Canada)</option>
                                <option>(GMT-06:00) Central Time (US & Canada)</option>
                                <option>(GMT-08:00) Pacific Time (US & Canada)</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-[#9CA3AF]">About You (Optional)</label>
                                <span className="text-xs text-[#4A4A4A]">{profileData.about.length}/250</span>
                            </div>
                            <textarea 
                                value={profileData.about}
                                onChange={e => setProfileData('about', e.target.value)}
                                maxLength={250}
                                placeholder="Tell us a little about your business or project goals..."
                                rows={4}
                                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white focus:ring-brand-red focus:border-brand-red transition-colors resize-none custom-scrollbar"
                            />
                        </div>

                        <div className="pt-4 flex items-center gap-4">
                            <button 
                                type="submit" 
                                disabled={profileProcessing}
                                className="bg-brand-red hover:bg-red-600 text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-[0_0_15px_rgba(227,30,36,0.2)] disabled:opacity-50"
                            >
                                Save Changes
                            </button>
                            {profileSuccessful && <span className="text-green-500 text-sm font-bold flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Saved Successfully</span>}
                        </div>
                    </form>
                </div>

                {/* Right Column: Settings Cards */}
                <div className="w-full xl:w-[400px] shrink-0 flex flex-col gap-6">
                    
                    {/* Security Card */}
                    <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6 lg:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-white font-bold text-lg">Security</h3>
                                <p className="text-xs text-[#9CA3AF] mt-1">Keep your account safe and secure.</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0 border border-brand-red/20">
                                <ShieldCheck className="w-5 h-5 text-brand-red" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-[#1A1A1A] transition-colors cursor-pointer group">
                                <div>
                                    <p className="text-sm text-[#9CA3AF] mb-1">Password</p>
                                    <p className="text-white font-bold text-xs tracking-[0.2em]">••••••••</p>
                                </div>
                                <span className="text-brand-red text-sm font-bold group-hover:text-red-400 transition-colors">Change</span>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-[#1A1A1A] transition-colors cursor-pointer group">
                                <p className="text-sm text-[#9CA3AF]">Two-Factor Authentication</p>
                                <div className="flex items-center gap-3">
                                    <span className="text-green-500 text-xs font-bold">Enabled</span>
                                    <ChevronRight className="w-4 h-4 text-[#4A4A4A] group-hover:text-white transition-colors" />
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-[#1A1A1A] transition-colors cursor-pointer group">
                                <p className="text-sm text-[#9CA3AF]">Active Sessions</p>
                                <div className="flex items-center gap-3">
                                    <span className="text-white text-xs font-bold">3 active</span>
                                    <ChevronRight className="w-4 h-4 text-[#4A4A4A] group-hover:text-white transition-colors" />
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-[#1A1A1A] transition-colors cursor-pointer group">
                                <p className="text-sm text-[#9CA3AF]">Login History</p>
                                <ChevronRight className="w-4 h-4 text-[#4A4A4A] group-hover:text-white transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* Account Settings Card */}
                    <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6 lg:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-white font-bold text-lg">Account Settings</h3>
                                <p className="text-xs text-[#9CA3AF] mt-1">Manage your account and data.</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0 border border-[#2A2A2A]">
                                <Settings className="w-5 h-5 text-[#9CA3AF]" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <button className="w-full flex items-center justify-between p-3 rounded-xl text-[#9CA3AF] hover:bg-[#1A1A1A] hover:text-white transition-colors text-sm group">
                                <span className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-[#4A4A4A] group-hover:text-white transition-colors" />
                                    Change Email Address
                                </span>
                                <ChevronRight className="w-4 h-4 text-[#4A4A4A] group-hover:text-white transition-colors" />
                            </button>
                            
                            <button className="w-full flex items-center justify-between p-3 rounded-xl text-[#9CA3AF] hover:bg-[#1A1A1A] hover:text-white transition-colors text-sm group">
                                <span className="flex items-center gap-3">
                                    <Download className="w-4 h-4 text-[#4A4A4A] group-hover:text-white transition-colors" />
                                    Download My Data
                                </span>
                                <ChevronRight className="w-4 h-4 text-[#4A4A4A] group-hover:text-white transition-colors" />
                            </button>
                            
                            <button className="w-full flex items-center justify-between p-3 rounded-xl text-brand-red hover:bg-brand-red/10 transition-colors text-sm group font-medium mt-2">
                                <span className="flex items-center gap-3">
                                    <Trash2 className="w-4 h-4 shrink-0" />
                                    Delete Account
                                </span>
                                <ChevronRight className="w-4 h-4 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                            </button>
                        </div>
                    </div>

                    {/* Communication Preferences */}
                    <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6 lg:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-white font-bold text-lg">Communication Preferences</h3>
                                <p className="text-xs text-[#9CA3AF] mt-1">Choose how you want to hear from us.</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0 border border-[#2A2A2A]">
                                <Mail className="w-5 h-5 text-[#9CA3AF]" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h4 className="text-sm font-bold text-white mb-0.5">Email Notifications</h4>
                                    <p className="text-xs text-[#9CA3AF]">Project updates, invoices, etc.</p>
                                </div>
                                <button 
                                    onClick={() => toggleSetting('email')}
                                    className={`w-10 h-5 rounded-full relative transition-colors mt-1 shrink-0 ${toggles.email ? 'bg-brand-red' : 'bg-[#2A2A2A]'}`}
                                >
                                    <div className={`absolute top-[2px] w-4 h-4 bg-white rounded-full transition-all ${toggles.email ? 'left-[22px]' : 'left-[2px]'}`}></div>
                                </button>
                            </div>

                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h4 className="text-sm font-bold text-white mb-0.5">SMS Notifications</h4>
                                    <p className="text-xs text-[#9CA3AF]">Important alerts and updates</p>
                                </div>
                                <button 
                                    onClick={() => toggleSetting('sms')}
                                    className={`w-10 h-5 rounded-full relative transition-colors mt-1 shrink-0 ${toggles.sms ? 'bg-brand-red' : 'bg-[#2A2A2A]'}`}
                                >
                                    <div className={`absolute top-[2px] w-4 h-4 bg-white rounded-full transition-all ${toggles.sms ? 'left-[22px]' : 'left-[2px]'}`}></div>
                                </button>
                            </div>

                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h4 className="text-sm font-bold text-white mb-0.5">Marketing & Offers</h4>
                                    <p className="text-xs text-[#9CA3AF]">News, offers and tips</p>
                                </div>
                                <button 
                                    onClick={() => toggleSetting('marketing')}
                                    className={`w-10 h-5 rounded-full relative transition-colors mt-1 shrink-0 ${toggles.marketing ? 'bg-brand-red' : 'bg-[#2A2A2A]'}`}
                                >
                                    <div className={`absolute top-[2px] w-4 h-4 bg-white rounded-full transition-all ${toggles.marketing ? 'left-[22px]' : 'left-[2px]'}`}></div>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}
