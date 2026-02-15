import { Github, FileText, Info, Heart, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        
        {/* Main Footer Content */}
        <div className="footer-grid">
          
          <div className="footer-brand">
            <div className="brand-logo">
              <div className="logo-icon">
                <Activity size={20} />
              </div>
              <span>Burnout<span className="accent">AI</span></span>
            </div>
            <p className="brand-desc">
              A student research project exploring ethical AI for digital wellness.
            </p>
          </div>

          <div className="footer-links">
            <h4>Resources</h4>
            <a href="https://github.com/AairaSheikh/BurnoutAI" target="_blank" rel="noopener noreferrer" className="footer-link"><Github size={16} /> View on GitHub</a>
            <Link to="/documentation" className="footer-link"><FileText size={16} /> Documentation</Link>
          </div>


          <div className="footer-disclaimer">
            <div className="disclaimer-card">
              <Info size={16} />
              <p>
                This is an educational tool, not a medical device. 
                Results are for informational purposes only.
              </p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} AI-Based Digital Burnout Analyzer. Made with <Heart size={14} className="heart" /> for student wellness.</p>
        </div>
      </div>

      <style>{`
        .footer {
          background: linear-gradient(180deg, var(--color-surface) 0%, #f1f5f9 100%);
          border-top: 1px solid var(--color-border);
          padding: 4rem 0 2rem;
          margin-top: 4rem;
        }
        
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 2fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }
        
        .footer-brand {
          max-width: 280px;
        }
        
        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        
        .logo-icon {
          width: 36px;
          height: 36px;
          background: var(--gradient-primary);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .accent {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .brand-desc {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          line-height: 1.6;
        }
        
        .footer-links h4 {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-muted);
          margin-bottom: 1rem;
        }
        
        .footer-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-text);
          font-size: 0.9rem;
          padding: 0.5rem 0;
          transition: color 0.2s, transform 0.2s;
        }
        
        .footer-link:hover {
          color: var(--color-primary);
          transform: translateX(4px);
        }
        
        .disclaimer-card {
          display: flex;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(99, 102, 241, 0.05);
          border: 1px solid rgba(99, 102, 241, 0.1);
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }
        
        .disclaimer-card svg {
          color: var(--color-primary);
          flex-shrink: 0;
          margin-top: 2px;
        }
        
        .footer-bottom {
          padding-top: 2rem;
          border-top: 1px solid var(--color-border);
          text-align: center;
        }
        
        .footer-bottom p {
          font-size: 0.875rem;
          color: var(--color-text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
        }
        
        .heart {
          color: #ef4444;
          animation: pulse 1.5s ease-in-out infinite;
        }
        
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </footer>
  );
}
