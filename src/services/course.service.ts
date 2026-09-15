import api from "./api";
import type { Course } from "../types/course";

export interface CreateCourseRequest {
  courseCode: string;
  courseName: string;
  description?: string;
}

export interface UpdateCourseRequest {
  courseCode: string;
  courseName: string;
  description?: string;
  duration: number;
  fee: number;
}

export async function getAllCourses() {
  const response = await api.get<Course[]>(
    "/Courses/GetCourses",
  );

  return response.data;
}

export async function getCourseById(id: number) {
  const response = await api.get<Course>(
    `/Course/${id}`,
  );

  return response.data;
}

export async function createCourse(
  data: CreateCourseRequest,
) {
  const response = await api.post(
    "/Course/Create",
    data,
  );

  return response.data;
}

export async function updateCourse(
  id: number,
  data: UpdateCourseRequest,
) {
  const response = await api.put(
    `/Course/${id}`,
    data,
  );

  return response.data;
}

export async function deleteCourse(id: number) {
  await api.delete(`/Course/${id}`);
}