

export interface Student {
  id: number;
  Name: string;
  email: string;
  phoneNumber?: string;
  gender?: string;
  dateOfBirth?: string;
  Username?: string;
  RegistrationDate?: string;
}

export interface StudentEnrollments {
    BatchId: number;
    CourseName: string;
    CourseCode: string;
    BatchCode: string;
    EnrollmentDate: string;
    IsActive: boolean;
    IsCertified: boolean;
}