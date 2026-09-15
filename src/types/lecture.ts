export interface LectureVideo {
  id: number;
  batchId: number;
  title: string;
  description?: string;
  videoPath: string;
  fileName: string;
  contentType: string;
  fileSize: number;
  duration: string;
  createdAt: string;
  rating: number;
}

export interface LectureNote {
  id: number;
  batchId: number;
  title: string;
  description?: string;
  notesPath: string;
  fileName: string;
  contentType: string;
  fileSize: number;
  createdAt: string;
}