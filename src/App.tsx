import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Mail, 
  Menu, 
  Phone, 
  Plus, 
  Settings, 
  Star, 
  X,
  Zap,
  LogOut
} from 'lucide-react';
import { supabase, Service, Portfolio as PortfolioType, Pricing as PricingType, Message } from './lib/supabase';

// --- DATA CONSTANTS (FALLBACKS) ---
const FALLBACK_SERVICES: Service[] = [
  { id: 1, title: 'App Development', icon: '📱', description: 'Bespoke mobile applications crafted for high performance and user engagement.', sort_order: 1 },
  { id: 2, title: 'Web Development', icon: '🌐', description: 'Scalable and fast web platforms built with modern technologies likes React.', sort_order: 2 },
  { id: 3, title: 'System Development', icon: '⚙️', description: 'Internal tools and enterprise software designed to streamline operations.', sort_order: 3 },
  { id: 4, title: 'UI/UX Design', icon: '🎨', description: 'Human-centric design that prioritizes usability and aesthetic excellence.', sort_order: 4 },
  { id: 5, title: 'Digital Marketing', icon: '🚀', description: 'Data-driven strategies to grow your brand and reach new audiences.', sort_order: 5 },
  { id: 6, title: 'Branding', icon: '✨', description: 'Defining your identity through creative storytelling and visual impact.', sort_order: 6 },
];

const FALLBACK_PORTFOLIO: PortfolioType[] = [
  { id: 1, title: 'CryptoPulse Dashboard', emoji: '💰', category: 'Web App', description: 'A real-time cryptocurrency tracking platform for traders.', url: '#', sort_order: 1 },
  { id: 2, title: 'EcoTrack Mobile', emoji: '🌿', category: 'Mobile App', description: 'Helping users measure their carbon footprint with ease.', url: '#', sort_order: 2 },
  { id: 3, title: 'Luxe Furniture Brand', emoji: '🪑', category: 'Branding', description: 'Minimalist visual identity for a premium furniture retailer.', url: '#', sort_order: 3 },
];

const FALLBACK_PRICING: PricingType[] = [
  { id: 1, name: 'Startup', price: 99, period: '/month', features: ['+ Web Design', '+ 5 Pages', '- Custom App', '+ Basic SEO'], featured: false, sort_order: 1 },
  { id: 2, name: 'Professional', price: 299, period: '/month', features: ['+ Full Stack Dev', '+ 20 Pages', '+ Custom Designs', '+ Advanced SEO'], featured: true, sort_order: 2 },
  { id: 3, name: 'Enterprise', price: 999, period: 'one-time', features: ['+ Everything Included', '+ Priority Support', '+ Scalable Infra', '+ Cloud Management'], featured: false, sort_order: 3 },
];

// --- COMPONENTS ---

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Service', href: '#services' },
    { name: 'Project', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isSticky ? 'bg-white shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand rounded flex items-center justify-center text-white text-lg font-black">D</div>
          <span className={`${isSticky ? 'text-dark' : 'text-white'} font-display font-black text-xl tracking-tighter transition-colors`}>Digitomatic</span>
        </a>
        
        <div className={`hidden md:flex items-center space-x-10 ${isSticky ? 'text-dark' : 'text-white'} transition-colors`}>
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-brand font-bold transition-colors text-[11px] uppercase tracking-widest">{link.name}</a>
          ))}
          <a href="#contact" className={`px-6 py-2.5 rounded-button font-bold text-[11px] uppercase tracking-widest transition-all ${isSticky ? 'bg-brand text-white' : 'bg-white text-brand hover:bg-brand hover:text-white'}`}>
            Contact
          </a>
        </div>

        <button className="md:hidden text-dark" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-[#e8ecf8] overflow-hidden"
          >
            <div className="p-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-dark font-medium text-lg" onClick={() => setIsMobileMenuOpen(false)}>{link.name}</a>
              ))}
              <a href="#contact" className="bg-brand text-white px-8 py-4 rounded-button font-bold text-center block" onClick={() => setIsMobileMenuOpen(false)}>
                Let's Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative hero-gradient pt-40 md:pt-56 pb-20 overflow-hidden text-white">
      {/* Subtle Decorative elements */}
      <div className="absolute top-20 left-20 text-white/10 text-2xl opacity-50 animate-float">✦</div>
      <div className="absolute top-[40%] right-20 text-white/5 text-[15rem] font-black italic select-none pointer-events-none">Digital</div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-display font-black text-4xl md:text-7xl lg:text-8xl mb-8 leading-[1.1] max-w-5xl mx-auto tracking-tighter">
            Innovating Your Digital World.
          </h1>
          <p className="text-white/85 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed font-medium">
            We specialize in modern strategy and high-performance development for high-growth brands.
          </p>
          <div className="flex justify-center">
            <a href="#contact" className="bg-white text-brand px-12 py-4 rounded-button font-black text-xs uppercase tracking-[0.2em] hover:bg-brand hover:text-white transition-all shadow-xl">
              Get Started
            </a>
          </div>
        </motion.div>

        {/* Minimal Browser Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-24 mx-auto max-w-[1000px]"
        >
          <div className="bg-[#0f172a] rounded-t-[20px] p-2 shadow-hero-mockup border border-white/5 relative">
            <div className="bg-[#020617] rounded-lg aspect-[21/9] flex items-center justify-center overflow-hidden">
              <div className="text-white/5 font-mono text-[8vw] font-black opacity-20 uppercase tracking-tighter">Digitomatic</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 w-full leading-[0] z-20">
        <svg viewBox="0 0 1440 100" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
    </section>
  );
};

const CountUp = ({ end, duration = 2, suffix = '' }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!ref || hasStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, end, duration, hasStarted]);

  return <span ref={setRef}>{count}{suffix}</span>;
};

const ClientLogos = () => {
  const logos = ['HubSpot', 'Auping', 'Heineken', 'EXPOMARK', 'ASTRA-NET', 'Google', 'Amazon', 'Meta'];
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <section className="bg-white py-12 border-b border-[#f0f2f8] overflow-hidden">
      <div 
        className="relative flex"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`animate-marquee flex gap-12 md:gap-24 items-center ${isHovered ? 'pause-marquee' : ''}`}>
          {[...logos, ...logos].map((logo, idx) => (
            <span 
              key={idx} 
              className={`text-2xl md:text-3xl font-display font-black tracking-tighter transition-all duration-500 whitespace-nowrap ${isHovered ? 'opacity-100 grayscale-0 text-brand' : 'opacity-40 grayscale text-dark/50'}`}
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-24 items-center"
      >
        <div className="flex-1">
          <span className="section-tag">Philosophy</span>
          <h2 className="section-title">Execution over strategy. Always.</h2>
          <p className="text-muted text-lg mb-12 leading-relaxed font-medium">
            Over the last two decades, we've honed a process that prioritizes speed and scalability without sacrificing world-class design standards.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-bg-alt p-8 border border-[#f0f2f8] hover:scale-105 transition-all duration-500 ease-out">
              <div className="text-4xl font-display font-black text-brand mb-1">
                <CountUp end={32} suffix="K" />
              </div>
              <div className="text-[11px] uppercase font-bold tracking-widest text-muted">Projects</div>
            </div>
            <div className="bg-bg-alt p-8 border border-[#f0f2f8] hover:scale-105 transition-all duration-500 ease-out">
              <div className="text-4xl font-display font-black text-brand mb-1">
                <CountUp end={24} suffix="+" />
              </div>
              <div className="text-[11px] uppercase font-bold tracking-widest text-muted">Years</div>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="rounded-card aspect-video bg-bg-alt border border-[#f0f2f8] flex items-center justify-center grayscale opacity-100 overflow-hidden">
             <span className="text-8xl">🏢</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const Services = ({ services }: { services: Service[] }) => {
  return (
    <section id="services" className="py-32 bg-bg-alt">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="section-tag">Capabilities</span>
          <h2 className="section-title">Design excellence for <br/>digital pioneers.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card p-10 bg-white border-[#f0f2f8] hover:border-brand/20 group cursor-default hover:scale-[1.02] transition-all duration-500 ease-out"
            >
              <div className="text-2xl mb-8 opacity-60 transition-transform duration-500 ease-out group-hover:scale-110">
                {service.icon}
              </div>
              <h3 className="font-display font-bold text-xl mb-4 group-hover:text-brand transition-colors">{service.title}</h3>
              <p className="text-muted text-sm leading-relaxed mb-8">{service.description}</p>
              <a href="#contact" className="text-[11px] font-black uppercase tracking-widest text-brand border-b border-brand pb-1">
                Explore More
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const Portfolio = ({ portfolio }: { portfolio: PortfolioType[] }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(portfolio.map(p => p.category))];
  
  const filteredItems = filter === 'All' 
    ? portfolio 
    : portfolio.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <span className="section-tag">Case Studies</span>
            <h2 className="section-title">› Projects We Have For Our Clients</h2>
          </div>
          <div className="flex gap-4 mb-4">
            <button className="w-12 h-12 rounded-full border border-[#e8ecf8] flex items-center justify-center hover:bg-brand hover:text-white transition-all"><ChevronLeft size={20} /></button>
            <button className="w-12 h-12 rounded-full border border-[#e8ecf8] flex items-center justify-center hover:bg-brand hover:text-white transition-all"><ChevronRight size={20} /></button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${filter === cat ? 'bg-brand text-white' : 'bg-brand-muted text-brand hover:bg-brand/20'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div 
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass-card overflow-hidden group hover:scale-[1.02] transition-all duration-500 ease-out"
              >
                <div className="aspect-video relative overflow-hidden bg-brand/5 flex items-center justify-center text-7xl">
                  <div className="transition-transform duration-700 ease-out group-hover:scale-110">
                    {item.emoji}
                  </div>
                </div>
                <div className="p-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand mb-2 block">{item.category}</span>
                  <h3 className="font-display font-extrabold text-2xl mb-3">{item.title}</h3>
                  <p className="text-muted text-sm mb-4 line-clamp-2">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="bg-[#0d1a4a] rounded-[40px] py-20 px-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display font-extrabold text-4xl md:text-5xl mb-8 leading-tight">
              Apply For Free Guide. Build Yourself With This Free Guide.
            </h2>
            <a href="#contact" className="bg-brand text-white px-10 py-5 rounded-button font-extrabold text-lg inline-flex items-center gap-2 hover:bg-brand/80 transition-all shadow-xl shadow-brand/20">
              Let's Connect <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const Pricing = ({ pricing }: { pricing: PricingType[] }) => {
  return (
    <section id="pricing" className="py-24 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="text-center mb-16">
          <span className="section-tag">Pricing Plan</span>
          <h2 className="section-title">› Simple, Transparent Pricing</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {pricing.map((plan, idx) => (
            <motion.div 
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative glass-card p-10 flex flex-col h-full hover:scale-[1.02] transition-transform duration-500 ease-out ${plan.featured ? 'hero-gradient text-white border-0 py-16 -my-4 shadow-2xl' : ''}`}
            >
              {plan.featured && <div className="absolute top-6 right-6 bg-white/20 text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full">Popular</div>}
              <div className="mb-8">
                <h3 className={`font-display font-extrabold text-2xl mb-2 ${plan.featured ? 'text-white' : 'text-dark'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl font-display font-black">${plan.price}</span>
                  <span className={`text-sm opacity-80 font-bold`}>{plan.period}</span>
                </div>
              </div>
              
              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feat, i) => {
                  const isIncluded = feat.startsWith('+');
                  const cleanFeat = feat.substring(1).trim();
                  return (
                    <div key={i} className={`flex items-center gap-3 ${!isIncluded ? 'opacity-50 italic' : ''}`}>
                      {isIncluded ? <Check size={18} className={plan.featured ? 'text-white' : 'text-brand'} /> : <X size={18} />}
                      <span className="font-medium text-sm">{cleanFeat}</span>
                    </div>
                  );
                })}
              </div>

              <a href="#contact" className={`w-full py-4 rounded-button font-bold text-center transition-all ${plan.featured ? 'bg-white text-brand hover:bg-opacity-90' : 'bg-brand text-white hover:bg-opacity-90'}`}>
                Get Started <ArrowRight size={18} className="inline ml-2" />
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: 'General Inquiry', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('messages').insert([formData]);
      if (error) throw error;
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', service: 'General Inquiry', message: '' });
    } catch (err) {
      console.error(err);
      alert('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-bg-alt">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto px-6"
      >
        <div className="text-center mb-12">
          <h2 className="section-title">› Start Your Project Today</h2>
          <p className="text-muted font-medium">Ready to take your business to the next level? Send us a message and we'll get back to you within 24 hours.</p>
        </div>

        <div className="glass-card p-10">
          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="text-center py-10"
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✓</div>
              <h3 className="text-2xl font-display font-extrabold mb-4">Message Sent!</h3>
              <p className="text-muted">Thanks for reaching out. We will contact you shortly.</p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="mt-8 text-brand font-bold underline"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-dark mb-2">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-5 py-4 rounded-2xl bg-bg-alt border border-[#e8ecf8] focus:outline-none focus:border-brand transition-all font-medium"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-dark mb-2">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full px-5 py-4 rounded-2xl bg-bg-alt border border-[#e8ecf8] focus:outline-none focus:border-brand transition-all font-medium"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-dark mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="+1 234 567 890"
                    className="w-full px-5 py-4 rounded-2xl bg-bg-alt border border-[#e8ecf8] focus:outline-none focus:border-brand transition-all font-medium"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-dark mb-2">Service</label>
                  <select 
                    className="w-full px-5 py-4 rounded-2xl bg-bg-alt border border-[#e8ecf8] focus:outline-none focus:border-brand transition-all appearance-none font-medium"
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                  >
                    <option>General Inquiry</option>
                    <option>App Development</option>
                    <option>Web Development</option>
                    <option>UI/UX Design</option>
                    <option>Branding</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-dark mb-2">Message</label>
                <textarea 
                  required 
                  rows={5} 
                  placeholder="Tell us about your project..."
                  className="w-full px-5 py-4 rounded-2xl bg-bg-alt border border-[#e8ecf8] focus:outline-none focus:border-brand transition-all font-medium"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-brand text-white py-5 rounded-button font-extrabold text-lg flex items-center justify-center gap-2 hover:bg-brand/90 transition-all shadow-lg shadow-brand/20 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : <>Send Message <ArrowRight size={20} /></>}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
};

const Footer = ({ onAdminClick }: { onAdminClick: () => void }) => {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-[#f0f2f8]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <a href="#" className="font-display font-extrabold text-3xl text-brand tracking-tight mb-6 block">Digitomatic</a>
          <p className="text-muted leading-relaxed mb-8 font-medium">
            Expertly crafted digital solutions for visionary brands. Let's create something extraordinary together.
          </p>
          <div className="flex gap-4">
            {[Facebook, Instagram, Linkedin].map((Icon, idx) => (
              <a key={idx} href="#" className="w-10 h-10 rounded-full border border-[#f0f2f8] flex items-center justify-center text-dark hover:bg-brand hover:text-white transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-xl mb-6">Services</h4>
          <ul className="space-y-4 text-muted font-medium">
            <li><a href="#" className="hover:text-brand transition-colors">Web Development</a></li>
            <li><a href="#" className="hover:text-brand transition-colors">Mobile Apps</a></li>
            <li><a href="#" className="hover:text-brand transition-colors">UI/UX Design</a></li>
            <li><a href="#" className="hover:text-brand transition-colors">Branding</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-display font-bold text-xl mb-6">Company</h4>
          <ul className="space-y-4 text-muted font-medium">
            <li><a href="#" className="hover:text-brand transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-brand transition-colors">Portfolio</a></li>
            <li><a href="#" className="hover:text-brand transition-colors">Career</a></li>
            <li><a href="#" className="hover:text-brand transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-xl mb-6">Connect</h4>
          <ul className="space-y-4 text-muted font-medium">
            <li className="flex items-center gap-3"><Mail size={18} /> hello@digitomatic.com</li>
            <li className="flex items-center gap-3"><Phone size={18} /> +880 1234 567 890</li>
            <li className="text-sm mt-4 italic">Built with ❤️ in Bangladesh</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-[#f0f2f8] flex flex-col md:flex-row justify-between items-center gap-4 text-muted font-medium text-sm">
        <div>&copy; 2025 Digitomatic. All rights reserved.</div>
        <button 
          onClick={onAdminClick}
          className="text-[10px] uppercase tracking-widest hover:text-brand transition-colors font-bold opacity-60 hover:opacity-100"
        >
          Staff Login
        </button>
      </div>
    </footer>
  );
};

// --- ADMIN PANEL ---

const AdminPanel = ({ isOpen, onClose, services, portfolio, pricing, refreshData }: any) => {
  const [activeTab, setActiveTab] = useState('Services');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setIsAuthenticated(true);
    });
  }, []);

  useEffect(() => {
    if (isAuthenticated && activeTab === 'Messages') {
      fetchMessages();
    }
  }, [isAuthenticated, activeTab]);

  const fetchMessages = async () => {
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
    if (data) setMessages(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  const handleDelete = async (table: string, id: number) => {
    if (confirm('Are you sure?')) {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) alert(error.message);
      else {
        refreshData();
        if (table === 'messages') fetchMessages();
      }
    }
  };

  const ServiceForm = ({ item }: any) => {
    const [title, setTitle] = useState(item?.title || '');
    const [icon, setIcon] = useState(item?.icon || '⚡');
    const [desc, setDesc] = useState(item?.description || '');
    const save = async () => {
      const data = { title, icon, description: desc };
      const { error } = item ? await supabase.from('services').update(data).eq('id', item.id) : await supabase.from('services').insert([data]);
      if (error) alert(error.message); else { refreshData(); setIsModalOpen(false); }
    };
    return <div className="space-y-4">
      <input className="w-full p-2 bg-white/10 border border-white/20 rounded text-white" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title"/>
      <input className="w-full p-2 bg-white/10 border border-white/20 rounded text-white" value={icon} onChange={e=>setIcon(e.target.value)} placeholder="Emoji Icon"/>
      <textarea className="w-full p-2 bg-white/10 border border-white/20 rounded text-white" value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description"/>
      <button onClick={save} className="w-full bg-brand p-2 rounded font-bold hover:bg-opacity-90">Save</button>
    </div>;
  };

  const PortfolioForm = ({ item }: any) => {
    const [title, setTitle] = useState(item?.title || '');
    const [emoji, setEmoji] = useState(item?.emoji || '🎯');
    const [category, setCategory] = useState(item?.category || '');
    const [desc, setDesc] = useState(item?.description || '');
    const save = async () => {
      const data = { title, emoji, category, description: desc };
      const { error } = item ? await supabase.from('portfolio').update(data).eq('id', item.id) : await supabase.from('portfolio').insert([data]);
      if (error) alert(error.message); else { refreshData(); setIsModalOpen(false); }
    };
    return <div className="space-y-4">
      <input className="w-full p-2 bg-white/10 border border-white/20 rounded text-white" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title"/>
      <input className="w-full p-2 bg-white/10 border border-white/20 rounded text-white" value={emoji} onChange={e=>setEmoji(e.target.value)} placeholder="Emoji"/>
      <input className="w-full p-2 bg-white/10 border border-white/20 rounded text-white" value={category} onChange={e=>setCategory(e.target.value)} placeholder="Category"/>
      <textarea className="w-full p-2 bg-white/10 border border-white/20 rounded text-white" value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description"/>
      <button onClick={save} className="w-full bg-brand p-2 rounded font-bold hover:bg-opacity-90">Save</button>
    </div>;
  };

  const PricingForm = ({ item }: any) => {
    const [name, setName] = useState(item?.name || '');
    const [price, setPrice] = useState(item?.price || 0);
    const [period, setPeriod] = useState(item?.period || '/month');
    const [featured, setFeatured] = useState(item?.featured || false);
    const [features, setFeatures] = useState(JSON.stringify(item?.features || ['+ Feature 1']));
    const save = async () => {
      const data = { name, price: Number(price), period, featured, features: JSON.parse(features) };
      const { error } = item ? await supabase.from('pricing').update(data).eq('id', item.id) : await supabase.from('pricing').insert([data]);
      if (error) alert(error.message); else { refreshData(); setIsModalOpen(false); }
    };
    return <div className="space-y-4">
      <input className="w-full p-2 bg-white/10 border border-white/20 rounded text-white" value={name} onChange={e=>setName(e.target.value)} placeholder="Name"/>
      <input className="w-full p-2 bg-white/10 border border-white/20 rounded text-white" type="number" value={price} onChange={e=>setPrice(Number(e.target.value))} placeholder="Price"/>
      <input className="w-full p-2 bg-white/10 border border-white/20 rounded text-white" value={period} onChange={e=>setPeriod(e.target.value)} placeholder="Period"/>
      <label className="flex items-center gap-2 text-sm">Featured: <input type="checkbox" checked={featured} onChange={e=>setFeatured(e.target.checked)}/></label>
      <textarea className="w-full p-2 bg-white/10 border border-white/20 rounded text-white" value={features} onChange={e=>setFeatures(e.target.value)} placeholder='Features JSON ["+ Check", "- X"]'/>
      <button onClick={save} className="w-full bg-brand p-2 rounded font-bold hover:bg-opacity-90">Save</button>
    </div>;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#0d1330] text-white flex flex-col font-sans">
      {!isAuthenticated ? (
        <div className="flex-grow flex items-center justify-center p-6">
          <form onSubmit={handleLogin} className="w-full max-w-sm glass-card border-white/20 bg-white/5 p-8 space-y-6">
            <h2 className="text-3xl font-display font-black text-center mb-8">Admin Login</h2>
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase font-bold tracking-widest text-white/60 ml-1">Admin Email</label>
                <input 
                  type="email" 
                  placeholder="Enter email" 
                  className="w-full p-4 bg-white/5 border-2 border-white/20 rounded-xl text-white placeholder:text-white/30 focus:border-brand focus:bg-white/10 outline-none transition-all" 
                  value={email} 
                  onChange={e=>setEmail(e.target.value)}
                />
                <p className="text-[10px] text-white/40 ml-1 italic">Use your registered staff email address.</p>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase font-bold tracking-widest text-white/60 ml-1">Secure Password</label>
                <input 
                  type="password" 
                  placeholder="Enter password" 
                  className="w-full p-4 bg-white/5 border-2 border-white/20 rounded-xl text-white placeholder:text-white/30 focus:border-brand focus:bg-white/10 outline-none transition-all" 
                  value={password} 
                  onChange={e=>setPassword(e.target.value)}
                />
                <p className="text-[10px] text-white/40 ml-1 italic">Password must be at least 8 characters.</p>
              </div>
            </div>
            <button className="w-full bg-brand py-4 rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all">Sign In</button>
            <button type="button" onClick={onClose} className="w-full text-white/50 text-sm hover:text-white transition-colors">Cancel</button>
          </form>
        </div>
      ) : (
        <>
          <header className="p-6 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-8">
              <h2 className="text-2xl font-display font-black tracking-tight">Digitomatic Panel</h2>
              <nav className="flex gap-4">
                {['Services', 'Portfolio', 'Pricing', 'Messages'].map(t => (
                  <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 rounded-lg font-bold transition-all ${activeTab === t ? 'bg-brand' : 'hover:bg-white/5'}`}>{t}</button>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={handleLogout} className="p-2 hover:text-red-400"><LogOut size={20}/></button>
              <button onClick={onClose} className="bg-white/10 px-4 py-2 rounded-lg font-bold">Close Panel</button>
            </div>
          </header>

          <main className="flex-grow p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-display font-bold">{activeTab}</h3>
                {activeTab !== 'Messages' && (
                  <button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} className="bg-brand px-6 py-2 rounded-lg font-bold flex items-center gap-2"><Plus size={20}/> Add New</button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 font-bold">
                    <tr>
                      <th className="p-4">ID</th>
                      <th className="p-4">Content</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {(activeTab === 'Services' ? services : activeTab === 'Portfolio' ? portfolio : activeTab === 'Pricing' ? pricing : messages).map((item: any) => (
                      <tr key={item.id} className="hover:bg-white/5 transition-all">
                        <td className="p-4 text-white/40">{item.id}</td>
                        <td className="p-4">
                          <div className="font-bold">{item.title || item.name || item.service}</div>
                          <div className="text-white/60 line-clamp-1">{item.description || item.message || `$${item.price}`}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-3">
                            {activeTab !== 'Messages' && (
                              <button onClick={()=>{ setEditingItem(item); setIsModalOpen(true); }} className="p-2 hover:bg-brand rounded transition-all">Edit</button>
                            )}
                            <button onClick={()=>handleDelete(activeTab.toLowerCase(), item.id)} className="p-2 hover:bg-red-500/20 text-red-400 rounded transition-all">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>

          <AnimatePresence>
            {isModalOpen && (
              <div className="fixed inset-0 z-[110] bg-black/80 flex items-center justify-center p-6">
                <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} className="bg-[#1a1f3a] p-8 rounded-2xl w-full max-w-lg shadow-2xl relative">
                  <button onClick={()=>setIsModalOpen(false)} className="absolute top-4 right-4 text-white/50"><X/></button>
                  <h4 className="text-2xl font-display font-extrabold mb-6">{editingItem ? 'Edit' : 'Add'} {activeTab}</h4>
                  {activeTab === 'Services' && <ServiceForm item={editingItem} />}
                  {activeTab === 'Portfolio' && <PortfolioForm item={editingItem} />}
                  {activeTab === 'Pricing' && <PricingForm item={editingItem} />}
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [dbData, setDbData] = useState({ services: FALLBACK_SERVICES, portfolio: FALLBACK_PORTFOLIO, pricing: FALLBACK_PRICING });

  const refreshData = async () => {
    try {
      const [sRes, pRes, prRes] = await Promise.all([
        supabase.from('services').select('*').order('sort_order', { ascending: true }),
        supabase.from('portfolio').select('*').order('sort_order', { ascending: true }),
        supabase.from('pricing').select('*').order('sort_order', { ascending: true })
      ]);
      
      setDbData({
        services: (sRes.data && sRes.data.length) ? sRes.data : FALLBACK_SERVICES,
        portfolio: (pRes.data && pRes.data.length) ? pRes.data : FALLBACK_PORTFOLIO,
        pricing: (prRes.data && prRes.data.length) ? prRes.data : FALLBACK_PRICING
      });
    } catch (e) {
      console.warn("Supabase load failed, using fallbacks", e);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="min-h-screen selection:bg-brand selection:text-white">
      <Navbar />
      <Hero />
      <ClientLogos />
      <About />
      <Services services={dbData.services} />
      <Portfolio portfolio={dbData.portfolio} />
      <CTASection />
      
      {/* Testimonials Trust Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="rounded-[40px] aspect-[4/5] bg-gradient-to-tr from-brand/20 to-indigo-50 border border-[#e8ecf8] overflow-hidden flex items-center justify-center text-[10rem]">
              👥
            </div>
          </div>
          <div>
            <span className="section-tag">Customer Satisfaction</span>
            <h2 className="section-title">› Clients Adore Our Support Staff, And You Will Too</h2>
            <p className="text-muted text-lg mb-10 leading-relaxed font-medium">
              We aren't just a technical partner; we are your strategic ally. Our team is dedicated to your success, providing transparent communication and world-class expertise at every step.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div className="glass-card p-6 flex flex-col items-center text-center hover:scale-105 transition-all duration-500 ease-out">
                <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center mb-4"><Zap size={24}/></div>
                <div className="font-display font-extrabold text-xl">High Standards</div>
              </div>
              <div className="glass-card p-6 flex flex-col items-center text-center hover:scale-105 transition-all duration-500 ease-out">
                <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4"><Star size={24}/></div>
                <div className="font-display font-extrabold text-xl">People Focused</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-yellow-400 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={24}/>)}
            </div>
            <p className="font-bold text-dark italic">"Digitomatic transformed our legacy systems into a modern powerhouse. Highly recommended!"</p>
          </div>
        </div>
      </section>

      <Pricing pricing={dbData.pricing} />
      <Contact />
      <Footer onAdminClick={() => setIsAdminOpen(true)} />

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/yournumberhere" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 ring-4 ring-white/20"
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.432 2.503 1.157 3.469L6.5 18l2.671-.701c.907.5 1.947.787 3.056.788 3.18 0 5.767-2.587 5.768-5.766 0-3.181-2.587-5.768-5.768-5.768h-.004zm3.33 8.163c-.145.241-.715.488-1.01.518-.266.026-.525.047-1.46-.339-.936-.385-1.543-1.341-1.59-1.403-.047-.063-.38-.507-.38-.979 0-.472.247-.704.334-.809.088-.105.191-.131.254-.131h.169c.073 0 .121-.005.18.136.06.141.247.604.269.646.023.042.038.093.01.152-.028.059-.043.078-.088.139-.044.062-.095.1-.139.148-.047.047-.098.099-.041.197.057.099.254.414.545.673.376.331.7.433.8.484.099.05.158.042.217-.025.059-.067.251-.293.318-.393.064-.1.132-.084.218-.052.088.032.551.261.646.309.096.047.16.071.183.111.022.04.022.23-.123.471zM12.004 2C6.48 2 2.01 6.471 2 12c0 1.916.541 3.704 1.474 5.223L2 22l4.945-1.297c1.482.809 3.17 1.277 4.965 1.277 5.524 0 10-4.471 10.003-9.991C22.016 6.484 17.534 2 12.004 2z"/>
        </svg>
      </a>

      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        services={dbData.services}
        portfolio={dbData.portfolio}
        pricing={dbData.pricing}
        refreshData={refreshData}
      />
    </div>
  );
}
