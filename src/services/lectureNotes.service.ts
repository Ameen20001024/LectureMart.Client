import api from "./api";
import type { LectureVideo } from "../types/lecture";

export interface UploadLectureVideoRequest {
  batchId: number;
  title: string;
  description?: string;
  video: File;
}

export async function uploadLectureVideo(
  data: UploadLectureVideoRequest,
) {
  const formData = new FormData();

  formData.append("BatchId", data.batchId.toString());
  formData.append("Title", data.title);

  if (data.description) {
    formData.append("Description", data.description);
  }

  formData.append("Video", data.video);

  const response = await api.post<LectureVideo>(
    "/LectureVideo/Upload",
    formData,
  );

  return response.data;
}

export async function getVideoById(id: number) {
  const response = await api.get<LectureVideo>(
    `/LectureVideo/${id}`,
  );

  return response.data;
}

export async function deleteVideo(id: number) {
  await api.delete(`/LectureVideo/${id}`);
}