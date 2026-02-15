import { useState } from 'react';
import { ChevronDown, Database, Cpu, BarChart3, Lightbulb, ClipboardList, Zap, ArrowRight } from 'lucide-react';

export default function LogicExplainer() {
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    { 
      step: 1, 
      title: 'Input', 
      desc: 'Self-Reported Habits', 
      icon: <ClipboardList size={28} />, 
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
      emoji: '📝'
    },
    { 
      step: 2, 
      title: 'Process', 
      desc: 'Rule-Based Engine', 
      icon: <Cpu size={28} />, 
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      emoji: '⚙️'
    },
    { 
      step: 3, 
      title: 'Classify', 
      desc: 'Risk Calculation', 
      icon: <BarChart3 size={28} />, 
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
      emoji: '📊'
    },
    { 
      step: 4, 
      title: 'Output', 
      desc: 'Tailored Strategy', 
      icon: <Lightbulb size={28} />, 
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      emoji: '💡'
    },
  ];

  return (
    <section className="logic-section">
      {/* Background Elements */}
      <div className="bg-decoration">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
      </div>

      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="header-badge">
            <Zap size={16} />
            <span>Transparent AI</span>
          </div>
          <h2 className="section-title">
            <Cpu className="title-icon" />
            How It Works
          </h2>
          <p className="section-subtitle">
            Rule-Based Logic You Can Understand — No Black Box AI
          </p>
        </div>

        {/* 4-Step Flow */}
        <div className="flow-container">
          <div className="flow-track">
            <div className="flow-line"></div>
          </div>
          <div className="flow-steps">
            {steps.map((item, idx) => (
              <div key={item.step} className="step-wrapper">
                <div className="step-card">
                  <div className="step-number" style={{ background: item.gradient }}>
                    {item.step}
                  </div>
                  <div className="step-emoji">{item.emoji}</div>
                  <div className="step-icon-wrapper" style={{ background: `${item.color}15` }}>
                    <div className="step-icon" style={{ color: item.color }}>
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="step-title">{item.title}</h3>
                  <p className="step-desc">{item.desc}</p>
                  <div className="step-pulse" style={{ background: item.color }}></div>
                </div>
                {idx < steps.length - 1 && (
                  <div className="step-connector">
                    <ArrowRight size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Expandable Decision Table */}
        <div className="decision-table-wrapper">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`table-toggle ${isOpen ? 'open' : ''}`}
          >
            <div className="toggle-content">
              <div className="toggle-icon">
                <Database size={24} />
              </div>
              <div className="toggle-text">
                <span className="toggle-title">View Decision Logic Table</span>
                <span className="toggle-subtitle">See exact scoring rules & risk bands</span>
              </div>
            </div>
            <div className={`chevron ${isOpen ? 'rotate' : ''}`}>
              <ChevronDown size={24} />
            </div>
          </button>

          <div className={`table-content ${isOpen ? 'expanded' : ''}`}>
            <div className="table-info">
              <div className="info-icon">💡</div>
              <p>
                The system assigns points based on clinically-informed rules. 
                Total score determines the risk band.
              </p>
            </div>

            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th className="factor-col">Factor</th>
                    <th className="low-col">
                      <span className="col-badge low-badge">Low (0 pts)</span>
                    </th>
                    <th className="med-col">
                      <span className="col-badge med-badge">Med (1 pt)</span>
                    </th>
                    <th className="high-col">
                      <span className="col-badge high-badge">High (2-3 pts)</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="factor-emoji">📱</span> Daily Screen Time</td>
                    <td>0-3h</td>
                    <td>4-6h</td>
                    <td>7h+ (2-3pts)</td>
                  </tr>
                  <tr>
                    <td><span className="factor-emoji">😴</span> Sleep Duration</td>
                    <td>7-9h</td>
                    <td>6-6.9h</td>
                    <td>&lt;6h (2-3pts)</td>
                  </tr>
                  <tr>
                    <td><span className="factor-emoji">⏰</span> Break Frequency</td>
                    <td>Every 25m</td>
                    <td>Rarely</td>
                    <td>None</td>
                  </tr>
                  <tr>
                    <td><span className="factor-emoji">📉</span> Motivation Drop</td>
                    <td>1 (Low)</td>
                    <td>2-3</td>
                    <td>4-5 (High)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="risk-bands">
              <div className="band low-band">
                <div className="band-icon">✅</div>
                <div>
                  <span className="band-range">0-6 pts</span>
                  <span className="band-label">Low Risk</span>
                </div>
              </div>
              <div className="band med-band">
                <div className="band-icon">⚠️</div>
                <div>
                  <span className="band-range">7-14 pts</span>
                  <span className="band-label">Medium Risk</span>
                </div>
              </div>
              <div className="band high-band">
                <div className="band-icon">🚨</div>
                <div>
                  <span className="band-range">15+ pts</span>
                  <span className="band-label">High Risk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .logic-section {
          padding: 5rem 0;
          background: linear-gradient(180deg, var(--color-surface) 0%, rgba(255,255,255,1) 50%, var(--color-surface) 100%);
          position: relative;
          overflow: hidden;
        }

        .bg-decoration {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
        }

        .orb-1 {
          width: 500px;
          height: 500px;
          background: rgba(99, 102, 241, 0.15);
          top: -20%;
          right: -10%;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: rgba(6, 182, 212, 0.12);
          bottom: -15%;
          left: -10%;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
          position: relative;
        }

        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%);
          color: var(--color-primary);
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 1rem;
          border: 1px solid rgba(139, 92, 246, 0.2);
        }

        .section-title {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 800;
          color: var(--color-text);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .title-icon {
          color: var(--color-primary);
          width: 36px;
          height: 36px;
        }

        .section-subtitle {
          color: var(--color-text-muted);
          font-size: 1.1rem;
          max-width: 500px;
          margin: 0 auto;
        }

        /* Flow Steps */
        .flow-container {
          position: relative;
          margin-bottom: 4rem;
        }

        .flow-track {
          display: none;
        }

        .flow-steps {
          display: flex;
          justify-content: center;
          gap: 0;
          flex-wrap: wrap;
        }

        .step-wrapper {
          display: flex;
          align-items: center;
        }

        .step-card {
          position: relative;
          background: white;
          padding: 2rem 1.75rem;
          border-radius: 20px;
          border: 1px solid var(--color-border);
          text-align: center;
          width: 200px;
          transition: all 0.4s var(--ease-out-expo);
          overflow: hidden;
        }

        .step-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(99, 102, 241, 0.15);
          border-color: var(--color-primary);
        }

        .step-card:hover .step-pulse {
          opacity: 1;
          transform: scale(1);
        }

        .step-pulse {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          opacity: 0;
          transform: scaleX(0);
          transition: all 0.4s var(--ease-out-expo);
        }

        .step-number {
          position: absolute;
          top: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          color: white;
          font-size: 0.8rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .step-emoji {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .step-icon-wrapper {
          width: 64px;
          height: 64px;
          margin: 0 auto 1rem;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .step-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .step-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
          color: var(--color-text);
        }

        .step-desc {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }

        .step-connector {
          color: var(--color-primary);
          opacity: 0.4;
          padding: 0 0.5rem;
          animation: pulse-arrow 2s ease-in-out infinite;
        }

        @keyframes pulse-arrow {
          0%, 100% { opacity: 0.3; transform: translateX(0); }
          50% { opacity: 0.7; transform: translateX(4px); }
        }

        /* Decision Table */
        .decision-table-wrapper {
          max-width: 850px;
          margin: 0 auto;
        }

        .table-toggle {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          background: white;
          border: 2px solid var(--color-border);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s var(--ease-out-expo);
        }

        .table-toggle:hover, .table-toggle.open {
          border-color: var(--color-primary);
          box-shadow: 0 8px 30px rgba(99, 102, 241, 0.15);
        }

        .toggle-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .toggle-icon {
          width: 52px;
          height: 52px;
          background: var(--gradient-primary);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
        }

        .toggle-text {
          text-align: left;
        }

        .toggle-title {
          display: block;
          font-weight: 700;
          font-size: 1.05rem;
          color: var(--color-text);
        }

        .toggle-subtitle {
          font-size: 0.875rem;
          color: var(--color-text-muted);
        }

        .chevron {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-surface);
          border-radius: 50%;
          color: var(--color-text-muted);
          transition: all 0.3s var(--ease-out-expo);
        }

        .table-toggle.open .chevron {
          background: var(--gradient-primary);
          color: white;
        }

        .chevron.rotate {
          transform: rotate(180deg);
        }

        .table-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s var(--ease-out-expo);
          background: white;
          border: 2px solid var(--color-border);
          border-top: none;
          border-radius: 0 0 16px 16px;
        }

        .table-content.expanded {
          max-height: 800px;
          padding: 1.5rem;
        }

        .table-info {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%);
          border-radius: 12px;
          margin-bottom: 1.5rem;
        }

        .info-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .table-info p {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          line-height: 1.5;
          margin: 0;
        }

        .table-scroll {
          overflow-x: auto;
          margin-bottom: 1.5rem;
        }

        table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          font-size: 0.9rem;
        }

        th, td {
          padding: 1rem;
          text-align: left;
        }

        th {
          background: var(--color-surface);
          font-weight: 600;
          font-size: 0.8rem;
        }

        th:first-child {
          border-radius: 10px 0 0 10px;
        }

        th:last-child {
          border-radius: 0 10px 10px 0;
        }

        .col-badge {
          display: inline-block;
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .low-badge { background: var(--color-success-bg); color: var(--color-success-dark); }
        .med-badge { background: var(--color-warning-bg); color: var(--color-warning-dark); }
        .high-badge { background: var(--color-danger-bg); color: var(--color-danger-dark); }

        tbody tr {
          transition: background 0.2s;
        }

        tbody tr:hover {
          background: rgba(99, 102, 241, 0.04);
        }

        td {
          border-bottom: 1px solid var(--color-border);
        }

        td:first-child {
          font-weight: 600;
          color: var(--color-text);
        }

        .factor-emoji {
          margin-right: 0.5rem;
        }

        .risk-bands {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .band {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.25rem;
          border-radius: 12px;
          min-width: 140px;
        }

        .low-band { background: var(--color-success-bg); }
        .med-band { background: var(--color-warning-bg); }
        .high-band { background: var(--color-danger-bg); }

        .band-icon {
          font-size: 1.25rem;
        }

        .band-range {
          display: block;
          font-size: 0.75rem;
          color: var(--color-text-muted);
          font-weight: 500;
        }

        .band-label {
          font-weight: 700;
          font-size: 0.9rem;
        }

        .low-band .band-label { color: var(--color-success-dark); }
        .med-band .band-label { color: var(--color-warning-dark); }
        .high-band .band-label { color: var(--color-danger-dark); }

        @media (max-width: 900px) {
          .flow-steps {
            flex-wrap: wrap;
            gap: 1rem;
          }

          .step-connector {
            display: none;
          }

          .step-card {
            width: calc(50% - 0.5rem);
          }
        }

        @media (max-width: 480px) {
          .step-card {
            width: 100%;
          }

          .risk-bands {
            flex-direction: column;
            align-items: center;
          }

          .band {
            width: 100%;
            max-width: 280px;
          }
        }
      `}</style>
    </section>
  );
}
