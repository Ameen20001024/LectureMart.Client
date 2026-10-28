export interface StudentBatchDetails {
  studentId: number;
  batchId: number;
  batchCode: string;
  courseId: number;
  courseCode: string;
  courseName: string;
  mentorName: string;
  mentorRating: number;
  startDate: string;
  endDate?: string;
  isCompleted: boolean;
  liveClassSchedule: number | string;
  liveClassTime?: string;
  progress: { lectureVideoCount: number; lectureNoteCount: number; assignmentCount: number };
  videos: StudentVideo[];
  assignments: StudentAssignment[];
  lectureNotes: StudentNote[];
}

export interface StudentVideo { videoId: number; title: string; description?: string; duration: string; rating: number; createdAt: string; }
export interface StudentNote { noteId: number; title: string; description?: string; createdAt: string; }
export interface StudentAssignment {
  assignmentId: number; title: string; description?: string; deadline: string; postedAt: string; gradePoints: number;
  submissionId?: number; submittedAt?: string; isOverdue?: boolean; gradeReceived?: number; isGraded?: boolean; submissionStatus: string;
}
