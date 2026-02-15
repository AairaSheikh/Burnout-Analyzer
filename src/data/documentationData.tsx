import React from 'react';
import { FileText, Terminal, Shield, Book, HelpCircle } from 'lucide-react';

export interface DocSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  shortDesc: string;
  content: React.ReactNode;
}

export const documentationData: Record<string, DocSection> = {
  'project-overview': {
    id: 'project-overview',
    title: 'Project Overview',
    icon: <FileText size={24} />,
    shortDesc: 'The vision and goals of BurnoutAI.',
    content: (
      <div className="prose">
        <p>BurnoutAI is a cutting-edge research initiative born from the intersection of artificial intelligence and student wellness. In an era of constant connectivity, the boundaries between work, study, and rest have become increasingly blurred. Our project aims to provide a data-driven mirror to these habits, helping users identify early warning signs of digital burnout before they manifest as serious health issues.</p>
        <h3>Our Mission</h3>
        <p>Our mission is to democratize digital wellness tools through ethical, transparent AI. We believe that everyone should have access to insights about their digital health without sacrificing their personal privacy to "big tech" algorithms.</p>
        <h3>Key Objectives</h3>
        <ul>
          <li><strong>Identify Patterns:</strong> Analyze subtle shifts in focus and engagement that precede burnout.</li>
          <li><strong>Empower Users:</strong> Provide actionable feedback rather than just raw data.</li>
          <li><strong>Research Ethics:</strong> Set a new standard for how mental wellness data is handled in AI systems.</li>
        </ul>
      </div>
    )
  },
  'ai-methodology': {
    id: 'ai-methodology',
    title: 'AI Methodology',
    icon: <Terminal size={24} />,
    shortDesc: 'Behind the curtain: Our algorithms and models.',
    content: (
      <div className="prose">
        <p>The core of BurnoutAI is a sophisticated pattern recognition system. Unlike simple screen-time trackers, our AI evaluates the <em>quality</em> and <em>consistency</em> of digital interactions.</p>
        <h3>The Model: Random Forest Classifier</h3>
        <p>We utilize an ensemble learning method consisting of multiple decision trees. This approach is highly effective for behavioral data because it can handle non-linear relationships and high-dimensional features without overfitting.</p>
        <h3>Feature Engineering</h3>
        <p>Our model processes several key metrics to determine risk:</p>
        <ul>
          <li><strong>Context Switching Frequency:</strong> How often a user jumps between different types of tasks (High frequency is often a precursor to cognitive fatigue).</li>
          <li><strong>Session Density:</strong> The ratio of active work time to idle time within a specific window.</li>
          <li><strong>Temporal Distribution:</strong> When digital activity occurs (e.g., late-night usage vs. morning focus).</li>
        </ul>
        <h3>Neural Pattern Analysis</h3>
        <p>We use a specialized neural layer to weigh these features against established psychological burnout markers, creating a personalized risk profile for every analysis.</p>
      </div>
    )
  },
  'privacy-ethics': {
    id: 'privacy-ethics',
    title: 'Data Privacy & Ethics',
    icon: <Shield size={24} />,
    shortDesc: 'Our commitment to your security and ethics.',
    content: (
      <div className="prose">
        <p>At BurnoutAI, privacy isn't a feature—it's the foundation. We recognize that digital behavior data is deeply personal and requires the highest level of protection.</p>
        <h3>Local-First Processing</h3>
        <p>Whenever possible, our AI models run locally in your browser. This means your raw activity data never leaves your device. Only anonymized, aggregated insights are processed for research purposes.</p>
        <h3>Differential Privacy</h3>
        <p>To further protect individual identities, we employ differential privacy techniques. This adds mathematical "noise" to the data, ensuring that no single user can be re-identified within our research datasets.</p>
        <h3>Ethical AI Principles</h3>
        <ul>
          <li><strong>Transparency:</strong> Our model logic is documented and open for peer review.</li>
          <li><strong>Non-Addictive Design:</strong> The platform itself is designed to be used briefly and efficiently, not to keep you scrolling.</li>
          <li><strong>User Agency:</strong> You have full control over your data. You can delete your analysis history at any time with a single click.</li>
        </ul>
      </div>
    )
  },
  'user-guide': {
    id: 'user-guide',
    title: 'User Guide',
    icon: <Book size={24} />,
    shortDesc: 'How to get the most out of BurnoutAI.',
    content: (
      <div className="prose">
        <p>Ready to analyze your digital balance? Follow these steps to get a comprehensive report on your current risk level.</p>
        <h3>Step 1: Metric Input</h3>
        <p>Navigate to the "Try Demo" page. You'll be asked to provide estimate metrics for your typical day. Be as honest as possible for the most accurate results.</p>
        <h3>Step 2: Analysis</h3>
        <p>Click "Analyze my Pattern". Our Random Forest model will process your inputs through its weighted trees, comparing your metrics against thousands of reference data points.</p>
        <h3>Step 3: Actionable Insights</h3>
        <p>Once the analysis is complete, review your "Burnout Probability". We also provide specific "Focus Consistency" and "Recovery Quality" scores to help you identify exactly where your habits might need adjustment.</p>
        <h3>Pro Tip: Regular Checks</h3>
        <p>We recommend running an analysis once a week. Digital habits change slowly; tracking them over time is the best way to see if your wellness strategies are working.</p>
      </div>
    )
  },
  'interpreting-results': {
    id: 'interpreting-results',
    title: 'Interpreting Results',
    icon: <HelpCircle size={24} />,
    shortDesc: 'Understanding your Burnout Probability.',
    content: (
      <div className="prose">
        <p>Documentation of our risk levels and what they mean for your daily life.</p>
        <h3>Green: Low Risk (0% - 30%)</h3>
        <p>Your digital patterns show high resilience. You likely have strong boundaries between work and rest. <strong>Recommendation:</strong> Keep doing what you're doing. Focus on maintaining these boundaries during high-stress periods.</p>
        <h3>Yellow: Medium Risk (31% - 70%)</h3>
        <p>There are signs of digital fatigue. You might be experiencing late-night "revenge bedtime procrastination" or excessive context switching. <strong>Recommendation:</strong> Implement a digital curfew (no screens 1 hour before bed) and try the Pomodoro technique for work sessions.</p>
        <h3>Red: High Risk (71% - 100%)</h3>
        <p>Your patterns strongly correlate with clinical burnout symptoms. This is a call to action. <strong>Recommendation:</strong> Prioritize an immediate digital detox. If possible, take a 24-48 hour break from all non-essential screens and consult with a wellness professional.</p>
      </div>
    )
  }
};
