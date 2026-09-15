import api from "./api";
import type { Batch } from "../types/batch";
import type { Enrollment } from "../types/enrollment";

export interface CreateBatchRequest {
  batchCode: string;
  courseId: number;
  mentorId: number;
  startDate: string;
  endDate?: string;
}

export async function getAllBatches() {
  const response = await api.get<Batch[]>(
    "/batch/GetAllBatches",
  );

  return response.data;
}

export async function getBatchById(id: number) {
  const response = await api.get<Batch>(
    `/batch/GetBatch/${id}`,
  );

  return response.data;
}

export async function createBatch(
  data: CreateBatchRequest,
) {
  const response = await api.post(
    "/batch/CreateBatch",
    data,
  );

  return response.data;
}

export async function updateBatch(
  id: number,
  data: CreateBatchRequest,
) {
  const response = await api.put(
    `/batch/UpdateBatch/${id}`,
    data,
  );

  return response.data;
}

export async function deleteBatch(id: number) {
  await api.delete(`/batch/DeleteBatch/${id}`);
}

export async function getBatchEnrollments(id: number) {
  const response = await api.get<Enrollment[]>(
    `/batch/${id}/Enrollments`,
  );

  return response.data;
}