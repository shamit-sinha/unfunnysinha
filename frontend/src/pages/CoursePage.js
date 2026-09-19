import { useScrollAnimation } from '@/hooks/useScrollAnimation';

function AnimatedSection({ className = '', children }) {
  const ref = useScrollAnimation();
  return <div ref={ref} className={`animate-on-scroll ${className}`}>{children}</div>;
}

const curriculum = [
  'How to shoot on your phone',
  'Storytelling & scripting',
  'How to edit on your laptop',
  'Sound & presentation',
  'Communicating ideas through video',
];

export default function CoursePage() {
  return (
    <div data-testid="course-page">
      {/* Hero — Left-aligned title with space for image on right */}
      <section data-testid="course-hero" className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-8">
              <span
                className="inline-block font-body text-[11px] uppercase tracking-[0.3em] text-brand-primary animate-fade-in"
                style={{ animationDelay: '200ms', animationFillMode: 'both' }}
              >
                The Workshop
              </span>
              <h1
                className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text leading-[1.05] tracking-tight animate-fade-in"
                style={{ animationDelay: '400ms', animationFillMode: 'both' }}
              >
                Learn filmmaking<br />the way I did
              </h1>
              <div className="space-y-6 animate-fade-in" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
                <p className="font-body text-sm md:text-base text-brand-muted leading-relaxed max-w-lg">
                  If you've been consuming great films and videos but can't figure out why your own work doesn't feel the same — this workshop is for you.
                </p>
                <p className="font-body text-sm md:text-base text-brand-muted leading-relaxed max-w-lg">
                  This is a beginner-focused 3–4 week program where you'll learn the fundamentals of filmmaking as a solo creator: storytelling, shooting, editing, sound, and more importantly, how to make clear decisions at every step — so your work stops feeling random and starts feeling intentional.
                </p>
                <p className="font-body text-sm md:text-base text-brand-text leading-relaxed max-w-lg font-medium">
                  By the end, you'll make your own short film — not as homework, but as proof.
                </p>
                <div className="flex items-center gap-6 pt-2">
                  <a
                    href="https://rzp.io/rzp/XtAfhZf"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="course-payment-button"
                    className="inline-flex items-center gap-2 px-10 py-4 border border-brand-text text-brand-text font-body text-[11px] tracking-[0.15em] hover:bg-brand-text hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    ENROLL NOW — &#8377;1399
                  </a>
                </div>
              </div>
            </div>

            {/* Right side — image */}
            <div
              className="hidden lg:block animate-fade-in"
              style={{ animationDelay: '500ms', animationFillMode: 'both' }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="https://customer-assets.emergentagent.com/job_premium-course-3/artifacts/iqfcs1s2_Still%202026-04-16%20172703_1.1.1.png"
                  alt="Unfunny Sinha — filmmaker with camera"
                  className="w-full h-full object-cover"
                  data-testid="course-hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Banner */}
      <section data-testid="course-photo-banner" className="border-t border-brand-border/40">
        <AnimatedSection>
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
            <div className="aspect-video overflow-hidden">
              <img
                src="/course-instructor.jpg"
                alt="Unfunny Sinha in his home studio"
                className="w-full h-full object-cover"
                data-testid="course-photo-banner-image"
              />
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* For people who actually want to start */}
      <section data-testid="section-start" className="py-24 md:py-32 border-t border-brand-border/40 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            <div className="lg:col-span-2">
              <AnimatedSection>
                <span className="font-body text-[11px] uppercase tracking-[0.3em] text-brand-primary mb-4 block">01</span>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text tracking-tight leading-[1.05]">
                  A 3-week workshop.<br />For people who<br />actually want to start.
                </h2>
              </AnimatedSection>
            </div>
            <div className="lg:col-span-3 flex flex-col justify-center">
              <AnimatedSection>
                <div className="space-y-5 max-w-xl">
                  <p className="font-body text-sm md:text-base text-brand-muted leading-relaxed">
                    Not just think about filmmaking. Actually start making videos.
                  </p>
                  <p className="font-body text-sm md:text-base text-brand-muted leading-relaxed">
                    You don't need an expensive camera or a fancy setup.
                  </p>
                  <p className="font-body text-sm md:text-base text-brand-text leading-relaxed font-medium">
                    Your phone is enough to shoot. Your laptop is enough to edit.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Dates & Format */}
      <section data-testid="section-dates-format" className="py-24 md:py-32 border-t border-brand-border/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-16">
            <AnimatedSection>
              <span className="font-body text-[11px] uppercase tracking-[0.3em] text-brand-primary mb-4 block">Dates</span>
              <p className="font-heading text-2xl md:text-3xl font-bold text-brand-text tracking-tight leading-tight">
                14th October — 8th November 2026
              </p>
            </AnimatedSection>
            <AnimatedSection>
              <span className="font-body text-[11px] uppercase tracking-[0.3em] text-brand-primary mb-4 block">Format</span>
              <p className="font-heading text-2xl md:text-3xl font-bold text-brand-text tracking-tight leading-tight">
                4 Google Meet sessions / week + Assignment Discussions
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What I'll Cover */}
      <section data-testid="section-curriculum" className="py-24 md:py-32 border-t border-brand-border/40 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            <div className="lg:col-span-2">
              <AnimatedSection>
                <span className="font-body text-[11px] uppercase tracking-[0.3em] text-brand-primary mb-4 block">02</span>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text tracking-tight leading-[1.05]">
                  What I'll cover
                </h2>
              </AnimatedSection>
            </div>
            <div className="lg:col-span-3">
              <AnimatedSection>
                <ul className="divide-y divide-brand-border">
                  {curriculum.map((item, idx) => (
                    <li
                      key={idx}
                      data-testid={`curriculum-item-${idx}`}
                      className="flex items-center gap-6 py-5"
                    >
                      <span className="font-body text-xs text-brand-primary">{String(idx + 1).padStart(2, '0')}</span>
                      <span className="font-body text-sm md:text-base text-brand-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Short Film Competition */}
      <section data-testid="section-competition" className="py-24 md:py-32 border-t border-brand-border/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <AnimatedSection variant="scale">
            <div className="text-center max-w-2xl mx-auto">
              <span className="font-body text-[11px] uppercase tracking-[0.3em] text-brand-primary mb-4 block">03</span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text tracking-tight leading-[1.1]">
                And we end with a short film competition — with some surprise prizes.
              </h2>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* All You Need + CTA */}
      <section data-testid="section-requirements" className="py-24 md:py-32 border-t border-brand-border/40 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <AnimatedSection>
            <div className="text-center max-w-xl mx-auto space-y-8">
              <div>
                <span className="font-body text-[11px] uppercase tracking-[0.3em] text-brand-primary mb-4 block">All You Need</span>
                <p className="font-heading text-2xl md:text-3xl font-bold text-brand-text tracking-tight leading-snug">
                  A basic phone, a laptop & the willingness to start.
                </p>
              </div>
              <a
                href="https://rzp.io/rzp/XtAfhZf"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="course-payment-button-bottom"
                className="inline-flex items-center gap-2 px-10 py-4 border border-brand-text text-brand-text font-body text-[11px] tracking-[0.15em] hover:bg-brand-text hover:text-white transition-all duration-300 cursor-pointer"
              >
                ENROLL NOW — &#8377;1399
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
