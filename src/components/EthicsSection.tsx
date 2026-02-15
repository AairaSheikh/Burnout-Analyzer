import { Lock, EyeOff, ShieldCheck } from 'lucide-react';

export default function EthicsSection() {
  return (
    <section className="section bg-surface">
      <div className="container max-w-4xl">
        <h2 className="section-title text-center mb-8">Ethics & Privacy Standards</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-white p-3 rounded-lg border border-gray-100 h-fit">
                <Lock className="text-success" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Privacy First</h3>
                <p className="text-sm text-mute">
                  No personal identifiers (names, emails, student IDs) are ever collected. 
                  All analysis happens locally in your browser.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-white p-3 rounded-lg border border-gray-100 h-fit">
                <EyeOff className="text-success" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Data Minimization</h3>
                <p className="text-sm text-mute">
                  We only ask for the minimum data points needed to calculate the risk score. 
                  No background tracking.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-bold flex items-center gap-2 mb-4">
              <ShieldCheck size={20} className="text-blue-600" />
              Project Safeguards
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Check /> Consent-first approach (voluntary participation)
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check /> Transparent rule-based logic (no "black box")
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check /> Not used for grading or disciplinary action
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check /> Zero server-side storage
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Check() {
  return <div className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px] font-bold">✓</div>;
}
