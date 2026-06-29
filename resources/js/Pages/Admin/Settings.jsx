import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
  Search,
  HelpCircle,
  User,
  Building2,
  Shield,
  Bell,
  CreditCard,
  Users,
  Link as LinkIcon,
  Settings as SettingsIcon,
  Database,
  Palette,
  HeadphonesIcon,
  Camera,
  Eye,
  ShieldCheck,
  Download,
  Trash2,
  ChevronRight,
  Briefcase,
  FileText
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const settingsMenu = [
    { id: 'profile', icon: User, title: 'Profile Settings', desc: 'Update your personal information' },
    { id: 'company', icon: Building2, title: 'Company Settings', desc: 'Manage company details' },
    { id: 'security', icon: Shield, title: 'Account & Security', desc: 'Password, 2FA and security' },
    { id: 'notifications', icon: Bell, title: 'Notifications', desc: 'Email and in-app preferences' },
    { id: 'billing', icon: CreditCard, title: 'Billing & Subscription', desc: 'Manage plans and payments' },
    { id: 'team', icon: Users, title: 'Team Permissions', desc: 'Roles and access control' },
    { id: 'integrations', icon: LinkIcon, title: 'Integrations', desc: 'Connect third-party tools' },
    { id: 'system', icon: SettingsIcon, title: 'System Preferences', desc: 'General system settings' },
    { id: 'privacy', icon: Database, title: 'Data & Privacy', desc: 'Export data and privacy settings' },
    { id: 'appearance', icon: Palette, title: 'Appearance', desc: 'Customize theme and layout' }
  ];

  return (
    <AdminLayout>
      <Head title="Settings | Admin Dashboard" />

      {/* Page Header */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-gilroy font-bold text-text-primary mb-2">Settings</h1>
          <p className="text-text-secondary text-sm">Manage your account, preferences and system settings.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto mt-4 xl:mt-0">
          <div className="relative flex items-center w-full sm:w-auto">
            <Search className="absolute left-3 w-4 h-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search settings..." 
              className="pl-9 pr-4 py-2.5 bg-bg-surface border border-bg-border rounded-xl text-sm w-full sm:w-[260px] focus:ring-1 focus:ring-brand-red/50 focus:border-brand-red/50 outline-none transition-all"
            />
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2.5 bg-bg-surface border border-bg-border rounded-xl text-sm font-medium text-text-primary hover:bg-bg-border transition-colors shrink-0">
            <HelpCircle className="w-4 h-4" />
            Help
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
          <div className="bg-bg-surface border border-bg-border rounded-2xl overflow-hidden flex flex-col h-[calc(100vh-180px)] min-h-[600px]">
            <div className="p-6 border-b border-bg-border shrink-0">
              <h2 className="text-lg font-bold text-text-primary">Settings</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
              <div className="space-y-1">
                {settingsMenu.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all group ${
                        isActive 
                          ? 'bg-blue-500 text-white' 
                          : 'hover:bg-bg-base text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-text-secondary group-hover:text-text-primary'}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold truncate ${isActive ? 'text-white' : 'text-text-primary'}`}>
                          {item.title}
                        </p>
                        <p className={`text-[11px] truncate ${isActive ? 'text-blue-100' : 'text-text-secondary'}`}>
                          {item.desc}
                        </p>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-text-secondary'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 shrink-0 border-t border-bg-border">
              <button className="w-full flex items-center justify-between p-4 rounded-xl border border-bg-border hover:bg-bg-base transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <HeadphonesIcon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-text-primary">Need help?</p>
                    <p className="text-[11px] text-text-secondary">Contact our support team</p>
                  </div>
                </div>
                <ArrowRightIcon className="w-4 h-4 text-text-secondary group-hover:text-text-primary" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="flex flex-col gap-6">
              
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-4 border-b border-bg-border">
                <div>
                  <h2 className="text-xl font-bold text-text-primary">Profile Settings</h2>
                  <p className="text-sm text-text-secondary mt-1">Manage your personal information and profile details.</p>
                </div>
                <button className="w-full xl:w-auto px-5 py-2.5 bg-blue-500 text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors shadow-sm shrink-0">
                  Save Changes
                </button>
              </div>

              {/* Profile Information */}
              <div className="bg-bg-surface border border-bg-border rounded-2xl p-6">
                <h3 className="text-base font-bold text-text-primary mb-6">Profile Information</h3>
                
                <div className="flex flex-col xl:flex-row gap-8">
                  <div className="shrink-0 flex flex-col items-center">
                    <div className="relative">
                      <img src="https://i.pravatar.cc/150?u=admin" alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-bg-base" />
                      <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white border-2 border-bg-surface hover:bg-blue-600 transition-colors">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-2">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue="Admin User"
                        className="w-full px-4 py-2.5 bg-bg-base border border-bg-border rounded-xl text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-2">Phone Number</label>
                      <div className="flex">
                        <div className="flex items-center gap-2 px-3 py-2.5 bg-bg-base border border-bg-border border-r-0 rounded-l-xl">
                          <img src="https://flagcdn.com/w20/ng.png" alt="NG" className="w-5 h-auto rounded-sm" />
                        </div>
                        <input 
                          type="text" 
                          defaultValue="+234 803 123 4567"
                          className="flex-1 px-4 py-2.5 bg-bg-base border border-bg-border rounded-r-xl text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-2">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue="admin@studio99.com"
                        className="w-full px-4 py-2.5 bg-bg-base border border-bg-border rounded-xl text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-2">Role</label>
                      <input 
                        type="text" 
                        defaultValue="Super Admin"
                        disabled
                        className="w-full px-4 py-2.5 bg-bg-base/50 border border-bg-border rounded-xl text-sm text-text-secondary opacity-70 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Change Password */}
              <div className="bg-bg-surface border border-bg-border rounded-2xl p-6">
                <div className="mb-6">
                  <h3 className="text-base font-bold text-text-primary">Change Password</h3>
                  <p className="text-sm text-text-secondary mt-1">Update your password regularly to keep your account secure.</p>
                </div>
                
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-2">Current Password</label>
                    <div className="relative">
                      <input 
                        type="password" 
                        placeholder="Enter current password"
                        className="w-full pl-4 pr-10 py-2.5 bg-bg-base border border-bg-border rounded-xl text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                      <button className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-2">New Password</label>
                    <div className="relative">
                      <input 
                        type="password" 
                        placeholder="Enter new password"
                        className="w-full pl-4 pr-10 py-2.5 bg-bg-base border border-bg-border rounded-xl text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                      <button className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-2">Confirm New Password</label>
                    <div className="relative">
                      <input 
                        type="password" 
                        placeholder="Confirm new password"
                        className="w-full pl-4 pr-10 py-2.5 bg-bg-base border border-bg-border rounded-xl text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                      <button className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="px-5 py-2.5 bg-transparent border border-blue-500 text-blue-500 rounded-xl text-sm font-bold hover:bg-blue-500/10 transition-colors">
                    Update Password
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* 2FA */}
                <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-base font-bold text-text-primary">Two-Factor Authentication (2FA)</h3>
                    <p className="text-sm text-text-secondary mt-1">Add an extra layer of security to your account.</p>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-bg-base border border-bg-border rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">Two-factor authentication is currently <span className="text-emerald-500 font-bold">enabled</span>.</p>
                      <p className="text-[11px] text-text-secondary mt-0.5">Your account is protected.</p>
                    </div>
                  </div>
                </div>

                {/* Account Summary */}
                <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 flex flex-col">
                  <h3 className="text-base font-bold text-text-primary mb-6">Account Summary</h3>
                  
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">Account Type</span>
                      <span className="font-medium text-text-primary">Premium</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">Member Since</span>
                      <span className="font-medium text-text-primary">Jan 15, 2024</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">Last Login</span>
                      <span className="font-medium text-text-primary">Today, 10:45 AM</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">Account Status</span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span className="font-medium text-text-primary">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Email Preferences */}
                <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-base font-bold text-text-primary">Email Preferences</h3>
                    <p className="text-sm text-text-secondary mt-1">Choose which emails you want to receive.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-bg-base transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                          <Briefcase className="w-4 h-4 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-text-primary">Project updates and announcements</p>
                          <p className="text-[11px] text-text-secondary">Receive email notifications for project updates.</p>
                        </div>
                      </div>
                      <div className="w-10 h-6 bg-blue-500 rounded-full relative cursor-pointer flex-shrink-0">
                        <div className="absolute right-1 top-1 bottom-1 w-4 bg-white rounded-full"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-bg-base transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                          <CreditCard className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-text-primary">Payment confirmations and receipts</p>
                          <p className="text-[11px] text-text-secondary">Receive emails for payments and receipts.</p>
                        </div>
                      </div>
                      <div className="w-10 h-6 bg-blue-500 rounded-full relative cursor-pointer flex-shrink-0">
                        <div className="absolute right-1 top-1 bottom-1 w-4 bg-white rounded-full"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-bg-base transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4 text-amber-500" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-text-primary">Invoice updates and reminders</p>
                          <p className="text-[11px] text-text-secondary">Receive invoice updates and due reminders.</p>
                        </div>
                      </div>
                      <div className="w-10 h-6 bg-blue-500 rounded-full relative cursor-pointer flex-shrink-0">
                        <div className="absolute right-1 top-1 bottom-1 w-4 bg-white rounded-full"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-bg-base transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                          <Bell className="w-4 h-4 text-purple-500" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-text-primary">Marketing and newsletters</p>
                          <p className="text-[11px] text-text-secondary">Receive our news, tips and special offers.</p>
                        </div>
                      </div>
                      <div className="w-10 h-6 bg-bg-border rounded-full relative cursor-pointer flex-shrink-0">
                        <div className="absolute left-1 top-1 bottom-1 w-4 bg-white shadow-sm rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-base font-bold text-brand-red">Danger Zone</h3>
                    <p className="text-sm text-text-secondary mt-1">Irreversible and destructive actions.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <button className="w-full flex items-center justify-between p-4 bg-bg-base border border-bg-border rounded-xl hover:border-text-secondary transition-colors group">
                      <div className="flex items-center gap-3">
                        <Download className="w-5 h-5 text-text-secondary group-hover:text-text-primary" />
                        <div className="text-left">
                          <p className="text-sm font-bold text-text-primary">Export My Data</p>
                          <p className="text-[11px] text-text-secondary">Download a copy of your data.</p>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-text-secondary group-hover:text-text-primary" />
                    </button>

                    <button className="w-full flex items-center justify-between p-4 bg-brand-red/5 border border-brand-red/20 rounded-xl hover:bg-brand-red/10 transition-colors group">
                      <div className="flex items-center gap-3">
                        <Trash2 className="w-5 h-5 text-brand-red" />
                        <div className="text-left">
                          <p className="text-sm font-bold text-brand-red">Delete Account</p>
                          <p className="text-[11px] text-brand-red/70">Permanently delete your account.</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

function ArrowRightIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
