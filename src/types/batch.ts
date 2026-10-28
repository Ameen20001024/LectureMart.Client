export interface Batch {
  batchId: number;
  id?: number;
  batchCode: string;
  courseId: number;
  courseCode: string;
  courseName: string;
  mentorName?: string;
  startDate: string;
  endDate?: string;
  isCompleted: boolean;
  isOpenForEnrollment: boolean;
  liveClassSchedule: number;
  liveClassTime?: string;
  videos?: BatchVideo[];
  assignments?: BatchAssignment[];
  lectureNotes?: BatchNote[];
}

export interface BatchVideo { id: number; title: string; description?: string; duration?: string; rating?: number; createdAt: string; isArchived: boolean }
export interface BatchAssignment { id: number; title: string; description?: string; deadLine?: string; createdAt: string; gradePoints: number; isArchived: boolean }
export interface BatchNote { noteId: number; title: string; description?: string; createdAt: string; isArchived: boolean }

export interface BatchWriteRequest {
  batchCode: string;
  courseId: number;
  mentorId?: number;
  startDate: string;
  endDate: string;
  isCompleted?: boolean;
  isOpenForEnrollment: boolean;
  liveClassSchedule: number;
  liveClassTime?: string | null;
}
