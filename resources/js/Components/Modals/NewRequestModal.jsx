import React, { useState, useEffect } from 'react';
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
  CalendarIcon
} from 'lucide-react';

// Steps components
function SelectServiceStep({ selected, onSelect }) {
  const services = [
    { id: 3, name: 'Graphics Design', icon: PenTool, desc: 'Logos, branding, UI/UX, marketing materials' },
    { id: 2, name: 'Video Editing', icon: MonitorPlay, desc: 'Commercials, reels, YouTube, motion graphics' },
    { id: 1, name: 'Web Development', icon: Code, desc: 'Landing pages, web apps, e-commerce' },
    { id: 4, name: 'Social Media', icon: Share2, desc: 'Content creation, management, strategy' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {services.map((s, idx) => (
        <div
          key={idx}
          onClick={() => onSelect(s.id)}
          className={`cursor-pointer p-4 rounded-xl border transition-all ${selected === s.id
            ? 'bg-brand-red/20 border-brand-red shadow-[0_0_15px_rgba(227,30,36,0.2)]'
            : 'bg-bg-card border-bg-border hover:border-brand-red/50 hover:bg-bg-card-hover'
            }`}
        >
          <s.icon className={`w-8 h-8 mb-3 ${selected === s.id ? 'text-brand-red' : 'text-text-secondary'}`} />
          <h4 className="font-bold text-text-primary text-lg mb-1">{s.name}</h4>
          <p className="text-sm text-text-secondary leading-snug">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}

function SelectPackageStep({ serviceId, selected, onSelect }) {
  // Use packages based on the selected service
  let packages = [];
  if (serviceId === 1) {
    packages = [
      { id: 1, name: 'Landing Page', price: '₦750,000', features: ['1 Concept', '2 Revisions', '3 Days Delivery'] },
      { id: 2, name: 'Corporate Website', price: '₦2,250,000', features: ['3 Concepts', 'Unlimited Revisions', 'Source Files'], popular: true },
      { id: 3, name: 'E-Commerce Store', price: '₦4,500,000', features: ['Dedicated Team', 'Full Ownership', '24/7 Support'] },
    ];
  } else if (serviceId === 2) {
    packages = [
      { id: 4, name: 'Short Form', price: '₦150,000', features: ['1 Concept', '2 Revisions', '3 Days Delivery'] },
      { id: 5, name: 'YouTube Long Form', price: '₦525,000', features: ['3 Concepts', 'Unlimited Revisions', 'Source Files'], popular: true },
      { id: 6, name: 'Monthly Retainer', price: '₦2,250,000', features: ['Dedicated Team', 'Full Ownership', '24/7 Support'] },
    ];
  } else if (serviceId === 3) {
    packages = [
      { id: 7, name: 'Logo & Branding', price: '₦1,200,000', features: ['1 Concept', '2 Revisions', '3 Days Delivery'] },
      { id: 8, name: 'Social Media Templates', price: '₦450,000', features: ['3 Concepts', 'Unlimited Revisions', 'Source Files'], popular: true },
    ];
  } else {
    packages = [
      { id: 9, name: 'Starter Monthly', price: '₦750,000', features: ['Content Creation', 'Community Management', 'Monthly Report'] },
      { id: 10, name: 'Pro Monthly', price: '₦1,800,000', features: ['Daily Posts', 'Ads Management', 'Full Strategy'], popular: true },
    ];
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {packages.map(p => (
        <div
          key={p.id}
          onClick={() => onSelect(p.id)}
          className={`relative cursor-pointer p-5 rounded-xl border transition-all ${selected === p.id
            ? 'bg-brand-red/10 border-brand-red shadow-[0_0_15px_rgba(227,30,36,0.15)]'
            : 'bg-bg-card border-bg-border hover:border-brand-red/50'
            }`}
        >
          {p.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-red to-[#EC4899] text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full">
              Most Popular
            </div>
          )}
          <h4 className="font-bold text-text-primary text-lg mb-1">{p.name}</h4>
          <div className="text-2xl font-display font-bold text-text-primary mb-4">{p.price}</div>
          <ul className="space-y-2">
            {p.features.map((f, i) => (
              <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ProjectDetailsStep({ details, onChange }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">Project Title</label>
        <input
          type="text"
          value={details.title}
          onChange={e => onChange({ ...details, title: e.target.value })}
          className="w-full bg-bg-card border border-bg-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
          placeholder="e.g. Acme Corp Rebranding"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">Description</label>
        <textarea
          rows={4}
          value={details.description}
          onChange={e => onChange({ ...details, description: e.target.value })}
          className="w-full bg-bg-card border border-bg-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red resize-none"
          placeholder="Describe your requirements in detail..."
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Desired Deadline</label>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={details.deadline}
              onChange={e => onChange({ ...details, deadline: e.target.value })}
              className="w-full bg-bg-card border border-bg-border rounded-lg pl-10 pr-4 py-2.5 text-text-primary focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red dark:[&::-webkit-calendar-picker-indicator]:filter dark:[&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Reference Links (Optional)</label>
          <input
            type="text"
            value={details.links}
            onChange={e => onChange({ ...details, links: e.target.value })}
            className="w-full bg-bg-card border border-bg-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
            placeholder="https://..."
          />
        </div>
      </div>
    </div>
  );
}

function UploadFilesStep({ files = [], onChange }) {
  const fileInputRef = React.useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      onChange([...files, ...newFiles].slice(0, 5));

      // Clear the input value so the same file can be selected again after removal
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onChange(newFiles);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      onChange([...files, ...newFiles].slice(0, 5));
    }
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-bg-border rounded-xl p-10 flex flex-col items-center justify-center text-center hover:border-brand-red/50 transition-colors bg-bg-card/50 cursor-pointer"
      >
        <UploadCloud className="w-12 h-12 text-brand-red mb-4" />
        <h4 className="text-text-primary font-medium mb-1">Click to upload or drag and drop</h4>
        <p className="text-sm text-text-secondary">SVG, PNG, JPG, PDF, DOCX or ZIP (max. 10MB per file, 5 files max)</p>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept=".svg,.png,.jpg,.jpeg,.pdf,.docx,.zip"
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-2 mt-4">
          <p className="text-sm font-medium text-text-secondary mb-2">Attached Files ({files.length}/5)</p>
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-bg-card border border-bg-border rounded-lg">
              <div className="flex items-center gap-3 overflow-hidden">
                <File className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div className="truncate">
                  <p className="text-sm text-text-primary font-medium truncate">{file.name}</p>
                  <p className="text-xs text-text-secondary">{formatSize(file.size)}</p>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                className="text-text-secondary hover:text-red-400 text-sm font-medium flex-shrink-0 ml-4"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ReviewStep({ state }) {
  return (
    <div className="space-y-6">
      <div className="bg-bg-card border border-bg-border rounded-xl p-5">
        <h4 className="text-lg font-bold text-text-primary mb-4">Request Summary</h4>

        <dl className="space-y-4">
          <div className="grid grid-cols-3 gap-4 pb-4 border-b border-bg-border">
            <dt className="text-sm text-text-secondary">Service</dt>
            <dd className="col-span-2 text-sm font-medium text-text-primary capitalize">{state.serviceId || 'Not selected'}</dd>
          </div>
          <div className="grid grid-cols-3 gap-4 pb-4 border-b border-bg-border">
            <dt className="text-sm text-text-secondary">Package</dt>
            <dd className="col-span-2 text-sm font-medium text-text-primary capitalize">{state.packageId || 'Not selected'}</dd>
          </div>
          <div className="grid grid-cols-3 gap-4 pb-4 border-b border-bg-border">
            <dt className="text-sm text-text-secondary">Title</dt>
            <dd className="col-span-2 text-sm font-medium text-text-primary">{state.details.title || 'Untitled'}</dd>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <dt className="text-sm text-text-secondary">Deadline</dt>
            <dd className="col-span-2 text-sm font-medium text-text-primary">{state.details.deadline || 'Not specified'}</dd>
          </div>
        </dl>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3">
        <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
        <p className="text-sm text-blue-900 dark:text-blue-100">
          Once you submit, our team will review your requirements and follow up within 24 hours to confirm the scope.
        </p>
      </div>
    </div>
  );
}

export function NewRequestModal({ open, onClose, onSubmitRequest }) {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [requestState, setRequestState] = useState({
    serviceId: null,
    packageId: null,
    details: { title: '', description: '', deadline: '', links: '' },
    referenceFiles: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setStep(1);
      setRequestState({
        serviceId: null,
        packageId: null,
        details: { title: '', description: '', deadline: '', links: '' },
        referenceFiles: []
      });
      setIsSubmitting(false);
    }
  }, [open]);

  const { auth } = usePage().props;

  const handleSubmit = () => {
    if (!auth.user) {
      toast("Please create an account to submit your request.", {
        description: "You need to be logged in to track and manage your projects.",
        icon: '🔒',
        duration: 8000,
      });
      onClose();
      if (onSubmitRequest) {
        // We can reuse the onSubmitRequest prop for the auth fallback on public pages
        onSubmitRequest(null);
      }
      return;
    }

    setIsSubmitting(true);
    const payload = {
      service_id: requestState.serviceId,
      package_id: requestState.packageId,
      title: requestState.details.title,
      description: requestState.details.links ? `${requestState.details.description}\n\nReference Links: ${requestState.details.links}` : requestState.details.description,
      deadline: requestState.details.deadline,
      reference_files: requestState.referenceFiles
    };

    router.post('/client/requests', payload, {
      onSuccess: () => {
        toast.success("Your request has been successfully received and is currently awaiting review.");
        onClose();
      },
      onError: (errors) => {
        console.error("Validation Errors:", errors);
        toast.error("There was an error submitting your request. Please ensure all details are filled.");
      },
      onFinish: () => {
        setIsSubmitting(false);
      }
    });
  };

  const isNextDisabled = () => {
    if (step === 1 && !requestState.serviceId) return true;
    if (step === 2 && !requestState.packageId) return true;
    if (step === 3 && !requestState.details.title) return true;
    return false;
  };

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title="Start New Project"
      size="xl"
    >
      {/* Progress bar */}
      <div className="flex gap-2 mb-8 mt-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i + 1 <= step
              ? 'bg-gradient-to-r from-brand-red to-[#EC4899]'
              : 'bg-bg-border'
              }`}
          />
        ))}
      </div>

      {/* Step content */}
      <div className="min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {step === 1 && (
              <SelectServiceStep
                selected={requestState.serviceId}
                onSelect={(id) => setRequestState(s => ({ ...s, serviceId: id }))}
              />
            )}
            {step === 2 && (
              <SelectPackageStep
                serviceId={requestState.serviceId}
                selected={requestState.packageId}
                onSelect={(id) => setRequestState(s => ({ ...s, packageId: id }))}
              />
            )}
            {step === 3 && (
              <ProjectDetailsStep
                details={requestState.details}
                onChange={(details) => setRequestState(s => ({ ...s, details }))}
              />
            )}
            {step === 4 && <UploadFilesStep
              files={requestState.referenceFiles}
              onChange={(files) => setRequestState(s => ({ ...s, referenceFiles: files }))}
            />}
            {step === 5 && <ReviewStep state={requestState} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8 pt-4 border-t border-bg-border">
        <button
          onClick={() => setStep(s => s - 1)}
          disabled={step === 1}
          className="px-6 py-2.5 rounded-lg font-medium text-text-secondary hover:text-text-primary disabled:opacity-30 disabled:hover:text-text-secondary transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => step < totalSteps ? setStep(s => s + 1) : handleSubmit()}
          disabled={isNextDisabled() || isSubmitting}
          className="bg-brand-red hover:bg-[#5b32be] disabled:opacity-50 disabled:hover:bg-brand-red disabled:cursor-not-allowed text-white px-8 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          {isSubmitting && step === totalSteps && (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {step === totalSteps ? (isSubmitting ? 'Submitting...' : 'Submit Request') : 'Continue'}
        </button>
      </div>
    </AppModal>
  );
}
