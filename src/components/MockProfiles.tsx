import { User } from 'lucide-react';

export default function MockProfiles() {
  const profiles = [
    {
      id: 1,
      type: 'Hyper-Focus Student',
      stats: '10h screen, 5h sleep, High procrastination',
      result: 'High Risk (16 pts)',
      note: 'System correctly flags dangerous sleep/screen ratio.'
    },
    {
      id: 2,
      type: 'Balanced User',
      stats: '5h screen, 8h sleep, Consistent breaks',
      result: 'Low Risk (4 pts)',
      note: 'Validates healthy baseline scoring.'
    },
    {
      id: 3,
      type: 'Borderline Case',
      stats: '7h screen, 7h sleep, Low motivation',
      result: 'Medium Risk (9 pts)',
      note: 'Triggers interventions before burnout peaks.'
    }
  ];

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title text-center mb-2">Testing & Validation</h2>
        <p className="text-center text-mute mb-8 max-w-2xl mx-auto">
          We tested the rule engine against synthetic student profiles to ensure accuracy and safety.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {profiles.map((p) => (
            <div key={p.id} className="card p-6 bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-2 mb-3 text-gray-400 uppercase text-xs font-bold tracking-wider">
                <User size={14} /> Profile {p.id}
              </div>
              <h3 className="font-bold text-lg mb-2">{p.type}</h3>
              <p className="text-sm text-gray-600 mb-4 font-mono bg-white p-2 rounded border border-gray-100">
                {p.stats}
              </p>
              <div className="mb-4">
                <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                  p.result.includes('High') ? 'bg-red-100 text-red-700' :
                  p.result.includes('Medium') ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  Output: {p.result}
                </span>
              </div>
              <p className="text-xs text-mute italic">
                "{p.note}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
