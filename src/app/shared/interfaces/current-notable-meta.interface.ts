export interface CurrentNotableMeta {
  phata: string;
  expires: number;
  reportLocation: boolean;
  initialState?: InitialNotableState;
}

interface InitialNotableState {
  message: string;
  isShared: boolean;
}
