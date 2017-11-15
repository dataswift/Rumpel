export interface FitbitActivity {
  activeDuration: number;
  activityLevel: ActivityLevel[];
  activityName: string;
  averageHeartRate?: number;
  calories: number;
  distance?: number;
  distanceUnit?: string;
  duration: number;
  elevationGain?: number;
  heartRateZones?: HeartRateZone[];
  lastModified: string;
  logId: number;
  logType: string;
  originalDuration: number;
  originalStartTime: string;
  pace?: number;
  source?: RecordSource;
  speed?: number;
  startTime: string;
  steps?: number;
}

interface ActivityLevel {
  minutes: number;
  name: string;
}

interface HeartRateZone {
  max: number;
  min: number;
  minutes: number;
  name: string;
}

interface RecordSource {
  id: string;
  name: string;
  type: string;
  url: string;
}
