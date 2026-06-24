import React, { useState, useRef } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout';
import { 
  Monitor, PenTool, Smartphone, Film, Share2, Megaphone, Type, Star, MoreHorizontal,
  CheckCircle2, MessageSquare, ArrowRight, ClipboardList,
  UploadCloud, Eye, Trash2, Image as ImageIcon, FileText, Video, ExternalLink, Calendar,
  ArrowLeft, Send, Check, Edit2, ShieldCheck, Clock, HeadphonesIcon, Paperclip
} from 'lucide-react';

export default function Create({ auth, services = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        // Step 1
        service_id: '',
        // Step 2
        project_name: '',
        project_category: '',
        deadline: '',
        budget_range: '',
        project_description: '',
        project_goals: [],
        // Step 3
        brand_info: '',
        problem_to_solve: '',
        competitors: '',
        existing_content: '',
        tone_of_voice: '',
        key_message: '',
        reference_websites: '',
        language: 'English',
        complexity: 'Medium',
        revisions: '2 Revisions Included',
        communication: '',
        referral_source: '',
        additional_notes: '',
        // Step 4
        files: [],
        file_categories: [],
        file_instructions: '',
    });

    const [currentStep, setCurrentStep] = useState(1);
    const fileInputRef = useRef(null);

    // Mock services if empty
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
      { id: 3, name: 'Additional Information' },
      { id: 4, name: 'Upload Files' },
      { id: 5, name: 'Review & Submit' }
    ];

    const selectedServiceDetails = displayServices.find(s => s.id === data.service_id);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/client/requests');
    };

    const handleNext = () => {
      if (currentStep < 5) {
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

    const toggleGoal = (goal) => {
      const newGoals = data.project_goals.includes(goal) 
        ? data.project_goals.filter(g => g !== goal)
        : [...data.project_goals, goal];
      setData('project_goals', newGoals);
    };

    const toggleFileCategory = (cat) => {
      const newCats = data.file_categories.includes(cat)
        ? data.file_categories.filter(c => c !== cat)
        : [...data.file_categories, cat];
      setData('file_categories', newCats);
    };

    const handleFileChange = (e) => {
      if (e.target.files) {
        const newFiles = Array.from(e.target.files);
        setData('files', [...data.files, ...newFiles.map(f => ({
            name: f.name,
            size: (f.size / (1024 * 1024)).toFixed(1) + ' MB',
            type: f.type,
            raw: f
        }))]);
      }
    };

    const removeFile = (index) => {
      const newFiles = [...data.files];
      newFiles.splice(index, 1);
      setData('files', newFiles);
    };

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
              <p className="text-text-secondary">Fill out the details below to request a service. Our team will review your request and get back to you.</p>
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
                
                {/* STEP 1 */}
                {currentStep === 1 && (
                  <div className="animate-in fade-in duration-300">
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-text-primary mb-1">1. Select a Service</h2>
                      <p className="text-sm text-text-secondary">Choose the type of service you need.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
                      {displayServices.map((service) => {
                        const isActive = data.service_id === service.id;
                        return (
                          <div 
                            key={service.id}
                            onClick={() => setData('service_id', service.id)}
                            className={`relative bg-bg-surface border rounded-xl p-5 cursor-pointer transition-all ${
                              isActive 
                                ? 'border-brand-red shadow-[0_0_15px_rgba(220,38,38,0.15)] scale-[1.02]' 
                                : 'border-bg-border hover:border-text-primary'
                            }`}
                          >
                            {isActive && (
                              <div className="absolute top-3 right-3 w-5 h-5 bg-brand-red rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                              </div>
                            )}
                            <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center transition-colors ${
                              isActive ? 'bg-brand-red/10' : 'bg-bg-card group-hover:bg-bg-border'
                            }`}>
                              {getServiceIcon(service.icon, isActive)}
                            </div>
                            <h3 className="text-text-primary font-bold mb-2">{service.name}</h3>
                            <p className="text-xs text-text-secondary leading-relaxed">{service.desc}</p>
                          </div>
                        );
                      })}
                    </div>

                    <button 
                      onClick={handleNext}
                      disabled={!data.service_id}
                      className="bg-brand-red hover:bg-red-600 disabled:bg-bg-border disabled:text-text-secondary text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-colors w-full sm:w-auto justify-center ml-auto"
                    >
                      Next Step <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* STEP 2 */}
                {currentStep === 2 && (
                  <div className="animate-in fade-in duration-300">
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-text-primary mb-1">Project Details</h2>
                      <p className="text-sm text-text-secondary">Provide the basic details about your project.</p>
                    </div>

                    <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 mb-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-text-primary mb-2">Project Name <span className="text-brand-red">*</span></label>
                                <input type="text" value={data.project_name} onChange={e => setData('project_name', e.target.value)} placeholder="e.g. Studio99 Brand Identity Design" className="w-full bg-bg-card border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-text-primary mb-2">Project Category <span className="text-brand-red">*</span></label>
                                <input type="text" value={data.project_category} onChange={e => setData('project_category', e.target.value)} placeholder="e.g. Logo Design" className="w-full bg-bg-card border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-text-primary mb-2">Deadline</label>
                                <div className="relative">
                                    <input type="date" value={data.deadline} onChange={e => setData('deadline', e.target.value)} className="w-full bg-bg-card border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 pl-10 transition-colors dark:[color-scheme:dark]" />
                                    <Calendar className="w-4 h-4 text-text-secondary absolute left-3.5 top-3.5 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-text-primary mb-2">Budget Range</label>
                                <select value={data.budget_range} onChange={e => setData('budget_range', e.target.value)} className="w-full bg-bg-card border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 transition-colors appearance-none">
                                    <option value="">Select a range</option>
                                    <option value="Under ₦50,000">Under ₦50,000</option>
                                    <option value="₦50,000 - ₦100,000">₦50,000 - ₦100,000</option>
                                    <option value="₦100,000 - ₦250,000">₦100,000 - ₦250,000</option>
                                    <option value="₦250,000 - ₦500,000">₦250,000 - ₦500,000</option>
                                    <option value="Over ₦500,000">Over ₦500,000</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-text-primary mb-2">Project Description <span className="text-brand-red">*</span></label>
                            <textarea value={data.project_description} onChange={e => setData('project_description', e.target.value)} placeholder="Describe what you need in detail..." rows="4" className="w-full bg-bg-card border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3 transition-colors resize-none"></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-text-primary mb-3">Project Goals</label>
                            <div className="flex flex-wrap gap-2">
                                {['Increase Brand Awareness', 'Improve Professional Image', 'Build Online Presence', 'Drive Sales', 'Refresh Brand Identity'].map(goal => (
                                    <button
                                        key={goal}
                                        type="button"
                                        onClick={() => toggleGoal(goal)}
                                        className={`px-4 py-2 text-sm rounded-full border transition-colors ${data.project_goals.includes(goal) ? 'bg-brand-red text-white border-brand-red' : 'bg-bg-card text-text-secondary border-bg-border hover:text-text-primary hover:border-text-primary'}`}
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
                        disabled={!data.project_name || !data.project_description || !data.project_category}
                        className="bg-brand-red hover:bg-red-600 disabled:bg-bg-border disabled:text-text-secondary text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
                      >
                        Continue to Additional Info <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {currentStep === 3 && (
                  <div className="animate-in fade-in duration-300">
                    <div className="mb-6">
                      <h2 className="text-2xl font-black text-text-primary mb-2 tracking-tight">Additional Information</h2>
                      <p className="text-sm text-text-secondary">Help us understand your project better. The more details you provide, the better we can deliver exactly what you need.</p>
                    </div>

                    {/* Section 1: Project Background */}
                    <div className="mb-8">
                        <h3 className="text-text-primary font-bold mb-4">Project Background</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm text-text-primary mb-2 font-medium">Tell us about your brand/business <span className="text-brand-red">*</span></label>
                                <textarea value={data.brand_info} onChange={e => setData('brand_info', e.target.value)} placeholder="Share information about your business, industry, mission, values, and what makes your brand unique." rows="4" className="w-full bg-bg-surface border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-4 transition-colors resize-none"></textarea>
                                <div className="text-xs text-text-secondary mt-2">{data.brand_info.length} / 1000</div>
                            </div>
                            <div>
                                <label className="block text-sm text-text-primary mb-2 font-medium">What problem are you trying to solve?</label>
                                <textarea value={data.problem_to_solve} onChange={e => setData('problem_to_solve', e.target.value)} placeholder="Describe the problem or challenge your business is facing that this project will help address." rows="4" className="w-full bg-bg-surface border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-4 transition-colors resize-none"></textarea>
                                <div className="text-xs text-text-secondary mt-2">{data.problem_to_solve.length} / 1000</div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-text-primary mb-2 font-medium">Who are your main competitors? (Optional)</label>
                            <input type="text" value={data.competitors} onChange={e => setData('competitors', e.target.value)} placeholder="Enter competitor names or websites" className="w-full bg-bg-surface border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3.5 transition-colors" />
                        </div>
                    </div>

                    {/* Section 2: Content & Messaging */}
                    <div className="mb-8">
                        <h3 className="text-text-primary font-bold mb-4">Content & Messaging</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm text-text-primary mb-2 font-medium">Do you have existing content or materials?</label>
                                <select value={data.existing_content} onChange={e => setData('existing_content', e.target.value)} className="w-full bg-bg-surface border border-bg-border text-text-secondary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3.5 transition-colors appearance-none">
                                    <option value="">Select an option</option>
                                    <option value="Yes, I have everything">Yes, I have everything</option>
                                    <option value="I have some, need help with rest">I have some, need help with rest</option>
                                    <option value="No, I need everything created">No, I need everything created</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-text-primary mb-2 font-medium">Preferred tone of voice</label>
                                <select value={data.tone_of_voice} onChange={e => setData('tone_of_voice', e.target.value)} className="w-full bg-bg-surface border border-bg-border text-text-secondary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3.5 transition-colors appearance-none">
                                    <option value="">Select an option</option>
                                    <option value="Professional & Corporate">Professional & Corporate</option>
                                    <option value="Friendly & Approachable">Friendly & Approachable</option>
                                    <option value="Modern & Innovative">Modern & Innovative</option>
                                    <option value="Playful & Fun">Playful & Fun</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-text-primary mb-2 font-medium">Key message you want your audience to remember</label>
                            <textarea value={data.key_message} onChange={e => setData('key_message', e.target.value)} placeholder="What is the most important message you want your audience to take away?" rows="3" className="w-full bg-bg-surface border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-4 transition-colors resize-none"></textarea>
                            <div className="text-xs text-text-secondary mt-2">{data.key_message.length} / 500</div>
                        </div>
                    </div>

                    {/* Section 3: Design & Inspiration */}
                    <div className="mb-8">
                        <h3 className="text-text-primary font-bold mb-4">Design & Inspiration</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-text-primary mb-2 font-medium">Share design or style inspiration (Optional)</label>
                                <div className="border border-dashed border-[#4A4A4A] hover:border-brand-red transition-colors rounded-xl bg-bg-surface p-6 text-center cursor-pointer flex flex-col items-center justify-center min-h-[140px]">
                                    <UploadCloud className="w-8 h-8 text-brand-red mb-3" />
                                    <p className="text-sm text-text-primary font-medium mb-1">Upload reference images</p>
                                    <p className="text-xs text-text-secondary mb-3">PNG, JPG or PDF (Max. 10MB)</p>
                                    <button className="bg-bg-card border border-bg-border text-text-primary text-xs px-4 py-2 rounded-lg hover:bg-bg-border transition-colors">Upload Files</button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-text-primary mb-2 font-medium">Any reference websites or examples you like?</label>
                                <textarea value={data.reference_websites} onChange={e => setData('reference_websites', e.target.value)} placeholder="Enter website links (one per line)&#10;e.g. https://example.com&#10;https://inspiration.com" rows="5" className="w-full bg-bg-surface border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-4 transition-colors resize-none h-[140px]"></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Project Preferences */}
                    <div className="mb-8">
                        <h3 className="text-text-primary font-bold mb-4">Project Preferences</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div>
                                <label className="block text-sm text-text-primary mb-2 font-medium">Language</label>
                                <select value={data.language} onChange={e => setData('language', e.target.value)} className="w-full bg-bg-surface border border-bg-border text-text-secondary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3.5 transition-colors appearance-none">
                                    <option value="English">English</option>
                                    <option value="French">French</option>
                                    <option value="Spanish">Spanish</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-text-primary mb-2 font-medium">Project Complexity</label>
                                <select value={data.complexity} onChange={e => setData('complexity', e.target.value)} className="w-full bg-bg-surface border border-bg-border text-text-secondary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3.5 transition-colors appearance-none">
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-text-primary mb-2 font-medium">Revision Preference</label>
                                <select value={data.revisions} onChange={e => setData('revisions', e.target.value)} className="w-full bg-bg-surface border border-bg-border text-text-secondary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3.5 transition-colors appearance-none">
                                    <option value="1 Revision">1 Revision</option>
                                    <option value="2 Revisions Included">2 Revisions Included</option>
                                    <option value="Unlimited">Unlimited</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-text-primary mb-2 font-medium">Communication Preference</label>
                                <select value={data.communication} onChange={e => setData('communication', e.target.value)} className="w-full bg-bg-surface border border-bg-border text-text-secondary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3.5 transition-colors appearance-none">
                                    <option value="">Select an option</option>
                                    <option value="Platform Messages">Platform Messages</option>
                                    <option value="Email">Email</option>
                                    <option value="Phone Call">Phone Call</option>
                                    <option value="Video Call">Video Call</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-text-primary mb-2 font-medium">How did you hear about us?</label>
                                <select value={data.referral_source} onChange={e => setData('referral_source', e.target.value)} className="w-full bg-bg-surface border border-bg-border text-text-secondary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3.5 transition-colors appearance-none">
                                    <option value="">Select an option</option>
                                    <option value="Social Media">Social Media</option>
                                    <option value="Search Engine">Search Engine</option>
                                    <option value="Friend/Colleague">Friend / Colleague</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 5: Additional Notes */}
                    <div className="mb-8">
                        <h3 className="text-text-primary font-bold mb-4">Additional Notes</h3>
                        <div>
                            <label className="block text-sm text-text-primary mb-2 font-medium">Anything else you want us to know?</label>
                            <textarea value={data.additional_notes} onChange={e => setData('additional_notes', e.target.value)} placeholder="Share any additional information, special requests, or important details..." rows="4" className="w-full bg-bg-surface border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-4 transition-colors resize-none"></textarea>
                            <div className="text-xs text-text-secondary mt-2">{data.additional_notes.length} / 1000</div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <button onClick={handleBack} className="text-text-secondary hover:text-text-primary font-bold flex items-center gap-2 transition-colors">
                        <ArrowLeft className="w-5 h-5" /> Back
                      </button>
                      <button 
                        onClick={handleNext}
                        className="bg-brand-red hover:bg-red-600 text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
                      >
                        Continue to Upload Files <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4 */}
                {currentStep === 4 && (
                  <div className="animate-in fade-in duration-300">
                    <div className="mb-6">
                      <h2 className="text-2xl font-black text-text-primary mb-2 tracking-tight">Upload Files</h2>
                      <p className="text-sm text-text-secondary">Upload any files, documents, images or references that will help our team better understand your project requirements.</p>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-text-primary font-bold mb-4">Upload Your Files</h3>
                        <p className="text-sm text-text-secondary mb-4">You can upload multiple files. Supported formats: JPG, PNG, PDF, DOC, MP4, ZIP (Max 50MB per file)</p>
                        
                        <div 
                            className="border-2 border-dashed border-bg-border hover:border-brand-red transition-colors rounded-2xl bg-bg-surface p-10 text-center cursor-pointer flex flex-col items-center justify-center"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input 
                                type="file" 
                                multiple 
                                className="hidden" 
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                            <UploadCloud className="w-12 h-12 text-brand-red mb-4" />
                            <p className="text-text-primary font-medium mb-2">Drag & drop files here</p>
                            <p className="text-sm text-text-secondary mb-4">or</p>
                            <button className="bg-brand-red hover:bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold transition-colors">Browse Files</button>
                        </div>
                        <div className="flex justify-between items-center mt-3 text-xs font-medium">
                            <span className="text-text-secondary flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> You can upload up to 10 files, 50MB each</span>
                            <span className="text-green-500">{data.files.length} files uploaded</span>
                        </div>
                    </div>

                    {data.files.length > 0 && (
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-text-primary font-bold text-sm">Uploaded Files ({data.files.length}/10)</h3>
                                <span className="text-xs text-text-secondary">Total Size: {data.files.reduce((acc, file) => acc + parseFloat(file.size), 0).toFixed(1)} MB</span>
                            </div>
                            <div className="space-y-3">
                                {data.files.map((file, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-bg-surface border border-bg-border rounded-xl hover:border-bg-border transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${file.type.includes('pdf') ? 'bg-red-500/10 text-red-500' : file.type.includes('image') ? 'bg-blue-500/10 text-blue-500' : file.type.includes('video') ? 'bg-purple-500/10 text-purple-500' : 'bg-bg-card text-text-primary'}`}>
                                                {file.type.includes('pdf') ? <FileText className="w-5 h-5" /> : file.type.includes('image') ? <ImageIcon className="w-5 h-5" /> : file.type.includes('video') ? <Video className="w-5 h-5" /> : <Paperclip className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-text-primary mb-0.5 truncate max-w-[200px] sm:max-w-xs">{file.name}</h4>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs text-text-secondary font-medium hidden sm:inline-block">{file.size}</span>
                                            <div className="flex items-center gap-2">
                                                <button className="w-8 h-8 rounded-lg hover:bg-bg-border flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => removeFile(idx)} className="w-8 h-8 rounded-lg hover:bg-red-500/10 flex items-center justify-center text-brand-red transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="mt-4 text-xs font-bold text-text-primary border border-bg-border bg-bg-surface hover:bg-bg-card px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                                + Add More Files
                            </button>
                        </div>
                    )}

                    <div className="mb-8 pt-8 border-t border-bg-border">
                        <h3 className="text-text-primary font-bold mb-2 text-sm">File Categories (Optional)</h3>
                        <p className="text-xs text-text-secondary mb-4">Help us understand your uploaded files better by categorizing them.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { id: 'brand', title: 'Brand References', desc: 'Logos, brand guidelines, brand assets', icon: <CheckCircle2 className="w-4 h-4" /> },
                                { id: 'inspiration', title: 'Design Inspiration', desc: 'Examples of styles, layouts, or designs', icon: <PenTool className="w-4 h-4" /> },
                                { id: 'content', title: 'Content Materials', desc: 'Text docs, content, copy documents', icon: <FileText className="w-4 h-4" /> },
                                { id: 'images', title: 'Images & Photos', desc: 'Product photos, team photos, or images', icon: <ImageIcon className="w-4 h-4" /> },
                                { id: 'video', title: 'Videos & Audio', desc: 'Video references, voice notes, audio files', icon: <Video className="w-4 h-4" /> },
                                { id: 'other', title: 'Other Files', desc: 'Any other related documents or files', icon: <Paperclip className="w-4 h-4" /> }
                            ].map(cat => {
                                const isSelected = data.file_categories.includes(cat.id);
                                return (
                                    <div 
                                        key={cat.id} 
                                        onClick={() => toggleFileCategory(cat.id)}
                                        className={`relative border rounded-xl p-4 cursor-pointer transition-colors ${isSelected ? 'bg-brand-red/5 border-brand-red' : 'bg-bg-surface border-bg-border hover:border-text-primary'}`}
                                    >
                                        {isSelected && (
                                            <div className="absolute top-3 right-3 w-4 h-4 bg-brand-red rounded-full flex items-center justify-center">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                        )}
                                        <div className={`flex items-center gap-2 mb-2 ${isSelected ? 'text-brand-red' : 'text-text-primary'}`}>
                                            {cat.icon}
                                            <h4 className="text-sm font-bold">{cat.title}</h4>
                                        </div>
                                        <p className="text-[10px] text-text-secondary leading-relaxed">{cat.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-text-primary font-bold mb-2 text-sm">Additional Instructions (Optional)</h3>
                        <p className="text-xs text-text-secondary mb-3">Provide any specific instructions for our team regarding the uploaded files.</p>
                        <textarea value={data.file_instructions} onChange={e => setData('file_instructions', e.target.value)} placeholder="Example: Please focus on the modern style references. The logo should be minimal..." rows="3" className="w-full bg-bg-surface border border-bg-border text-text-primary text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-4 transition-colors resize-none"></textarea>
                        <div className="text-xs text-text-secondary mt-2">{data.file_instructions.length} / 500</div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-bg-border">
                      <button onClick={handleBack} className="text-text-secondary hover:text-text-primary font-bold flex items-center gap-2 transition-colors">
                        <ArrowLeft className="w-5 h-5" /> Back
                      </button>
                      <button 
                        onClick={handleNext}
                        className="bg-brand-red hover:bg-red-600 text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
                      >
                        Continue to Review & Submit <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 5: REVIEW & SUBMIT */}
                {currentStep === 5 && (
                  <div className="animate-in fade-in duration-300">
                    <div className="mb-8">
                      <h2 className="text-3xl font-black text-text-primary mb-2 tracking-tight">Review & Submit</h2>
                      <p className="text-text-secondary text-sm">Please review all the information below before submitting your project request. You can go back and edit any section if needed.</p>
                    </div>

                    {/* Review Sections */}
                    <div className="space-y-6 mb-8">
                        
                        {/* 1. Project Details Summary */}
                        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-bg-border">
                                <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                                    <span className="text-text-secondary">1.</span> Project Details
                                </h3>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setCurrentStep(2)} className="text-xs font-bold text-text-primary bg-bg-card hover:bg-bg-border px-3 py-1.5 rounded-lg border border-bg-border transition-colors flex items-center gap-1.5">
                                        <Edit2 className="w-3 h-3" /> Edit
                                    </button>
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                                <div>
                                    <p className="text-xs font-bold text-text-secondary mb-1">Project Name</p>
                                    <p className="text-sm text-text-primary">{data.project_name || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-text-secondary mb-1">Project Description</p>
                                    <p className="text-sm text-text-secondary leading-relaxed">{data.project_description || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-text-secondary mb-1">Project Category</p>
                                    <p className="text-sm text-text-secondary">{data.project_category || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-text-secondary mb-1">Project Goals</p>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {data.project_goals.length > 0 ? data.project_goals.map(g => (
                                            <span key={g} className="text-xs bg-bg-card text-text-secondary px-2 py-1 rounded-md border border-bg-border">{g}</span>
                                        )) : <span className="text-sm text-text-secondary">N/A</span>}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-text-secondary mb-1">Deadline</p>
                                    <p className="text-sm text-text-secondary">{data.deadline || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-text-secondary mb-1">Budget Range</p>
                                    <p className="text-sm text-text-secondary">{data.budget_range || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        {/* 2. Additional Information Summary */}
                        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-bg-border">
                                <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                                    <span className="text-text-secondary">2.</span> Additional Information
                                </h3>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setCurrentStep(3)} className="text-xs font-bold text-text-primary bg-bg-card hover:bg-bg-border px-3 py-1.5 rounded-lg border border-bg-border transition-colors flex items-center gap-1.5">
                                        <Edit2 className="w-3 h-3" /> Edit
                                    </button>
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                                <div>
                                    <p className="text-xs font-bold text-text-secondary mb-1">Project Background</p>
                                    <p className="text-sm text-text-secondary line-clamp-2">{data.brand_info || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-text-secondary mb-1">Design Inspiration</p>
                                    <div className="flex gap-2 mt-1">
                                        <div className="w-10 h-10 rounded-lg bg-white border flex items-center justify-center overflow-hidden"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" alt="ref" className="w-6 h-6 object-contain"/></div>
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 border flex items-center justify-center"><h1 className="text-text-primary font-bold text-xs">N/A</h1></div>
                                        <div className="w-10 h-10 rounded-lg bg-white border flex items-center justify-center"><h1 className="text-black font-black text-xl">A</h1></div>
                                        <div className="w-10 h-10 rounded-lg bg-bg-card border border-bg-border flex items-center justify-center text-xs text-text-secondary">+2</div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-text-secondary mb-1">Main Competitors</p>
                                    <p className="text-sm text-text-secondary">{data.competitors || 'N/A'}</p>
                                </div>
                                <div className="row-span-2">
                                    <p className="text-xs font-bold text-text-secondary mb-1">Reference Websites</p>
                                    <p className="text-sm text-blue-400 whitespace-pre-line">{data.reference_websites ? data.reference_websites : '• https://stripe.com\n• https://invisionapp.com'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-text-secondary mb-1">Preferred Tone of Voice</p>
                                    <p className="text-sm text-text-secondary">{data.tone_of_voice || 'Professional, Innovative, Friendly'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-text-secondary mb-1">Key Message</p>
                                    <p className="text-sm text-text-secondary">{data.key_message || 'Empowering businesses with smart digital solutions.'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-text-secondary mb-1">Additional Notes</p>
                                    <p className="text-sm text-text-secondary">{data.additional_notes || 'Please keep the design minimal and versatile. We prefer a combination of icon and text in the logo.'}</p>
                                </div>
                            </div>
                        </div>

                        {/* 3. Uploaded Files Summary */}
                        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-bg-border">
                                <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                                    <span className="text-text-secondary">3.</span> Uploaded Files ({data.files.length})
                                </h3>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setCurrentStep(4)} className="text-xs font-bold text-text-primary bg-bg-card hover:bg-bg-border px-3 py-1.5 rounded-lg border border-bg-border transition-colors flex items-center gap-1.5">
                                        <Edit2 className="w-3 h-3" /> Edit
                                    </button>
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                </div>
                            </div>
                            {data.files.length > 0 ? (
                                <div className="space-y-2">
                                    {data.files.map((file, idx) => (
                                        <div key={idx} className="flex items-center justify-between py-2 border-b border-bg-card last:border-0">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded bg-bg-card flex items-center justify-center shrink-0`}>
                                                    {file.type.includes('pdf') ? <FileText className="w-4 h-4 text-red-500" /> : file.type.includes('image') ? <ImageIcon className="w-4 h-4 text-blue-500" /> : <Paperclip className="w-4 h-4 text-text-secondary" />}
                                                </div>
                                                <span className="text-sm text-text-primary">{file.name}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-xs text-text-secondary">{file.size}</span>
                                                <Eye className="w-4 h-4 text-text-secondary" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-text-secondary">No files uploaded.</p>
                            )}
                        </div>

                        {/* 4. Final Notes Summary */}
                        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                                    <span className="text-text-secondary">4.</span> Final Notes
                                </h3>
                            </div>
                            <p className="text-xs font-bold text-text-secondary mb-2">Anything else you want us to know?</p>
                            <p className="text-sm text-text-secondary">Looking forward to working with Studio99. Please let me know if you need any further information.</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <button onClick={handleBack} className="text-text-secondary hover:text-text-primary font-bold flex items-center gap-2 transition-colors">
                        <ArrowLeft className="w-5 h-5" /> Back
                      </button>
                      <form onSubmit={handleSubmit}>
                          <button 
                            type="submit"
                            disabled={processing}
                            className="bg-brand-red hover:bg-red-600 disabled:opacity-70 text-text-primary px-10 py-4 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-[0_4px_15px_rgba(227,30,36,0.2)]"
                          >
                            {processing ? 'Submitting...' : 'Submit Project Request'} <Send className="w-5 h-5 ml-1" />
                          </button>
                      </form>
                    </div>
                    
                    <div className="text-center mt-6 flex justify-center items-center gap-2 text-xs text-text-secondary font-medium">
                        <ShieldCheck className="w-4 h-4" />
                        Your information is secure and will only be used to deliver your project.
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
                        
                        {selectedServiceDetails && (
                            <div className="space-y-5">
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-text-secondary mb-1">Selected Service</p>
                                    <p className="text-sm font-bold text-brand-red">{selectedServiceDetails.name}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-text-secondary mb-1">Project Type</p>
                                    <p className="text-sm font-bold text-brand-red">{data.project_category || 'Logo Design'}</p>
                                </div>
                                <div className="border-t border-bg-border pt-5">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Calendar className="w-4 h-4 text-text-secondary" />
                                        <p className="text-[10px] uppercase font-bold text-text-secondary">Estimated Delivery</p>
                                    </div>
                                    <p className="text-sm font-bold text-text-primary flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-brand-red relative"><span className="absolute inset-0 bg-brand-red rounded-full animate-ping opacity-75"></span></span>
                                        3 - 5 Business Days
                                    </p>
                                </div>
                                <div className="border-t border-bg-border pt-5">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-4 h-4 rounded-full border border-[#9CA3AF] flex items-center justify-center text-text-secondary text-[8px] font-bold">₦</div>
                                        <p className="text-[10px] uppercase font-bold text-text-secondary">Estimated Cost</p>
                                    </div>
                                    <p className="text-xs text-text-secondary mb-0.5">Starting from</p>
                                    <p className="text-xl font-black text-brand-red tracking-tight">₦50,000</p>
                                </div>
                                <p className="text-[10px] text-text-secondary leading-relaxed pt-2">
                                    Final cost may vary based on project complexity and requirements.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Upload Tips (Shown on step 4) */}
                {currentStep === 4 && (
                    <div className="bg-bg-surface border border-bg-border rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-text-primary mb-4 flex items-center gap-2">
                            <span className="text-yellow-500">💡</span> Upload Tips
                        </h3>
                        <ul className="space-y-3 text-xs text-text-secondary">
                            <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> High quality files give us better understanding</li>
                            <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Include as many references as possible</li>
                            <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Add brand guidelines if available</li>
                            <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Include content or text documents</li>
                            <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Supported formats: JPG, PNG, PDF, DOC, MP4, ZIP</li>
                        </ul>
                        <button className="w-full mt-4 py-2 bg-bg-card hover:bg-bg-border border border-bg-border text-text-primary text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5">
                            View Guidelines <ExternalLink className="w-3 h-3" />
                        </button>
                    </div>
                )}

                {/* What Happens Next (Shown on step 5) */}
                {currentStep === 5 && (
                    <div className="bg-bg-surface border border-bg-border rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-text-primary mb-6 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red">?</span> What Happens Next?
                        </h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                <p className="text-xs text-text-secondary leading-relaxed">We will review your request within 24 hours</p>
                            </div>
                            <div className="flex gap-4">
                                <Clock className="w-5 h-5 text-text-secondary shrink-0" />
                                <p className="text-xs text-text-secondary leading-relaxed">Our team will contact you to discuss your project</p>
                            </div>
                            <div className="flex gap-4">
                                <FileText className="w-5 h-5 text-text-secondary shrink-0" />
                                <p className="text-xs text-text-secondary leading-relaxed">We will send you a proposal and timeline</p>
                            </div>
                            <div className="flex gap-4">
                                <ClipboardList className="w-5 h-5 text-text-secondary shrink-0" />
                                <p className="text-xs text-text-secondary leading-relaxed">Project kick-off after proposal approval</p>
                            </div>
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
                      <button className="w-full py-2.5 bg-brand-red hover:bg-red-600 text-text-primary rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-[0_4px_15px_rgba(227,30,36,0.2)]">
                        <MessageSquare className="w-4 h-4" /> Chat with Support
                      </button>
                      <button className="w-full py-2.5 bg-bg-card hover:bg-bg-border border border-bg-border text-text-primary rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors">
                        <Calendar className="w-4 h-4" /> Schedule Consultation
                      </button>
                  </div>
                </div>

                {/* Secure & Private */}
                {currentStep > 2 && (
                    <div className="bg-bg-surface border border-bg-border rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-text-primary mb-2 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-green-500" /> Secure & Private
                        </h3>
                        <p className="text-xs text-text-secondary mb-4 leading-relaxed">Your information is 100% secure and will only be used to deliver your project.</p>
                        <Link href="#" className="text-xs font-bold text-brand-red hover:text-red-400 transition-colors flex items-center gap-1">
                            Learn more <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                )}

                {/* Progress Bar */}
                {currentStep > 2 && (
                    <div className="bg-bg-surface border border-bg-border rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-text-primary mb-4">Request Progress</h3>
                        <p className="text-xs text-text-secondary mb-2">Step {currentStep} of 5</p>
                        <div className="w-full h-2 bg-bg-card rounded-full overflow-hidden mb-2 border border-bg-border">
                            <div className="h-full bg-brand-red transition-all duration-300" style={{ width: `${(currentStep / 5) * 100}%` }}></div>
                        </div>
                        <p className="text-[10px] text-text-secondary">{currentStep * 20}% Complete</p>
                    </div>
                )}
              </div>
            </div>

        </ClientLayout>
    );
}
