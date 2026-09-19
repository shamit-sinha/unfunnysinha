import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Instagram, Play } from 'lucide-react';

function AnimatedSection({ className = '', children }) {
  const ref = useScrollAnimation();
  return <div ref={ref} className={`animate-on-scroll ${className}`}>{children}</div>;
}

const curriculum = [
  'How to shoot on your phone',
  'Storytelling, scripting & communicating ideas through video',
  'How to edit on your laptop',
  'Sound & presentation',
];

const winners = [
  {
    type: 'instagram',
    url: 'https://www.instagram.com/reel/Dafy952qy84/?stkn=MzRlODBiNWFlZA==',
    label: 'Winner — Entry 1',
    img: '/winner-1.jpg',
  },
  {
    type: 'instagram',
    url: 'https://www.instagram.com/reel/DafpfucIhik/?stkn=MzRlODBiNWFlZA==',
    label: 'Winner — Entry 2',
    img: '/winner-2.jpg',
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=0FB2mEnLGAs&t=9s',
    label: 'Winner — Entry 3',
    youtubeId: '0FB2mEnLGAs',
  },
];

export default function CoursePage() {
  return (
    <div data-testid="course-page">
      {/* Photo — full width, top of page */}
      <section data-testid="course-hero-photo" className="w-full">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src="/course-instructor.jpg"
            alt="Unfunny Sinha in his home studio"
            className="w-full h-full object-cover"
            data-testid="course-hero-image"
          />
        </div>
      </section>

      {/* Hero text + details */}
      <section data-testid="course-hero" className="pt-16 pb-24 md:pt-20 md:pb-32">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="space-y-8">
            <span
              className="inline-block font-body text-sm md:text-base uppercase tracking-[0.25em] text-brand-primary animate-fade-in"
              style={{ animationDelay: '200ms', animationFillMode: 'both' }}
            >
              The Workshop 2.0
            </span>
            <h1
              className="font-heading text-2xl sm:text-4xl lg:text-6xl font-bold text-brand-text leading-[1.05] tracking-tight whitespace-nowrap animate-fade-in"
              style={{ animationDelay: '400ms', animationFillMode: 'both' }}
            >
              Learn filmmaking the way I did
            </h1>
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
              <p className="font-body text-sm md:text-base text-brand-muted leading-relaxed max-w-2xl">
                If you've been consuming great films and videos but can't figure out why your own work doesn't feel the same — this workshop is for you.
              </p>
              <p className="font-body text-sm md:text-base text-brand-muted leading-relaxed max-w-2xl">
                A 3-week workshop for people who actually want to start. Not just think about filmmaking — actually start making videos. You don't need an expensive camera or a fancy setup. Your phone is enough to shoot. Your laptop is enough to edit.
              </p>
              <p className="font-body text-sm md:text-base text-brand-text leading-relaxed max-w-2xl font-medium">
                By the end, you'll make your own short film — not as homework, but as proof.
              </p>
              <div className="flex flex-wrap gap-x-10 gap-y-2 pt-2">
                <p className="font-body text-sm text-brand-text">
                  <span className="text-brand-muted">Dates:</span> 14th October – 8th November 2026
                </p>
                <p className="font-body text-sm text-brand-text">
                  <span className="text-brand-muted">Format:</span> 4 Google Meet/week + Assignment Discussions
                </p>
              </div>

              {/* What I'll Cover — before Enroll Now */}
              <div className="pt-6">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-text tracking-tight leading-[1.05] mb-6">
                  What I'll cover
                </h2>
                <ul className="space-y-4">
                  {curriculum.map((item, idx) => (
                    <li
                      key={idx}
                      data-testid={`curriculum-item-${idx}`}
                      className="flex items-center gap-6"
                    >
                      <span className="font-body text-xs text-brand-primary">{String(idx + 1).padStart(2, '0')}</span>
                      <span className="font-body text-sm md:text-base text-brand-text">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-body text-sm md:text-base text-brand-muted leading-relaxed mt-6">
                  Can't make it live? Recordings of every session are available.
                </p>
                <p className="font-body text-sm md:text-base text-brand-muted leading-relaxed mt-2">
                  And we end with a short film competition — with some surprise prizes.
                </p>
              </div>

              <div className="flex items-center gap-6 pt-4">
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
        </div>
      </section>

      {/* Previous Workshop Winners */}
      <section data-testid="section-winners" className="pb-24 md:pb-32 border-t border-brand-border/40 pt-24 md:pt-32">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-text tracking-tight leading-[1.05] mb-10">
              Previous Workshop — Short Film Competition Winners
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {winners.map((winner, idx) => (
                <a
                  key={idx}
                  href={winner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`winner-${idx}`}
                  className="group relative block aspect-[9/16] overflow-hidden bg-brand-surface-secondary border border-brand-border"
                >
                  {winner.type === 'youtube' ? (
                    <img
                      src={`https://img.youtube.com/vi/${winner.youtubeId}/hqdefault.jpg`}
                      alt={winner.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={winner.img}
                      alt={winner.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/40 flex items-center justify-center group-hover:border-brand-primary group-hover:bg-brand-primary/20 transition-colors">
                      <Play className="w-4 h-4 ml-0.5 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex items-center gap-2">
                    {winner.type === 'instagram' && <Instagram className="w-3.5 h-3.5 text-white shrink-0" />}
                    <span className="font-body text-[11px] uppercase tracking-wide text-white">{winner.label}</span>
                  </div>
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
