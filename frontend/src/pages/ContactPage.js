import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { Send, Mail, MapPin, Instagram, Youtube, Film } from 'lucide-react';

const SiDiscord = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none"><path d="M9.09 9a3 3 0 0 1 5.83 0"/><circle cx="9" cy="15" r="1"/><circle cx="15" cy="15" r="1"/><path d="M8 20s1.5-2 4-2 4 2 4 2"/><path d="M20.36 7.64a9 9 0 1 1-16.72 0"/><path d="M12 2a14.5 14.5 0 0 0-8.48 5.85"/><path d="M12 2a14.5 14.5 0 0 1 8.48 5.85"/></svg>
);
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function AnimatedSection({ className = '', children }) {
  const ref = useScrollAnimation();
  return <div ref={ref} className={`animate-on-scroll ${className}`}>{children}</div>;
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all fields.');
      return;
    }
    setSending(true);
    try {
      const res = await axios.post(`${API}/contact`, form);
      if (res.data.email_sent) {
        toast.success('Message sent! Check your inbox for a confirmation.');
      } else {
        toast.success('Message received! We\'ll get back to you soon.');
      }
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div data-testid="contact-page">
      <Toaster position="top-right" />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <span className="font-body text-xs uppercase tracking-[0.25em] text-brand-primary mb-4 block animate-fade-in-up" style={{ animationDelay: '0ms', animationFillMode: 'both' }}>
            Get in Touch
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium text-brand-text leading-[1.1] tracking-tight animate-fade-in-up" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
            Let's start a<br /><span className="italic text-brand-primary">conversation</span>
          </h1>
          <p className="font-body text-base md:text-lg text-brand-muted mt-6 max-w-md mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
            Have a question about the workshop, want to collaborate, or just want to say hello? 
            Drop me a message below.
          </p>
        </div>
      </section>

      {/* Form & Info */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <AnimatedSection className="lg:col-span-3">
              <form onSubmit={handleSubmit} data-testid="contact-form" className="space-y-8">
                <div>
                  <label className="font-body text-xs uppercase tracking-[0.15em] text-brand-muted mb-3 block">Your Name</label>
                  <input
                    type="text"
                    data-testid="contact-name-input"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Alex Morgan"
                    className="w-full bg-transparent border-b border-brand-border rounded-none focus:border-brand-primary focus:ring-0 focus:outline-none px-0 py-3 font-body text-base text-brand-text placeholder:text-brand-muted/50 transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="font-body text-xs uppercase tracking-[0.15em] text-brand-muted mb-3 block">Email Address</label>
                  <input
                    type="email"
                    data-testid="contact-email-input"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full bg-transparent border-b border-brand-border rounded-none focus:border-brand-primary focus:ring-0 focus:outline-none px-0 py-3 font-body text-base text-brand-text placeholder:text-brand-muted/50 transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="font-body text-xs uppercase tracking-[0.15em] text-brand-muted mb-3 block">Message</label>
                  <textarea
                    data-testid="contact-message-input"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project or question..."
                    rows={5}
                    className="w-full bg-transparent border-b border-brand-border rounded-none focus:border-brand-primary focus:ring-0 focus:outline-none px-0 py-3 font-body text-base text-brand-text placeholder:text-brand-muted/50 transition-colors duration-200 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  data-testid="contact-submit-button"
                  disabled={sending}
                  className="inline-flex items-center gap-2 px-10 py-4 border border-brand-text text-brand-text font-body text-[11px] tracking-[0.15em] hover:bg-brand-text hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-brand-text"
                >
                  {sending ? 'SENDING...' : 'SEND MESSAGE'} <Send size={14} />
                </button>
              </form>
            </AnimatedSection>

            {/* Info */}
            <AnimatedSection className="lg:col-span-2">
              <div className="space-y-10 lg:pl-8">
                <div>
                  <h3 className="font-body text-xs uppercase tracking-[0.2em] text-brand-muted mb-4">Contact Info</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail size={18} className="text-brand-primary" />
                      <p className="font-body text-sm text-brand-text">unfunnysinha@gmail.com</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-brand-primary" />
                      <p className="font-body text-sm text-brand-text">Bengaluru, Karnataka</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-body text-xs uppercase tracking-[0.2em] text-brand-muted mb-4">Follow Along</h3>
                  <div className="flex gap-3 relative z-10">
                    <a href="https://www.instagram.com/unfunnysinhaa" target="_blank" rel="noopener noreferrer" data-testid="contact-social-instagram" className="p-3 border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-text transition-all duration-300 cursor-pointer [&_svg]:pointer-events-none">
                      <Instagram size={18} />
                    </a>
                    <a href="https://www.youtube.com/@unfunnysinhaa" target="_blank" rel="noopener noreferrer" data-testid="contact-social-youtube" className="p-3 border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-text transition-all duration-300 cursor-pointer [&_svg]:pointer-events-none">
                      <Youtube size={18} />
                    </a>
                    <a href="https://discord.com/invite/2BNMrcfJ" target="_blank" rel="noopener noreferrer" data-testid="contact-social-discord" className="p-3 border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-text transition-all duration-300 cursor-pointer [&_svg]:pointer-events-none">
                      <SiDiscord />
                    </a>
                    <a href="https://letterboxd.com/shamitsinha/" target="_blank" rel="noopener noreferrer" data-testid="contact-social-letterboxd" className="p-3 border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-text transition-all duration-300 cursor-pointer [&_svg]:pointer-events-none">
                      <Film size={18} />
                    </a>
                  </div>
                </div>

                <div className="bg-brand-surface rounded-2xl p-6 border border-brand-border">
                  <h3 className="font-heading text-lg font-medium text-brand-text mb-2">Response Time</h3>
                  <p className="font-body text-sm text-brand-muted leading-relaxed">
                    I typically respond within 24–48 hours. For urgent inquiries about 
                    the workshop, please mention "Workshop" in your subject line.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
