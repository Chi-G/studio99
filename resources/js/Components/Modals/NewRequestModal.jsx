import React, { useState, useEffect, useRef } from 'react';
import { usePage, router } from '@inertiajs/react';
import { toast } from 'sonner';
import { AppModal } from '@/Components/ui/app-modal';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MonitorPlay,
  PenTool,
  Code,
  Share2,
  UploadCloud,
  File,
  CheckCircle2,
  CalendarIcon,
  Check,
  Building2,
  Globe,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
  Info,
  Package,
  Layers,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export function NewRequestModal({ open, onClose, onSubmitRequest, services = [] }) {
  const { auth } = usePage().props;

  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const fileInputRef = useRef(null);

  const [requestState, setRequestState] = useState({
    category: '', // 'one_off', 'monthly', 'business_package'
    serviceId: null,
    packageId: null,
    personal: { name: '', email: '', phone: '', company: '', website: '', contactMethod: 'Email' },
    brief: { title: '', description: '', goals: [], existingBranding: false, referenceLinks: '' },
    timelineAndBudget: { timeline: 'Immediate', deadline: '', budgetRange: 'Under ₦100,000', referralSource: 'Google', additionalNotes: '' },
    referenceFiles: [],
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync auth details when modal opens
  useEffect(() => {
    if (open) {
      setStep(1);
      setRequestState({
        category: '',
        serviceId: null,
        packageId: null,
        personal: {
          name: auth.user?.name || '',
          email: auth.user?.email || '',
          phone: auth.user?.phone || '',
          company: '',
          website: '',
          contactMethod: 'Email'
        },
        brief: { title: '', description: '', goals: [], existingBranding: false, referenceLinks: '' },
        timelineAndBudget: { timeline: 'Immediate', deadline: '', budgetRange: 'Under ₦100,000', referralSource: 'Google', additionalNotes: '' },
        referenceFiles: [],
        consent: false,
      });
      setIsSubmitting(false);
    }
  }, [open, auth.user]);

  // Format currency helper
  const formatNaira = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleCategorySelect = (category) => {
    setRequestState(prev => ({
      ...prev,
      category,
      serviceId: null,
      packageId: null
    }));
    setStep(2);
  };

  const handleServiceSelect = (serviceId, packageId) => {
    setRequestState(prev => ({
      ...prev,
      serviceId,
      packageId
    }));
  };

  const handlePersonalChange = (field, value) => {
    setRequestState(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const handleBriefChange = (field, value) => {
    setRequestState(prev => ({
      ...prev,
      brief: { ...prev.brief, [field]: value }
    }));
  };

  const toggleGoal = (goal) => {
    const goals = requestState.brief.goals.includes(goal)
      ? requestState.brief.goals.filter(g => g !== goal)
      : [...requestState.brief.goals, goal];
    handleBriefChange('goals', goals);
  };

  const handleTimelineBudgetChange = (field, value) => {
    setRequestState(prev => ({
      ...prev,
      timelineAndBudget: { ...prev.timelineAndBudget, [field]: value }
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setRequestState(prev => ({
        ...prev,
        referenceFiles: [...prev.referenceFiles, ...newFiles].slice(0, 5)
      }));
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeFile = (index) => {
    setRequestState(prev => {
      const files = [...prev.referenceFiles];
      files.splice(index, 1);
      return { ...prev, referenceFiles: files };
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('service_id', String(requestState.serviceId));
    if (requestState.packageId) {
      formData.append('package_id', String(requestState.packageId));
    }
    formData.append('title', requestState.brief.title);
    formData.append('description', requestState.brief.description);
    if (requestState.timelineAndBudget.deadline) {
      formData.append('deadline', requestState.timelineAndBudget.deadline);
    }
    formData.append('company_name', requestState.personal.company);
    formData.append('website', requestState.personal.website);
    formData.append('preferred_contact', requestState.personal.contactMethod);
    formData.append('business_goals', requestState.brief.goals.join(', '));
    formData.append('existing_branding', requestState.brief.existingBranding ? '1' : '0');
    formData.append('reference_links', requestState.brief.referenceLinks);
    formData.append('timeline', requestState.timelineAndBudget.timeline);
    formData.append('budget_range', requestState.timelineAndBudget.budgetRange);
    formData.append('hear_about_us', requestState.timelineAndBudget.referralSource);
    formData.append('additional_info', requestState.timelineAndBudget.additionalNotes);

    // Guest fields
    if (!auth.user) {
      formData.append('name', requestState.personal.name);
      formData.append('email', requestState.personal.email);
      formData.append('phone', requestState.personal.phone);
    }

    // Append reference files
    requestState.referenceFiles.forEach((file) => {
      formData.append('reference_files[]', file);
    });

    router.post('/client/requests', formData, {
      onSuccess: () => {
        toast.success("Request received! We'll send a quotation shortly.");
        onClose();
        if (onSubmitRequest) {
          onSubmitRequest();
        }
      },
      onError: (errors) => {
        console.error("Submission errors:", errors);
        const errorMsg = Object.values(errors).flat().join(' ') || "Failed to submit request. Please review your details.";
        toast.error(errorMsg);
      },
      onFinish: () => {
        setIsSubmitting(false);
      }
    });
  };

  const isNextDisabled = () => {
    if (step === 1 && !requestState.category) return true;
    if (step === 2 && (!requestState.serviceId || !requestState.packageId)) return true;
    if (step === 3) {
      if (!auth.user) {
        return !requestState.personal.name || !requestState.personal.email;
      }
      return false;
    }
    if (step === 4 && (!requestState.brief.title || !requestState.brief.description)) return true;
    if (step === 5 && !requestState.timelineAndBudget.timeline) return true;
    if (step === 6 && !requestState.consent) return true;
    return false;
  };

  // Filter dynamic services by active category
  const activeServices = services.filter(s => s.category === requestState.category);

  // If business packages category, we want the "Business Packages" dummy service packages
  const bizPackages = services.find(s => s.slug === 'business-packages')?.packages || [];

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title="Request a Free Consultation"
      size="xl"
    >
      {/* Stepper Progress */}
      <div className="flex gap-2 mb-8 mt-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i + 1 <= step
              ? 'bg-gradient-to-r from-brand-red to-[#FF4B50]'
              : 'bg-bg-border'
              }`}
          />
        ))}
      </div>

      <div className="min-h-[360px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
          >
            {/* STEP 1: SELECT CATEGORY */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center max-w-md mx-auto">
                  <h3 className="text-xl font-bold text-text-primary mb-2">Select a Service Category</h3>
                  <p className="text-sm text-text-secondary">What type of creative service or solution does your project need?</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
                  {[
                    { id: 'one_off', name: 'One-Off Services', icon: Layers, desc: 'Single-deliverable design, branding, website development, or video edits.' },
                    { id: 'monthly', name: 'Monthly Services', icon: Share2, desc: 'Ongoing social media management, campaign strategy, and growth marketing.' },
                    { id: 'business_package', name: 'Business Packages', icon: Package, desc: 'All-in-one bundled solutions tailored for startups and businesses.' },
                  ].map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                      className={`cursor-pointer p-6 rounded-2xl border bg-bg-card transition-all hover:bg-bg-card-hover hover:border-brand-red/50 hover:shadow-[0_0_20px_rgba(227,30,36,0.06)] group ${requestState.category === cat.id ? 'border-brand-red shadow-[0_0_20px_rgba(227,30,36,0.15)] bg-brand-red/10' : 'border-bg-border'
                        }`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-bg-surface flex items-center justify-center border border-bg-border group-hover:border-brand-red/30 mb-5 transition-colors">
                        <cat.icon className={`w-6 h-6 ${requestState.category === cat.id ? 'text-brand-red' : 'text-text-secondary'}`} />
                      </div>
                      <h4 className="font-bold text-text-primary text-lg mb-2">{cat.name}</h4>
                      <p className="text-sm text-text-secondary leading-relaxed">{cat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: SELECT SPECIFIC SERVICE OR PACKAGE */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center max-w-md mx-auto">
                  <h3 className="text-xl font-bold text-text-primary mb-1">Select Service or Package</h3>
                  <p className="text-sm text-text-secondary">
                    {requestState.category === 'business_package'
                      ? 'Choose a bundled monthly solution'
                      : 'Choose your desired service'
                    }
                  </p>
                </div>

                {requestState.category === 'business_package' ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    {bizPackages.map((pkg) => {
                      const serviceObj = services.find(s => s.slug === 'business-packages');
                      const isSelected = requestState.packageId === pkg.id;
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => handleServiceSelect(serviceObj.id, pkg.id)}
                          className={`relative cursor-pointer p-5 rounded-2xl border bg-bg-card transition-all hover:border-brand-red/50 ${isSelected
                            ? 'border-brand-red bg-brand-red/10 shadow-[0_0_20px_rgba(227,30,36,0.12)]'
                            : 'border-bg-border'
                            }`}
                        >
                          {pkg.is_popular && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-red text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                              Popular
                            </span>
                          )}
                          <h4 className="font-bold text-text-primary text-lg mb-1">{pkg.name}</h4>
                          <div className="text-2xl font-bold text-brand-red mb-4">
                            {formatNaira(pkg.price)}<span className="text-xs text-text-secondary font-medium">/month</span>
                          </div>
                          <ul className="space-y-2 border-t border-bg-border pt-4">
                            {pkg.features?.map((f, idx) => (
                              <li key={idx} className="text-xs text-text-secondary flex items-start gap-2">
                                <Check className="w-3.5 h-3.5 text-brand-red shrink-0 mt-0.5" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[380px] overflow-y-auto pr-1">
                    {activeServices.map((srv) => {
                      const defaultPkg = srv.packages?.[0] || null;
                      const isSelected = requestState.serviceId === srv.id;
                      return (
                        <div
                          key={srv.id}
                          onClick={() => handleServiceSelect(srv.id, defaultPkg?.id)}
                          className={`cursor-pointer p-5 rounded-2xl border bg-bg-card transition-all hover:border-brand-red/50 flex items-start gap-4 ${isSelected
                            ? 'border-brand-red bg-brand-red/10 shadow-[0_0_20px_rgba(227,30,36,0.12)]'
                            : 'border-bg-border'
                            }`}
                        >
                          <div className="w-10 h-10 rounded-lg bg-bg-surface flex items-center justify-center shrink-0 border border-bg-border">
                            {srv.slug === 'web-development' ? <Code className="w-5 h-5 text-brand-red" /> :
                              srv.slug === 'video-editing' ? <MonitorPlay className="w-5 h-5 text-brand-red" /> :
                                srv.slug === 'mobile-app' ? <Sparkles className="w-5 h-5 text-brand-red" /> :
                                  srv.slug === 'logo-design' ? <CheckCircle2 className="w-5 h-5 text-brand-red" /> :
                                    <PenTool className="w-5 h-5 text-brand-red" />}
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-bold text-text-primary text-base">{srv.name}</h4>
                            <p className="text-xs text-text-secondary leading-relaxed">{srv.description}</p>
                            {defaultPkg && (
                              <div className="text-sm font-bold text-brand-red pt-1">
                                Starting at {formatNaira(defaultPkg.price)}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: CONTACT & COMPANY DETAILS */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="text-center max-w-md mx-auto mb-2">
                  <h3 className="text-xl font-bold text-text-primary mb-1">Contact & Business Details</h3>
                  <p className="text-sm text-text-secondary">Please fill in your contact information and company details.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Guest Fields */}
                  {!auth.user && (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Full Name <span className="text-brand-red">*</span></label>
                        <div className="relative">
                          <input
                            type="text"
                            value={requestState.personal.name}
                            onChange={(e) => handlePersonalChange('name', e.target.value)}
                            placeholder="Chibuike Okafor"
                            className="w-full bg-bg-surface border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Email Address <span className="text-brand-red">*</span></label>
                        <div className="relative">
                          <input
                            type="email"
                            value={requestState.personal.email}
                            onChange={(e) => handlePersonalChange('email', e.target.value)}
                            placeholder="client@company.com"
                            className="w-full bg-bg-surface border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={requestState.personal.phone}
                          onChange={(e) => handlePersonalChange('phone', e.target.value)}
                          placeholder="+234..."
                          className="w-full bg-bg-surface border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 transition-colors"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Business/Company Name</label>
                    <input
                      type="text"
                      value={requestState.personal.company}
                      onChange={(e) => handlePersonalChange('company', e.target.value)}
                      placeholder="e.g. Studio99 Digital"
                      className="w-full bg-bg-surface border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Website URL (if any)</label>
                    <input
                      type="url"
                      value={requestState.personal.website}
                      onChange={(e) => handlePersonalChange('website', e.target.value)}
                      placeholder="https://mysite.com"
                      className="w-full bg-bg-surface border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Preferred Contact Method</label>
                    <select
                      value={requestState.personal.contactMethod}
                      onChange={(e) => handlePersonalChange('contactMethod', e.target.value)}
                      className="w-full bg-bg-surface border border-bg-border text-text-secondary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 transition-colors"
                    >
                      <option value="Email">Email</option>
                      <option value="Phone Call">Phone Call</option>
                      <option value="WhatsApp">WhatsApp</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: PROJECT BRIEF */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="text-center max-w-md mx-auto mb-2">
                  <h3 className="text-xl font-bold text-text-primary mb-1">Project Brief & Details</h3>
                  <p className="text-sm text-text-secondary">Describe your requirements and project goals.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Project Title <span className="text-brand-red">*</span></label>
                    <input
                      type="text"
                      value={requestState.brief.title}
                      onChange={(e) => handleBriefChange('title', e.target.value)}
                      placeholder="e.g. Website Rebuild & Branding"
                      className="w-full bg-bg-surface border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Project Description / Requirements <span className="text-brand-red">*</span></label>
                    <textarea
                      rows={3}
                      value={requestState.brief.description}
                      onChange={(e) => handleBriefChange('description', e.target.value)}
                      placeholder="Explain your project goals, specific features, deliverables, or style preferences..."
                      className="w-full bg-bg-surface border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 transition-colors resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Reference Links (Inspiration)</label>
                      <input
                        type="url"
                        value={requestState.brief.referenceLinks}
                        onChange={(e) => handleBriefChange('referenceLinks', e.target.value)}
                        placeholder="https://behance.net/..."
                        className="w-full bg-bg-surface border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 transition-colors"
                      />
                    </div>

                    <div className="flex flex-col justify-center">
                      <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Do you have existing branding?</label>
                      <div className="flex gap-4 mt-1">
                        <button
                          type="button"
                          onClick={() => handleBriefChange('existingBranding', true)}
                          className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-colors ${requestState.brief.existingBranding ? 'bg-brand-red text-white border-brand-red' : 'bg-bg-surface border-bg-border text-text-secondary'}`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => handleBriefChange('existingBranding', false)}
                          className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-colors ${!requestState.brief.existingBranding ? 'bg-brand-red text-white border-brand-red' : 'bg-bg-surface border-bg-border text-text-secondary'}`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Business Goals for this project</label>
                    <div className="flex flex-wrap gap-2">
                      {['Increase Brand Awareness', 'Build Online Presence', 'Drive Sales', 'Refresh Identity', 'Professional Image'].map((goal) => {
                        const isSelected = requestState.brief.goals.includes(goal);
                        return (
                          <button
                            key={goal}
                            type="button"
                            onClick={() => toggleGoal(goal)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-all ${isSelected ? 'bg-brand-red text-white border-brand-red' : 'bg-bg-surface border-bg-border text-text-secondary hover:border-text-secondary'}`}
                          >
                            {goal}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: TIMELINE & BUDGET */}
            {step === 5 && (
              <div className="space-y-4">
                <div className="text-center max-w-md mx-auto mb-2">
                  <h3 className="text-xl font-bold text-text-primary mb-1">Timeline & Budget</h3>
                  <p className="text-sm text-text-secondary">When should the project start and what is your estimated budget?</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase mb-2">When should the project start? <span className="text-brand-red">*</span></label>
                      <select
                        value={requestState.timelineAndBudget.timeline}
                        onChange={(e) => handleTimelineBudgetChange('timeline', e.target.value)}
                        className="w-full bg-bg-surface border border-bg-border text-text-secondary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 transition-colors"
                      >
                        <option value="Immediate">Immediate / Right away</option>
                        <option value="1-2 weeks">Within 1-2 weeks</option>
                        <option value="1 month">In about a month</option>
                        <option value="Flexible">Flexible timeline</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Desired Completion Date</label>
                      <div className="relative">
                        <input
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          value={requestState.timelineAndBudget.deadline}
                          onChange={(e) => handleTimelineBudgetChange('deadline', e.target.value)}
                          className="w-full bg-bg-surface border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 pl-10 transition-colors dark:[color-scheme:dark]"
                        />
                        <CalendarIcon className="w-4 h-4 text-text-secondary absolute left-3.5 top-3.5 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Estimated Budget Range</label>
                      <select
                        value={requestState.timelineAndBudget.budgetRange}
                        onChange={(e) => handleTimelineBudgetChange('budgetRange', e.target.value)}
                        className="w-full bg-bg-surface border border-bg-border text-text-secondary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 transition-colors"
                      >
                        <option value="Under ₦100,000">Under ₦100,000</option>
                        <option value="₦100,000 – ₦300,000">₦100,000 – ₦300,000</option>
                        <option value="₦300,000 – ₦500,000">₦300,000 – ₦500,000</option>
                        <option value="₦500,000+">₦500,000+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase mb-2">How did you hear about us?</label>
                      <select
                        value={requestState.timelineAndBudget.referralSource}
                        onChange={(e) => handleTimelineBudgetChange('referralSource', e.target.value)}
                        className="w-full bg-bg-surface border border-bg-border text-text-secondary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 transition-colors"
                      >
                        <option value="Google">Google Search</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Instagram">Instagram</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="X">Twitter (X)</option>
                        <option value="Referral">Friend/Colleague Referral</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Reference Files / Attachments (Optional)</label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-bg-border hover:border-brand-red/50 transition-colors rounded-xl p-6 bg-bg-surface/50 text-center cursor-pointer flex flex-col items-center justify-center min-h-[100px]"
                    >
                      <UploadCloud className="w-8 h-8 text-brand-red mb-2" />
                      <p className="text-xs text-text-primary font-medium">Click to upload files (PDF, DOCX, Images, ZIP up to 50MB)</p>
                      <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".png,.jpg,.jpeg,.pdf,.docx,.zip,.mp4,.mov"
                      />
                    </div>
                    {requestState.referenceFiles.length > 0 && (
                      <div className="mt-3 space-y-1.5 max-h-[120px] overflow-y-auto">
                        {requestState.referenceFiles.map((file, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-bg-surface border border-bg-border p-2 rounded-lg text-xs">
                            <span className="text-text-primary font-medium truncate max-w-[280px]">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(idx)}
                              className="text-brand-red hover:underline text-[10px]"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: REVIEW & CONSENT */}
            {step === 6 && (
              <div className="space-y-5">
                <div className="text-center max-w-md mx-auto mb-2">
                  <h3 className="text-xl font-bold text-text-primary mb-1">Confirm & Submit Inquiry</h3>
                  <p className="text-sm text-text-secondary">Please review your inquiry summary before submitting.</p>
                </div>

                <div className="bg-bg-surface border border-bg-border rounded-xl p-4 space-y-3">
                  <div className="grid grid-cols-2 text-xs">
                    <span className="text-text-secondary">Service category:</span>
                    <span className="text-text-primary font-bold capitalize">{requestState.category?.replace('_', ' ')}</span>
                  </div>
                  <div className="grid grid-cols-2 text-xs">
                    <span className="text-text-secondary">Selected service:</span>
                    <span className="text-text-primary font-bold">
                      {requestState.category === 'business_package'
                        ? bizPackages.find(p => p.id === requestState.packageId)?.name
                        : services.find(s => s.id === requestState.serviceId)?.name
                      }
                    </span>
                  </div>
                  <div className="grid grid-cols-2 text-xs">
                    <span className="text-text-secondary">Project Title:</span>
                    <span className="text-text-primary font-bold truncate">{requestState.brief.title}</span>
                  </div>
                  <div className="grid grid-cols-2 text-xs">
                    <span className="text-text-secondary">Budget range:</span>
                    <span className="text-text-primary font-bold">{requestState.timelineAndBudget.budgetRange}</span>
                  </div>
                  <div className="grid grid-cols-2 text-xs">
                    <span className="text-text-secondary">Timeline:</span>
                    <span className="text-text-primary font-bold">{requestState.timelineAndBudget.timeline}</span>
                  </div>
                </div>

                <div className="bg-brand-red/5 border border-brand-red/10 rounded-xl p-4 flex gap-3 text-xs leading-relaxed text-text-secondary">
                  <Info className="w-5 h-5 text-brand-red shrink-0" />
                  <p>
                    After submission, we will email you an acknowledgement copy. A Project Manager will review your scope and follow up with a customized quotation within 24 hours.
                  </p>
                </div>

                <div className="flex items-start gap-3 mt-4">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={requestState.consent}
                    onChange={(e) => handleBriefChange('consent', e.target.checked)}
                    className="w-4 h-4 text-brand-red bg-bg-surface border-bg-border rounded focus:ring-brand-red focus:ring-offset-bg-base mt-0.5"
                  />
                  <label htmlFor="consent" className="text-xs text-text-secondary select-none">
                    I confirm that the information provided is accurate and I agree to be contacted by Studio99 Digital regarding my inquiry. <span className="text-brand-red">*</span>
                  </label>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8 pt-4 border-t border-bg-border">
        <button
          onClick={() => setStep(s => s - 1)}
          disabled={step === 1}
          className="px-6 py-2.5 rounded-lg font-medium text-text-secondary hover:text-text-primary disabled:opacity-30 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={() => step < totalSteps ? setStep(s => s + 1) : handleSubmit()}
          disabled={isNextDisabled() || isSubmitting}
          className="bg-brand-red hover:bg-red-600 disabled:opacity-50 text-white px-8 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          {isSubmitting && step === totalSteps && (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {step === totalSteps
            ? (isSubmitting ? 'Submitting...' : 'Request a Free Consultation')
            : 'Continue'
          }
        </button>
      </div>
    </AppModal>
  );
}
