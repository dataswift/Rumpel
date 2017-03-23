export interface AccountStatus {
  previousLogin: string;
  databaseStorage: SystemInformation;
  databaseStorageUsed: SystemInformation;
  databaseStorageUsedShare: SystemInformation;
}

interface SystemInformation {
  metric: number;
  units: string;
  kind?: string;
}
