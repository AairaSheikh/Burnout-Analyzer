import { CheckCircle2, XCircle, Shield, Sparkles } from 'lucide-react';

export default function SystemComparison() {
  const doesItems = [
    { text: 'Uses <strong>self-reported habits</strong> to analyze patterns.', emoji: '📋' },
    { text: 'Apply <strong>rule-based classification</strong> logic.', emoji: '🧠' },
    { text: 'Provide <strong>educational recommendations</strong> for focus.', emoji: '📚' },
    { text: 'Calculate a risk score based on defined weights.', emoji: '📊' },
  ];

  const doesNotItems = [
    { text: 'Track apps or monitor live behavior.', emoji: '📱' },
    { text: 'Access device usage statistics or location.', emoji: '📍' },
    { text: 'Diagnose medical or psychological conditions.', emoji: '🏥' },
    { text: 'Store personal identifiers (Name/Email).', emoji: '🔐' },
  ];

  return (
    <section className="system-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="header-badge">
            <Shield size={16} />
            <span>Transparency First</span>
          </div>
          <h2 className="section-title">
            <Sparkles className="title-icon" />
            What This System Does
          </h2>
          <p className="section-subtitle">
            Understand the capabilities and ethical boundaries of this project
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="comparison-grid">
          {/* DOES Card */}
          <div className="comparison-card does-card">
            <div className="card-glow does-glow"></div>
            <div className="card-header">
              <div className="header-icon does-icon">
                <CheckCircle2 size={28} />
              </div>
              <div>
                <h3 className="card-title">The System <span className="does-text">DOES</span></h3>
                <p className="card-subtitle">Core capabilities</p>
              </div>
            </div>
            <ul className="feature-list">
              {doesItems.map((item, idx) => (
                <li key={idx} className="feature-item">
                  <div className="item-icon does-item-icon">
                    <span className="emoji">{item.emoji}</span>
                  </div>
                  <div className="item-content">
                    <span dangerouslySetInnerHTML={{ __html: item.text }} />
                  </div>
                  <CheckCircle2 size={18} className="check-icon" />
                </li>
              ))}
            </ul>
          </div>

          {/* DOES NOT Card */}
          <div className="comparison-card does-not-card">
            <div className="card-glow not-glow"></div>
            <div className="card-header">
              <div className="header-icon not-icon">
                <XCircle size={28} />
              </div>
              <div>
                <h3 className="card-title">The System <span className="not-text">does NOT</span></h3>
                <p className="card-subtitle">Privacy boundaries</p>
              </div>
            </div>
            <ul className="feature-list">
              {doesNotItems.map((item, idx) => (
                <li key={idx} className="feature-item not-item">
                  <div className="item-icon not-item-icon">
                    <span className="emoji">{item.emoji}</span>
                  </div>
                  <div className="item-content">
                    <span>{item.text}</span>
                  </div>
                  <XCircle size={18} className="x-icon" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Privacy Badge */}
        <div className="privacy-footer">
          <div className="privacy-badge">
            <Shield size={20} />
            <span>100% Privacy-First • No Data Collection • Browser-Only Processing</span>
          </div>
        </div>
      </div>

      <style>{`
        .system-section {
          padding: 5rem 0;
          background: linear-gradient(180deg, rgba(255,255,255,1) 0%, var(--color-surface) 100%);
          position: relative;
          overflow: hidden;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
          color: var(--color-primary);
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 1rem;
          border: 1px solid rgba(99, 102, 241, 0.2);
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
          width: 32px;
          height: 32px;
        }

        .section-subtitle {
          color: var(--color-text-muted);
          font-size: 1.1rem;
          max-width: 500px;
          margin: 0 auto;
        }

        .comparison-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .comparison-card {
          position: relative;
          background: white;
          border-radius: 20px;
          padding: 2rem;
          border: 1px solid var(--color-border);
          overflow: hidden;
          transition: all 0.4s var(--ease-out-expo);
        }

        .comparison-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }

        .card-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
        }

        .does-glow {
          background: linear-gradient(90deg, #10b981, #34d399, #10b981);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }

        .not-glow {
          background: linear-gradient(90deg, #94a3b8, #cbd5e1, #94a3b8);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px dashed var(--color-border);
        }

        .header-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .does-icon {
          background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
          color: white;
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
        }

        .not-icon {
          background: linear-gradient(135deg, #64748b 0%, #94a3b8 100%);
          color: white;
          box-shadow: 0 8px 20px rgba(100, 116, 139, 0.25);
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: 0.25rem;
        }

        .does-text {
          background: linear-gradient(135deg, #10b981, #059669);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .not-text {
          color: #64748b;
        }

        .card-subtitle {
          font-size: 0.875rem;
          color: var(--color-text-muted);
        }

        .feature-list {
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.875rem 1rem;
          background: var(--color-surface);
          border-radius: 12px;
          transition: all 0.2s ease;
        }

        .feature-item:hover {
          background: rgba(16, 185, 129, 0.08);
          transform: translateX(4px);
        }

        .not-item:hover {
          background: rgba(100, 116, 139, 0.08);
        }

        .item-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .does-item-icon {
          background: rgba(16, 185, 129, 0.1);
        }

        .not-item-icon {
          background: rgba(100, 116, 139, 0.1);
        }

        .emoji {
          font-size: 1.25rem;
        }

        .item-content {
          flex: 1;
          font-size: 0.95rem;
          color: var(--color-text);
          line-height: 1.4;
        }

        .item-content strong {
          color: var(--color-primary);
        }

        .check-icon {
          color: #10b981;
          flex-shrink: 0;
        }

        .x-icon {
          color: #94a3b8;
          flex-shrink: 0;
        }

        .privacy-footer {
          text-align: center;
          margin-top: 3rem;
        }

        .privacy-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 999px;
          color: #059669;
          font-size: 0.9rem;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .comparison-grid {
            grid-template-columns: 1fr;
          }

          .comparison-card {
            padding: 1.5rem;
          }

          .feature-item {
            padding: 0.75rem;
          }

          .item-icon {
            width: 36px;
            height: 36px;
          }

          .privacy-badge {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }
        }
      `}</style>
    </section>
  );
}
