import { CalendarDays, CreditCard, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCourseById } from "../../services/course.service";
import { createEnrollment } from "../../services/enrollment.service";
import { refreshCurrentUserToken } from "../../services/auth.service";
import type { CourseBatch, CourseDetails } from "../../types/course";
import FallbackImage from "../../components/common/FallbackImage";
import { useAuth } from "../../hooks/useAuth";
import { formatLiveSchedule } from "../../utils/liveSchedule";

export default function BatchEnrollment() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user, refreshUser, switchProfile } = useAuth();
  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [batch, setBatch] = useState<CourseBatch | null>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const courseId = Number(params.get("courseId"));
  const batchId = Number(params.get("batchId"));

  useEffect(() => { if (courseId && batchId) getCourseById(courseId).then(data => { setCourse(data); setBatch(data.openBatches.find(x => x.batchId === batchId) ?? null); }).catch(() => toast.error("Unable to load enrollment details")); }, [courseId, batchId]);
  if (!course || !batch) return <p className="text-slate-500">Loading enrollment details...</p>;

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    try {
      const enrollment = await createEnrollment({ batchId, name: String(form.get("name") ?? ""), dateOfBirth: String(form.get("dateOfBirth") ?? ""), gender: String(form.get("gender") || "") });
      await refreshCurrentUserToken();
      await refreshUser();
      if (user?.roles.includes("Student")) switchProfile("Student");
      toast.success("Enrollment successful. Welcome to your batch!");
      navigate(`/student/batches/${enrollment.batchId}`, { replace: true });
    } catch {
      toast.error("Unable to complete enrollment. Please check your details.");
    } finally { setSubmitting(false); }
  };

  return <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]"><section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><FallbackImage src={course.thumbnail} alt={`${course.courseName} course cover`} className="mb-5 aspect-video w-full rounded-xl bg-slate-100 object-cover" /><p className="text-sm font-semibold text-blue-600">{course.courseCode}</p><h1 className="mt-1 text-2xl font-bold">{course.courseName}</h1><p className="mt-3 text-sm text-slate-600">{course.description}</p><p className="mt-2 text-sm text-slate-500">{course.duration} weeks · {course.fee.toLocaleString()} fee</p><div className="mt-6 rounded-xl bg-slate-50 p-4"><h2 className="font-bold">{batch.batchCode}</h2><p className="mt-1 text-sm text-slate-600">Mentor: {batch.mentorName} · Rating {batch.mentorRating}</p><p className="mt-2 flex items-center gap-2 text-sm text-slate-500"><CalendarDays size={16} /> {new Date(batch.startDate).toLocaleDateString()} — {batch.endDate ? new Date(batch.endDate).toLocaleDateString() : "To be confirmed"}</p><p className="mt-2 text-sm text-slate-500">Live classes: {formatLiveSchedule(batch.liveClassSchedule)}{batch.liveClassTime ? ` at ${batch.liveClassTime}` : ""}</p></div><form onSubmit={submit} className="mt-6 space-y-4"><h2 className="text-lg font-bold">Student onboarding</h2>{user?.studentId ? <><p className="text-sm text-slate-500">Your student profile is already set up. No additional profile details are needed.</p><input type="hidden" name="name" value={user.username}/><input type="hidden" name="dateOfBirth" value="2000-01-01"/><input type="hidden" name="gender" value=""/></> : <><input required name="name" placeholder="Your full name" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500" /><input required name="dateOfBirth" type="date" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500" /><select name="gender" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"><option value="">Gender (optional)</option><option>Female</option><option>Male</option><option>Prefer not to say</option></select></>}<div className="flex flex-wrap gap-3"><button type="button" onClick={() => setPaymentOpen(true)} className="rounded-xl border border-blue-200 px-4 py-3 font-semibold text-blue-600">Proceed with Payment</button><button disabled={submitting} className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-60">{submitting ? "Enrolling..." : "Complete Enrollment"}</button></div></form></section>{paymentOpen && <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center gap-2 text-blue-600"><CreditCard size={20} /><h2 className="font-bold">Payment methods</h2></div><p className="mt-3 text-sm text-slate-500">Payment options will appear here when payment integration is available.</p><button onClick={() => setPaymentOpen(false)} className="mt-5 text-sm font-semibold text-blue-600">Close panel</button></aside>}<aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><UserRound className="text-blue-600" /><h2 className="mt-3 font-bold">What happens next?</h2><p className="mt-2 text-sm text-slate-500">Your enrollment is created immediately. You will then be taken to your batch, lectures, notes, and assignments.</p></aside></div>;
}
