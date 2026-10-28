import api from "./api";
import type { Batch, BatchWriteRequest } from "../types/batch";
import type { Enrollment } from "../types/enrollment";

export async function getAllBatches(): Promise<Batch[]> {
  const response = await api.get<Omit<Batch, "id">[]>("/Batch/GetAll");
  return response.data.map(batch => ({ ...batch, id: batch.batchId }));
}

export async function getBatchById(id: number): Promise<Batch> {
  const response = await api.get<Omit<Batch, "id">>(`/Batch/${id}`);
  return { ...response.data, id: response.data.batchId };
}

export async function createBatch(data: BatchWriteRequest): Promise<void> {
  await api.post("/batch/CreateBatch", data);
}

export async function updateBatch(id: number, data: Partial<BatchWriteRequest>): Promise<void> {
  await api.put(`/Batch/Update/${id}`, { batchId: id, ...data });
}

export async function deleteBatch(id: number): Promise<void> {
  await api.delete(`/Batch/Delete/${id}`);
}

export async function getBatchEnrollments(id: number) {
  const response = await api.get<Enrollment[]>(
    `/Batch/${id}/Enrollments`,
  );

  return response.data;
}
