import React, { useState } from 'react';
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
    { id: 'graphics', name: 'Graphics Design', icon: PenTool, desc: 'Logos, branding, UI/UX, marketing materials' },
    { id: 'video', name: 'Video Editing', icon: MonitorPlay, desc: 'Commercials, reels, YouTube, motion graphics' },
    { id: 'web', name: 'Web Development', icon: Code, desc: 'Landing pages, web apps, e-commerce' },
    { id: 'social', name: 'Social Media', icon: Share2, desc: 'Content creation, management, strategy' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {services.map(s => (
        <div 
          key={s.id}
          onClick={() => onSelect(s.id)}
          className={`cursor-pointer p-4 rounded-xl border transition-all ${
            selected === s.id 
              ? 'bg-[#6C3CE1]/20 border-[#6C3CE1] shadow-[0_0_15px_rgba(108,60,225,0.2)]' 
              : 'bg-[#1A1A28] border-[#2A2A3A] hover:border-[#6C3CE1]/50 hover:bg-[#1A1A28]/80'
          }`}
        >
          <s.icon className={`w-8 h-8 mb-3 ${selected === s.id ? 'text-[#6C3CE1]' : 'text-[#94A3B8]'}`} />
          <h4 className="font-bold text-white text-lg mb-1">{s.name}</h4>
          <p className="text-sm text-[#94A3B8] leading-snug">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}

function SelectPackageStep({ serviceId, selected, onSelect }) {
  // Simplified packages based on service (in reality, fetched from backend)
  const packages = [
    { id: 'starter', name: 'Starter', price: '$499', features: ['1 Concept', '2 Revisions', '3 Days Delivery'] },
    { id: 'pro', name: 'Professional', price: '$999', features: ['3 Concepts', 'Unlimited Revisions', 'Source Files', 'Priority Support'], popular: true },
    { id: 'enterprise', name: 'Enterprise', price: 'Custom', features: ['Dedicated Team', 'Full Ownership', '24/7 Support', 'Custom Deliverables'] },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {packages.map(p => (
        <div 
          key={p.id}
          onClick={() => onSelect(p.id)}
          className={`relative cursor-pointer p-5 rounded-xl border transition-all ${
            selected === p.id 
              ? 'bg-[#6C3CE1]/10 border-[#6C3CE1] shadow-[0_0_15px_rgba(108,60,225,0.15)]' 
              : 'bg-[#1A1A28] border-[#2A2A3A] hover:border-[#6C3CE1]/50'
          }`}
        >
          {p.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#6C3CE1] to-[#EC4899] text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full">
              Most Popular
            </div>
          )}
          <h4 className="font-bold text-white text-lg mb-1">{p.name}</h4>
          <div className="text-2xl font-display font-bold text-white mb-4">{p.price}</div>
          <ul className="space-y-2">
            {p.features.map((f, i) => (
              <li key={i} className="text-sm text-[#94A3B8] flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6C3CE1] shrink-0 mt-0.5" />
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
        <label className="block text-sm font-medium text-[#94A3B8] mb-1">Project Title</label>
        <input 
          type="text" 
          value={details.title}
          onChange={e => onChange({ ...details, title: e.target.value })}
          className="w-full bg-[#1A1A28] border border-[#2A2A3A] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#6C3CE1] focus:ring-1 focus:ring-[#6C3CE1]"
          placeholder="e.g. Acme Corp Rebranding"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#94A3B8] mb-1">Description</label>
        <textarea 
          rows={4}
          value={details.description}
          onChange={e => onChange({ ...details, description: e.target.value })}
          className="w-full bg-[#1A1A28] border border-[#2A2A3A] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#6C3CE1] focus:ring-1 focus:ring-[#6C3CE1] resize-none"
          placeholder="Describe your requirements in detail..."
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#94A3B8] mb-1">Desired Deadline</label>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input 
              type="date" 
              value={details.deadline}
              onChange={e => onChange({ ...details, deadline: e.target.value })}
              className="w-full bg-[#1A1A28] border border-[#2A2A3A] rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-[#6C3CE1] focus:ring-1 focus:ring-[#6C3CE1] [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#94A3B8] mb-1">Reference Links (Optional)</label>
          <input 
            type="text" 
            value={details.links}
            onChange={e => onChange({ ...details, links: e.target.value })}
            className="w-full bg-[#1A1A28] border border-[#2A2A3A] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#6C3CE1] focus:ring-1 focus:ring-[#6C3CE1]"
            placeholder="https://..."
          />
        </div>
      </div>
    </div>
  );
}

function UploadFilesStep() {
  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-[#2A2A3A] rounded-xl p-10 flex flex-col items-center justify-center text-center hover:border-[#6C3CE1]/50 transition-colors bg-[#1A1A28]/50 cursor-pointer">
        <UploadCloud className="w-12 h-12 text-[#6C3CE1] mb-4" />
        <h4 className="text-white font-medium mb-1">Click to upload or drag and drop</h4>
        <p className="text-sm text-[#94A3B8]">SVG, PNG, JPG, PDF or MP4 (max. 100MB)</p>
      </div>
      
      {/* Placeholder file list */}
      <div className="space-y-2 mt-4">
        <p className="text-sm font-medium text-[#94A3B8] mb-2">Attached Files</p>
        <div className="flex items-center justify-between p-3 bg-[#1A1A28] border border-[#2A2A3A] rounded-lg">
          <div className="flex items-center gap-3">
            <File className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-sm text-white font-medium">brand_guidelines.pdf</p>
              <p className="text-xs text-[#94A3B8]">2.4 MB</p>
            </div>
          </div>
          <button className="text-[#94A3B8] hover:text-red-400 text-sm font-medium">Remove</button>
        </div>
      </div>
    </div>
  );
}

function ReviewStep({ state }) {
  return (
    <div className="space-y-6">
      <div className="bg-[#1A1A28] border border-[#2A2A3A] rounded-xl p-5">
        <h4 className="text-lg font-bold text-white mb-4">Request Summary</h4>
        
        <dl className="space-y-4">
          <div className="grid grid-cols-3 gap-4 pb-4 border-b border-[#2A2A3A]">
            <dt className="text-sm text-[#94A3B8]">Service</dt>
            <dd className="col-span-2 text-sm font-medium text-white capitalize">{state.serviceId || 'Not selected'}</dd>
          </div>
          <div className="grid grid-cols-3 gap-4 pb-4 border-b border-[#2A2A3A]">
            <dt className="text-sm text-[#94A3B8]">Package</dt>
            <dd className="col-span-2 text-sm font-medium text-white capitalize">{state.packageId || 'Not selected'}</dd>
          </div>
          <div className="grid grid-cols-3 gap-4 pb-4 border-b border-[#2A2A3A]">
            <dt className="text-sm text-[#94A3B8]">Title</dt>
            <dd className="col-span-2 text-sm font-medium text-white">{state.details.title || 'Untitled'}</dd>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <dt className="text-sm text-[#94A3B8]">Deadline</dt>
            <dd className="col-span-2 text-sm font-medium text-white">{state.details.deadline || 'Not specified'}</dd>
          </div>
        </dl>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3">
        <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
        <p className="text-sm text-blue-100">
          Once you submit, our team will review your requirements and follow up within 24 hours to confirm the scope.
        </p>
      </div>
    </div>
  );
}

export function NewRequestModal({ open, onClose }) {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [requestState, setRequestState] = useState({
    serviceId: null,
    packageId: null,
    details: { title: '', description: '', deadline: '', links: '' }
  });

  // Reset state when opened
  React.useEffect(() => {
    if (open) setStep(1);
  }, [open]);

  const handleSubmit = () => {
    console.log("Submitting:", requestState);
    // Here we'd use Inertia.post
    onClose();
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
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i + 1 <= step 
                ? 'bg-gradient-to-r from-[#6C3CE1] to-[#EC4899]' 
                : 'bg-[#2A2A3A]'
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
                onSelect={(id) => setRequestState(s => ({...s, serviceId: id}))} 
              />
            )}
            {step === 2 && (
              <SelectPackageStep 
                serviceId={requestState.serviceId} 
                selected={requestState.packageId} 
                onSelect={(id) => setRequestState(s => ({...s, packageId: id}))} 
              />
            )}
            {step === 3 && (
              <ProjectDetailsStep 
                details={requestState.details} 
                onChange={(details) => setRequestState(s => ({...s, details}))} 
              />
            )}
            {step === 4 && <UploadFilesStep />}
            {step === 5 && <ReviewStep state={requestState} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8 pt-4 border-t border-[#2A2A3A]">
        <button
          onClick={() => setStep(s => s - 1)}
          disabled={step === 1}
          className="px-6 py-2.5 rounded-lg font-medium text-[#94A3B8] hover:text-white disabled:opacity-30 disabled:hover:text-[#94A3B8] transition-colors"
        >
          Back
        </button>
        <button 
          onClick={() => step < totalSteps ? setStep(s => s + 1) : handleSubmit()}
          disabled={isNextDisabled()}
          className="bg-[#6C3CE1] hover:bg-[#5b32be] disabled:opacity-50 disabled:hover:bg-[#6C3CE1] text-white px-8 py-2.5 rounded-lg font-medium transition-colors"
        >
          {step === totalSteps ? 'Submit Request' : 'Continue'}
        </button>
      </div>
    </AppModal>
  );
}
