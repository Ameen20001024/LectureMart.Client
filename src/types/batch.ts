export interface Batch {
  id: number;
  batchCode: string;
  courseId: number;
  mentorId: number;
  startDate: string;
  endDate?: string;
  isCompleted: boolean;
}

export interface CreateBatchRequest {
  batchCode: string;
  courseId: number;
  mentorId: number;
  startDate: string;
  endDate?: string;
}