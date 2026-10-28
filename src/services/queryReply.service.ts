import api from "./api";
import type { QueryReply } from "../types/query";

export async function createQueryReply(
  queryId: number,
  mentorId: number,
  reply: string,
) {
  const response = await api.post<QueryReply>(
    "/QueryReply/Reply",
    {
      queryId,
      mentorId,
      reply,
    },
  );

  return response.data;
}

export async function getQueryReplyById(id: number) {
  const response = await api.get<QueryReply>(
    `/QueryReply/${id}`,
  );

  return response.data;
}

export async function updateQueryReply(
  id: number,
  reply: string,
) {
  const response = await api.put<QueryReply>(
    `/QueryReply/${id}`,
    { reply },
  );

  return response.data;
}

export async function deleteQueryReply(id: number) {
  await api.delete(`/QueryReply/${id}`);
}
