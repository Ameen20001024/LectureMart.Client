import api from "./api";
import type {
  Assignment,
  AssignmentSubmission,
} from "../types/assignment";

export interface UploadAssignmentRequest {
  batchId: number;
  title: string;
  description?: string;
  deadLine: string;
  gradePoints: number;
  file: File;
}

export async function uploadAssignment(
  data: UploadAssignmentRequest,
) {
  const formData = new FormData();

  formData.append("BatchId", data.batchId.toString());
  formData.append("Title", data.title);

  if (data.description) {
    formData.append("Description", data.description);
  }

  formData.append("DeadLine", data.deadLine);
  formData.append(
    "GradePoints",
    data.gradePoints.toString(),
  );

  formData.append("File", data.file);

  const response = await api.post<Assignment>(
    "/Assignment/Upload",
    formData,
  );

  return response.data;
}

export async function getAssignmentById(id: number) {
  const response = await api.get<Assignment>(
    `/Assignment/${id}`,
  );

  return response.data;
}

export async function deleteAssignment(id: number) {
  await api.delete(`/Assignment/${id}`);
}

export async function getAllSubmissions(
  assignmentId: number,
) {
  const response = await api.get<AssignmentSubmission[]>(
    `/Assignment/${assignmentId}/Submissions`,
  );

  return response.data;
}