import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getBatchEnrollments } from "../../services/batch.service";
import type { Enrollment } from "../../types/enrollment";
import FallbackImage from "../../components/common/FallbackImage";
import { Link } from "react-router-dom";

export default function MentorStudents() { const { batchId } = useParams(); const [students, setStudents] = useState<Enrollment[]>([]); useEffect(() => { if (batchId) getBatchEnrollments(Number(batchId)).then(setStudents).catch(() => toast.error("Unable to load students.")); }, [batchId]); return <section className="space-y-5"><h1 className="text-2xl font-bold">Students</h1><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{students.map(student => <Link key={student.enrollmentId} to={`/mentor/batches/${batchId}/students/${student.studentId}`} className="flex items-center gap-3 rounded-xl border bg-white p-4 hover:border-blue-300"><FallbackImage alt="Student profile" className="h-12 w-12 rounded-full object-cover"/><div><b>{student.studentName || "Student"}</b><p className="text-sm text-slate-500">{student.isCertified ? "Certified" : student.isActive ? "Active" : "Inactive"}</p></div></Link>)}</div>{!students.length&&<p className="rounded-xl border border-dashed p-6 text-slate-500">No students are enrolled in this batch.</p>}</section>; }
