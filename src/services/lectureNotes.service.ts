import api from "./api";

export interface UploadLectureNoteRequest {
  batchId: number;
  mentorId: number;
  title: string;
  description?: string;
  file: File;
}

export async function uploadLectureNote(data: UploadLectureNoteRequest) {
  const formData = new FormData();
  formData.append("BatchId", data.batchId.toString());
  formData.append("MentorId", data.mentorId.toString());
  formData.append("Title", data.title);
  if (data.description) {
    formData.append("Description", data.description);
  }
  formData.append("File", data.file);
  const response = await api.post("/LectureNotes/UploadNotes", formData);
  return response.data;
}

export function getLectureNoteFileUrl(noteId: number) {
  return `${import.meta.env.VITE_API_BASE_URL}/LectureNote/${noteId}/file`;
}
