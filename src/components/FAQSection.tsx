import { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export default function FAQSection() {
  const faqs = [
    {
      q: "Is my personal data saved anywhere?",
      a: "No. This system is completely privacy-first. All inputs are processed locally in your web browser. Nothing is sent to a server or database.",
      icon: "🔒"
    },
    {
      q: "Is this a medical diagnosis?",
      a: "Absolutely not. This is a conceptual tool for educational purposes only. The 'risk score' is based on general patterns, not a clinical assessment. If you feel overwhelmed, please seek professional support.",
      icon: "⚕️"
    },
    {
      q: "How is the risk score calculated?",
      a: "The system uses a rule-based AI logic (check the 'How It Works' section) that assigns points to habits like sleep deprivation, high screen time, and exhaustion. A higher score indicates a pattern that often leads to burnout.",
      icon: "🧮"
    },
    {
      q: "What should I do if I get a High Risk result?",
      a: "Don't panic! It's just a signal to pause. Try the suggested 48-hour reset plan, prioritize sleep, and consider talking to a student counselor about your workload.",
      icon: "💡"
    },
    {
      q: "Who created this project?",
      a: "This is a student research project designed to demonstrate how rules-based AI can help analyze behavioral patterns without needing complex machine learning models.",
      icon: "👩‍🎓"
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="container">
        {/* Header */}
        <div className="faq-header">
          <div className="faq-badge">
            <Sparkles size={16} />
            <span>Got Questions?</span>
          </div>
          <h2 className="faq-title">
            <HelpCircle className="title-icon" />
            Frequently Asked Questions
          </h2>
          <p className="faq-subtitle">
            Everything you need to know about the Digital Burnout Analyzer
          </p>
        </div>

        {/* FAQ Items */}
        <div className="faq-list">
          {faqs.map((item, idx) => (
            <div 
              key={idx} 
              className={`faq-item ${openIndex === idx ? 'active' : ''}`}
            >
              <button 
                onClick={() => toggleFAQ(idx)}
                className="faq-question"
                aria-expanded={openIndex === idx}
              >
                <div className="question-left">
                  <span className="question-icon">{item.icon}</span>
                  <span className="question-text">{item.q}</span>
                </div>
                <div className={`chevron-wrapper ${openIndex === idx ? 'rotate' : ''}`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              <div className={`faq-answer ${openIndex === idx ? 'open' : ''}`}>
                <div className="answer-content">
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="faq-footer">
          <p>Still have questions?</p>
          <span>Check out the <strong>How It Works</strong> section for more details.</span>
        </div>
      </div>

      <style>{`
        .faq-section {
          padding: 5rem 0;
          background: linear-gradient(180deg, var(--color-surface) 0%, rgba(255,255,255,1) 100%);
          position: relative;
          overflow: hidden;
        }

        .faq-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .faq-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .faq-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--color-primary-light);
          color: var(--color-primary);
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .faq-title {
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

        .faq-subtitle {
          color: var(--color-text-muted);
          font-size: 1.1rem;
          max-width: 500px;
          margin: 0 auto;
        }

        .faq-list {
          max-width: 750px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-item {
          background: white;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          overflow: hidden;
          transition: all 0.3s var(--ease-out-expo);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .faq-item:hover {
          border-color: rgba(99, 102, 241, 0.3);
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.1);
          transform: translateY(-2px);
        }

        .faq-item.active {
          border-color: var(--color-primary);
          box-shadow: 0 8px 32px rgba(99, 102, 241, 0.15);
        }

        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: background 0.2s;
        }

        .faq-question:hover {
          background: rgba(99, 102, 241, 0.03);
        }

        .question-left {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
        }

        .question-icon {
          font-size: 1.5rem;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-surface);
          border-radius: var(--radius-md);
          flex-shrink: 0;
        }

        .question-text {
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-text);
          line-height: 1.4;
        }

        .chevron-wrapper {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-surface);
          border-radius: 50%;
          color: var(--color-text-muted);
          transition: all 0.3s var(--ease-out-expo);
          flex-shrink: 0;
        }

        .faq-item.active .chevron-wrapper {
          background: var(--gradient-primary);
          color: white;
        }

        .chevron-wrapper.rotate {
          transform: rotate(180deg);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s var(--ease-out-expo);
        }

        .faq-answer.open {
          max-height: 300px;
        }

        .answer-content {
          padding: 0 1.5rem 1.5rem 4.5rem;
        }

        .answer-content p {
          color: var(--color-text-muted);
          font-size: 0.95rem;
          line-height: 1.7;
          margin: 0;
          padding-top: 0.5rem;
          border-top: 1px dashed var(--color-border);
        }

        .faq-footer {
          text-align: center;
          margin-top: 3rem;
          padding: 1.5rem;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%);
          border-radius: var(--radius-lg);
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .faq-footer p {
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-text);
          margin-bottom: 0.25rem;
        }

        .faq-footer span {
          font-size: 0.9rem;
          color: var(--color-text-muted);
        }

        .faq-footer strong {
          color: var(--color-primary);
        }

        @media (max-width: 640px) {
          .faq-question {
            padding: 1rem;
          }

          .question-icon {
            width: 36px;
            height: 36px;
            font-size: 1.2rem;
          }

          .question-text {
            font-size: 0.9rem;
          }

          .answer-content {
            padding: 0 1rem 1rem 1rem;
          }

          .chevron-wrapper {
            width: 32px;
            height: 32px;
          }
        }
      `}</style>
    </section>
  );
}
