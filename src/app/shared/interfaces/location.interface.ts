export interface Location {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp?: any;
  altitude?: number;
  altitude_accuracy?: number;
  heading?: number;
  speed?: number;
  shared?: Array<string>;
}
