import React, { useState, useRef } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout';
import { 
  Monitor, PenTool, Smartphone, Film, Share2, Megaphone, Type, Star, MoreHorizontal,
  CheckCircle2, MessageSquare, ArrowRight, ClipboardList,
  UploadCloud, Eye, Trash2, Image as ImageIcon, FileText, Video, ExternalLink, Calendar,
  ArrowLeft, Send, Check, Edit2, ShieldCheck, Clock, HeadphonesIcon, Paperclip, Package, Layers
} from 'lucide-react';
import { toast } from 'sonner';

export default function Create({ auth, services = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        category: '', // 'one_off', 'monthly', 'business_package'
        service_id: '',
        package_id: '',
        title: '',
        description: '',
        company_name: '',
        website: '',
        preferred_contact: 'Email',
        business_goals: [],
        existing_branding: false,
        reference_links: '',
        timeline: 'Immediate',
        deadline: '',
        budget_range: 'Under ₦100,000',
        hear_about_us: 'Google',
        additional_info: '',
        reference_files: [], // files array
    });

    const [currentStep, setCurrentStep] = useState(1);
    const fileInputRef = useRef(null);

    const steps = [
      { id: 1, name: 'Category' },
      { id: 2, name: 'Select Service' },
      { id: 3, name: 'Company Details' },
      { id: 4, name: 'Project Brief' },
      { id: 5, name: 'Timeline & Budget' },
      { id: 6, name: 'Review & Submit' }
    ];

    const formatNaira = (amount) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const handleCategorySelect = (category) => {
        setData(prev => ({
            ...prev,
            category: category,
            service_id: '',
            package_id: ''
        }));
        setCurrentStep(2);
    };

    const handleServiceSelect = (serviceId, packageId) => {
        setData(prev => ({
            ...prev,
            service_id: serviceId,
            package_id: packageId || ''
        }));
    };

    const toggleGoal = (goal) => {
        const newGoals = data.business_goals.includes(goal) 
            ? data.business_goals.filter(g => g !== goal)
            : [...data.business_goals, goal];
        setData('business_goals', newGoals);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            setData('reference_files', [...data.reference_files, ...newFiles].slice(0, 5));
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const removeFile = (index) => {
        const newFiles = [...data.reference_files];
        newFiles.splice(index, 1);
        setData('reference_files', newFiles);
    };

    const handleNext = () => {
      if (currentStep < 6) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setCurrentStep(currentStep + 1);
      }
    };

    const handleBack = () => {
      if (currentStep > 1) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setCurrentStep(currentStep - 1);
      }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // We use FormData to support file uploads
        const formData = new FormData();
        formData.append('service_id', String(data.service_id));
        if (data.package_id) {
            formData.append('package_id', String(data.package_id));
        }
        formData.append('title', data.title);
        formData.append('description', data.description);
        if (data.deadline) {
            formData.append('deadline', data.deadline);
        }
        formData.append('company_name', data.company_name);
        formData.append('website', data.website);
        formData.append('preferred_contact', data.preferred_contact);
        formData.append('business_goals', data.business_goals.join(', '));
        formData.append('existing_branding', data.existing_branding ? '1' : '0');
        formData.append('reference_links', data.reference_links);
        formData.append('timeline', data.timeline);
        formData.append('budget_range', data.budget_range);
        formData.append('hear_about_us', data.hear_about_us);
        formData.append('additional_info', data.additional_info);

        data.reference_files.forEach((file) => {
            formData.append('reference_files[]', file);
        });

        post('/client/requests', {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                toast.success("Project request submitted! We'll send a quotation shortly.");
            },
            onError: (errors) => {
                console.error("Submission errors:", errors);
                toast.error("Failed to submit request. Please check all required fields.");
            }
        });
    };

    const isNextDisabled = () => {
        if (currentStep === 1 && !data.category) return true;
        if (currentStep === 2 && (!data.service_id || !data.package_id)) return true;
        if (currentStep === 4 && (!data.title || !data.description)) return true;
        if (currentStep === 5 && !data.timeline) return true;
        return false;
    };

    // Filter dynamic services by active category
    const activeServices = services.filter(s => s.category === data.category);

    // If business packages category, we want the "Business Packages" dummy service packages
    const bizPackages = services.find(s => s.slug === 'business-packages')?.packages || [];

    const selectedService = services.find(s => s.id === data.service_id);
    const selectedPackage = selectedService?.packages?.find(p => p.id === data.package_id) || 
        bizPackages.find(p => p.id === data.package_id);

    return (
        <ClientLayout>
            <Head title="Request a Service | Studio99" />

            {/* Header Area */}
            <div className="mb-8">
              <h1 className="text-3xl font-black text-text-primary mb-2 tracking-tight">Request a Service</h1>
              <div className="flex items-center text-sm font-medium text-text-secondary gap-2 mb-4">
                <Link href="/dashboard" className="hover:text-text-primary transition-colors">Dashboard</Link>
                <span>/</span>
                <span className="text-brand-red">Request Service</span>
              </div>
              <p className="text-text-secondary">Provide details below so we can understand your project and prepare a customized quotation.</p>
            </div>

            {/* Stepper Progress */}
            <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 mb-8 flex items-center justify-between overflow-x-auto hide-scrollbar">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-colors ${
                    currentStep === step.id ? 'bg-brand-red text-white' : 
                    currentStep > step.id ? 'bg-brand-red text-white' : 'bg-bg-card text-text-secondary border border-bg-border'
                  }`}>
                    {currentStep > step.id ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                  </div>
                  <span className={`ml-3 text-sm font-bold whitespace-nowrap ${currentStep === step.id ? 'text-text-primary' : (currentStep > step.id ? 'text-text-primary' : 'text-text-secondary')}`}>
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-12 sm:w-24 h-px mx-4 ${currentStep > step.id ? 'bg-brand-red' : 'bg-bg-border'}`}></div>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column (Main Content) */}
              <div className="lg:col-span-2">
                
                {/* STEP 1: SELECT CATEGORY */}
                {currentStep === 1 && (
                  <div className="animate-in fade-in duration-300">
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-text-primary mb-1">1. Select a Service Category</h2>
                      <p className="text-sm text-text-secondary">What type of creative service or solution does your project need?</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                      {[
                        { id: 'one_off', name: 'One-Off Services', icon: Layers, desc: 'Single-deliverable design, branding, website development, or video edits.' },
                        { id: 'monthly', name: 'Monthly Services', icon: Share2, desc: 'Ongoing social media management, campaign strategy, and growth marketing.' },
                        { id: 'business_package', name: 'Business Packages', icon: Package, desc: 'All-in-one bundled solutions tailored for startups and businesses.' },
                      ].map((cat) => (
                        <div 
                          key={cat.id}
                          onClick={() => handleCategorySelect(cat.id)}
                          className={`relative bg-bg-surface border rounded-2xl p-6 cursor-pointer transition-all hover:bg-bg-card-hover hover:border-brand-red/50 ${
                            data.category === cat.id 
                              ? 'border-brand-red bg-brand-red/5 shadow-[0_0_15px_rgba(220,38,38,0.1)] scale-[1.01]' 
                              : 'border-bg-border hover:border-text-primary'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-lg bg-bg-card flex items-center justify-center mb-4 border border-bg-border">
                            <cat.icon className={`w-5 h-5 ${data.category === cat.id ? 'text-brand-red' : 'text-text-secondary'}`} />
                          </div>
                          <h3 className="text-text-primary font-bold mb-2">{cat.name}</h3>
                          <p className="text-xs text-text-secondary leading-relaxed">{cat.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: SELECT SPECIFIC SERVICE OR PACKAGE */}
                {currentStep === 2 && (
                  <div className="animate-in fade-in duration-300">
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-text-primary mb-1">2. Select Service or Package</h2>
                      <p className="text-sm text-text-secondary">Choose the specific service or bundle package you need.</p>
                    </div>

                    {data.category === 'business_package' ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                        {bizPackages.map((pkg) => {
                          const serviceObj = services.find(s => s.slug === 'business-packages');
                          const isSelected = data.package_id === pkg.id;
                          return (
                            <div 
                              key={pkg.id}
                              onClick={() => handleServiceSelect(serviceObj.id, pkg.id)}
                              className={`relative bg-bg-surface border rounded-2xl p-6 cursor-pointer transition-all hover:border-brand-red/50 ${
                                isSelected 
                                  ? 'border-brand-red bg-brand-red/5 shadow-[0_0_15px_rgba(220,38,38,0.1)] scale-[1.01]' 
                                  : 'border-bg-border'
                              }`}
                            >
                              {pkg.is_popular && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-red text-white text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                                  Popular
                                </span>
                              )}
                              <h3 className="text-text-primary font-bold mb-1">{pkg.name}</h3>
                              <div className="text-xl font-black text-brand-red mb-4">
                                {formatNaira(pkg.price)}<span className="text-[10px] text-text-secondary font-medium">/month</span>
                              </div>
                              <ul className="space-y-2 border-t border-bg-border pt-4">
                                {pkg.features?.map((f, idx) => (
                                  <li key={idx} className="text-xs text-text-secondary flex items-start gap-1.5">
                                    <Check className="w-3 h-3 text-brand-red shrink-0 mt-0.5" />
                                    <span>{f}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {activeServices.map((srv) => {
                          const defaultPkg = srv.packages?.[0] || null;
                          const isSelected = data.service_id === srv.id;
                          return (
                            <div 
                              key={srv.id}
                              onClick={() => handleServiceSelect(srv.id, defaultPkg?.id)}
                              className={`relative bg-bg-surface border rounded-2xl p-5 cursor-pointer transition-all hover:border-brand-red/50 flex items-start gap-4 ${
                                isSelected 
                                  ? 'border-brand-red bg-brand-red/5 shadow-[0_0_15px_rgba(220,38,38,0.1)] scale-[1.01]' 
                                  : 'border-bg-border'
                              }`}
                            >
                              <div className="w-10 h-10 rounded-lg bg-bg-card flex items-center justify-center shrink-0 border border-bg-border">
                                {srv.slug === 'web-development' ? <Monitor className="w-5 h-5 text-brand-red" /> :
                                  srv.slug === 'video-editing' ? <Film className="w-5 h-5 text-brand-red" /> :
                                    srv.slug === 'mobile-app' ? <Smartphone className="w-5 h-5 text-brand-red" /> :
                                      srv.slug === 'logo-design' ? <Star className="w-5 h-5 text-brand-red" /> :
                                        <PenTool className="w-5 h-5 text-brand-red" />}
                              </div>
                              <div className="space-y-1">
                                <h3 className="text-text-primary font-bold text-sm">{srv.name}</h3>
                                <p className="text-xs text-text-secondary leading-relaxed">{srv.description}</p>
                                {defaultPkg && (
                                  <div className="text-xs font-bold text-brand-red pt-1">
                                    Starting at {formatNaira(defaultPkg.price)}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <button onClick={handleBack} className="text-text-secondary hover:text-text-primary font-bold flex items-center gap-2 transition-colors">
                        <ArrowLeft className="w-5 h-5" /> Back
                      </button>
                      <button 
                        onClick={handleNext}
                        disabled={isNextDisabled()}
                        className="bg-brand-red hover:bg-red-600 disabled:bg-bg-border disabled:text-text-secondary text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
                      >
                        Next Step <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: COMPANY DETAILS */}
                {currentStep === 3 && (
                  <div className="animate-in fade-in duration-300">
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-text-primary mb-1">3. Business & Contact details</h2>
                      <p className="text-sm text-text-secondary">Tell us about your company and how you prefer to be reached.</p>
                    </div>

                    <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 mb-8 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-text-primary mb-2">Company/Business Name</label>
                          <input 
                            type="text" 
                            value={data.company_name} 
                            onChange={e => setData('company_name', e.target.value)} 
                            placeholder="e.g. Acme Corp" 
                            className="w-full bg-bg-card border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 transition-colors" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-text-primary mb-2">Website URL (if any)</label>
                          <input 
                            type="url" 
                            value={data.website} 
                            onChange={e => setData('website', e.target.value)} 
                            placeholder="https://mycompany.com" 
                            className="w-full bg-bg-card border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 transition-colors" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-text-primary mb-2">Preferred Contact Method</label>
                          <select 
                            value={data.preferred_contact} 
                            onChange={e => setData('preferred_contact', e.target.value)} 
                            className="w-full bg-bg-card border border-bg-border text-text-secondary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 transition-colors"
                          >
                            <option value="Email">Email</option>
                            <option value="Phone Call">Phone Call</option>
                            <option value="WhatsApp">WhatsApp</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <button onClick={handleBack} className="text-text-secondary hover:text-text-primary font-bold flex items-center gap-2 transition-colors">
                        <ArrowLeft className="w-5 h-5" /> Back
                      </button>
                      <button 
                        onClick={handleNext}
                        className="bg-brand-red hover:bg-red-600 text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
                      >
                        Next Step <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: PROJECT BRIEF */}
                {currentStep === 4 && (
                  <div className="animate-in fade-in duration-300">
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-text-primary mb-1">4. Project Brief</h2>
                      <p className="text-sm text-text-secondary">Provide details about your requirements and preferences.</p>
                    </div>

                    <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 mb-8 space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-text-primary mb-2">Project Title <span className="text-brand-red">*</span></label>
                        <input 
                          type="text" 
                          value={data.title} 
                          onChange={e => setData('title', e.target.value)} 
                          placeholder="e.g. Website Rebuild & Logo Redesign" 
                          className="w-full bg-bg-card border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 transition-colors" 
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-text-primary mb-2">Project Description <span className="text-brand-red">*</span></label>
                        <textarea 
                          value={data.description} 
                          onChange={e => setData('description', e.target.value)} 
                          placeholder="Explain what you need in detail. Highlight specific features, pages, or video requirements..." 
                          rows="4" 
                          className="w-full bg-bg-card border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 transition-colors resize-none"
                        ></textarea>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-text-primary mb-2">Reference Links (Inspiration)</label>
                          <input 
                            type="url" 
                            value={data.reference_links} 
                            onChange={e => setData('reference_links', e.target.value)} 
                            placeholder="https://behance.net/..." 
                            className="w-full bg-bg-card border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 transition-colors" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-text-primary mb-2">Do you have existing branding?</label>
                          <div className="flex gap-4">
                            <button
                              type="button"
                              onClick={() => setData('existing_branding', true)}
                              className={`flex-1 py-2.5 text-sm font-bold rounded-xl border transition-colors ${data.existing_branding ? 'bg-brand-red text-white border-brand-red' : 'bg-bg-card text-text-secondary border-bg-border'}`}
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              onClick={() => setData('existing_branding', false)}
                              className={`flex-1 py-2.5 text-sm font-bold rounded-xl border transition-colors ${!data.existing_branding ? 'bg-brand-red text-white border-brand-red' : 'bg-bg-card text-text-secondary border-bg-border'}`}
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-text-primary mb-3">Business Goals for this project</label>
                        <div className="flex flex-wrap gap-2">
                          {['Increase Brand Awareness', 'Improve Professional Image', 'Build Online Presence', 'Drive Sales', 'Refresh Brand Identity'].map(goal => (
                            <button
                              key={goal}
                              type="button"
                              onClick={() => toggleGoal(goal)}
                              className={`px-4 py-2 text-xs font-bold rounded-full border transition-colors ${data.business_goals.includes(goal) ? 'bg-brand-red text-white border-brand-red' : 'bg-bg-card text-text-secondary border-bg-border hover:border-text-primary'}`}
                            >
                              {goal}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <button onClick={handleBack} className="text-text-secondary hover:text-text-primary font-bold flex items-center gap-2 transition-colors">
                        <ArrowLeft className="w-5 h-5" /> Back
                      </button>
                      <button 
                        onClick={handleNext}
                        disabled={isNextDisabled()}
                        className="bg-brand-red hover:bg-red-600 disabled:bg-bg-border disabled:text-text-secondary text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
                      >
                        Next Step <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 5: TIMELINE & BUDGET */}
                {currentStep === 5 && (
                  <div className="animate-in fade-in duration-300">
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-text-primary mb-1">5. Timeline & Budget</h2>
                      <p className="text-sm text-text-secondary">Help us plan the execution and estimate the scope.</p>
                    </div>

                    <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 mb-8 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-text-primary mb-2">When should the project start? <span className="text-brand-red">*</span></label>
                          <select 
                            value={data.timeline} 
                            onChange={e => setData('timeline', e.target.value)} 
                            className="w-full bg-bg-card border border-bg-border text-text-secondary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 transition-colors"
                          >
                            <option value="Immediate">Immediate / Right away</option>
                            <option value="1-2 weeks">Within 1-2 weeks</option>
                            <option value="1 month">In about a month</option>
                            <option value="Flexible">Flexible timeline</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-text-primary mb-2">Desired Completion Date</label>
                          <div className="relative">
                            <input 
                              type="date" 
                              min={new Date().toISOString().split('T')[0]} 
                              value={data.deadline} 
                              onChange={e => setData('deadline', e.target.value)} 
                              className="w-full bg-bg-card border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 pl-10 transition-colors dark:[color-scheme:dark]" 
                            />
                            <Calendar className="w-4 h-4 text-text-secondary absolute left-3.5 top-3.5 pointer-events-none" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-text-primary mb-2">Estimated Budget Range</label>
                          <select 
                            value={data.budget_range} 
                            onChange={e => setData('budget_range', e.target.value)} 
                            className="w-full bg-bg-card border border-bg-border text-text-secondary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 transition-colors"
                          >
                            <option value="Under ₦100,000">Under ₦100,000</option>
                            <option value="₦100,000 – ₦300,000">₦100,000 – ₦300,000</option>
                            <option value="₦300,000 – ₦500,000">₦300,000 – ₦500,000</option>
                            <option value="₦500,000+">₦500,000+</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-text-primary mb-2">How did you hear about us?</label>
                          <select 
                            value={data.hear_about_us} 
                            onChange={e => setData('hear_about_us', e.target.value)} 
                            className="w-full bg-bg-card border border-bg-border text-text-secondary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 transition-colors"
                          >
                            <option value="Google">Google Search</option>
                            <option value="Facebook">Facebook</option>
                            <option value="Instagram">Instagram</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Referral">Friend / Colleague Referral</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-text-primary mb-2">Reference Files / Attachments (Optional)</label>
                        <div 
                          className="border-2 border-dashed border-bg-border hover:border-brand-red transition-colors rounded-xl bg-bg-card p-8 text-center cursor-pointer flex flex-col items-center justify-center"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <input 
                            type="file" 
                            multiple 
                            className="hidden" 
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".png,.jpg,.jpeg,.pdf,.docx,.zip"
                          />
                          <UploadCloud className="w-10 h-10 text-brand-red mb-3" />
                          <p className="text-xs text-text-primary font-medium">Click to upload files (PDF, DOCX, Images, ZIP up to 50MB)</p>
                        </div>
                        {data.reference_files.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {data.reference_files.map((file, idx) => (
                              <div key={idx} className="flex justify-between items-center bg-bg-card border border-bg-border p-3 rounded-xl text-xs">
                                <span className="text-text-primary font-bold truncate max-w-[320px]">{file.name}</span>
                                <button 
                                  type="button" 
                                  onClick={() => removeFile(idx)} 
                                  className="text-brand-red font-bold hover:underline"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-text-primary mb-2">Additional Information (Optional)</label>
                        <textarea 
                          value={data.additional_info} 
                          onChange={e => setData('additional_info', e.target.value)} 
                          placeholder="Provide any additional details or guidelines..." 
                          rows="3" 
                          className="w-full bg-bg-card border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 transition-colors resize-none"
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <button onClick={handleBack} className="text-text-secondary hover:text-text-primary font-bold flex items-center gap-2 transition-colors">
                        <ArrowLeft className="w-5 h-5" /> Back
                      </button>
                      <button 
                        onClick={handleNext}
                        disabled={isNextDisabled()}
                        className="bg-brand-red hover:bg-red-600 disabled:bg-bg-border disabled:text-text-secondary text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
                      >
                        Next Step <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 6: REVIEW & SUBMIT */}
                {currentStep === 6 && (
                  <div className="animate-in fade-in duration-300">
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-text-primary mb-1">6. Review & Submit</h2>
                      <p className="text-sm text-text-secondary">Please review your inquiry copy before submitting.</p>
                    </div>

                    <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 mb-8 space-y-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 pb-3 border-b border-bg-border text-sm">
                          <span className="text-text-secondary">Service category:</span>
                          <span className="text-text-primary font-bold capitalize">{data.category?.replace('_', ' ')}</span>
                        </div>
                        <div className="grid grid-cols-2 pb-3 border-b border-bg-border text-sm">
                          <span className="text-text-secondary">Selected service:</span>
                          <span className="text-text-primary font-bold">
                            {data.category === 'business_package'
                              ? bizPackages.find(p => p.id === data.package_id)?.name
                              : services.find(s => s.id === data.service_id)?.name
                            }
                          </span>
                        </div>
                        <div className="grid grid-cols-2 pb-3 border-b border-bg-border text-sm">
                          <span className="text-text-secondary">Project Title:</span>
                          <span className="text-text-primary font-bold truncate">{data.title}</span>
                        </div>
                        <div className="grid grid-cols-2 pb-3 border-b border-bg-border text-sm">
                          <span className="text-text-secondary">Estimated Budget:</span>
                          <span className="text-text-primary font-bold">{data.budget_range}</span>
                        </div>
                        <div className="grid grid-cols-2 pb-3 border-b border-bg-border text-sm">
                          <span className="text-text-secondary">Timeline:</span>
                          <span className="text-text-primary font-bold">{data.timeline}</span>
                        </div>
                        <div className="grid grid-cols-2 text-sm">
                          <span className="text-text-secondary">Contact Method:</span>
                          <span className="text-text-primary font-bold">{data.preferred_contact}</span>
                        </div>
                      </div>

                      <div className="bg-brand-red/5 border border-brand-red/10 rounded-xl p-4 flex gap-3 text-xs leading-relaxed text-text-secondary">
                        <Info className="w-5 h-5 text-brand-red shrink-0" />
                        <p>
                          Our team will review your requirements and send a customized quotation within 24 hours. The active project workspace will begin once you approve the quotation and pay the initial deposit.
                        </p>
                      </div>

                      <div className="flex items-start gap-3">
                        <input 
                          type="checkbox" 
                          id="consent-page"
                          checked={data.existing_branding} // borrow/use state or add field, let's just make it a local checkbox state or use existing
                          onChange={(e) => setData('existing_branding', e.target.checked)}
                          className="w-4 h-4 text-brand-red bg-bg-card border-bg-border rounded focus:ring-brand-red focus:ring-offset-bg-base mt-0.5"
                        />
                        <label htmlFor="consent-page" className="text-xs text-text-secondary select-none">
                          I confirm that the information provided is accurate and I agree to be contacted by Studio99 Digital regarding my inquiry. <span className="text-brand-red">*</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <button onClick={handleBack} className="text-text-secondary hover:text-text-primary font-bold flex items-center gap-2 transition-colors">
                        <ArrowLeft className="w-5 h-5" /> Back
                      </button>
                      <form onSubmit={handleSubmit}>
                        <button 
                          type="submit"
                          disabled={processing || !data.existing_branding}
                          className="bg-brand-red hover:bg-red-600 disabled:opacity-50 text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-[0_4px_15px_rgba(227,30,36,0.2)]"
                        >
                          {processing ? 'Submitting...' : 'Submit Project Request'} <Send className="w-5 h-5 ml-1" />
                        </button>
                      </form>
                    </div>
                  </div>
                )}

              </div>

              {/* Right Column (Widgets) */}
              <div className="space-y-6">
                
                {/* Project Summary Box (Shown on steps 2-5) */}
                {currentStep > 1 && (
                    <div className="bg-bg-surface border border-bg-border rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-text-primary mb-6 uppercase tracking-wider flex items-center gap-2">
                            <FileText className="w-4 h-4 text-text-secondary" /> Project Summary
                        </h3>
                        
                        <div className="space-y-5">
                            <div>
                                <p className="text-[10px] uppercase font-bold text-text-secondary mb-1">Selected Service</p>
                                <p className="text-sm font-bold text-brand-red">
                                    {selectedService?.name || 'Category selected'}
                                </p>
                            </div>
                            {selectedPackage && (
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-text-secondary mb-1">Billing Tier</p>
                                    <p className="text-sm font-bold text-text-primary">{selectedPackage.name}</p>
                                </div>
                            )}
                            {selectedPackage && (
                                <div className="border-t border-bg-border pt-5">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-4 h-4 rounded-full border border-[#9CA3AF] flex items-center justify-center text-text-secondary text-[8px] font-bold">₦</div>
                                        <p className="text-[10px] uppercase font-bold text-text-secondary">Starting Cost</p>
                                    </div>
                                    <p className="text-xl font-black text-brand-red tracking-tight">{formatNaira(selectedPackage.price)}</p>
                                </div>
                            )}
                            <p className="text-[10px] text-text-secondary leading-relaxed pt-2">
                                Final quotation will be determined after reviewing your requirements.
                            </p>
                        </div>
                    </div>
                )}

                {/* Need Assistance */}
                <div className="bg-bg-surface border border-bg-border rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-bg-card border border-bg-border flex items-center justify-center shrink-0">
                          <HeadphonesIcon className="w-5 h-5 text-brand-red" />
                      </div>
                      <h3 className="text-sm font-bold text-text-primary">Need Assistance?</h3>
                  </div>
                  <p className="text-xs text-text-secondary mb-6 leading-relaxed">Our team is ready to help you plan your project.</p>
                  <div className="space-y-3">
                      <a href="mailto:hello@studio99.digital" className="w-full py-2.5 bg-brand-red hover:bg-red-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-[0_4px_15px_rgba(227,30,36,0.2)]">
                        <MessageSquare className="w-4 h-4" /> Email Support
                      </a>
                  </div>
                </div>

                {/* Secure & Private */}
                {currentStep > 2 && (
                    <div className="bg-bg-surface border border-bg-border rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-text-primary mb-2 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-green-500" /> Secure & Private
                        </h3>
                        <p className="text-xs text-text-secondary mb-4 leading-relaxed">Your information is 100% secure and will only be used to deliver your project.</p>
                    </div>
                )}
              </div>
            </div>

        </ClientLayout>
    );
}
