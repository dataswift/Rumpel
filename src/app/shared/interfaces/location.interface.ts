export interface Location {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude?: number;
  altitude_accuracy?: number;
  heading?: number;
  speed?: number;
  shared?: Array<string>;
}
