export type Role = "Student" | "Mentor" | "Admin";

export interface User {
  userId: string;
  username: string;
  email: string;
  roles: Role[];
  mentorId?: number | null;
  studentId?: number | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: string;
  email: string;
  username: string;
}

export interface RegisterResponse {
  userId: string;
  username: string;
  email: string;
}
