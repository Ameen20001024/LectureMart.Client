import api from "./api";
import type { Course, CourseDetails } from "../types/course";

export async function getAllCourses(): Promise<Course[]> {
  const response = await api.get<Omit<Course, "id">[]>("/Courses/GetCourses");
  return response.data.map(course => ({ ...course, id: course.courseId }));
}

export async function getCourseById(id: number): Promise<CourseDetails> {
  const response = await api.get<Omit<CourseDetails, "id">>(`/Course/${id}`);
  return { ...response.data, id: response.data.courseId };
}

export async function deleteCourse(id: number): Promise<void> {
  await api.delete(`/Course/Delete/${id}`);
}

export interface CourseWriteRequest { courseCode: string; courseName: string; description?: string; category: string; duration: number; fee: number }
export async function createCourse(data: CourseWriteRequest): Promise<void> { await api.post("/Course/Create", data); }
export async function updateCourse(id: number, data: Partial<CourseWriteRequest>): Promise<void> { await api.put(`/Course/Update/${id}`, data); }
