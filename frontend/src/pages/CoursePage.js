import { useScrollAnimation } from '@/hooks/useScrollAnimation';

function AnimatedSection({ className = '', children }) {
  const ref = useScrollAnimation();
  return <div ref={ref} className={`animate-on-scroll ${className}`}>{children}</div>;
}

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
    </div>
  );
}
