import api from "./api";
import type { AssignmentSubmission } from "../types/assignment";
import { isAllowedDocument } from "../utils/uploadValidation";

export async function uploadSubmission(assignmentId: number, studentId: number, file: File): Promise<AssignmentSubmission> {
  if (!(await isAllowedDocument(file, "submission"))) throw new Error("Upload a valid PDF, DOC, DOCX, or ZIP file (maximum 25 MB).");
  const formData = new FormData();
  formData.append("AssignmentId", assignmentId.toString());
  formData.append("StudentId", studentId.toString());
  formData.append("File", file);
  const response = await api.post<AssignmentSubmission>("/AssignmentSubmissions/Upload", formData);
  return response.data;
}

export async function deleteSubmission(submissionId: number): Promise<void> {
  await api.delete(`/AssignmentSubmission/Delete/${submissionId}`);
}
