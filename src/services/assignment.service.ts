import api from "./api";
import type {
  Assignment,
  AssignmentSubmission,
} from "../types/assignment";

export interface UploadAssignmentRequest {
  batchId: number;
  mentorId: number;
  title: string;
  description?: string;
  dueDate: string;
  gradePoints: number;
  file: File;
}

export async function uploadAssignment(
  data: UploadAssignmentRequest,
) {
  const formData = new FormData();

  formData.append("BatchId", data.batchId.toString());
  formData.append("MentorId", data.mentorId.toString());
  formData.append("Title", data.title);

  if (data.description) {
    formData.append("Description", data.description);
  }

  formData.append("DueDate", data.dueDate);
  formData.append(
    "GradePoints",
    data.gradePoints.toString(),
  );

  formData.append("File", data.file);

  const response = await api.post<Assignment>(
    "/Assignments/UploadAssignment",
    formData,
  );

  return response.data;
}

export async function getAssignmentById(id: number) {
  const response = await api.get<Assignment>(
    `/assignments/${id}`,
  );

  return response.data;
}

export function getAssignmentFileUrl(id: number) {
  return `${import.meta.env.VITE_API_BASE_URL}/Assignments/${id}/file`;
}

export async function deleteAssignment(id: number) {
  await api.delete(`/Assignment/${id}`);
}

export async function getAllSubmissions(
  assignmentId: number,
) {
  const response = await api.get<AssignmentSubmission[]>(
    `/Assignment/${assignmentId}/AllSubmissions`,
  );

  return response.data;
}

export async function gradeSubmission(submissionId: number, gradePoint: number, isComplete: boolean) {
  return (await api.put(`/AssignmentSubmissions/${submissionId}/Grade`, {
    id: submissionId,
    gradePoint,
    isComplete,
  })).data;
}
