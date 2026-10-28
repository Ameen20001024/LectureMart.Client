import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Mail, UserRound } from "lucide-react";
import { toast } from "react-toastify";
import FallbackImage from "../../components/common/FallbackImage";
import { getStudent } from "../../services/admin.service";
import type { AdminStudent } from "../../services/admin.service";

export default function MentorStudentDetails() {
  const { batchId, studentId } = useParams();
  const [student, setStudent] = useState<(AdminStudent & { gender?: string; dateOfBirth: string }) | null>(null);
  useEffect(() => { if (studentId) getStudent(Number(studentId)).then(setStudent).catch(() => toast.error("Unable to load this student profile.")); }, [studentId]);
  if (!student) return <p className="text-slate-500">Loading student profile…</p>;
  return <section className="mx-auto max-w-3xl space-y-5"><Link to={`/mentor/batches/${batchId}/students`} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"><ArrowLeft size={16}/>Back to students</Link><article className="rounded-2xl border bg-white p-6"><div className="flex items-center gap-4"><FallbackImage alt="Student profile" className="h-20 w-20 rounded-full object-cover"/><div><h1 className="text-2xl font-bold">{student.name || "Student"}</h1><p className="mt-1 text-slate-500">@{student.username || "—"}</p></div></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><p className="flex items-center gap-2 text-sm text-slate-600"><Mail size={16} className="text-blue-600"/>{student.email || "No email available"}</p><p className="flex items-center gap-2 text-sm text-slate-600"><UserRound size={16} className="text-blue-600"/>{student.gender || "Gender not specified"}</p><p className="text-sm text-slate-600">Date of birth: {student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : "—"}</p><p className="text-sm text-slate-600">Registered: {new Date(student.registrationDate).toLocaleDateString()}</p></div></article></section>;
}
