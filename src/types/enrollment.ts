export interface Enrollment {
  enrollmentId: number;
  studentId: number;
  studentName?: string;
  batchId: number;
  enrollmentDate: string;
  isCertified: boolean;
  isActive: boolean;
  courseId?: number;
  courseName?: string;
  batchCode?: string;
}

export interface StudentDashboard {
  studentName: string;
  onboardingDate: string;
  enrolledCourseCount: number;
  activeBatchCount: number;
  completedCertifiedBatchCount: number;
  pendingAssignmentCount: number;
  overdueAssignmentCount: number;
}
