import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
  LayoutDashboard,
  FolderKanban,
  FilePlus,
  Activity,
  FolderOpen,
  CreditCard,
  MessageSquare,
  Bell,
  HeadphonesIcon,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { LogoutConfirmModal } from '@/Components/Modals/LogoutConfirmModal';
import { ThemeToggle } from '@/Components/ThemeToggle';
import logoImage from '../../images/logo.jpeg';

export default function ClientLayout({ children }) {
  const { auth } = usePage().props;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Projects', href: '/client/projects', icon: FolderKanban },
    { name: 'Request Service', href: '/client/requests/create', icon: FilePlus },
    { name: 'Files & Deliverables', href: '/client/files', icon: FolderOpen },
    { name: 'Messages', href: '/client/messages', icon: MessageSquare, badge: 3 },
    { name: 'Payments & Invoices', href: '/client/invoices', icon: CreditCard },
    { name: 'Support Tickets', href: '/client/support', icon: HeadphonesIcon },
    { name: 'Notifications', href: '/client/notifications', icon: Bell, badge: 5 },
    { name: 'Profile Settings', href: '/profile', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-bg-base text-text-primary font-sans flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 bg-bg-surface border-r border-bg-border transform transition-all duration-300 flex flex-col h-full
        ${sidebarOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full lg:translate-x-0'}
        ${sidebarCollapsed ? 'lg:w-[88px]' : 'lg:w-[280px] w-[280px]'}
      `}>
        {/* Logo Area */}
        <div className={`h-24 flex items-center border-b border-bg-border shrink-0 ${sidebarCollapsed ? 'justify-center px-0' : 'justify-between px-8'}`}>
          <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-90 transition-opacity" title={sidebarCollapsed ? "Studio99" : undefined}>
            <div className={`flex flex-col justify-center leading-none mt-0.5 ${sidebarCollapsed ? 'items-center' : ''}`}>
              <span className="font-gilroy font-bold text-2xl tracking-tight flex items-center gap-1">
                <img src={logoImage} alt="Studio99" className={`rounded object-cover ${sidebarCollapsed ? 'w-10 h-10' : 'w-8 h-8 mr-1'}`} />
                {!sidebarCollapsed && (
                  <>studio<span className="text-brand-red font-black tracking-tighter -ml-1.5">99</span></>
                )}
              </span>
              {!sidebarCollapsed && (
                <span className="text-[10px] uppercase text-text-secondary tracking-[0.25em] font-sans font-bold mt-1 ml-10">
                  — Digital —
                </span>
              )}
            </div>
          </Link>
          {!sidebarCollapsed && (
            <button className="lg:hidden text-text-secondary hover:text-text-primary" onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className={`flex-1 overflow-y-auto py-6 space-y-2 custom-scrollbar ${sidebarCollapsed ? 'px-3' : 'px-4'}`}>
          {navigation.map((item) => {
            const isActive = window.location.pathname.startsWith(item.href) && item.href !== '#' || window.location.pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                title={sidebarCollapsed ? item.name : undefined}
                className={`
                  flex items-center ${sidebarCollapsed ? 'justify-center px-0 py-4' : 'justify-between px-4 py-3.5'} rounded-xl font-medium transition-all duration-200 group relative
                  ${isActive
                    ? 'bg-brand-red text-white shadow-[0_0_20px_rgba(227,30,36,0.2)]'
                    : 'text-text-secondary hover:bg-bg-border hover:text-text-primary'}
                `}
              >
                <div className="flex items-center gap-3.5">
                  <item.icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`} />
                  {!sidebarCollapsed && (
                    <span className="text-sm font-bold tracking-wide">{item.name}</span>
                  )}
                </div>
                {!sidebarCollapsed && item.badge && (
                  <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black ${isActive ? 'bg-white text-brand-red' : 'bg-brand-red text-white shadow-[0_0_10px_rgba(227,30,36,0.4)]'}`}>
                    {item.badge}
                  </span>
                )}
                {/* Floating badge when collapsed */}
                {sidebarCollapsed && item.badge && (
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-white ring-2 ring-brand-red"></span>
                )}
              </Link>
            )
          })}

          <div className="pt-4 mt-4 border-t border-bg-border">
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              title={sidebarCollapsed ? "Logout" : undefined}
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-0 py-4' : 'gap-3.5 px-4 py-3.5'} rounded-xl font-medium text-text-secondary hover:bg-bg-border hover:text-text-primary transition-all duration-200 group`}
            >
              <LogOut className="w-5 h-5 shrink-0 transition-colors text-text-secondary group-hover:text-text-primary" />
              {!sidebarCollapsed && <span className="text-sm font-bold tracking-wide">Logout</span>}
            </button>
          </div>
        </nav>

        {/* Help Block */}
        {!sidebarCollapsed ? (
          <div className="p-6 shrink-0 mt-auto border-t border-bg-border bg-bg-surface">
            <div className="text-center relative">
              <div className="flex items-center gap-3 mb-4 justify-center">
                <div className="w-10 h-10 rounded-full bg-bg-card flex items-center justify-center border border-bg-border">
                  <HeadphonesIcon className="w-5 h-5 text-brand-red" />
                </div>
                <div className="text-left">
                  <h4 className="text-text-primary font-bold text-sm">Need Help?</h4>
                  <p className="text-text-secondary text-xs">We're here to assist you.</p>
                </div>
              </div>
              <button className="w-full py-3 rounded-xl border border-brand-red text-brand-red text-sm font-bold hover:bg-brand-red hover:text-text-primary transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 shrink-0 mt-auto border-t border-bg-border bg-bg-surface flex justify-center">
             <button title="Need Help? Contact Support" className="w-12 h-12 rounded-full bg-bg-card flex items-center justify-center border border-bg-border hover:border-brand-red hover:bg-brand-red/10 transition-colors group">
               <HeadphonesIcon className="w-5 h-5 text-brand-red group-hover:text-brand-red" />
             </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-h-screen relative max-w-full overflow-hidden bg-bg-base transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-[88px]' : 'lg:ml-[280px]'}`}>
        {/* Header */}
        <header className="h-24 flex items-center justify-between px-6 lg:px-10 shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-4 h-full">
            <button className="lg:hidden text-text-secondary hover:text-text-primary" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:flex items-center justify-center w-10 h-10 rounded-xl bg-bg-surface border border-bg-border text-text-secondary hover:text-text-primary hover:border-bg-border transition-all shadow-sm"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="font-gilroy font-bold text-3xl text-text-primary flex items-center gap-2">
                  Good Morning, {auth.user.name.split(' ')[0]}! <span className="text-2xl">👋</span>
                </h1>
                <p className="text-text-secondary text-sm mt-1">Here's what's happening with your projects today.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <ThemeToggle />

            {/* Notification Bell */}
            <button className="relative text-text-secondary hover:text-text-primary transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-red flex items-center justify-center text-[9px] font-bold text-white ring-2 ring-bg-base">
                5
              </span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <div className="w-10 h-10 rounded-full bg-bg-card flex items-center justify-center font-bold text-text-primary overflow-hidden border border-bg-border">
                  {auth.user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-bold text-text-primary">{auth.user.name}</p>
                  <p className="text-xs text-text-secondary">Client</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-text-secondary hidden sm:block transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-bg-card border border-bg-border rounded-xl shadow-2xl py-2 z-50">
                  <Link href="/profile" className="block px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-border font-medium">Account Settings</Link>
                  <button onClick={() => { setIsProfileDropdownOpen(false); setIsLogoutModalOpen(true); }} className="block w-full text-left px-4 py-2.5 text-sm text-brand-red hover:bg-bg-border font-medium">Log Out</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Title (Since header title is hidden on small screens) */}
        <div className="md:hidden px-6 pt-4 pb-2">
          <h1 className="font-gilroy font-bold text-2xl text-text-primary flex items-center gap-2">
            Hi, {auth.user.name.split(' ')[0]}! <span className="text-xl">👋</span>
          </h1>
        </div>

        <main className="flex-1 p-6 lg:px-10 lg:py-6 overflow-x-hidden overflow-y-auto custom-scrollbar flex flex-col">
          <div className="flex-1">
            {children}
          </div>
          
          {/* Footer */}
          <footer className="mt-12 pt-6 border-t border-bg-border flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            <p className="text-text-secondary text-sm font-medium">© 2025 Studio99 Digital. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-text-secondary text-sm font-medium hover:text-text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-text-secondary text-sm font-medium hover:text-text-primary transition-colors">Terms of Service</Link>
            </div>
          </footer>
        </main>
      </div>

      <LogoutConfirmModal
        open={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </div>
  );
}
