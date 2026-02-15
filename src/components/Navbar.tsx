import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Activity, Zap } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container flex items-center justify-between" style={{ height: 'var(--nav-height)' }}>
        {/* Logo */}
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <div className="logo-icon">
            <Activity size={22} />
          </div>
          <span className="logo-text">Burnout<span className="logo-accent">AI</span></span>
        </Link>

        {/* Desktop Links */}
        <div className="desktop-menu flex items-center gap-8">
          <Link to="/about" className="nav-link">
            <span>About</span>
          </Link>
          <Link to="/how-it-works" className="nav-link">
            <span>How it Works</span>
          </Link>
          <Link to="/documentation" className="nav-link">
            <span>Documentation</span>
          </Link>
          <Link to="/checkins" className="nav-link">
            <span>Daily Check-ins</span>
          </Link>
          <Link to="/demo" className="btn btn-primary nav-cta">
            <Zap size={16} />
            Try Demo
          </Link>
        </div>


        {/* Mobile Toggle */}
        <button 
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <Link to="/about" className="mobile-link" onClick={closeMobileMenu}>About</Link>
        <Link to="/how-it-works" className="mobile-link" onClick={closeMobileMenu}>How it Works</Link>
        <Link to="/documentation" className="mobile-link" onClick={closeMobileMenu}>Documentation</Link>
        <Link to="/checkins" className="mobile-link" onClick={closeMobileMenu}>Daily Check-ins</Link>
        <Link to="/demo" className="mobile-link primary" onClick={closeMobileMenu}>
          <Zap size={16} /> Try Demo
        </Link>
      </div>


      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid transparent;
          transition: all 0.4s var(--ease-out-expo);
        }
        
        .navbar.scrolled {
          background: rgba(255, 255, 255, 0.95);
          border-bottom-color: var(--color-border);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.25rem;
          font-weight: 700;
          text-decoration: none;
        }
        
        .logo-icon {
          width: 40px;
          height: 40px;
          background: var(--gradient-primary);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }
        
        .logo-text {
          color: var(--color-text);
        }
        
        .logo-accent {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .nav-link {
          position: relative;
          font-weight: 500;
          color: var(--color-text-muted);
          padding: 0.5rem 0;
          transition: color 0.3s ease;
          text-decoration: none;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--gradient-primary);
          transition: width 0.3s var(--ease-out-expo);
        }
        
        .nav-link:hover {
          color: var(--color-primary);
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .nav-cta {
          padding: 0.625rem 1.25rem;
          font-size: 0.9rem;
          gap: 0.5rem;
          text-decoration: none;
        }

        .desktop-menu { display: flex; }
        .mobile-toggle { display: none; color: var(--color-text); }

        .mobile-menu {
          position: absolute;
          top: var(--nav-height);
          left: 0;
          right: 0;
          background: white;
          border-bottom: 1px solid var(--color-border);
          padding: 1rem;
          display: none;
          flex-direction: column;
          gap: 0.5rem;
          box-shadow: var(--shadow-lg);
          transform: translateY(-10px);
          opacity: 0;
          transition: all 0.3s var(--ease-out-expo);
        }
        
        .mobile-menu.open {
          display: flex;
          transform: translateY(0);
          opacity: 1;
        }
        
        .mobile-link {
          text-align: left;
          padding: 1rem;
          font-size: 1rem;
          font-weight: 500;
          color: var(--color-text);
          border-radius: var(--radius-md);
          transition: background 0.2s;
          text-decoration: none;
        }
        
        .mobile-link:hover {
          background: var(--color-surface);
        }
        
        .mobile-link.primary {
          background: var(--gradient-primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        @media (max-width: 768px) {
          .desktop-menu { display: none; }
          .mobile-toggle { display: block; }
          .mobile-menu { display: flex; }
        }
      `}</style>
    </nav>
  );
}
