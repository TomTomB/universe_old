export interface DownloadProgress {
  progress: string;
  bytesPerSecond: number;
  percent: number;
  total: number;
  transferred: number;
}
