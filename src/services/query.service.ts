import api from "./api";
import type { Query } from "../types/query";

export interface CreateQueryRequest {
  studentId: number;
  videoId: number;
  question: string;
}

export async function createQuery(
  data: CreateQueryRequest,
) {
  const response = await api.post<Query>(
    "/Query/AddQuery",
    data,
  );

  return response.data;
}

export async function getQueryById(id: number, videoId?: number) {
  const response = await api.get<Query>(
    `/Query/${id}${videoId ? `?videoId=${videoId}` : ""}`,
  );

  return response.data;
}

export async function getQueriesByVideo(videoId: number): Promise<Query[]> {
  const response = await api.get<Array<Query & { queryId?: number }>>(`/LectureVideos/${videoId}/Queries`);
  return response.data.map((query) => ({ ...query, id: query.id ?? query.queryId ?? 0, replies: query.replies ?? [] }));
}

export async function updateQuery(id: number, question: string, isResolved?: boolean)
{
  const response = await api.put<Query>(
    `/Query/${id}`,
    { question, isResolved },
  );

  return response.data;
}

export async function deleteQuery(id: number) {
  await api.delete(`/Query/${id}`);
}
