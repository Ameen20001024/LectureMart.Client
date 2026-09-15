export interface Assignment {
  id: number;
  batchId: number;
  title: string;
  description?: string;
  assignmentFilePath: string;
  fileName: string;
  contentType: string;
  fileSize: number;
  deadLine: string;
  createdAt: string;
  gradePoints: number;
}

export interface AssignmentSubmission {
  id: number;
  assignmentId: number;
  studentId: number;
  filePath: string;
  fileName: string;
  contentType: string;
  fileSize: number;
  createdAt: string;
  gradePoints?: number;
  overdue?: boolean;
}