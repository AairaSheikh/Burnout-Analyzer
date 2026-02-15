import { AlertTriangle, CheckCircle, Info, RotateCcw, TrendingUp, AlertCircle } from 'lucide-react';
import type { AnalysisResult } from '../logic/scoring';

interface ResultsPanelProps {
  result: AnalysisResult;
  onReset: () => void;
}

export default function ResultsPanel({ result, onReset }: ResultsPanelProps) {
  const { riskLevel, score, factors, recommendations } = result;

  const riskConfig = {
    Low: { 
      color: '#10b981', 
      bg: '#d1fae5', 
      gradient: 'linear-gradient(135deg, #10b981, #34d399)',
      icon: <CheckCircle size={32} />,
      message: "You're managing well! Keep up these healthy habits."
    },
    Medium: { 
      color: '#f59e0b', 
      bg: '#fef3c7', 
      gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
      icon: <AlertTriangle size={32} />,
      message: "Some warning signs detected. Consider adjusting your habits."
    },
    High: { 
      color: '#ef4444', 
      bg: '#fee2e2', 
      gradient: 'linear-gradient(135deg, #ef4444, #f87171)',
      icon: <AlertCircle size={32} />,
      message: "High burnout risk detected. Please prioritize recovery."
    }
  };

  const config = riskConfig[riskLevel];

  return (
    <div className="results-panel animate-fade-in">
      
      {/* Score Hero */}
      <div className="score-hero" style={{ '--risk-color': config.color, '--risk-bg': config.bg, '--risk-gradient': config.gradient } as React.CSSProperties}>
        <div className="score-icon">
          {config.icon}
        </div>
        <div className="score-content">
          <p className="score-label">Your Burnout Risk Level</p>
          <h2 className="score-value">{riskLevel.toUpperCase()}</h2>
          <p className="score-points">Score: {score} points</p>
        </div>
        <div className="score-decoration"></div>
      </div>

      <p className="score-message">{config.message}</p>

      {/* Disclaimer */}
      <div className="disclaimer">
        <Info size={16} />
        <p>This is an informational result based on rules, not a medical diagnosis.</p>
      </div>

      <div className="results-grid">
        
        {/* Factors */}
        <div className="result-card">
          <div className="card-header warning">
            <AlertTriangle size={20} />
            <h3>Contributing Factors</h3>
          </div>
          {factors.length > 0 ? (
            <ul className="factors-list stagger-fade">
              {factors.map((factor, idx) => (
                <li key={idx}>
                  <span className="factor-dot"></span>
                  {factor}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-factors">No major risk factors flagged. Great job!</p>
          )}
        </div>

        {/* Plan */}
        <div className="result-card">
          <div className="card-header success">
            <TrendingUp size={20} />
            <h3>Recovery Plan</h3>
          </div>
          <ul className="plan-list stagger-fade">
            {recommendations.map((rec, idx) => (
              <li key={idx}>
                <span className="plan-number">{idx + 1}</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="reset-section">
        <button onClick={onReset} className="btn btn-outline reset-btn">
          <RotateCcw size={18} />
          Reset & Try Again
        </button>
      </div>

      <style>{`
        .results-panel {
          background: white;
          border-radius: var(--radius-xl);
          padding: 2.5rem;
          box-shadow: var(--shadow-xl);
        }
        
        .score-hero {
          background: var(--risk-bg);
          border-radius: var(--radius-lg);
          padding: 2rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          position: relative;
          overflow: hidden;
        }
        
        .score-icon {
          width: 72px;
          height: 72px;
          background: var(--risk-gradient);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 8px 25px color-mix(in srgb, var(--risk-color) 40%, transparent);
        }
        
        .score-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-muted);
          margin-bottom: 0.25rem;
        }
        
        .score-value {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--risk-color);
          letter-spacing: -0.02em;
        }
        
        .score-points {
          font-size: 0.9rem;
          color: var(--color-text-muted);
        }
        
        .score-decoration {
          position: absolute;
          right: -50px;
          top: -50px;
          width: 200px;
          height: 200px;
          background: var(--risk-gradient);
          opacity: 0.1;
          border-radius: 50%;
        }
        
        .score-message {
          text-align: center;
          margin: 1.5rem 0;
          font-size: 1.1rem;
          color: var(--color-text);
        }
        
        .disclaimer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: var(--color-primary-light);
          border-radius: var(--radius-md);
          margin-bottom: 2rem;
        }
        
        .disclaimer svg {
          color: var(--color-primary);
          flex-shrink: 0;
        }
        
        .disclaimer p {
          font-size: 0.85rem;
          color: var(--color-primary-dark);
        }
        
        .results-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .result-card {
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
        }
        
        .card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--color-border);
        }
        
        .card-header h3 {
          font-size: 1rem;
          font-weight: 700;
        }
        
        .card-header.warning svg { color: var(--color-warning); }
        .card-header.success svg { color: var(--color-success); }
        
        .factors-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .factors-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.9rem;
          padding: 0.75rem;
          background: white;
          border-radius: var(--radius-sm);
          border-left: 3px solid var(--color-warning);
        }
        
        .factor-dot {
          width: 8px;
          height: 8px;
          background: var(--color-warning);
          border-radius: 50%;
          margin-top: 0.35rem;
          flex-shrink: 0;
        }
        
        .no-factors {
          font-size: 0.9rem;
          color: var(--color-success);
          font-style: italic;
        }
        
        .plan-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .plan-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.9rem;
        }
        
        .plan-number {
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #10b981, #34d399);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          flex-shrink: 0;
        }
        
        .reset-section {
          text-align: center;
        }
        
        .reset-btn {
          gap: 0.5rem;
        }
        
        @media (max-width: 700px) {
          .results-grid {
            grid-template-columns: 1fr;
          }
          .score-hero {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
