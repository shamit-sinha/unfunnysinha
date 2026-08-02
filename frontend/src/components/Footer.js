import { Link } from 'react-router-dom';
import { Instagram, Youtube, Film } from 'lucide-react';

const SiDiscord = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none"><path d="M9.09 9a3 3 0 0 1 5.83 0"/><circle cx="9" cy="15" r="1"/><circle cx="15" cy="15" r="1"/><path d="M8 20s1.5-2 4-2 4 2 4 2"/><path d="M20.36 7.64a9 9 0 1 1-16.72 0"/><path d="M12 2a14.5 14.5 0 0 0-8.48 5.85"/><path d="M12 2a14.5 14.5 0 0 1 8.48 5.85"/></svg>
);

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-16 pb-4">
        {/* Top — Brand + Social centered */}
        <div className="text-center space-y-5">
          <h3 className="font-heading text-3xl md:text-4xl font-semibold text-brand-text tracking-tight">
            Unfunny Sinha
          </h3>

          {/* Social Icons */}
          <div className="flex justify-center gap-5 relative z-10">
            <a href="https://www.instagram.com/unfunnysinhaa" target="_blank" rel="noopener noreferrer" data-testid="footer-social-instagram" className="p-3 border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-text transition-all duration-300 cursor-pointer [&_svg]:pointer-events-none">
              <Instagram size={18} />
            </a>
            <a href="https://www.youtube.com/@unfunnysinhaa" target="_blank" rel="noopener noreferrer" data-testid="footer-social-youtube" className="p-3 border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-text transition-all duration-300 cursor-pointer [&_svg]:pointer-events-none">
              <Youtube size={18} />
            </a>
            <a href="https://discord.com/invite/2BNMrcfJ" target="_blank" rel="noopener noreferrer" data-testid="footer-social-discord" className="p-3 border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-text transition-all duration-300 cursor-pointer [&_svg]:pointer-events-none">
              <SiDiscord />
            </a>
            <a href="https://letterboxd.com/shamitsinha/" target="_blank" rel="noopener noreferrer" data-testid="footer-social-letterboxd" className="p-3 border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-text transition-all duration-300 cursor-pointer [&_svg]:pointer-events-none">
              <Film size={18} />
            </a>
          </div>

          {/* Nav Links — horizontal */}
          <div className="flex justify-center gap-8 md:gap-12">
            {[
              { label: 'Home', path: '/' },
              { label: 'About', path: '/about' },
              { label: 'Course', path: '/course' },
              { label: 'Contact', path: '/contact' },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`footer-link-${link.label.toLowerCase()}`}
                className="font-body text-[11px] uppercase tracking-[0.2em] text-brand-muted hover:text-brand-text transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Divider + Bottom */}
        <div className="mt-10 pt-6 border-t border-brand-border/60 text-center">
          <p className="font-body text-[11px] text-brand-muted/60 tracking-wide pb-0">
            &copy; {new Date().getFullYear()} Unfunny Sinha. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
