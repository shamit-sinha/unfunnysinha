import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation, useScrollAnimationMultiple } from '@/hooks/useScrollAnimation';
import { ArrowRight, ExternalLink } from 'lucide-react';

function AnimatedSection({ className = '', children, variant = 'up' }) {
  const ref = useScrollAnimation();
  const cls = variant === 'left' ? 'animate-on-scroll-left' : variant === 'scale' ? 'animate-on-scroll-scale' : 'animate-on-scroll';
  return <div ref={ref} className={`${cls} ${className}`}>{children}</div>;
}

function StaggerSection({ className = '', children }) {
  const ref = useScrollAnimationMultiple();
  return <div ref={ref} className={`stagger-children ${className}`}>{children}</div>;
}

const projects = [
  {
    title: 'Echoes of Dawn',
    category: 'Short Film',
    year: '2024',
    desc: 'A meditative exploration of solitude in rural Japan. Screened at Sundance and Tokyo International Film Festival.',
    img: 'https://images.unsplash.com/photo-1761499930744-1d689014c9a6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwyfHxjaW5lbWF0aWMlMjBmaWxtJTIwZGlyZWN0b3IlMjBiZWhpbmQlMjBzY2VuZXN8ZW58MHx8fHwxNzc2MjQ0NDk5fDA&ixlib=rb-4.1.0&q=85',
    span: 'col-span-1 md:col-span-2',
  },
  {
    title: 'City Pulse',
    category: 'Documentary',
    year: '2023',
    desc: 'An intimate portrait of street musicians in Barcelona. Winner of Best Documentary at SXSW.',
    img: 'https://images.unsplash.com/photo-1758390851031-bcf34075ca61?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBmaWxtJTIwZGlyZWN0b3IlMjBiZWhpbmQlMjBzY2VuZXN8ZW58MHx8fHwxNzc2MjQ0NDk5fDA&ixlib=rb-4.1.0&q=85',
    span: 'col-span-1',
  },
  {
    title: 'The Last Frame',
    category: 'Narrative Feature',
    year: '2023',
    desc: 'A tribute to analog photography and the artists who refuse to let it die. Premiered at Tribeca.',
    img: 'https://static.prod-images.emergentagent.com/jobs/73ae5807-027a-4093-963f-fcac8fc5a992/images/e57188b09bc03bedeb5af11e0dfcc2b7081ff1d8f1d4b300a7d2c5f8e7bf4700.png',
    span: 'col-span-1',
  },
  {
    title: 'Neon Requiem',
    category: 'Music Video',
    year: '2022',
    desc: 'A visually striking music video blending practical effects with minimal CGI. Over 2M views on YouTube.',
    img: 'https://images.unsplash.com/photo-1695192655920-00dfc0c1ea22?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHw0fHxjaW5lbWF0aWMlMjBmaWxtJTIwZGlyZWN0b3IlMjBiZWhpbmQlMjBzY2VuZXN8ZW58MHx8fHwxNzc2MjQ0NDk5fDA&ixlib=rb-4.1.0&q=85',
    span: 'col-span-1 md:col-span-2',
  },
];

export default function AboutPage() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const tryPlay = () => { video.play().catch(() => {}); };
    video.addEventListener('loadeddata', tryPlay);
    if (video.readyState >= 2) tryPlay();
    return () => video.removeEventListener('loadeddata', tryPlay);
  }, []);

  return (
    <div data-testid="about-page">
      {/* Full-screen Video Hero */}
      <section data-testid="about-hero-video" className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            data-testid="about-video"
            poster="https://static.prod-images.emergentagent.com/jobs/73ae5807-027a-4093-963f-fcac8fc5a992/images/e57188b09bc03bedeb5af11e0dfcc2b7081ff1d8f1d4b300a7d2c5f8e7bf4700.png"
          >
            <source src="/about-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/20" />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="max-w-2xl space-y-6">
              <span
                className="inline-block font-body text-[11px] uppercase tracking-[0.3em] text-brand-primary animate-fade-in"
                style={{ animationDelay: '300ms', animationFillMode: 'both' }}
              >
                Portfolio & Projects
              </span>
              <h1
                className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight animate-fade-in"
                style={{ animationDelay: '500ms', animationFillMode: 'both' }}
              >
                A decade of<br /><span className="italic font-medium text-brand-primary">visual stories</span>
              </h1>
              <p
                className="font-body text-sm sm:text-base text-white/70 max-w-lg leading-relaxed animate-fade-in"
                style={{ animationDelay: '700ms', animationFillMode: 'both' }}
              >
                From short films to feature-length documentaries, here's a selection of work
                that defines my creative journey. Each project taught me something new —
                and those lessons are exactly what I bring to the workshop.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
          <div className="w-[1px] h-10 bg-white/30 mx-auto mb-2" />
          <span className="font-body text-[10px] uppercase tracking-[0.3em] text-white/40">Scroll</span>
        </div>
      </section>

      {/* Documentary Section */}
      <section data-testid="section-documentary" className="py-24 md:py-32 border-t border-brand-border/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            <div className="flex flex-col justify-center lg:col-span-2">
              <AnimatedSection>
                <span className="font-body text-[11px] uppercase tracking-[0.3em] text-brand-primary mb-4 block">01</span>
                <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text tracking-tight leading-[1.05]">Documentary</h2>
                <p className="font-body text-sm md:text-base text-brand-muted leading-relaxed mt-6 max-w-sm">
                  Real stories, real people. Documenting experiences that deserve to be seen and felt.
                </p>
              </AnimatedSection>
            </div>
            <AnimatedSection className="lg:col-span-3">
              <div className="grid grid-cols-2 gap-8">
                <a
                  href="https://www.youtube.com/watch?v=whVxe_igPbM&t=2s"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="doc-poster-1"
                  className="block overflow-hidden cursor-pointer"
                >
                  <img
                    src="https://customer-assets.emergentagent.com/job_premium-course-3/artifacts/vyneofm9_Brown%20and%20White%20Minimalist%20Photo%20Lose%20the%20way%20Movie%20Poster.png"
                    alt="How's College? — Documentary poster"
                    className="w-full h-auto hover:scale-105 transition-transform duration-500"
                  />
                </a>
                <a
                  href="https://www.youtube.com/watch?v=-3FLyv7Qfso&t=1s"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="doc-poster-2"
                  className="block overflow-hidden cursor-pointer"
                >
                  <img
                    src="https://customer-assets.emergentagent.com/job_premium-course-3/artifacts/qo1up6yj_Black%20Red%20Simple%20Horror%20Movie%20Poster.png"
                    alt="IITJEE An Experience — Documentary poster"
                    className="w-full h-auto hover:scale-105 transition-transform duration-500"
                  />
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Short Films Section */}
      <section data-testid="section-short-films" className="py-24 md:py-32 border-t border-brand-border/40 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="flex flex-col justify-center">
              <AnimatedSection>
                <span className="font-body text-[11px] uppercase tracking-[0.3em] text-brand-primary mb-4 block">02</span>
                <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text tracking-tight leading-[1.05]">Short Films</h2>
                <p className="font-body text-sm md:text-base text-brand-muted leading-relaxed mt-6 max-w-sm">
                  Narrative-driven short films exploring themes of identity, ambition, and the human condition.
                </p>
              </AnimatedSection>
            </div>
            <AnimatedSection>
              <div className="aspect-video bg-brand-surface-secondary border border-brand-border flex items-center justify-center">
                <p className="font-body text-xs text-brand-muted tracking-wide uppercase">Coming soon</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* UGC Videos Section */}
      <section data-testid="section-ugc" className="py-24 md:py-32 border-t border-brand-border/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="flex flex-col justify-center">
              <AnimatedSection>
                <span className="font-body text-[11px] uppercase tracking-[0.3em] text-brand-primary mb-4 block">03</span>
                <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text tracking-tight leading-[1.05]">UGC Videos</h2>
                <p className="font-body text-sm md:text-base text-brand-muted leading-relaxed mt-6 max-w-sm">
                  User-generated content crafted for brands that want authentic, cinematic storytelling.
                </p>
              </AnimatedSection>
            </div>
            <AnimatedSection>
              <div className="aspect-video bg-brand-surface border border-brand-border flex items-center justify-center">
                <p className="font-body text-xs text-brand-muted tracking-wide uppercase">Coming soon</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Freelance Work Section */}
      <section data-testid="section-freelance" className="py-24 md:py-32 border-t border-brand-border/40 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="flex flex-col justify-center">
              <AnimatedSection>
                <span className="font-body text-[11px] uppercase tracking-[0.3em] text-brand-primary mb-4 block">04</span>
                <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text tracking-tight leading-[1.05]">Freelance Work</h2>
                <p className="font-body text-sm md:text-base text-brand-muted leading-relaxed mt-6 max-w-sm">
                  Client projects spanning music videos, brand films, and creative campaigns.
                </p>
              </AnimatedSection>
            </div>
            <AnimatedSection>
              <div className="aspect-video bg-brand-surface-secondary border border-brand-border flex items-center justify-center">
                <p className="font-body text-xs text-brand-muted tracking-wide uppercase">Coming soon</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
