import React, { useState, useEffect, useCallback } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { 
  ArrowRight, 
  Code, 
  Video, 
  PenTool, 
  Share2, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2 
} from 'lucide-react';

import { Spotlight } from '@/Components/ui/spotlight';
import { TextGenerateEffect } from '@/Components/ui/text-generate-effect';

export default function Welcome({ auth }) {
  const [isAnnual, setIsAnnual] = useState(false);

  // Embla Carousels
  const [emblaRefPortfolio, emblaApiPortfolio] = useEmblaCarousel({ loop: true, align: "start" });
  const [emblaRefTestimonial, emblaApiTestimonial] = useEmblaCarousel({ loop: true });

  const scrollPrevTestimonial = useCallback(() => {
    if (emblaApiTestimonial) emblaApiTestimonial.scrollPrev();
  }, [emblaApiTestimonial]);

  const scrollNextTestimonial = useCallback(() => {
    if (emblaApiTestimonial) emblaApiTestimonial.scrollNext();
  }, [emblaApiTestimonial]);

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F8FAFC] font-sans selection:bg-[#6C3CE1]/30 overflow-hidden">
      <Head title="Nigeria's #1 Creative Studio" />

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-[#2A2A3A]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C3CE1] to-[#EC4899] flex items-center justify-center font-display font-bold text-white">
              S
            </div>
            <span className="font-display font-bold text-lg md:text-xl tracking-tight hidden sm:block">Studio99</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#94A3B8]">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            {auth.user ? (
              <Link href="/dashboard" className="text-xs md:text-sm font-medium hover:text-white transition-colors">Dashboard</Link>
            ) : (
              <>
                <Link href="/login" className="text-xs md:text-sm font-medium text-[#94A3B8] hover:text-white transition-colors">Log in</Link>
                <Link href="/register" className="text-xs md:text-sm font-medium bg-white text-black px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-gray-200 transition-colors">Get Started</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex items-center pt-24 md:pt-20 pb-20 md:pb-32 overflow-hidden">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(108, 60, 225, 0.5)" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-10 md:gap-12 items-center w-full z-10 pb-8 md:pb-10 mt-8 md:mt-0">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A28] border border-[#2A2A3A] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#EC4899] animate-pulse"></span>
              <span className="text-[10px] md:text-xs font-mono text-[#94A3B8]">Nigeria's #1 Creative Studio</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight mb-4 md:mb-6">
              <TextGenerateEffect words="We Build Digital Experiences That Convert" />
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-[#94A3B8] mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Elevate your brand with world-class design, web development, and video production. Your all-in-one creative partner.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/register" className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 rounded-full bg-gradient-to-r from-[#6C3CE1] to-[#EC4899] text-white font-medium hover:opacity-90 transition-opacity">
                Start Your Project
              </Link>
              <a href="#work" className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors font-medium">
                View Portfolio
              </a>
            </div>
          </div>

          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center perspective-1000 mt-8 lg:mt-0">
            <motion.div 
              initial={{ rotateY: 15, rotateX: 5, opacity: 0, y: 50 }}
              animate={{ rotateY: -5, rotateX: 5, opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative w-full max-w-[320px] sm:max-w-md aspect-[4/5] bg-[#111118] rounded-2xl border border-[#2A2A3A] p-2 shadow-2xl shadow-[#6C3CE1]/20 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#6C3CE1]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80" alt="Hero Mockup" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] to-transparent"></div>
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
                  <div className="text-[10px] sm:text-xs font-mono text-[#F59E0B] mb-1 sm:mb-2">FEATURED WORK</div>
                  <div className="text-xl sm:text-2xl font-display font-bold">Fintech Dashboard OS</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Client Logos Strip */}
        <div className="absolute bottom-0 w-full border-t border-[#2A2A3A] bg-[#0A0A0F]/50 backdrop-blur-sm overflow-hidden py-6">
          <div className="flex gap-12 animate-scroll whitespace-nowrap opacity-50 px-6 max-w-7xl mx-auto">
            {['Acme Corp', 'GlobalTech', 'Nexus', 'Stark Ind.', 'Wayne Ent.', 'Acme Corp', 'GlobalTech', 'Nexus'].map((logo, i) => (
              <span key={i} className="text-xl font-display font-bold text-[#475569]">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: SERVICES (Bento Grid) */}
      <section id="services" className="py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-12 md:mb-16 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">Our Expertise</h2>
            <p className="text-[#94A3B8] text-base md:text-lg max-w-2xl mx-auto md:mx-0">Everything you need to launch and scale your brand, all under one roof.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
            {/* Graphics - Tall Left */}
            <motion.div whileHover={{ y: -5 }} className="md:col-span-2 md:row-span-2 bg-[#111118] border border-[#2A2A3A] rounded-3xl p-8 group relative overflow-hidden flex flex-col justify-between min-h-[300px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6C3CE1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6C3CE1] to-[#EC4899] flex items-center justify-center mb-6">
                  <PenTool className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-3xl font-display font-bold mb-3">Graphics Design</h3>
                <p className="text-[#94A3B8] leading-relaxed">Brand identities, pitch decks, marketing assets, and stunning visuals that tell your story.</p>
              </div>
              <ArrowRight className="w-6 h-6 text-[#EC4899] opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all mt-8" />
            </motion.div>

            {/* Video - Top Right */}
            <motion.div whileHover={{ y: -5 }} className="md:col-span-2 md:row-span-1 bg-[#111118] border border-[#2A2A3A] rounded-3xl p-8 group relative overflow-hidden flex flex-col justify-between min-h-[250px]">
              <div className="flex justify-between items-start">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#EF4444] flex items-center justify-center mb-4">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-2">Video Editing</h3>
                  <p className="text-[#94A3B8] text-sm max-w-sm">Cinematic promos, reels, and YouTube edits that hold attention.</p>
                </div>
                <ArrowRight className="w-6 h-6 text-[#F59E0B] opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all" />
              </div>
            </motion.div>

            {/* Web - Bottom Right Split 1 */}
            <motion.div whileHover={{ y: -5 }} className="md:col-span-1 md:row-span-1 bg-[#111118] border border-[#2A2A3A] rounded-3xl p-6 group relative overflow-hidden flex flex-col justify-between min-h-[250px]">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#2A2A3A] flex items-center justify-center mb-4 text-white">
                  <Code className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-display font-bold mb-2">Web Dev</h3>
                <p className="text-[#475569] text-sm leading-tight">High-performance React & Laravel apps.</p>
              </div>
            </motion.div>

            {/* Social - Bottom Right Split 2 */}
            <motion.div whileHover={{ y: -5 }} className="md:col-span-1 md:row-span-1 bg-[#1A1A28] border border-[#2A2A3A] rounded-3xl p-6 group relative overflow-hidden flex flex-col justify-between min-h-[250px]">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#6C3CE1]/20 flex items-center justify-center mb-4 text-[#6C3CE1]">
                  <Share2 className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-display font-bold mb-2">Social Media</h3>
                <p className="text-[#94A3B8] text-sm leading-tight">Growth-focused content management.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY CHOOSE US */}
      <section className="py-16 md:py-20 border-y border-[#2A2A3A] bg-[#0A0A0F]/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            {[
              { num: "01", title: "Top 1% Talent", desc: "We hire only the best creative minds across Africa to guarantee world-class output." },
              { num: "02", title: "Lightning Fast", desc: "Say goodbye to missed deadlines. We deliver exceptional work at unprecedented speeds." },
              { num: "03", title: "One Dashboard", desc: "Manage projects, chat with your team, and pay invoices all from our custom OS." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative pl-6 md:pl-8 border-l-2 border-[#1A1A28] hover:border-[#6C3CE1] transition-colors"
              >
                <div className="text-4xl md:text-5xl font-mono font-bold text-[#1A1A28] absolute -left-[2px] top-0 -translate-x-full pr-3 md:pr-4">{feature.num}</div>
                <h3 className="text-xl md:text-2xl font-display font-bold mb-2">{feature.title}</h3>
                <p className="text-[#94A3B8] text-sm md:text-base leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: PORTFOLIO PREVIEW */}
      <section id="work" className="py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-10 md:mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-0">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 md:mb-4">Selected Work</h2>
            <p className="text-[#94A3B8] text-base md:text-lg">A glimpse into what we can build together.</p>
          </div>
          <Link href="/register" className="inline-flex text-[#6C3CE1] font-medium hover:text-white transition-colors items-center gap-2">
            View All Work <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="pl-6 md:pl-[max(1.5rem,calc((100vw-80rem)/2))] cursor-grab active:cursor-grabbing" ref={emblaRefPortfolio}>
          <div className="flex gap-6 pb-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="relative flex-[0_0_85%] md:flex-[0_0_400px] aspect-[4/3] rounded-2xl overflow-hidden group">
                <img src={`https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&sig=${i}`} alt="Project" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[#0A0A0F]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="flex justify-end">
                    <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider">Web Design</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform">Fintech Dashboard</h3>
                    <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all delay-100 hover:bg-gray-200">View Project</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: PRICING */}
      <section id="pricing" className="py-20 md:py-32 bg-[#0A0A0F] border-t border-[#2A2A3A]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">Simple, Transparent Pricing</h2>
            
            {/* Toggle */}
            <div className="inline-flex items-center p-1 bg-[#1A1A28] rounded-full border border-[#2A2A3A] flex-wrap justify-center mx-auto">
              <button onClick={() => setIsAnnual(false)} className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${!isAnnual ? 'bg-[#2A2A3A] text-white shadow-sm' : 'text-[#94A3B8] hover:text-white'}`}>Monthly</button>
              <button onClick={() => setIsAnnual(true)} className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${isAnnual ? 'bg-[#2A2A3A] text-white shadow-sm' : 'text-[#94A3B8] hover:text-white'}`}>
                Annually <span className="text-[#EC4899] ml-1 text-[10px] sm:text-xs">-20%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-[#111118] border border-[#2A2A3A] rounded-3xl p-8 flex flex-col">
              <h3 className="text-xl font-medium text-[#94A3B8] mb-2">Basic</h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-display font-bold">₦{isAnnual ? '40k' : '50k'}</span>
                <span className="text-[#475569]">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['2 active requests at a time', '48-hour delivery', 'Standard support', 'Unlimited revisions', 'Source files included'].map((f, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[#94A3B8]">
                    <CheckCircle2 className="w-5 h-5 text-[#475569] shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="block w-full py-3 text-center rounded-xl bg-[#1A1A28] border border-[#2A2A3A] hover:bg-[#2A2A3A] transition-colors font-medium">Get Started</Link>
            </div>

            {/* Pro Plan (Highlighted) */}
            <div className="bg-[#111118] border border-[#6C3CE1] rounded-3xl p-8 flex flex-col relative transform md:-translate-y-4 shadow-2xl shadow-[#6C3CE1]/10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-[#6C3CE1] to-[#EC4899] rounded-full text-xs font-bold tracking-wider">MOST POPULAR</div>
              <h3 className="text-xl font-medium text-white mb-2">Pro</h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-display font-bold">₦{isAnnual ? '120k' : '150k'}</span>
                <span className="text-[#94A3B8]">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Double request bandwidth', '24-hour delivery', 'Priority support', 'Dedicated project manager', 'Custom React development'].map((f, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[#F8FAFC]">
                    <CheckCircle2 className="w-5 h-5 text-[#6C3CE1] shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="block w-full py-3 text-center rounded-xl bg-gradient-to-r from-[#6C3CE1] to-[#EC4899] text-white hover:opacity-90 transition-opacity font-medium">Get Pro</Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-[#111118] border border-[#2A2A3A] rounded-3xl p-8 flex flex-col">
              <h3 className="text-xl font-medium text-[#94A3B8] mb-2">Enterprise</h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-display font-bold">Custom</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Unlimited bandwidth', 'Same-day delivery', '24/7 Slack support', 'Full team access', 'White-labeling options'].map((f, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[#94A3B8]">
                    <CheckCircle2 className="w-5 h-5 text-[#475569] shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="block w-full py-3 text-center rounded-xl bg-[#1A1A28] border border-[#2A2A3A] hover:bg-[#2A2A3A] transition-colors font-medium">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: TESTIMONIALS */}
      <section className="py-20 md:py-24 bg-[#0A0A0F] border-t border-[#2A2A3A] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-10 md:mb-12 flex justify-between items-end">
          <h2 className="text-3xl md:text-4xl font-display font-bold">Client Love</h2>
          <div className="flex gap-2">
            <button onClick={scrollPrevTestimonial} className="w-10 h-10 rounded-full border border-[#2A2A3A] flex items-center justify-center hover:bg-[#1A1A28] transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={scrollNextTestimonial} className="w-10 h-10 rounded-full border border-[#2A2A3A] flex items-center justify-center hover:bg-[#1A1A28] transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="pl-4 md:pl-[max(1.5rem,calc((100vw-80rem)/2))]" ref={emblaRefTestimonial}>
          <div className="flex gap-4 md:gap-6">
            {[
              { name: "Sarah J.", company: "TechFlow", quote: "Studio99 totally revamped our brand. The speed and quality is unmatched." },
              { name: "Michael B.", company: "Elevate Co", quote: "Their custom OS makes managing projects a breeze. Highly recommended." },
              { name: "David O.", company: "Nexus", quote: "The best creative agency we've ever partnered with in Nigeria." }
            ].map((t, i) => (
              <div key={i} className="relative flex-[0_0_85%] md:flex-[0_0_400px] bg-[#111118] border border-[#2A2A3A] rounded-2xl p-6 md:p-8">
                <div className="flex text-[#F59E0B] mb-4 md:mb-6">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-base md:text-lg leading-relaxed text-[#F8FAFC] mb-6 md:mb-8">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#2A2A3A] rounded-full overflow-hidden shrink-0">
                     <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt={t.name} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm md:text-base">{t.name}</h4>
                    <p className="text-xs md:text-sm text-[#94A3B8]">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: CTA BANNER */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-[#6C3CE1] to-[#EC4899] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="relative max-w-4xl mx-auto px-4 md:px-6 text-center z-10">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white mb-6 md:mb-8 tracking-tight">Ready to Elevate Your Brand?</h2>
          <p className="text-lg md:text-xl text-white/80 mb-8 md:mb-10 max-w-2xl mx-auto px-4">Join dozens of visionary companies scaling their creatives with Studio99.</p>
          <Link href="/register" className="inline-flex items-center justify-center h-12 md:h-14 px-8 md:px-10 rounded-full bg-white text-black font-bold text-base md:text-lg hover:scale-105 transition-transform">
            Start Your Project Today
          </Link>
        </div>
      </section>

      {/* SECTION 8: FOOTER */}
      <footer className="bg-[#0A0A0F] py-12 md:py-16 border-t border-[#2A2A3A]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-[#6C3CE1] to-[#EC4899] flex items-center justify-center font-display font-bold text-white text-xs">
                S
              </div>
              <span className="font-display font-bold tracking-tight text-lg">Studio99</span>
            </div>
            <p className="text-[#94A3B8] max-w-sm mb-6 text-sm leading-relaxed">We build digital experiences that convert. Your premium creative partner.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-[#94A3B8]">
              <li><a href="#" className="hover:text-white transition-colors">Graphics Design</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Video Editing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Social Media</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-[#94A3B8]">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#work" className="hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#1A1A28] text-sm text-[#475569] gap-4 md:gap-0">
          <p className="text-center md:text-left">&copy; {new Date().getFullYear()} Studio99. All rights reserved.</p>
          <div className="flex gap-4 md:gap-6">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Dribbble</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
