import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero section flex items-center justify-center bg-glow">
      <div className="container text-center">
        
        {/* Floating Badge */}
        <div className="badge-container animate-fade-in animate-fade-in-delay-1">
          <div className="hero-badge animate-float">
            <Sparkles size={16} />
            <span>Student Wellness Project</span>
            <Brain size={16} />
          </div>
        </div>
        
        <h1 className="hero-title animate-fade-in animate-fade-in-delay-2">
          AI-Based Digital Burnout
          <span className="title-accent"> & Focus Pattern </span>
          Analyzer
        </h1>
        
        <p className="hero-subtitle animate-fade-in animate-fade-in-delay-3">
          A non-coding, rule-based AI concept that analyzes self-reported digital habits 
          to flag burnout risk and suggest personalized focus & recovery strategies.
        </p>

        <div className="hero-cta animate-fade-in animate-fade-in-delay-4">
          <Link to="/demo" className="btn btn-primary btn-lg">
            <span>Try the Demo</span>
            <ArrowRight size={20} />
          </Link>
          <Link to="/how-it-works" className="btn btn-outline">
            View AI Logic
          </Link>
        </div>
        
        {/* Decorative Elements */}
        <div className="hero-decoration">
          <div className="decoration-orb orb-1"></div>
          <div className="decoration-orb orb-2"></div>
          <div className="decoration-orb orb-3"></div>
        </div>
      </div>

      <style>{`
        .hero {
          min-height: 100vh;
          padding-top: var(--nav-height);
          position: relative;
          overflow: hidden;
        }
        
        .badge-container {
          margin-bottom: 1.5rem;
        }
        
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 999px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-primary);
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.15);
        }
        
        .hero-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: var(--color-text);
          margin-bottom: 1.5rem;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .title-accent {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--color-text-muted);
          max-width: 650px;
          margin: 0 auto 2.5rem;
          line-height: 1.7;
        }
        
        .hero-cta {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }
        
        .btn-lg {
          padding: 1rem 2rem;
          font-size: 1.1rem;
          gap: 0.5rem;
        }
        
        /* Decorative Orbs */
        .hero-decoration {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: -1;
        }
        
        .decoration-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.5;
          animation: float 6s ease-in-out infinite;
        }
        
        .orb-1 {
          width: 400px;
          height: 400px;
          background: rgba(99, 102, 241, 0.3);
          top: -10%;
          right: -10%;
          animation-delay: 0s;
        }
        
        .orb-2 {
          width: 300px;
          height: 300px;
          background: rgba(6, 182, 212, 0.25);
          bottom: 10%;
          left: -5%;
          animation-delay: 2s;
        }
        
        .orb-3 {
          width: 200px;
          height: 200px;
          background: rgba(168, 85, 247, 0.2);
          top: 30%;
          left: 10%;
          animation-delay: 4s;
        }
        
        @media (max-width: 768px) {
          .hero-cta {
            flex-direction: column;
            align-items: center;
          }
          .btn-lg {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </section>
  );
}
