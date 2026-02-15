import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { documentationData } from '../data/documentationData';

export default function DocumentationSection() {
  const sections = Object.values(documentationData);

  return (
    <section className="section docs-hub-section">
      <div className="container">
        <div className="text-center mb-16">
          <div className="section-badge mb-4">
            <Sparkles size={16} />
            <span>Learning Center</span>
          </div>
          <h1 className="docs-hub-title">Documentation Hub</h1>
          <p className="docs-hub-subtitle">Explore the science, ethics, and technology behind BurnoutAI.</p>
        </div>

        <div className="docs-hub-grid">
          {sections.map((section) => (
            <Link key={section.id} to={`/documentation/${section.id}`} className="doc-hub-card">
              <div className="card-top">
                <div className="card-icon">
                  {section.icon}
                </div>
                <h3 className="card-title">{section.title}</h3>
                <p className="card-desc">{section.shortDesc}</p>
              </div>
              <div className="card-footer">
                <span className="read-more">Learn More</span>
                <ArrowRight size={16} className="arrow-icon" />
              </div>
            </Link>
          ))}
        </div>

        <div className="docs-quick-cta mt-24">
          <div className="cta-inner">
            <div className="cta-content">
              <h2>Still have questions?</h2>
              <p>Our research is ongoing. Contact our student team for specific inquiries about methodology or partnership.</p>
            </div>
            <a href="mailto:research@burnoutai.edu" className="btn btn-outline">Contact Research Team</a>
          </div>
        </div>
      </div>

      <style>{`
        .docs-hub-section {
          padding-top: 8rem;
          min-height: 80vh;
          background: radial-gradient(circle at top right, rgba(99, 102, 241, 0.05) 0%, transparent 40%),
                      radial-gradient(circle at bottom left, rgba(99, 102, 241, 0.03) 0%, transparent 40%);
        }

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
        }

        .docs-hub-title {
          font-size: 3.5rem;
          font-weight: 800;
          color: var(--color-text);
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .docs-hub-subtitle {
          font-size: 1.25rem;
          color: var(--color-text-muted);
          max-width: 600px;
          margin: 0 auto;
        }

        .docs-hub-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-top: 4rem;
        }

        .doc-hub-card {
          background: white;
          padding: 2.5rem;
          border-radius: var(--radius-xl);
          border: 1px solid var(--color-border);
          text-decoration: none;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: var(--shadow-sm);
        }

        .doc-hub-card:hover {
          transform: translateY(-8px);
          border-color: var(--color-primary);
          box-shadow: var(--shadow-xl);
        }

        .card-icon {
          width: 56px;
          height: 56px;
          background: var(--color-surface);
          color: var(--color-primary);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }

        .doc-hub-card:hover .card-icon {
          background: var(--gradient-primary);
          color: white;
          transform: scale(1.1);
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: 0.75rem;
        }

        .card-desc {
          color: var(--color-text-muted);
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .card-footer {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--color-primary);
          font-weight: 600;
          font-size: 0.95rem;
        }

        .arrow-icon {
          transition: transform 0.3s ease;
        }

        .doc-hub-card:hover .arrow-icon {
          transform: translateX(6px);
        }

        .docs-quick-cta {
          background: white;
          border-radius: var(--radius-2xl);
          padding: 4rem;
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-lg);
          position: relative;
          overflow: hidden;
        }

        .docs-quick-cta::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: var(--gradient-primary);
        }

        .cta-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 4rem;
        }

        .cta-content h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .cta-content p {
          color: var(--color-text-muted);
          font-size: 1.1rem;
          max-width: 500px;
        }

        @media (max-width: 768px) {
          .cta-inner {
            flex-direction: column;
            text-align: center;
            gap: 2rem;
          }
          .docs-quick-cta {
            padding: 2.5rem;
          }
          .docs-hub-title {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
}
