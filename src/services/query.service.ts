import api from "./api";
import type { Query } from "../types/query";

export interface CreateQueryRequest {
  videoId: number;
  question: string;
}

export async function createQuery(
  data: CreateQueryRequest,
) {
  const response = await api.post<Query>(
    "/Query/Create",
    data,
  );

  return response.data;
}

export async function getQueryById(id: number) {
  const response = await api.get<Query>(
    `/Query/${id}`,
  );

  return response.data;
}

export async function updateQuery(id: number, question: string,) 
{
  const response = await api.put<Query>(
    `/Query/${id}`,
    { question },
  );

  return response.data;
}

export async function deleteQuery(id: number) {
  await api.delete(`/Query/${id}`);
}