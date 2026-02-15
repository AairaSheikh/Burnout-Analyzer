import { Shield, BookOpen, Coffee, Sparkles, ArrowUpRight } from 'lucide-react';

export default function RecommendationsLibrary() {
  const cards = [
    {
      level: 'Low Risk',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
      bgGradient: 'linear-gradient(135deg, #d1fae5 0%, #ecfdf5 100%)',
      icon: <BookOpen size={24} />,
      focus: 'Prevention & Hygiene',
      tips: [
        'Maintain healthy tech boundaries.',
        'Use "Focus" modes on devices.',
        'Regular screen breaks (20-20-20).'
      ]
    },
    {
      level: 'Medium Risk',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      bgGradient: 'linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%)',
      icon: <Coffee size={24} />,
      focus: 'Recovery & Boundaries',
      tips: [
        'Strict device curfew (1h before bed).',
        'Pomodoro technique (25/5).',
        'Weekend offline blocks.'
      ]
    },
    {
      level: 'High Risk',
      color: '#ef4444',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
      bgGradient: 'linear-gradient(135deg, #fee2e2 0%, #fef2f2 100%)',
      icon: <Shield size={24} />,
      focus: 'Urgent Reset & Support',
      tips: [
        '48-hour digital detox.',
        'Seek student support services.',
        'Prioritize sleep recovery.'
      ]
    }
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="text-center mb-12">
          <div className="section-badge">
            <Sparkles size={16} />
            <span>Personalized Help</span>
          </div>
          <h2 className="section-title">Strategies Library</h2>
          <p className="section-subtitle">Tailored recommendations for every risk level</p>
        </div>
        
        <div className="rec-grid stagger-fade">
          {cards.map((card) => (
            <div 
              key={card.level} 
              className="rec-card hover-lift"
              style={{ '--card-color': card.color, '--card-gradient': card.gradient, '--card-bg': card.bgGradient } as React.CSSProperties}
            >
              <div className="rec-header">
                <div className="rec-icon-wrap">
                  {card.icon}
                </div>
                <div>
                  <h3 className="rec-level">{card.level}</h3>
                  <p className="rec-focus">{card.focus}</p>
                </div>
              </div>
              
              <ul className="rec-tips">
                {card.tips.map((tip, i) => (
                  <li key={i}>
                    <ArrowUpRight size={14} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              
              <div className="rec-decoration"></div>
            </div>
          ))}
        </div>
      </div>
        
      <style>{`
        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--color-primary-light);
          color: var(--color-primary);
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        
        .section-subtitle {
          color: var(--color-text-muted);
          font-size: 1.1rem;
        }
        
        .rec-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        
        .rec-card {
          background: var(--card-bg);
          border-radius: var(--radius-xl);
          padding: 2rem;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.05);
        }
        
        .rec-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .rec-icon-wrap {
          width: 56px;
          height: 56px;
          background: var(--card-gradient);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 8px 20px color-mix(in srgb, var(--card-color) 30%, transparent);
        }
        
        .rec-level {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--card-color);
        }
        
        .rec-focus {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .rec-tips {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .rec-tips li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.95rem;
          color: var(--color-text);
        }
        
        .rec-tips li svg {
          color: var(--card-color);
          flex-shrink: 0;
          margin-top: 0.25rem;
        }
        
        .rec-decoration {
          position: absolute;
          bottom: -60px;
          right: -60px;
          width: 150px;
          height: 150px;
          background: var(--card-gradient);
          opacity: 0.1;
          border-radius: 50%;
        }
        
        @media (max-width: 900px) {
          .rec-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
