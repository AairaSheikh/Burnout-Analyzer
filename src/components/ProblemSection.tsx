import { AlertCircle, Smartphone, Battery, Clock, TrendingDown } from 'lucide-react';

export default function ProblemSection() {
  return (
    <section id="problem" className="section bg-dots">
      <div className="container">
        <div className="problem-grid">
          
          <div className="problem-content">
            <div className="section-label">
              <TrendingDown size={16} />
              <span>The Challenge</span>
            </div>
            
            <h2 className="problem-title">Why This Matters</h2>
            
            <p className="problem-desc">
              Academic burnout is rising among students due to "always-on" digital culture. 
              The boundary between study and rest has blurred, leading to digital fatigue 
              and chronic loss of focus.
            </p>
            
            <ul className="feature-list stagger-fade">
              <li className="feature-item hover-lift">
                <div className="icon-box icon-cyan">
                  <Smartphone size={22} />
                </div>
                <div>
                  <strong>Digital Fragmentation</strong>
                  <p>Constant notifications break deep work cycles.</p>
                </div>
              </li>
              <li className="feature-item hover-lift">
                <div className="icon-box icon-purple">
                  <Clock size={22} />
                </div>
                <div>
                  <strong>Revenge Bedtime Procrastination</strong>
                  <p>Sacrificing sleep to reclaim personal time online.</p>
                </div>
              </li>
              <li className="feature-item hover-lift">
                <div className="icon-box icon-amber">
                  <Battery size={22} />
                </div>
                <div>
                  <strong>Cognitive Depletion</strong>
                  <p>Brain fog and reduced motivation from sensory overload.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="problem-visual">
            <div className="stat-card hover-glow">
              <div className="stat-icon animate-pulse">
                <AlertCircle size={48} />
              </div>
              <h3>The Hidden Cost</h3>
              <p>
                Without intervention, these patterns lead to academic decline 
                and long-term wellbeing issues. Awareness is the first step to reset.
              </p>
              <div className="stat-decoration"></div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .problem-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        
        .section-label {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(99, 102, 241, 0.1);
          color: var(--color-primary);
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }
        
        .problem-title {
          font-size: 2.75rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 1.25rem;
          background: linear-gradient(135deg, var(--color-text) 0%, var(--color-text-muted) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .problem-desc {
          font-size: 1.15rem;
          color: var(--color-text-muted);
          line-height: 1.8;
          margin-bottom: 2rem;
        }
        
        .feature-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        
        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.25rem;
          background: white;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          transition: all 0.3s var(--ease-out-expo);
        }
        
        .feature-item:hover {
          border-color: transparent;
          box-shadow: var(--shadow-lg);
        }
        
        .feature-item strong {
          display: block;
          font-weight: 700;
          margin-bottom: 0.25rem;
          color: var(--color-text);
        }
        
        .feature-item p {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          margin: 0;
        }
        
        .icon-box {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .icon-cyan {
          background: linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(6, 182, 212, 0.3);
        }
        
        .icon-purple {
          background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
        }
        
        .icon-amber {
          background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
        }
        
        .stat-card {
          background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
          padding: 3rem;
          border-radius: var(--radius-xl);
          border: 1px solid var(--color-border);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .stat-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-warning);
        }
        
        .stat-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        
        .stat-card p {
          color: var(--color-text-muted);
          line-height: 1.7;
        }
        
        .stat-decoration {
          position: absolute;
          bottom: -50px;
          right: -50px;
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), transparent);
          border-radius: 50%;
        }
        
        @media (max-width: 900px) {
          .problem-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .problem-title { font-size: 2rem; }
        }
      `}</style>
    </section>
  );
}
