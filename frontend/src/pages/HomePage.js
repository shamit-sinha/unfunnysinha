import { Link } from 'react-router-dom';
import { useScrollAnimation, useScrollAnimationMultiple } from '@/hooks/useScrollAnimation';
import { Play, Camera, Film, Lightbulb, Clapperboard, Star, Users, Award, ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

function AnimatedSection({ className = '', children, variant = 'up' }) {
  const ref = useScrollAnimation();
  const cls = variant === 'left' ? 'animate-on-scroll-left' : variant === 'scale' ? 'animate-on-scroll-scale' : 'animate-on-scroll';
  return <div ref={ref} className={`${cls} ${className}`}>{children}</div>;
}

function StaggerSection({ className = '', children }) {
  const ref = useScrollAnimationMultiple();
  return <div ref={ref} className={`stagger-children ${className}`}>{children}</div>;
}

// Hero Section — Full-screen cinematic video overlay
function HeroSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const tryPlay = () => {
      video.play().catch(() => {});
    };
    video.addEventListener('loadeddata', tryPlay);
    // Also try immediately in case already loaded
    if (video.readyState >= 2) tryPlay();
    return () => video.removeEventListener('loadeddata', tryPlay);
  }, []);

  return (
    <section data-testid="hero-section" className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          data-testid="hero-video"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/25" />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="max-w-2xl space-y-7">
            <span
              className="inline-block font-body text-xs uppercase tracking-[0.3em] text-brand-primary animate-fade-in-up"
              style={{ animationDelay: '300ms', animationFillMode: 'both' }}
            >
              Filmmaker &middot; Storyteller &middot; Mentor
            </span>

            <h1
              className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight animate-fade-in-up"
              style={{ animationDelay: '500ms', animationFillMode: 'both' }}
            >
              Turning stories<br />
              <span className="italic font-medium text-brand-primary">into cinema</span>
            </h1>

            <p
              className="font-body text-sm sm:text-base md:text-lg text-white/75 max-w-lg leading-relaxed animate-fade-in-up"
              style={{ animationDelay: '700ms', animationFillMode: 'both' }}
            >
              A filmmaker and content creator passionate about the art and craft of visual storytelling.
            </p>

            <div
              className="flex flex-wrap items-center gap-4 pt-2 animate-fade-in-up"
              style={{ animationDelay: '900ms', animationFillMode: 'both' }}
            >
              <Link
                to="/course"
                data-testid="hero-cta-primary"
                className="inline-flex items-center gap-2 px-9 py-4 border border-white/50 text-white font-body text-[11px] tracking-[0.15em] hover:bg-white hover:text-brand-text transition-all duration-300"
              >
                ENROLL NOW <ArrowRight size={14} />
              </Link>
              <Link
                to="/about"
                data-testid="hero-cta-secondary"
                className="inline-flex items-center gap-2 px-9 py-4 border border-white/25 text-white/70 font-body text-[11px] tracking-[0.15em] hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                VIEW MY WORK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Course Teaser / Pillars
function CourseTeaserSection() {
  const pillars = [
    { icon: <Camera size={24} />, title: 'Cinematography', desc: 'Master camera movement, framing, and the visual language that brings stories to life.' },
    { icon: <Film size={24} />, title: 'Storytelling', desc: 'Learn narrative structure, screenplay fundamentals, and how to evoke emotion through film.' },
    { icon: <Lightbulb size={24} />, title: 'Production', desc: 'From pre-production planning to post-production polish, understand the full workflow.' },
  ];

  return (
    <section data-testid="course-teaser-section" className="py-24 md:py-32 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="font-body text-xs uppercase tracking-[0.25em] text-brand-primary mb-3 block">The Workshop</span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-brand-text tracking-tight">
              Three pillars of<br /><span className="italic text-brand-primary">cinematic mastery</span>
            </h2>
          </div>
        </AnimatedSection>
        <StaggerSection className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <div
              key={i}
              data-testid={`pillar-card-${i}`}
              className="bg-white rounded-2xl p-8 border border-brand-border shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)] transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-brand-surface flex items-center justify-center text-brand-primary mb-6">
                {p.icon}
              </div>
              <h3 className="font-heading text-xl font-medium text-brand-text mb-3">{p.title}</h3>
              <p className="font-body text-sm text-brand-muted leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </StaggerSection>
      </div>
    </section>
  );
}

// Features / Zigzag
function FeaturesSection() {
  const features = [
    {
      title: 'Hands-on Learning',
      desc: 'Every module includes practical assignments that push you to apply what you learn immediately. No passive watching — you create.',
      img: 'https://images.unsplash.com/photo-1761499930744-1d689014c9a6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwyfHxjaW5lbWF0aWMlMjBmaWxtJTIwZGlyZWN0b3IlMjBiZWhpbmQlMjBzY2VuZXN8ZW58MHx8fHwxNzc2MjQ0NDk5fDA&ixlib=rb-4.1.0&q=85',
    },
    {
      title: 'Industry-Standard Techniques',
      desc: 'Learn the same methods used on professional film sets — from lighting setups to color grading workflows that Hollywood colorists use daily.',
      img: 'https://images.unsplash.com/photo-1758390851031-bcf34075ca61?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBmaWxtJTIwZGlyZWN0b3IlMjBiZWhpbmQlMjBzY2VuZXN8ZW58MHx8fHwxNzc2MjQ0NDk5fDA&ixlib=rb-4.1.0&q=85',
    },
  ];

  return (
    <section data-testid="features-section" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">
        {features.map((f, i) => (
          <AnimatedSection key={i} variant={i % 2 === 0 ? 'up' : 'left'}>
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? 'lg:direction-rtl' : ''}`}>
              <div className={`space-y-6 ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <h3 className="font-heading text-2xl sm:text-3xl font-medium text-brand-text tracking-tight">{f.title}</h3>
                <p className="font-body text-sm md:text-base text-brand-muted leading-relaxed max-w-md">{f.desc}</p>
                <Link
                  to="/course"
                  data-testid={`feature-cta-${i}`}
                  className="inline-flex items-center gap-2 font-body text-[11px] tracking-[0.1em] text-brand-text border-b border-brand-text pb-1 hover:text-brand-primary hover:border-brand-primary transition-colors duration-300"
                >
                  LEARN MORE <ArrowRight size={12} />
                </Link>
              </div>
              <div className={`${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <div className="aspect-[3/2] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                  <img src={f.img} alt={f.title} className="w-full h-full object-cover" data-testid={`feature-image-${i}`} />
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}

// Testimonials
function TestimonialsSection() {
  const testimonials = [
    { name: 'Sarah Chen', role: 'Documentary Filmmaker', text: 'This workshop completely transformed how I approach storytelling. The techniques I learned here landed me my first festival screening.' },
    { name: 'Marcus Rivera', role: 'Music Video Director', text: "Alex's mentorship gave me the confidence to quit my day job and pursue filmmaking full-time. Best investment I've ever made." },
    { name: 'Priya Sharma', role: 'Short Film Creator', text: 'The production modules alone are worth the entire price. I went from shaky phone footage to cinematic quality in weeks.' },
  ];

  return (
    <section data-testid="testimonials-section" className="py-24 md:py-32 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="font-body text-xs uppercase tracking-[0.25em] text-brand-primary mb-3 block">Student Stories</span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-brand-text tracking-tight">
              Trusted by filmmakers<br /><span className="italic text-brand-primary">worldwide</span>
            </h2>
          </div>
        </AnimatedSection>
        <StaggerSection className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              data-testid={`testimonial-card-${i}`}
              className="bg-white rounded-2xl p-8 border border-brand-border shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => <Star key={j} size={14} className="fill-brand-primary text-brand-primary" />)}
              </div>
              <p className="font-heading text-lg italic text-brand-text leading-relaxed mb-8">"{t.text}"</p>
              <div>
                <p className="font-body text-sm font-medium text-brand-text">{t.name}</p>
                <p className="font-body text-xs text-brand-muted">{t.role}</p>
              </div>
            </div>
          ))}
        </StaggerSection>
      </div>
    </section>
  );
}

// Social Proof
function SocialProofSection() {
  const stats = [
    { num: '1,200+', label: 'Students Enrolled' },
    { num: '50+', label: 'Hours of Content' },
    { num: '98%', label: 'Satisfaction Rate' },
    { num: '15', label: 'Film Festival Features' },
  ];

  return (
    <section data-testid="social-proof-section" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <StaggerSection className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((s, i) => (
            <div key={i} data-testid={`stat-${i}`} className="text-center">
              <p className="font-heading text-4xl sm:text-5xl font-medium text-brand-primary mb-2">{s.num}</p>
              <p className="font-body text-sm text-brand-muted">{s.label}</p>
            </div>
          ))}
        </StaggerSection>
      </div>
    </section>
  );
}

// Pricing Preview
function PricingPreviewSection() {
  return (
    <section data-testid="pricing-preview-section" className="py-24 md:py-32 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto text-center">
            <span className="font-body text-xs uppercase tracking-[0.25em] text-brand-primary mb-3 block">Investment</span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-brand-text tracking-tight mb-6">
              One workshop.<br /><span className="italic text-brand-primary">Lifetime access.</span>
            </h2>
            <div className="bg-white rounded-2xl p-10 border border-brand-border shadow-[0_8px_30px_rgba(0,0,0,0.04)] mb-8">
              <p className="font-heading text-5xl font-medium text-brand-text mb-2">$497</p>
              <p className="font-body text-sm text-brand-muted mb-6">One-time payment &middot; Lifetime access &middot; All future updates</p>
              <Link
                to="/course"
                data-testid="pricing-preview-cta"
                className="inline-flex items-center gap-2 px-10 py-4 border border-brand-text text-brand-text font-body text-[11px] tracking-[0.15em] hover:bg-brand-text hover:text-white transition-all duration-300"
              >
                SEE FULL DETAILS <ArrowRight size={14} />
              </Link>
            </div>
            <p className="font-body text-xs text-brand-muted">Limited seats available. Early bird pricing ends soon.</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Final CTA
function FinalCTASection() {
  return (
    <section data-testid="final-cta-section" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimatedSection variant="scale">
          <div className="text-center max-w-2xl mx-auto space-y-8">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-brand-text tracking-tight">
              Ready to start your<br /><span className="italic text-brand-primary">filmmaking journey?</span>
            </h2>
            <p className="font-body text-base text-brand-muted leading-relaxed">
              Join over 1,200 aspiring filmmakers who have transformed their creative vision
              into professional-quality cinema through this workshop.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/course"
                data-testid="final-cta-primary"
                className="inline-flex items-center gap-2 px-10 py-4 border border-brand-text text-brand-text font-body text-[11px] tracking-[0.15em] hover:bg-brand-text hover:text-white transition-all duration-300"
              >
                ENROLL NOW <ArrowRight size={14} />
              </Link>
              <Link
                to="/contact"
                data-testid="final-cta-secondary"
                className="inline-flex items-center gap-2 px-10 py-4 border border-brand-border text-brand-muted font-body text-[11px] tracking-[0.15em] hover:border-brand-text hover:text-brand-text transition-all duration-300"
              >
                ASK A QUESTION
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div data-testid="home-page">
      <HeroSection />
    </div>
  );
}
