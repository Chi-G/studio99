import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import studioDarkImg from '../../../public/studio99-dark.jpeg';
import {
  ArrowRight, Play, Globe, PenTool,
  Video, Share2, Layers, Briefcase, Clock, ShieldCheck, Mail, MapPin,
  Zap, Headphones, TrendingUp, MonitorSmartphone
} from 'lucide-react';

import { LoginModal } from '@/Components/Modals/LoginModal';
import { RegisterModal } from '@/Components/Modals/RegisterModal';

// Shared Components
const RedLabel = ({ children }) => (
  <div className="inline-flex items-center gap-2 mb-4">
    <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
    <span className="text-[10px] md:text-xs font-black text-brand-red tracking-widest uppercase">{children}</span>
  </div>
);

const SectionHeading = ({ children }) => (
  <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
    {children}
  </h2>
);

export default function Welcome({ auth, showLogin = false, showRegister = false }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(showLogin);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(showRegister);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (showLogin) setIsLoginModalOpen(true);
    if (showRegister) setIsRegisterModalOpen(true);
  }, [showLogin, showRegister]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-bg-base text-text-primary font-sans selection:bg-brand-red/30">
      <Head title="Design • Create • Grow | Studio99 Digital" />

      {/* 1. NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-bg-border py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-brand-red flex items-center justify-center font-black text-white text-xs">S</div>
            <span className="font-black text-lg tracking-tight hidden sm:block">studio99 <span className="text-[10px] uppercase text-text-secondary tracking-widest ml-1 font-sans">Digital</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
            <a href="#services" className="hover:text-white transition-colors">Request a Service</a>
            <a href="#work" className="hover:text-white transition-colors">View Portfolio</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact Us</a>
          </div>
          <div className="flex items-center gap-4">
            {auth.user ? (
              <Link href="/dashboard" className="text-sm font-medium text-white hover:text-brand-red transition-colors">Dashboard</Link>
            ) : (
              <>
                <button onClick={() => setIsLoginModalOpen(true)} className="text-sm font-medium text-text-secondary hover:text-white transition-colors">Login</button>
                <button onClick={() => setIsRegisterModalOpen(true)} className="text-sm font-medium bg-brand-red text-white px-5 py-2 rounded-full hover:bg-red-700 transition-colors">Get Started</button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full z-10 grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-bg-border bg-bg-card mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
              <span className="text-[10px] font-black tracking-widest text-text-secondary uppercase">Premium Digital Agency</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-black leading-[1.1] tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] mb-6 max-w-3xl"
            >
              Transform Ideas Into <br className="hidden md:block" /> <span className="text-brand-red">Exceptional Experiences</span>
            </motion.h1>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }} className="text-text-secondary text-base sm:text-lg max-w-lg leading-relaxed mb-10 font-sans space-y-4">
              <p>
                Premium design, video, web development, and social media services, all in one place. We make digital collaboration simple, seamless, and results-driven.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }} className="flex flex-col sm:flex-row items-center gap-4">
              <button onClick={() => setIsRegisterModalOpen(true)} className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-red text-white font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                Get Started <ArrowRight className="w-5 h-5" />
              </button>
              <a href="#work" className="w-full sm:w-auto px-8 py-4 rounded-full border border-bg-border text-white font-bold hover:bg-bg-card transition-colors flex items-center justify-center gap-2">
                <Play className="w-4 h-4" /> View Portfolio
              </a>
            </motion.div>
          </div>

          {/* Right Circular Graphic */}
          <div className="relative h-[400px] lg:h-[600px] flex items-center justify-center hidden sm:flex">
            {/* Outer Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] rounded-full border border-bg-border flex items-center justify-center"
            >
              {/* Red Dots on ring */}
              <div className="absolute -top-1.5 w-3 h-3 bg-brand-red rounded-full"></div>
              <div className="absolute -bottom-1.5 w-3 h-3 bg-brand-red rounded-full"></div>

              {/* Orbiting Badges */}
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute -left-10 top-20 px-4 py-2 bg-bg-card border border-bg-border rounded-full text-xs font-bold whitespace-nowrap shadow-xl">
                • Brand Identity
              </motion.div>
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute -right-10 bottom-20 px-4 py-2 bg-bg-card border border-bg-border rounded-full text-xs font-bold whitespace-nowrap shadow-xl">
                100+ Projects
              </motion.div>
            </motion.div>

            {/* Center Logo */}
            <div className="relative z-10 w-[200px] h-[200px] lg:w-[250px] lg:h-[250px] rounded-full bg-black border-2 border-brand-red/30 shadow-[0_0_50px_rgba(227,30,36,0.2)] flex items-center justify-center p-4">
              <img src={studioDarkImg} alt="Studio99" className="w-full h-full object-contain rounded-full" />
            </div>
          </div>
        </div>

        {/* Hero Service Preview Cards */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full mt-20 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Graphics Design", icon: PenTool, img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop" },
              { title: "Website Development", icon: MonitorSmartphone, img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop" },
              { title: "Video Editing", icon: Video, img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600&auto=format&fit=crop" },
              { title: "Social Media", icon: Share2, img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop" }
            ].map((s, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="relative h-32 md:h-40 rounded-xl overflow-hidden group cursor-pointer hover-glow border border-bg-border">
                <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent"></div>
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <s.icon className="w-5 h-5 text-brand-red mb-2" />
                  <h4 className="font-bold text-sm md:text-base">{s.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TRUST/STATS SECTION */}
      <section className="py-24 border-y border-bg-border bg-bg-surface">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <RedLabel>TRUSTED BY BRANDS</RedLabel>
            <SectionHeading>Your Digital <span className="text-brand-red">Growth Partner</span></SectionHeading>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: "100+", label: "Projects Completed", icon: Briefcase },
              { num: "50+", label: "Brands Served", icon: Globe },
              { num: "4+", label: "Core Services", icon: Layers },
              { num: "24/7", label: "Support Available", icon: Clock }
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeUpVariant} className="bg-bg-card border border-bg-border rounded-2xl p-6 md:p-8 text-center hover-glow">
                <div className="w-12 h-12 mx-auto rounded-full bg-brand-red/10 flex items-center justify-center mb-6">
                  <stat.icon className="w-6 h-6 text-brand-red" />
                </div>
                <div className="text-4xl md:text-5xl font-black mb-2">{stat.num}</div>
                <div className="text-text-secondary text-sm md:text-base font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. ABOUT SECTION */}
      <section id="about" className="py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-bg-border">
              <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop" alt="Office Workspace" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#0A0A0A]/40 mix-blend-overlay"></div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-8 -right-8 bg-brand-red text-white p-6 rounded-2xl shadow-2xl">
              <div className="text-4xl font-black mb-1">4+</div>
              <div className="text-sm font-bold uppercase tracking-widest">Years of<br />Excellence</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <RedLabel>WHO WE ARE</RedLabel>
            <SectionHeading>Create.Design.<span className="text-brand-red">Grow.</span></SectionHeading>
            <p className="text-text-secondary text-lg mb-8 leading-relaxed font-sans">
              Studio99 Digital provides businesses with an all-in-one digital service platform where clients can request services, track projects, communicate with teams, make payments, and receive completed work seamlessly.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-bg-card p-6 rounded-2xl border border-bg-border">
                <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center mb-4 text-brand-red"><TrendingUp className="w-5 h-5" /></div>
                <h4 className="font-bold mb-2">Our Mission</h4>
                <p className="text-sm text-text-secondary leading-relaxed font-sans">To empower businesses, organizations, professionals, and content creators with innovative digital solutions that drive growth, engagement, and long-term success.</p>
              </div>
              <div className="bg-bg-card p-6 rounded-2xl border border-bg-border">
                <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center mb-4 text-brand-red"><Globe className="w-5 h-5" /></div>
                <h4 className="font-bold mb-2">Our Vision</h4>
                <p className="text-sm text-text-secondary leading-relaxed font-sans">To become a leading digital services platform recognized for creativity, excellence, and client satisfaction across Africa and beyond.</p>
              </div>
            </div>

            <a href="#services" className="inline-flex items-center gap-2 text-brand-red font-bold hover:text-red-400 transition-colors">
              Learn More About Us <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* 5. SERVICES GRID SECTION */}
      <section id="services" className="py-32 bg-bg-surface border-y border-bg-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <RedLabel>WHAT WE OFFER</RedLabel>
              <SectionHeading>All The Digital Solutions <span className="text-brand-red">You Need</span></SectionHeading>
            </div>
            <p className="text-text-secondary text-right max-w-sm mb-2">One agency. Every digital service you need to build and scale your brand.</p>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            {/* Graphics Design (Large left) */}
            <motion.div variants={fadeUpVariant} className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group hover-glow border border-bg-border">
              <img src="https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop" alt="Graphics" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/20"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <span className="text-brand-red font-black text-2xl">01</span>
                <div>
                  <h3 className="text-3xl font-black mb-3">Graphics Design</h3>
                  <p className="text-text-secondary max-w-md mb-6">Bring your brand to life with visually compelling designs that capture attention, communicate value, and leave a lasting impression. From social media creatives to branding materials, we design with purpose and impact.</p>
                  <button onClick={() => setIsRegisterModalOpen(true)} className="inline-flex items-center gap-2 text-brand-red font-bold hover:text-red-400 transition-colors mt-2">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Video Editing (Top right) */}
            <motion.div variants={fadeUpVariant} className="relative rounded-3xl overflow-hidden group hover-glow border border-bg-border">
              <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600&auto=format&fit=crop" alt="Video" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/20"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <span className="text-brand-red font-black text-xl">02</span>
                <div>
                  <h3 className="text-xl font-black mb-2">Video Editing</h3>
                  <p className="text-text-secondary text-sm mb-4">Transform raw footage into engaging stories that drive views, engagement, and conversions. Whether for marketing, social media, or business presentations, our edits are crafted to deliver results.</p>
                  <button onClick={() => setIsRegisterModalOpen(true)} className="inline-flex items-center gap-2 text-brand-red font-bold hover:text-red-400 transition-colors text-sm">
                    Request Video Editing <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Web Dev (Middle right) */}
            <motion.div variants={fadeUpVariant} className="relative rounded-3xl overflow-hidden group hover-glow border border-bg-border">
              <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop" alt="Web" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/20"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <span className="text-brand-red font-black text-xl">03</span>
                <div>
                  <h3 className="text-xl font-black mb-2">Website Development</h3>
                  <p className="text-text-secondary text-sm mb-4">Build modern, responsive, and high-performing websites designed to elevate your online presence and convert visitors into customers.</p>
                  <button onClick={() => setIsRegisterModalOpen(true)} className="inline-flex items-center gap-2 text-brand-red font-bold hover:text-red-400 transition-colors text-sm">
                    💻 Build My Website <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Social Media (Bottom right) */}
            <motion.div variants={fadeUpVariant} className="md:col-span-3 relative rounded-3xl overflow-hidden group hover-glow border border-bg-border h-[250px] md:h-auto">
              <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop" alt="Social" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/20"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <span className="text-brand-red font-black text-xl">04</span>
                <div>
                  <h3 className="text-xl font-black mb-2">Social Media Management</h3>
                  <p className="text-text-secondary text-sm mb-4">Grow your audience and strengthen your brand with strategic content creation, publishing, engagement, and performance tracking tailored to your business goals.</p>
                  <button onClick={() => setIsRegisterModalOpen(true)} className="inline-flex items-center gap-2 text-brand-red font-bold hover:text-red-400 transition-colors text-sm">
                    📈 Manage My Social Media <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <RedLabel>WHY STUDIO99</RedLabel>
            <SectionHeading>Your Success. <span className="text-brand-red">Our Priority.</span></SectionHeading>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Affordable", desc: "Premium quality at prices that won't drain your budget. We make great design accessible." },
              { icon: MonitorSmartphone, title: "Convenient", desc: "Seamless communication and delivery. Everything handled online, on your schedule." },
              { icon: TrendingUp, title: "Scalable", desc: "Our solutions grow with you. Start small, scale big without changing agencies." },
              { icon: ShieldCheck, title: "Subscription Model", desc: "Flexible monthly plans so you always have a creative team ready without surprise costs." },
              { icon: Clock, title: "Fast Delivery", desc: "We respect deadlines. Rapid turnarounds without compromising on quality." },
              { icon: Headphones, title: "Dedicated Support", desc: "A real team behind every project. Responsive, proactive, and always in your corner." }
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeUpVariant} whileHover={{ y: -5 }} className="bg-bg-card border border-bg-border rounded-2xl p-8 hover-glow transition-all cursor-pointer">
                <div className="w-10 h-10 rounded bg-brand-red/10 flex items-center justify-center mb-6 border border-brand-red/20">
                  <feature.icon className="w-5 h-5 text-brand-red" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. PORTFOLIO / RECENT PROJECTS */}
      <section id="work" className="py-32 bg-bg-surface border-y border-bg-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <RedLabel>OUR WORK</RedLabel>
              <SectionHeading>Recent <span className="text-brand-red">Projects</span></SectionHeading>
            </div>
            <a href="#" className="hidden sm:inline-flex items-center gap-2 text-sm font-bold border border-bg-border px-6 py-3 rounded-full hover:bg-bg-card transition-colors">
              View All Projects <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: "Luxury Brand Identity", tag: "Branding", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop" },
              { title: "Restaurant Flyer Campaign", tag: "Graphics Design", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop" },
              { title: "Corporate Website", tag: "Web Development", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" },
              { title: "Product Advertisement", tag: "Video Production", img: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=800&auto=format&fit=crop" },
              { title: "Company Profile Design", tag: "Print & Branding", img: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=800&auto=format&fit=crop" },
              { title: "Mobile App Interface", tag: "UI/UX Design", img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop" }
            ].map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group cursor-pointer">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 border border-bg-border hover-glow">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[#0A0A0A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-brand-red text-white text-[10px] font-bold uppercase tracking-wider rounded-full">{p.tag}</span>
                  </div>
                </div>
                <h4 className="font-bold text-lg group-hover:text-brand-red transition-colors">{p.title}</h4>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <a href="#" className="inline-flex items-center gap-2 text-sm font-bold border border-bg-border px-6 py-3 rounded-full hover:bg-bg-card transition-colors w-full justify-center">
              View All Projects <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 8. CTA BANNER SECTION */}
      <section className="relative py-32 overflow-hidden border-b border-bg-border bg-bg-base">
        {/* Subtle dot grid background */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#2A2A2A 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.5 }}></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
          <RedLabel>LET'S WORK TOGETHER</RedLabel>
          <SectionHeading>Ready to take your brand to the <span className="text-brand-red">next level?</span></SectionHeading>

          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Partner with Studio99 Digital and experience creativity, innovation, and results—all in one platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button onClick={() => setIsRegisterModalOpen(true)} className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-red text-white font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
              🚀 Start Your Project Today
            </button>
            <a href="#contact" className="w-full sm:w-auto px-8 py-4 rounded-full border border-bg-border bg-bg-card hover:bg-[#2A2A2A] transition-colors font-bold flex items-center justify-center gap-2">
              Contact Us
            </a>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm font-medium text-text-secondary">
            <span>100+ Projects</span>
            <span className="w-1.5 h-1.5 rounded-full bg-bg-border"></span>
            <span>50+ Brands</span>
            <span className="w-1.5 h-1.5 rounded-full bg-bg-border"></span>
            <span>4+ Years</span>
            <span className="w-1.5 h-1.5 rounded-full bg-bg-border"></span>
            <span>24/7 Support</span>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-bg-base pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded bg-brand-red flex items-center justify-center font-black text-white text-xs">S</div>
                <span className="font-black text-lg tracking-tight">studio99</span>
              </div>
              <p className="text-text-secondary text-sm mb-8 leading-relaxed">
                Premium digital solutions for businesses ready to build stronger brands and grow online.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-bg-card border border-bg-border flex items-center justify-center text-text-secondary hover:text-white hover:bg-brand-red hover:border-brand-red transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-bg-card border border-bg-border flex items-center justify-center text-text-secondary hover:text-white hover:bg-brand-red hover:border-brand-red transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-bg-card border border-bg-border flex items-center justify-center text-text-secondary hover:text-white hover:bg-brand-red hover:border-brand-red transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-bg-card border border-bg-border flex items-center justify-center text-text-secondary hover:text-white hover:bg-brand-red hover:border-brand-red transition-all">
                  <Briefcase className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6">Services</h4>
              <ul className="space-y-4 text-sm text-text-secondary">
                <li><a href="#" className="hover:text-white transition-colors">Graphics Design</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Video Editing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Website Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Printing & Branding</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Social Media Management</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-text-secondary">
                <li><a href="#" className="hover:text-white transition-colors">Portfolio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6">Contact</h4>
              <ul className="space-y-4 text-sm text-text-secondary">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-bg-card flex items-center justify-center border border-bg-border"><Mail className="w-3 h-3 text-brand-red" /></div>
                  <a href="mailto:hello@studio99.digital" className="hover:text-white transition-colors">hello@studio99.digital</a>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-bg-card flex items-center justify-center border border-bg-border"><MapPin className="w-3 h-3 text-brand-red" /></div>
                  <span className="hover:text-white transition-colors">Available Worldwide</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-bg-border text-sm text-text-secondary gap-4">
            <p>&copy; {new Date().getFullYear()} Studio99 Digital. All rights reserved.</p>
            <div className="flex items-center gap-2 font-bold tracking-widest text-[10px] uppercase">
              <span>Design</span>
              <span className="text-brand-red">•</span>
              <span>Create</span>
              <span className="text-brand-red">•</span>
              <span>Grow</span>
            </div>
          </div>
        </div>
      </footer>

      <LoginModal
        open={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToRegister={() => { setIsLoginModalOpen(false); setIsRegisterModalOpen(true); }}
      />

      <RegisterModal
        open={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={() => { setIsRegisterModalOpen(false); setIsLoginModalOpen(true); }}
      />
    </div>
  );
}
