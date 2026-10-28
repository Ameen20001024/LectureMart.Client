export interface LectureVideo {
  videoId: number;
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
  queries?: Query[];
}

import type { Query } from "./query";

export interface LectureNote {
  noteId: number;
  batchId: number;
  title: string;
  description?: string;
  notesPath: string;
  fileName: string;
  contentType: string;
  fileSize: number;
  createdAt: string;
}
