export interface Enrollment {
  id: number;
  studentId: number;
  batchId: number;
  enrollmentDate: string;
  isCertified: boolean;
  isActive: boolean;
}