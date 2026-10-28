import api from "./api";

export interface AdminMentor { mentorId: number; name?: string; username?: string; email?: string }
export interface AdminStudent { studentId: number; name?: string; username?: string; email?: string; registrationDate: string }
export interface BatchQuery { id: number; videoId: number; videoTitle: string; studentId: number; studentName: string; question: string; createdAt: string; isResolved: boolean }
export async function getMentors(): Promise<AdminMentor[]> { return (await api.get("/Mentor/GetAllMentors")).data; }
export async function getMentorWorkspace(mentorId: number) { return (await api.get(`/Mentor/${mentorId}`)).data as { batches: { id: number; batchCode: string; courseCode: string; startTime: string; endTime?: string }[] }; }
export async function onboardMentor(data: { email: string; name: string; gender: string; dateOfBirth: string; fixedSalary: number; onboardingDate: string }) { return (await api.post("/Mentor/Onboarding", data)).data; }
export async function updateMentor(mentorId: number, data: { name: string; gender: string; dateOfBirth: string; username: string; email: string; fixedSalary: number }) { return (await api.put(`/Mentor/UpdateMentor/${mentorId}`, { mentorId, ...data })).data; }
export async function getStudents(): Promise<AdminStudent[]> { return (await api.get("/Students/GetAllStudensts")).data; }
export async function getStudent(studentId: number): Promise<AdminStudent & { gender?: string; dateOfBirth: string }> { return (await api.get(`/Student/${studentId}`)).data; }
export async function updateStudent(studentId: number, data: { name?: string; gender?: string; dateOfBirth: string; username?: string }): Promise<void> { await api.put(`/Student/Update/${studentId}`, { studentId, ...data }); }
export async function getBatchQueries(batchId: number): Promise<BatchQuery[]> { const queries = (await api.get<Array<BatchQuery & { queryId?: number }>>(`/Batch/${batchId}/Queries`)).data; return queries.map(query => ({ ...query, id: query.id ?? query.queryId ?? 0 })); }
export async function getQuery(id: number): Promise<{ id: number; studentName: string; question: string; createdAt: string; isResolved: boolean; replies: { id: number; reply: string; createdAt: string; mentorName?: string }[] }> { return (await api.get(`/Query/${id}`)).data; }
export async function setArchived(kind: "Assignments" | "LectureVideo" | "LectureNote", id: number, archived: boolean): Promise<void> { await api.put(`/${kind}/${id}/${archived ? "archive" : "restore"}`); }
export async function uploadAdminContent(kind: "video" | "note" | "assignment", fields: Record<string, string | number | File>): Promise<void> {
  const body = new FormData();
  Object.entries(fields).forEach(([key, value]) => body.append(key, value instanceof File ? value : String(value)));
  const endpoint = kind === "video" ? "/LectureVideo/Upload" : kind === "note" ? "/LectureNotes/UploadNotes" : "/Assignments/UploadAssignment";
  await api.post(endpoint, body, { headers: { "Content-Type": "multipart/form-data" } });
}
