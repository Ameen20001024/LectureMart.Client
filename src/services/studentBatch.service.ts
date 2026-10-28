import api from "./api";
import type { StudentBatchDetails } from "../types/studentBatch";

export async function getStudentBatchDetails(batchId: number): Promise<StudentBatchDetails> {
  const response = await api.get<StudentBatchDetails>(`/Student/Batches/${batchId}`);
  return response.data;
}
