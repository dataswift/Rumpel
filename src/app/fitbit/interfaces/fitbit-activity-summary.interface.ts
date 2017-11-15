export interface FitbitActivitySummary {
  dateCreated: string;
  activityCalories: number;
  caloriesBMR: number;
  caloriesOut: number;
  distances: FitbitActivityDistance[];
  elevation?: number;
  fairlyActiveMinutes: number;
  floors?: number;
  lightlyActiveMinutes: number;
  marginalCalories: number;
  sedentaryMinutes: number;
  summaryDate: string;
  steps: number;
  veryActiveMinutes: number;
}

export interface FitbitActivityDistance {
  activity: string;
  distance: number;
}
