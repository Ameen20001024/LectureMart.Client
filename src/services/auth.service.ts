import api from "./api";
import type {
  LoginResponse,
  LoginRequest,
  RegisterRequest,
  RegisterResponse
} from "../types/auth";

export async function loginUser(
  data: LoginRequest,
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    data,
  );

  return response.data;
}

export async function registerUser(
  data: RegisterRequest,
): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>(
    "/auth/register",
    data,
  );

  return response.data;
}