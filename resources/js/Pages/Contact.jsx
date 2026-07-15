import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Logo } from '@/Components/Logo';
import {
  Menu, X, Mail, MapPin, Phone, Send, Loader2
} from 'lucide-react';

import { LoginModal } from '@/Components/Modals/LoginModal';
import { RegisterModal } from '@/Components/Modals/RegisterModal';
import { ForgotPasswordModal } from '@/Components/Modals/ForgotPasswordModal';
import { ThemeToggle } from '@/Components/ThemeToggle';
import { useForm } from '@inertiajs/react';

const RedLabel = ({ children }) => (
  <div className="inline-flex items-center gap-2 mb-4">
    <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
    <span className="text-[10px] md:text-xs font-black text-brand-red tracking-widest uppercase">{children}</span>
  </div>
);

const SectionHeading = ({ children }) => (
  <h2 className="font-gilroy font-bold text-4xl md:text-5xl mb-6 tracking-tight leading-tight text-text-primary">
    {children}
  </h2>
);

export default function Contact({ auth }) {
  const { flash } = usePage().props;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const submit = (e) => {
    e.preventDefault();

    post('/contact', {
      onSuccess: () => {
        toast.success('Your message has been sent successfully! We will get back to you shortly.');
        reset();
      },
      onError: () => {
        toast.error('Failed to send message. Please check the validation errors.');
      }
    });
  };

  useEffect(() => {
    if (flash?.error) toast.error(flash.error);
    if (flash?.success) toast.success(flash.success);
    if (flash?.status) toast(flash.status);
  }, [flash]);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-bg-base text-text-primary font-sans selection:bg-brand-red/30 flex flex-col">
      <Head title="Contact Us | Studio99 Digital" />

      {/* NAVBAR */}
      <nav className="w-full z-50 bg-bg-base border-b border-bg-border py-4 shrink-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Logo className="h-10 w-auto object-contain rounded-sm" />
          </Link>
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-text-secondary">
            <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
            <Link href="/#services" className="hover:text-text-primary transition-colors">Services</Link>
            <Link href="/#work" className="hover:text-text-primary transition-colors">Portfolio</Link>
            <Link href="/#about" className="hover:text-text-primary transition-colors">About</Link>
            <Link href="/contact" className="text-brand-red font-bold transition-colors">Contact</Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {auth.user ? (
              <Link href="/dashboard" className="text-sm font-medium text-text-primary hover:text-brand-red transition-colors">Dashboard</Link>
            ) : (
              <>
                <button onClick={() => setIsLoginModalOpen(true)} className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Login</button>
                <button onClick={() => setIsRegisterModalOpen(true)} className="text-sm font-medium bg-brand-red text-white px-5 py-2 rounded-full hover:bg-red-700 transition-colors whitespace-nowrap">Get Started</button>
              </>
            )}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-text-secondary hover:text-text-primary"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-bg-base flex flex-col px-6 py-8">
          <div className="flex items-center justify-between mb-12">
            <Logo className="h-10 w-auto object-contain rounded-sm" />
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button
                className="text-text-secondary hover:text-text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-8 h-8" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6 text-xl font-medium text-text-secondary flex-1">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-text-primary transition-colors">Home</Link>
            <Link href="/#services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-text-primary transition-colors">Services</Link>
            <Link href="/#work" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-text-primary transition-colors">Portfolio</Link>
            <Link href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-text-primary transition-colors">About</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-brand-red transition-colors">Contact</Link>
          </div>

          <div className="flex flex-col gap-4 mt-auto">
            {auth.user ? (
              <Link href="/dashboard" className="w-full text-center py-4 rounded-full bg-bg-card border border-bg-border text-text-primary font-bold">Open Dashboard</Link>
            ) : (
              <>
                <button onClick={() => { setIsMobileMenuOpen(false); setIsLoginModalOpen(true); }} className="w-full py-4 rounded-full border border-bg-border text-text-primary font-bold hover:bg-bg-card">Login</button>
                <button onClick={() => { setIsMobileMenuOpen(false); setIsRegisterModalOpen(true); }} className="w-full py-4 rounded-full bg-brand-red text-white font-bold hover:bg-red-700">Get Started</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 lg:py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <RedLabel>Get in Touch</RedLabel>
          <SectionHeading>Let's Start a Conversation</SectionHeading>
          <p className="text-text-secondary text-lg">
            Have a project in mind, need a custom quote, or just want to chat? We are here to help. Reach out to our team today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Information */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariant}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 text-text-primary">Contact Information</h3>
              <p className="text-text-secondary leading-relaxed mb-8">
                Fill out the form and our team will get back to you within 24 hours. We're excited to hear about your project!
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-bg-card border border-bg-border hover:border-brand-red/50 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0 group-hover:bg-brand-red transition-colors">
                  <Mail className="w-5 h-5 text-brand-red group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary mb-1">Email Us</h4>
                  <p className="text-text-secondary text-sm">studio99digitalng@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-2xl bg-bg-card border border-bg-border hover:border-brand-red/50 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0 group-hover:bg-brand-red transition-colors">
                  <Phone className="w-5 h-5 text-brand-red group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary mb-1">Call Us</h4>
                  <p className="text-text-secondary text-sm">+234 707 368 2318</p>
                  <p className="text-text-secondary text-sm">Mon-Fri from 9am to 6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-2xl bg-bg-card border border-bg-border hover:border-brand-red/50 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0 group-hover:bg-brand-red transition-colors">
                  <MapPin className="w-5 h-5 text-brand-red group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary mb-1">Visit Us</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    24B Ayomide oluruin Ajose adeogun street,<br />
                    Lagos Nigeria, 2223
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariant}
            className="bg-bg-card border border-bg-border p-8 rounded-3xl shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-text-primary">Send a Message</h3>

            <form onSubmit={submit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">Full Name</label>
                <input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={e => setData('name', e.target.value)}
                  className={`w-full bg-bg-base border ${errors.name ? 'border-brand-red focus:ring-brand-red focus:border-brand-red' : 'border-bg-border focus:ring-brand-red focus:border-brand-red'} text-text-primary text-sm rounded-xl block p-3.5 transition-colors`}
                  placeholder="John Doe"
                  required
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-brand-red font-medium">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                  className={`w-full bg-bg-base border ${errors.email ? 'border-brand-red focus:ring-brand-red focus:border-brand-red' : 'border-bg-border focus:ring-brand-red focus:border-brand-red'} text-text-primary text-sm rounded-xl block p-3.5 transition-colors`}
                  placeholder="john@example.com"
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-brand-red font-medium">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">Subject</label>
                <input
                  id="subject"
                  type="text"
                  value={data.subject}
                  onChange={e => setData('subject', e.target.value)}
                  className={`w-full bg-bg-base border ${errors.subject ? 'border-brand-red focus:ring-brand-red focus:border-brand-red' : 'border-bg-border focus:ring-brand-red focus:border-brand-red'} text-text-primary text-sm rounded-xl block p-3.5 transition-colors`}
                  placeholder="How can we help?"
                  required
                />
                {errors.subject && (
                  <p className="mt-1 text-xs text-brand-red font-medium">{errors.subject}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">Message</label>
                <textarea
                  id="message"
                  value={data.message}
                  onChange={e => setData('message', e.target.value)}
                  rows="4"
                  className={`w-full bg-bg-base border ${errors.message ? 'border-brand-red focus:ring-brand-red focus:border-brand-red' : 'border-bg-border focus:ring-brand-red focus:border-brand-red'} text-text-primary text-sm rounded-xl block p-3.5 transition-colors resize-none`}
                  placeholder="Tell us about your project..."
                  required
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-xs text-brand-red font-medium">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(227,30,36,0.2)] disabled:opacity-50 mt-4"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-bg-border bg-bg-card py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Logo className="h-8 w-auto object-contain rounded-sm" />
            </div>
            <p className="text-text-secondary text-sm">© {new Date().getFullYear()} Studio99 Digital. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-sm font-medium text-text-secondary">
            <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
            <a href="#" className="hover:text-text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-text-primary transition-colors">Terms</a>
          </div>
        </div>
      </footer>

      {/* Auth Modals */}
      <LoginModal
        open={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToRegister={() => { setIsLoginModalOpen(false); setIsRegisterModalOpen(true); }}
        onSwitchToForgotPassword={() => { setIsLoginModalOpen(false); setIsForgotPasswordModalOpen(true); }}
      />

      <RegisterModal
        open={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={() => { setIsRegisterModalOpen(false); setIsLoginModalOpen(true); }}
      />

      <ForgotPasswordModal
        open={isForgotPasswordModalOpen}
        onClose={() => setIsForgotPasswordModalOpen(false)}
        onSwitchToLogin={() => { setIsForgotPasswordModalOpen(false); setIsLoginModalOpen(true); }}
      />
    </div>
  );
}
