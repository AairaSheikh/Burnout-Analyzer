import { useParams, Link, useNavigate } from 'react-router-dom';
import { documentationData } from '../data/documentationData';
import { ArrowLeft, ChevronRight, Zap } from 'lucide-react';
import { useEffect } from 'react';

export default function DocDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const doc = slug ? documentationData[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug && !documentationData[slug]) {
      navigate('/documentation');
    }
  }, [slug, navigate]);

  if (!doc) return null;

  return (
    <div className="doc-detail-page section">
      <div className="container">
        <div className="doc-detail-layout">
          {/* Sidebar */}
          <aside className="doc-detail-sidebar">
            <Link to="/documentation" className="back-link mb-8">
              <ArrowLeft size={18} />
              <span>Back to Docs</span>
            </Link>
            
            <div className="sidebar-list">
              <h4 className="sidebar-label">Other Topics</h4>
              {Object.values(documentationData).map((item) => (
                <Link 
                  key={item.id} 
                  to={`/documentation/${item.id}`}
                  className={`sidebar-item ${item.id === slug ? 'active' : ''}`}
                >
                  <span>{item.title}</span>
                  <ChevronRight size={14} />
                </Link>
              ))}
            </div>

            <div className="sidebar-cta mt-12">
              <div className="cta-card">
                <Zap size={24} className="mb-4" />
                <h5>Ready to test?</h5>
                <p>Run your personal burnout analysis now.</p>
                <Link to="/demo" className="btn btn-primary btn-sm w-full mt-4">Try Demo</Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="doc-detail-content">
            <header className="doc-content-header mb-12">
              <div className="doc-icon-badge mb-6">
                {doc.icon}
              </div>
              <h1 className="doc-title">{doc.title}</h1>
              <p className="doc-lede">{doc.shortDesc}</p>
            </header>

            <div className="doc-rich-text">
              {doc.content}
            </div>

            <footer className="doc-footer mt-20 pt-12">
              <div className="next-steps p-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2 block">Quick Navigation</span>
                  <p className="text-slate-600">Need help with something else? Check our other documentation or try the interactive tool.</p>
                </div>
                <Link to="/documentation" className="btn btn-secondary btn-sm whitespace-nowrap">Documentation Hub</Link>
              </div>
            </footer>
          </main>
        </div>
      </div>

      <style>{`
        .doc-detail-page {
          padding-top: 8rem;
          min-height: 100vh;
          background: #fafafa;
        }

        .doc-detail-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 5rem;
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--color-text-muted);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.2s;
        }

        .back-link:hover {
          color: var(--color-primary);
        }

        .sidebar-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-muted);
          margin-bottom: 1rem;
        }

        .sidebar-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.875rem 1.25rem;
          margin: 0 -1.25rem;
          color: var(--color-text);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          border-radius: var(--radius-md);
          transition: all 0.2s;
        }

        .sidebar-item:hover {
          background: white;
          color: var(--color-primary);
          box-shadow: var(--shadow-sm);
        }

        .sidebar-item.active {
          background: var(--color-primary);
          color: white;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
        }

        .cta-card {
          padding: 1.5rem;
          background: white;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
        }

        .cta-card h5 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        .cta-card p {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          line-height: 1.5;
        }

        .doc-icon-badge {
          width: 64px;
          height: 64px;
          background: white;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
          box-shadow: var(--shadow-md);
          border: 1px solid var(--color-border);
        }

        .doc-title {
          font-size: 3.5rem;
          font-weight: 800;
          color: var(--color-text);
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .doc-lede {
          font-size: 1.5rem;
          color: var(--color-text-muted);
          line-height: 1.4;
        }

        .doc-footer {
          border-top: 1px solid var(--color-border);
        }

        /* Prose styles */
        .prose h3 {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 2.5rem 0 1.25rem;
          color: var(--color-text);
        }

        .prose p {
          font-size: 1.15rem;
          line-height: 1.8;
          color: var(--color-text-muted);
          margin-bottom: 1.5rem;
        }

        .prose ul {
          list-style: none;
          padding: 0;
          margin-bottom: 2rem;
        }

        .prose li {
          position: relative;
          padding-left: 1.75rem;
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--color-text-muted);
          margin-bottom: 0.75rem;
        }

        .prose li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.8rem;
          width: 8px;
          height: 8px;
          background: var(--gradient-primary);
          border-radius: 50%;
        }

        .prose strong {
          color: var(--color-text);
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .doc-detail-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .doc-detail-sidebar {
            display: none;
          }
          .doc-title {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}
