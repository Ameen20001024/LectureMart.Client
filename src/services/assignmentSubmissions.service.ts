import api from "./api";
import type { AssignmentSubmission } from "../types/assignment";

export async function uploadSubmission(
  assignmentId: number,
  file: File,
) {
  const formData = new FormData();

  formData.append(
    "AssignmentId",
    assignmentId.toString(),
  );

  formData.append("File", file);

  const response = await api.post<AssignmentSubmission>(
    "/AssignmentSubmission/Upload",
    formData,
  );

  return response.data;
}

export async function getSubmissionById(id: number) {
  const response =
    await api.get<AssignmentSubmission>(
      `/AssignmentSubmission/${id}`,
    );

  return response.data;
}

export async function deleteSubmission(id: number) {
  await api.delete(
    `/AssignmentSubmission/${id}`,
  );
}

export async function gradeSubmission(
  id: number,
  gradePoints: number,
) {
  const response =
    await api.put<AssignmentSubmission>(
      `/AssignmentSubmission/${id}/Grade`,
      { gradePoints },
    );

  return response.data;
}