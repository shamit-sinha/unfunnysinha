import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'HOME', path: '/' },
  { label: 'ABOUT', path: '/about' },
  { label: 'COURSE', path: '/course' },
  { label: 'CONTACT', path: '/contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAbout = location.pathname === '/about';
  const hasDarkHero = isHome || isAbout;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isTransparent = hasDarkHero && !scrolled;

  return (
    <nav
      data-testid="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent
          ? 'bg-transparent'
          : 'backdrop-blur-xl bg-white/70 border-b border-brand-border/50 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link
          to="/"
          data-testid="nav-logo"
          className={`font-heading text-2xl md:text-3xl font-semibold tracking-tight transition-colors duration-300 ${
            isTransparent ? 'text-white' : 'text-brand-text'
          }`}
        >
          Unfunny Sinha
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
              className={`font-body text-[11px] tracking-[0.2em] transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:transition-all after:duration-300 ${
                location.pathname === link.path
                  ? isTransparent
                    ? 'text-white after:w-full after:bg-white'
                    : 'text-brand-text after:w-full after:bg-brand-text'
                  : isTransparent
                    ? 'text-white/60 hover:text-white after:w-0 after:bg-white hover:after:w-full'
                    : 'text-brand-muted hover:text-brand-text after:w-0 after:bg-brand-text hover:after:w-full'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="https://rzp.io/rzp/tWIXXs4S"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="nav-cta-button"
          className={`hidden md:inline-flex items-center px-6 py-2.5 text-[11px] font-body tracking-[0.15em] border transition-all duration-300 ${
            isTransparent
              ? 'border-white/50 text-white hover:bg-white hover:text-brand-text'
              : 'border-brand-text text-brand-text hover:bg-brand-text hover:text-white'
          }`}
        >
          ENROLL NOW
        </a>

        {/* Mobile Toggle */}
        <button
          data-testid="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 transition-colors ${isTransparent ? 'text-white' : 'text-brand-text'}`}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div data-testid="mobile-menu" className="md:hidden bg-white/95 backdrop-blur-xl border-t border-brand-border/50 animate-fade-in">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
                className={`font-body text-[11px] tracking-[0.2em] py-2 transition-colors ${
                  location.pathname === link.path
                    ? 'text-brand-text'
                    : 'text-brand-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://rzp.io/rzp/tWIXXs4S"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="mobile-nav-cta"
              className="mt-2 text-center px-6 py-3 border border-brand-text text-brand-text font-body text-[11px] tracking-[0.15em] hover:bg-brand-text hover:text-white transition-all duration-300"
            >
              ENROLL NOW
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
