export interface Course {
  id: number;
  courseId: number;
  courseName: string;
  courseCode: string;
  description?: string;
  category: string;
  duration: number;
  fee: number;
  rating: number;
  mentors: string[];
  thumbnail?: string;
}

export interface CourseBatch {
  batchId: number;
  batchCode: string;
  mentorName: string;
  mentorRating: number;
  startDate: string;
  endDate?: string;
  isOpenForEnrollment: boolean;
  liveClassSchedule: number | string;
  liveClassTime?: string;
}

export interface CourseDetails extends Course {
  openBatches: CourseBatch[];
}
