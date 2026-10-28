import api from "./api";
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from "../types/auth";

export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", data);
  return response.data;
}

export async function registerUser(data: RegisterRequest): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("/auth/register", data);
  return response.data;
}

export async function getCurrentUser(): Promise<User> {
  const response = await api.get<User>("/auth/current-user");
  return response.data;
}

export async function refreshCurrentUserToken(): Promise<void> {
  await api.post("/auth/refresh");
}

export async function logoutUser(): Promise<void> {
  await api.post("/auth/logout");
}
