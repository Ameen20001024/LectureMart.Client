import api from "./api";
import type { Enrollment } from "../types/enrollment";

export interface CreateEnrollmentRequest {
  studentId: number;
  batchId: number;
}

export async function createEnrollment(
  data: CreateEnrollmentRequest,
) {
  const response = await api.post<Enrollment>(
    "/Enrollment/Create",
    data,
  );

  return response.data;
}

export async function getEnrollmentById(id: number) {
  const response = await api.get<Enrollment>(
    `/Enrollment/${id}`,
  );

  return response.data;
}

export async function cancelEnrollment(id: number) {
  await api.delete(`/Enrollment/${id}`);
}