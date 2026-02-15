import { useState } from 'react';
import type { UserInputs, AnalysisResult } from '../logic/scoring';
import { calculateRisk } from '../logic/scoring';
import ResultsPanel from './ResultsPanel';
import { ArrowRight, Sparkles, Clock, Moon, Brain, Coffee, Laptop, Zap, Shield } from 'lucide-react';

const INITIAL_STATE: UserInputs = {
  dailyScreenTime: 5,
  lateNightScreenUse: 'Sometimes',
  sleepDuration: 7,
  sleepConsistency: 'Somewhat',
  breakFrequency: 'Rarely',
  procrastination: 'Medium',
  exhaustion: 3,
  motivationDrop: 3,
  difficultyConcentrating: 3
};

export default function DemoForm() {
  const [inputs, setInputs] = useState<UserInputs>(INITIAL_STATE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeSection, setActiveSection] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const analysis = calculateRisk(inputs);
    setResult(analysis);
    setTimeout(() => {
      document.getElementById('demo-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const update = (field: keyof UserInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const sections = [
    { title: 'Screen Habits', emoji: '📱', color: '#06b6d4' },
    { title: 'Sleep Patterns', emoji: '😴', color: '#8b5cf6' },
    { title: 'Focus & Study', emoji: '☕', color: '#f59e0b' },
    { title: 'How You Feel', emoji: '🧠', color: '#ef4444' },
  ];

  return (
    <section id="demo" className="demo-section"> 
      {/* Decorative Background */}
      <div className="demo-bg">
        <div className="demo-orb orb-1"></div>
        <div className="demo-orb orb-2"></div>
        <div className="demo-orb orb-3"></div>
        <div className="grid-pattern"></div>
      </div>

      <div className="container">
        {/* Header */}
        <div className="demo-header">
          <div className="demo-badge">
            <Zap size={16} />
            <span>Interactive Demo</span>
            <Sparkles size={16} />
          </div>
          <h2 className="demo-title">
            Analyze Your Digital Balance
          </h2>
          <p className="demo-subtitle">
            Fill out this anonymous 1-minute check-in. No data is stored or sent to any server.
          </p>
          
          {/* Progress Indicator */}
          {!result && (
            <div className="progress-track">
              {sections.map((sec, idx) => (
                <div 
                  key={idx} 
                  className={`progress-step ${idx <= activeSection ? 'active' : ''}`}
                  onClick={() => setActiveSection(idx)}
                >
                  <div className="progress-dot" style={{ background: idx <= activeSection ? sec.color : undefined }}>
                    <span>{sec.emoji}</span>
                  </div>
                  <span className="progress-label">{sec.title}</span>
                </div>
              ))}
              <div className="progress-line">
                <div className="progress-fill" style={{ width: `${(activeSection / (sections.length - 1)) * 100}%` }}></div>
              </div>
            </div>
          )}
        </div>

        {!result ? (
          <form onSubmit={handleSubmit} className="demo-form">
            
            {/* Screen Time Section */}
            <div className="form-card">
              <div className="card-header" style={{ '--accent-color': '#06b6d4' } as React.CSSProperties}>
                <div className="header-icon">
                  <span className="emoji">📱</span>
                  <Laptop size={20} />
                </div>
                <div>
                  <h3>Screen Habits</h3>
                  <p>Your daily digital consumption</p>
                </div>
                <div className="header-badge">Step 1</div>
              </div>
              
              <div className="card-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label>
                      <Clock size={16} />
                      <span>Daily Screen Time</span>
                    </label>
                    <div className="slider-wrapper">
                      <input 
                        type="range" min="0" max="16" step="1" 
                        value={inputs.dailyScreenTime} 
                        onChange={(e) => update('dailyScreenTime', parseInt(e.target.value))}
                        className="range-slider"
                        style={{ '--value': `${(inputs.dailyScreenTime / 16) * 100}%` } as React.CSSProperties}
                      />
                      <div className="slider-bubble">
                        <span>{inputs.dailyScreenTime}</span>
                        <small>hours</small>
                      </div>
                    </div>
                    <div className="slider-markers">
                      <span>0h</span>
                      <span>8h</span>
                      <span>16h</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      <Moon size={16} />
                      <span>Late-Night Screen Use</span>
                    </label>
                    <div className="option-cards">
                      {(['Never', 'Sometimes', 'Often'] as const).map((opt, idx) => (
                        <button 
                          key={opt} type="button"
                          className={`option-card ${inputs.lateNightScreenUse === opt ? 'active' : ''}`}
                          onClick={() => update('lateNightScreenUse', opt)}
                        >
                          <span className="option-emoji">{['🌙', '🌓', '🌑'][idx]}</span>
                          <span className="option-text">{opt}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sleep Section */}
            <div className="form-card">
              <div className="card-header" style={{ '--accent-color': '#8b5cf6' } as React.CSSProperties}>
                <div className="header-icon">
                  <span className="emoji">😴</span>
                  <Moon size={20} />
                </div>
                <div>
                  <h3>Sleep Patterns</h3>
                  <p>Your rest and recovery</p>
                </div>
                <div className="header-badge">Step 2</div>
              </div>
              
              <div className="card-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label>
                      <span>Sleep Duration (Average)</span>
                    </label>
                    <div className="slider-wrapper">
                      <input 
                        type="range" min="3" max="12" step="0.5" 
                        value={inputs.sleepDuration} 
                        onChange={(e) => update('sleepDuration', parseFloat(e.target.value))}
                        className="range-slider purple"
                        style={{ '--value': `${((inputs.sleepDuration - 3) / 9) * 100}%` } as React.CSSProperties}
                      />
                      <div className="slider-bubble purple">
                        <span>{inputs.sleepDuration}</span>
                        <small>hours</small>
                      </div>
                    </div>
                    <div className="slider-markers">
                      <span>3h</span>
                      <span>7.5h</span>
                      <span>12h</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      <span>Sleep Consistency</span>
                    </label>
                    <div className="option-cards">
                      {(['Consistent', 'Somewhat', 'Irregular'] as const).map((opt, idx) => (
                        <button 
                          key={opt} type="button"
                          className={`option-card purple ${inputs.sleepConsistency === opt ? 'active' : ''}`}
                          onClick={() => update('sleepConsistency', opt)}
                        >
                          <span className="option-emoji">{['✨', '〰️', '📉'][idx]}</span>
                          <span className="option-text">{opt}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Focus Section */}
            <div className="form-card">
              <div className="card-header" style={{ '--accent-color': '#f59e0b' } as React.CSSProperties}>
                <div className="header-icon">
                  <span className="emoji">☕</span>
                  <Coffee size={20} />
                </div>
                <div>
                  <h3>Focus & Study</h3>
                  <p>Your work habits</p>
                </div>
                <div className="header-badge">Step 3</div>
              </div>
              
              <div className="card-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Break Frequency</label>
                    <div className="option-cards">
                      {(['Every 25-50 min', 'Rarely', 'None'] as const).map((opt, idx) => (
                        <button 
                          key={opt} type="button"
                          className={`option-card amber ${inputs.breakFrequency === opt ? 'active' : ''}`}
                          onClick={() => update('breakFrequency', opt)}
                        >
                          <span className="option-emoji">{['⏰', '🤔', '❌'][idx]}</span>
                          <span className="option-text">{opt === 'Every 25-50 min' ? '25-50min' : opt}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Procrastination Level</label>
                    <div className="option-cards">
                      {(['Low', 'Medium', 'High'] as const).map((opt, idx) => (
                        <button 
                          key={opt} type="button"
                          className={`option-card amber ${inputs.procrastination === opt ? 'active' : ''}`}
                          onClick={() => update('procrastination', opt)}
                        >
                          <span className="option-emoji">{['🚀', '🐢', '🦥'][idx]}</span>
                          <span className="option-text">{opt}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feelings Section */}
            <div className="form-card">
              <div className="card-header" style={{ '--accent-color': '#ef4444' } as React.CSSProperties}>
                <div className="header-icon">
                  <span className="emoji">🧠</span>
                  <Brain size={20} />
                </div>
                <div>
                  <h3>How You Feel</h3>
                  <p>Your mental state</p>
                </div>
                <div className="header-badge">Step 4</div>
              </div>
              
              <div className="card-body">
                <div className="feelings-grid">
                  <RatingInput 
                    label="Exhaustion Level" 
                    value={inputs.exhaustion} 
                    onChange={(v) => update('exhaustion', v)}
                    emoji="🔋"
                  />
                  <RatingInput 
                    label="Motivation Drop" 
                    value={inputs.motivationDrop} 
                    onChange={(v) => update('motivationDrop', v)}
                    emoji="💫"
                  />
                  <RatingInput 
                    label="Focus Difficulty" 
                    value={inputs.difficultyConcentrating} 
                    onChange={(v) => update('difficultyConcentrating', v)}
                    emoji="🎯"
                  />
                </div>
              </div>
            </div>

            {/* Submit Section */}
            <div className="submit-section">
              <button type="submit" className="submit-btn">
                <div className="btn-content">
                  <Sparkles size={22} />
                  <span>Analyze My Patterns</span>
                  <ArrowRight size={22} />
                </div>
                <div className="btn-glow"></div>
              </button>
              <div className="privacy-badge">
                <Shield size={16} />
                <span>100% Private • Browser-Only Processing • No Data Stored</span>
              </div>
            </div>

          </form>
        ) : (
          <div id="demo-results" className="results-wrapper">
            <ResultsPanel result={result} onReset={() => setResult(null)} />
          </div>
        )}

      </div>

      <style>{`
        .demo-section {
          padding: 8rem 0 5rem;
          position: relative;
          overflow: hidden;
          min-height: 100vh;
        }

        .results-wrapper {
          scroll-margin-top: calc(var(--nav-height) + 2rem);
        }
        
        .demo-bg {
          position: absolute;
          inset: 0;
          z-index: -1;
          background: linear-gradient(180deg, #f0f4ff 0%, #ffffff 30%, #faf5ff 60%, #f0fdf4 100%);
        }

        .grid-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        .demo-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.5;
          animation: float 8s ease-in-out infinite;
        }
        
        .orb-1 {
          width: 600px;
          height: 600px;
          background: rgba(99, 102, 241, 0.25);
          top: -20%;
          left: -15%;
          animation-delay: 0s;
        }
        
        .orb-2 {
          width: 500px;
          height: 500px;
          background: rgba(139, 92, 246, 0.2);
          top: 30%;
          right: -20%;
          animation-delay: 2s;
        }

        .orb-3 {
          width: 400px;
          height: 400px;
          background: rgba(16, 185, 129, 0.2);
          bottom: -10%;
          left: 20%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        
        .demo-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .demo-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1.25rem;
          background: white;
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 999px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-primary);
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.12);
          margin-bottom: 1.25rem;
        }
        
        .demo-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          color: var(--color-text);
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }

        .demo-subtitle {
          color: var(--color-text-muted);
          font-size: 1.1rem;
          max-width: 500px;
          margin: 0 auto 2rem;
        }

        /* Progress Track */
        .progress-track {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 3rem;
          position: relative;
          max-width: 700px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .progress-line {
          position: absolute;
          top: 24px;
          left: 80px;
          right: 80px;
          height: 4px;
          background: var(--color-border);
          border-radius: 99px;
          z-index: 0;
        }

        .progress-fill {
          height: 100%;
          background: var(--gradient-primary);
          border-radius: 99px;
          transition: width 0.5s var(--ease-out-expo);
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          z-index: 1;
        }

        .progress-dot {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: white;
          border: 3px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s var(--ease-out-expo);
          font-size: 1.25rem;
        }

        .progress-step.active .progress-dot {
          border-color: transparent;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }

        .progress-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-text-muted);
          transition: color 0.3s;
        }

        .progress-step.active .progress-label {
          color: var(--color-text);
        }
        
        .demo-form {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* Form Cards */
        .form-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.3s var(--ease-out-expo);
        }

        .form-card:hover {
          box-shadow: 0 12px 40px rgba(99, 102, 241, 0.12);
          transform: translateY(-2px);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          background: linear-gradient(135deg, color-mix(in srgb, var(--accent-color) 8%, white), color-mix(in srgb, var(--accent-color) 4%, white));
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .header-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .header-icon .emoji {
          font-size: 1.5rem;
        }

        .header-icon svg {
          display: none;
        }

        .card-header h3 {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: 0.125rem;
        }

        .card-header p {
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }

        .header-badge {
          margin-left: auto;
          padding: 0.375rem 0.875rem;
          background: white;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-color);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .card-body {
          padding: 1.5rem;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .form-group label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-text);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .form-group label svg {
          color: var(--color-primary);
        }

        /* Slider */
        .slider-wrapper {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .range-slider {
          flex: 1;
          height: 10px;
          border-radius: 99px;
          background: linear-gradient(90deg, #06b6d4 0%, #06b6d4 var(--value), var(--color-border) var(--value));
          appearance: none;
          outline: none;
          transition: background 0.1s;
        }

        .range-slider.purple {
          background: linear-gradient(90deg, #8b5cf6 0%, #8b5cf6 var(--value), var(--color-border) var(--value));
        }
        
        .range-slider::-webkit-slider-thumb {
          appearance: none;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 4px solid #06b6d4;
          box-shadow: 0 4px 12px rgba(6, 182, 212, 0.4);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .range-slider.purple::-webkit-slider-thumb {
          border-color: #8b5cf6;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
        }
        
        .range-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        
        .slider-bubble {
          min-width: 60px;
          padding: 0.5rem 0.75rem;
          background: linear-gradient(135deg, #06b6d4, #0891b2);
          border-radius: 12px;
          text-align: center;
          color: white;
          box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
        }

        .slider-bubble.purple {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        }

        .slider-bubble span {
          font-size: 1.25rem;
          font-weight: 700;
          display: block;
        }

        .slider-bubble small {
          font-size: 0.65rem;
          opacity: 0.8;
        }

        .slider-markers {
          display: flex;
          justify-content: space-between;
          font-size: 0.7rem;
          color: var(--color-text-muted);
          margin-top: 0.25rem;
        }

        /* Option Cards */
        .option-cards {
          display: flex;
          gap: 0.625rem;
        }

        .option-card {
          flex: 1;
          padding: 0.875rem 0.5rem;
          border: 2px solid var(--color-border);
          background: white;
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.375rem;
          cursor: pointer;
          transition: all 0.2s var(--ease-out-expo);
        }

        .option-card:hover {
          border-color: #06b6d4;
          background: rgba(6, 182, 212, 0.05);
        }

        .option-card.purple:hover {
          border-color: #8b5cf6;
          background: rgba(139, 92, 246, 0.05);
        }

        .option-card.amber:hover {
          border-color: #f59e0b;
          background: rgba(245, 158, 11, 0.05);
        }

        .option-card.active {
          border-color: #06b6d4;
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(6, 182, 212, 0.05));
          box-shadow: 0 4px 12px rgba(6, 182, 212, 0.2);
        }

        .option-card.purple.active {
          border-color: #8b5cf6;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.05));
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
        }

        .option-card.amber.active {
          border-color: #f59e0b;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05));
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
        }

        .option-emoji {
          font-size: 1.5rem;
        }

        .option-text {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-text);
        }
        
        .feelings-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }

        /* Submit Section */
        .submit-section {
          text-align: center;
          padding: 1rem 0;
        }

        .submit-btn {
          position: relative;
          width: 100%;
          max-width: 400px;
          padding: 1.25rem 2rem;
          background: var(--gradient-primary);
          border: none;
          border-radius: 16px;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s var(--ease-out-expo);
        }

        .submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(99, 102, 241, 0.4);
        }

        .btn-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          color: white;
          font-size: 1.1rem;
          font-weight: 700;
          position: relative;
          z-index: 1;
        }

        .btn-glow {
          position: absolute;
          inset: -2px;
          background: var(--gradient-primary);
          filter: blur(20px);
          opacity: 0;
          transition: opacity 0.3s;
          z-index: 0;
        }

        .submit-btn:hover .btn-glow {
          opacity: 0.5;
        }

        .privacy-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1.25rem;
          padding: 0.75rem 1.25rem;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(6, 182, 212, 0.08));
          border: 1px solid rgba(16, 185, 129, 0.15);
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 500;
          color: #059669;
        }

        .privacy-badge svg {
          flex-shrink: 0;
        }
        
        .results-wrapper {
          max-width: 800px;
          margin: 0 auto;
        }
        
        @media (max-width: 700px) {
          .form-grid, .feelings-grid {
            grid-template-columns: 1fr;
          }

          .progress-track {
            display: none;
          }

          .option-cards {
            flex-wrap: wrap;
          }

          .option-card {
            min-width: calc(50% - 0.5rem);
          }
        }
      `}</style>
    </section>
  );
}

function RatingInput({ label, value, onChange, emoji }: { label: string, value: number, onChange: (v: number) => void, emoji: string }) {
  return (
    <div className="rating-card">
      <div className="rating-header">
        <span className="rating-emoji">{emoji}</span>
        <span className="rating-label">{label}</span>
      </div>
      <div className="rating-buttons">
        {[1, 2, 3, 4, 5].map(rating => (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(rating)}
            className={`rating-btn ${value === rating ? 'active' : ''} ${value >= rating ? 'filled' : ''}`}
          >
            {rating}
          </button>
        ))}
      </div>
      <div className="rating-scale">
        <span>😌 Low</span>
        <span>😰 High</span>
      </div>
      
      <style>{`
        .rating-card {
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(239, 68, 68, 0.02));
          border: 1px solid rgba(239, 68, 68, 0.1);
          padding: 1rem 0.75rem;
          border-radius: 16px;
          text-align: center;
          transition: all 0.2s;
          min-width: 0;
        }

        .rating-card:hover {
          border-color: rgba(239, 68, 68, 0.2);
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.08);
        }

        .rating-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          min-width: 0;
        }

        .rating-emoji {
          font-size: 1.5rem;
        }
        
        .rating-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text);
          text-align: center;
          word-wrap: break-word;
          white-space: normal;
          line-height: 1.3;
        }
        
        .rating-buttons {
          display: flex;
          justify-content: center;
          gap: 0.375rem;
        }
        
        .rating-btn {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: white;
          border: 2px solid var(--color-border);
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--color-text-muted);
          transition: all 0.2s var(--ease-out-expo);
          flex-shrink: 0;
        }
        
        .rating-btn:hover {
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.05);
        }
        
        .rating-btn.active {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          border-color: transparent;
          color: white;
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.35);
          transform: scale(1.1);
        }

        .rating-scale {
          display: flex;
          justify-content: space-between;
          margin-top: 0.75rem;
          font-size: 0.7rem;
          color: var(--color-text-muted);
        }
      `}</style>
    </div>
  );
}
