import api from "./api";
import type { Enrollment, StudentDashboard } from "../types/enrollment";

export interface CreateEnrollmentRequest {
  batchId: number;
  name: string;
  dateOfBirth: string;
  gender?: string;
}

export async function createEnrollment(data: CreateEnrollmentRequest): Promise<Enrollment> {
  const response = await api.post<Enrollment>("/Enrollment/Create", data);
  return response.data;
}

export async function getStudentDashboard(): Promise<StudentDashboard> {
  const response = await api.get<StudentDashboard>("/Student/Dashboard");
  return response.data;
}

export async function getStudentEnrollments(studentId?: number): Promise<Enrollment[]> {
  const response = await api.get<Enrollment[]>("/Student/Enrollments", { params: studentId ? { studentId } : undefined });
  return response.data;
}
