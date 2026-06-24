import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout';
import { 
  Monitor, 
  PenTool, 
  Smartphone, 
  Film, 
  Share2, 
  Megaphone, 
  Type, 
  Star, 
  MoreHorizontal,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  ClipboardList
} from 'lucide-react';

export default function Create({ auth, services = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        service_id: '',
        title: '',
        description: '',
        reference_files: [],
    });

    const [currentStep, setCurrentStep] = useState(1);

    // Mock services if empty, to match the design grid exactly
    const displayServices = services.length > 0 ? services : [
      { id: 1, name: 'Web Development', desc: 'Custom websites, web applications and platforms.', icon: 'monitor' },
      { id: 2, name: 'Graphic Design', desc: 'Logos, branding, social media graphics and more.', icon: 'pen' },
      { id: 3, name: 'UI/UX Design', desc: 'User interface and experience design for web and mobile.', icon: 'smartphone' },
      { id: 4, name: 'Video Editing', desc: 'Promo videos, YouTube edits, reels and more.', icon: 'film' },
      { id: 5, name: 'Social Media Management', desc: 'Content creation, posting, and community management.', icon: 'share' },
      { id: 6, name: 'Digital Marketing', desc: 'SEO, ads, email marketing, and growth strategies.', icon: 'megaphone' },
      { id: 7, name: 'Content Writing', desc: 'Blog posts, website content, copies and more.', icon: 'type' },
      { id: 8, name: 'Branding', desc: 'Brand identity, strategy, and brand guidelines.', icon: 'star' },
      { id: 9, name: 'Other (Custom Request)', desc: 'Have something specific in mind? Let us know.', icon: 'more' },
    ];

    const getServiceIcon = (iconStr, isActive) => {
      const colorClass = isActive ? "text-brand-red" : "text-brand-red";
      switch(iconStr) {
        case 'monitor': return <Monitor className={`w-6 h-6 ${colorClass}`} />;
        case 'pen': return <PenTool className={`w-6 h-6 ${colorClass}`} />;
        case 'smartphone': return <Smartphone className={`w-6 h-6 ${colorClass}`} />;
        case 'film': return <Film className={`w-6 h-6 ${colorClass}`} />;
        case 'share': return <Share2 className={`w-6 h-6 ${colorClass}`} />;
        case 'megaphone': return <Megaphone className={`w-6 h-6 ${colorClass}`} />;
        case 'type': return <Type className={`w-6 h-6 ${colorClass}`} />;
        case 'star': return <Star className={`w-6 h-6 ${colorClass}`} />;
        default: return <MoreHorizontal className={`w-6 h-6 ${colorClass}`} />;
      }
    };

    const steps = [
      { id: 1, name: 'Select Service' },
      { id: 2, name: 'Project Details' },
      { id: 3, name: 'Additional Info' },
      { id: 4, name: 'Upload Files' },
      { id: 5, name: 'Review & Submit' }
    ];

    const selectedServiceDetails = displayServices.find(s => s.id === data.service_id);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/client/requests');
    };

    const handleNext = () => {
      if (currentStep < 5) setCurrentStep(currentStep + 1);
    };

    return (
        <ClientLayout>
            <Head title="Request a Service | Studio99" />

            {/* Header Area */}
            <div className="mb-8">
              <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Request a Service</h1>
              <div className="flex items-center text-sm font-medium text-[#9CA3AF] gap-2 mb-4">
                <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                <span>/</span>
                <span className="text-brand-red">Request Service</span>
              </div>
              <p className="text-[#9CA3AF]">Fill out the details below to request a service. Our team will review your request and get back to you.</p>
            </div>

            {/* Stepper Progress */}
            <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6 mb-8 flex items-center justify-between overflow-x-auto hide-scrollbar">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-colors ${
                    currentStep === step.id ? 'bg-brand-red text-white' : 
                    currentStep > step.id ? 'bg-[#2A2A2A] text-white' : 'bg-[#1A1A1A] text-[#4A4A4A] border border-[#2A2A2A]'
                  }`}>
                    {currentStep > step.id ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                  </div>
                  <span className={`ml-3 text-sm font-bold whitespace-nowrap ${currentStep === step.id ? 'text-white' : 'text-[#4A4A4A]'}`}>
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div className="w-12 sm:w-24 h-px bg-[#2A2A2A] mx-4"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column (Main Content) */}
              <div className="lg:col-span-2">
                {currentStep === 1 && (
                  <div className="animate-in fade-in duration-300">
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-white mb-1">1. Select a Service</h2>
                      <p className="text-sm text-[#9CA3AF]">Choose the type of service you need.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
                      {displayServices.map((service) => {
                        const isActive = data.service_id === service.id;
                        return (
                          <div 
                            key={service.id}
                            onClick={() => setData('service_id', service.id)}
                            className={`relative bg-[#111111] border rounded-xl p-5 cursor-pointer transition-all ${
                              isActive 
                                ? 'border-brand-red shadow-[0_0_15px_rgba(220,38,38,0.15)] scale-[1.02]' 
                                : 'border-[#2A2A2A] hover:border-[#4A4A4A]'
                            }`}
                          >
                            {isActive && (
                              <div className="absolute top-3 right-3 w-5 h-5 bg-brand-red rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                              </div>
                            )}
                            <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center transition-colors ${
                              isActive ? 'bg-brand-red/10' : 'bg-[#1A1A1A] group-hover:bg-[#2A2A2A]'
                            }`}>
                              {getServiceIcon(service.icon, isActive)}
                            </div>
                            <h3 className="text-white font-bold mb-2">{service.name}</h3>
                            <p className="text-xs text-[#9CA3AF] leading-relaxed">{service.desc}</p>
                          </div>
                        );
                      })}
                    </div>

                    <button 
                      onClick={handleNext}
                      disabled={!data.service_id}
                      className="bg-brand-red hover:bg-red-600 disabled:bg-[#2A2A2A] disabled:text-[#4A4A4A] text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
                    >
                      Next Step <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {currentStep > 1 && (
                  <div className="animate-in fade-in duration-300 bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8 text-center py-20">
                    <ClipboardList className="w-16 h-16 text-[#2A2A2A] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Step {currentStep} under construction</h3>
                    <p className="text-[#9CA3AF] mb-6">The remaining steps of the wizard will be implemented based on the backend requirements.</p>
                    <button 
                      onClick={() => setCurrentStep(1)}
                      className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white px-6 py-2.5 rounded-xl font-bold transition-colors border border-[#2A2A2A]"
                    >
                      Go back to Step 1
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column (Widgets) */}
              <div className="space-y-6">
                {/* Request Summary */}
                <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-6">Request Summary</h3>
                  
                  {selectedServiceDetails ? (
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 bg-[#1A1A1A] rounded-xl border border-[#2A2A2A]">
                        <div className="w-10 h-10 rounded-lg bg-brand-red/10 flex items-center justify-center shrink-0">
                          {getServiceIcon(selectedServiceDetails.icon, true)}
                        </div>
                        <div>
                          <h4 className="text-white font-bold">{selectedServiceDetails.name}</h4>
                          <p className="text-xs text-[#9CA3AF] mt-1">Service Selected</p>
                        </div>
                      </div>
                      
                      <div className="border-t border-[#2A2A2A] pt-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-[#9CA3AF]">Status</span>
                          <span className="text-white font-bold">Draft</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center mx-auto mb-4">
                        <ClipboardList className="w-6 h-6 text-[#4A4A4A]" />
                      </div>
                      <p className="text-white font-bold mb-1">No service selected yet</p>
                      <p className="text-xs text-[#9CA3AF]">Fill in the details to see<br/>your request summary.</p>
                    </div>
                  )}
                </div>

                {/* Need Help */}
                <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-2">Need Help?</h3>
                  <p className="text-sm text-[#9CA3AF] mb-6">If you're not sure which service fits your needs, our team can help you.</p>
                  <button className="w-full py-2.5 bg-transparent border border-[#4A4A4A] hover:border-white text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                    <MessageSquare className="w-4 h-4" /> Chat with Us
                  </button>
                </div>

                {/* Why Choose Studio99 */}
                <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Why Choose Studio99 Digital?</h3>
                  <ul className="space-y-3">
                    {[
                      'Professional & Experienced Team',
                      'High-Quality Work',
                      'On-Time Delivery',
                      '100% Client Satisfaction'
                    ].map((perk, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-[#9CA3AF]">
                        <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

        </ClientLayout>
    );
}
