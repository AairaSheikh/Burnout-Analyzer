export type UserInputs = {
  dailyScreenTime: number; // hours
  lateNightScreenUse: 'Never' | 'Sometimes' | 'Often';
  sleepDuration: number; // hours (mapped from ranges)
  sleepConsistency: 'Consistent' | 'Somewhat' | 'Irregular';
  breakFrequency: 'Every 25-50 min' | 'Rarely' | 'None';
  procrastination: 'Low' | 'Medium' | 'High';
  exhaustion: number; // 1-5
  motivationDrop: number; // 1-5
  difficultyConcentrating: number; // 1-5
};

export type RiskLevel = 'Low' | 'Medium' | 'High';

export type AnalysisResult = {
  score: number;
  riskLevel: RiskLevel;
  factors: string[];
  recommendations: string[];
};

export const calculateRisk = (inputs: UserInputs): AnalysisResult => {
  let score = 0;
  const factors: string[] = [];

  // 1. Daily Screen Time
  if (inputs.dailyScreenTime >= 10) { score += 3; factors.push('Excessive daily screen time (10h+)'); }
  else if (inputs.dailyScreenTime >= 7) { score += 2; factors.push('High daily screen time (7-9h)'); }
  else if (inputs.dailyScreenTime >= 4) { score += 1; }

  // 2. Late Night Screen Use
  if (inputs.lateNightScreenUse === 'Often') { score += 2; factors.push('Frequent late-night screen use'); }
  else if (inputs.lateNightScreenUse === 'Sometimes') { score += 1; }

  // 3. Sleep Duration (Input is hours, mapped from user selection)
  // Rules: 7-9h=0, 6-6.9h=1, 5-5.9h=2, <5h=3
  // Simplification for ranges:
  if (inputs.sleepDuration < 5) { score += 3; factors.push('Severe sleep deprivation (<5h)'); }
  else if (inputs.sleepDuration < 6) { score += 2; factors.push('Low sleep duration (5-6h)'); }
  else if (inputs.sleepDuration < 7) { score += 1; }

  // 4. Sleep Consistency
  if (inputs.sleepConsistency === 'Irregular') { score += 2; factors.push('Irregular sleep patterns'); }
  else if (inputs.sleepConsistency === 'Somewhat') { score += 1; }

  // 5. Break Frequency
  if (inputs.breakFrequency === 'None') { score += 2; factors.push('No breaks during study sessions'); }
  else if (inputs.breakFrequency === 'Rarely') { score += 1; }

  // 6. Procrastination
  if (inputs.procrastination === 'High') { score += 2; factors.push('High procrastination levels'); }
  else if (inputs.procrastination === 'Medium') { score += 1; }

  // 7-9. Subjective Ratings (1-5) -> Points (0-4)
  score += Math.max(0, inputs.exhaustion - 1);
  if (inputs.exhaustion >= 4) factors.push('High reported exhaustion');

  score += Math.max(0, inputs.motivationDrop - 1);
  
  score += Math.max(0, inputs.difficultyConcentrating - 1);
  if (inputs.difficultyConcentrating >= 4) factors.push('Severe difficulty concentrating');

  // Determine Risk
  let riskLevel: RiskLevel = 'Low';
  if (score >= 15) riskLevel = 'High';
  else if (score >= 7) riskLevel = 'Medium';

  // Recommendations
  const recommendations = getRecommendations(riskLevel);

  return { score, riskLevel, factors, recommendations };
};

const getRecommendations = (risk: RiskLevel): string[] => {
  switch (risk) {
    case 'Low':
      return [
        'Maintain your healthy balance with regular "tech-free" zones.',
        'Use the 20-20-20 rule for eye strain prevention.',
        'Keep tracking your habits to prevent future drift.'
      ];
    case 'Medium':
      return [
        'Implement strict "curfew" hours for devices (1 hour before bed).',
        'Use the Pomodoro technique (25m work/5m break) to rebuild focus.',
        'Schedule offline recovery blocks on weekends.',
        'Review your sleep environment for better consistency.',
        'Practice "single-tasking" - open only one tab at a time.'
      ];
    case 'High':
      return [
        'Immediate 48-hour "digital detox" or significant reduction recommended.',
        'Contact campus support services or a student advisor for workload management.',
        'Prioritize sleep above all else for the next 3 days.',
        'Remove social media apps from your phone temporarily.',
        'Study in short 15-minute bursts until motivation returns.',
        'Engage in physical activity to reset dopamine levels.'
      ];
  }
};
