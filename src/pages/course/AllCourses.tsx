import { Search, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import FallbackImage from "../../components/common/FallbackImage";
import { formatLiveSchedule } from "../../utils/liveSchedule";
import { getAllCourses, getCourseById } from "../../services/course.service";
import { getStudentDashboard, getStudentEnrollments } from "../../services/enrollment.service";
import type { Course, CourseDetails } from "../../types/course";
import type { Enrollment, StudentDashboard } from "../../types/enrollment";

const date = (value?: string) => value ? new Date(value).toLocaleDateString() : "To be confirmed";

export default function AllCourses() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { user, activeProfile } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selected, setSelected] = useState<CourseDetails | null>(null);
  const [dashboard, setDashboard] = useState<StudentDashboard | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const isStudent = activeProfile === "Student" && user?.roles.includes("Student");

  useEffect(() => { getAllCourses().then(setCourses).catch(() => toast.error("Unable to load courses")).finally(() => setLoading(false)); }, []);
  useEffect(() => { if (isStudent) Promise.all([getStudentDashboard(), getStudentEnrollments()]).then(([a,b]) => { setDashboard(a); setEnrollments(b); }).catch(() => undefined); }, [isStudent]);

  const visible = useMemo(() => {
    const category = params.get("category")?.toLowerCase();
    const term = keyword.trim().toLowerCase();
    return courses.filter(c => (!category || c.category.toLowerCase() === category) && (!term || [c.courseName, c.courseCode, c.description, ...c.mentors].filter(Boolean).join(" ").toLowerCase().includes(term)));
  }, [courses, keyword, params]);

  return <section className="space-y-6">
    {isStudent && dashboard && <StudentSummary dashboard={dashboard} />}
    {isStudent && enrollments.some(x => x.isActive) && <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="text-lg font-bold">My Batches</h2><div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{enrollments.filter(x => x.isActive).map(item => <button key={item.enrollmentId} onClick={() => navigate(`/student/batches/${item.batchId}`)} className="rounded-xl border border-slate-200 p-4 text-left hover:border-blue-300 hover:bg-blue-50"><p className="font-semibold">{item.batchCode}</p><p className="mt-1 text-sm text-slate-500">{item.courseName}</p></button>)}</div></div>}
    <div className={selected ? "grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]" : ""}><div className="space-y-5">
      <div><h1 className="text-2xl font-bold">Explore Courses</h1><p className="mt-1 text-slate-500">Find the course you want to learn.</p></div>
      <div className="relative"><Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Search courses, topics or mentors..." className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-11 pr-4 shadow-sm outline-none focus:border-blue-500" /></div>
      {loading ? <p className="text-slate-500">Loading courses...</p> : <div className={selected ? "grid gap-4 md:grid-cols-2" : "grid gap-5 md:grid-cols-2 xl:grid-cols-3"}>{visible.map(course => <button key={course.courseId} onClick={async () => { try { setSelected(await getCourseById(course.courseId)); } catch { toast.error("Unable to load course details"); } }} className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><FallbackImage src={course.thumbnail} alt={`${course.courseName} course cover`} className="aspect-video w-full bg-slate-100 object-cover" /><div className="p-5"><div className="flex justify-between"><span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{course.category}</span><span className="flex gap-1 text-sm text-amber-600"><Star size={15} fill="currentColor" />{course.rating}</span></div><h2 className="mt-4 text-lg font-bold">{course.courseName}</h2><p className="mt-1 text-xs font-medium text-blue-600">{course.courseCode}</p><p className="mt-3 line-clamp-3 text-sm text-slate-500">{course.description || "Course description unavailable."}</p><div className="mt-4 flex justify-between border-t border-slate-100 pt-4 text-sm text-slate-500"><span>{course.duration} weeks</span><span className="font-semibold text-slate-800">₹{course.fee}</span></div></div></button>)}{!visible.length && <p className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">No courses found.</p>}</div>}
    </div>{selected && <CourseDetail course={selected} close={() => setSelected(null)} enroll={id => navigate(`/course/batch-enrollment?courseId=${selected.courseId}&batchId=${id}`)} />}</div>
  </section>;
}

function StudentSummary({ dashboard }: { dashboard: StudentDashboard }) {
  const data = [["Courses", dashboard.enrolledCourseCount], ["Active batches", dashboard.activeBatchCount], ["Certified", dashboard.completedCertifiedBatchCount], ["Pending work", dashboard.pendingAssignmentCount], ["Overdue", dashboard.overdueAssignmentCount]];
  return <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white"><div className="flex items-center gap-4"><FallbackImage alt={`${dashboard.studentName} profile`} className="h-16 w-16 rounded-full border border-white/30 bg-white/15 object-cover" /><div><p className="text-blue-100">Student dashboard</p><h1 className="mt-1 text-2xl font-bold">Welcome, {dashboard.studentName}</h1><p className="mt-1 text-sm text-blue-100">Onboarded {date(dashboard.onboardingDate)}</p></div></div><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{data.map(([label, value]) => <div key={String(label)} className="rounded-xl bg-white/15 p-3"><p className="text-2xl font-bold">{value}</p><p className="text-xs text-blue-100">{label}</p></div>)}</div></div>;
}

function CourseDetail({ course, close, enroll }: { course: CourseDetails; close: () => void; enroll: (id: number) => void }) {
  return <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:sticky xl:top-24"><div className="flex justify-between"><div><p className="text-sm font-semibold text-blue-600">{course.courseCode}</p><h2 className="text-xl font-bold">{course.courseName}</h2></div><button onClick={close} className="text-slate-400">✕</button></div><FallbackImage src={course.thumbnail} alt={`${course.courseName} course cover`} className="mt-4 aspect-video w-full rounded-xl bg-slate-100 object-cover" /><p className="mt-3 text-sm text-slate-500">{course.description}</p><p className="mt-3 text-sm text-slate-600">Mentors: {course.mentors.join(", ") || "To be assigned"}</p><h3 className="mt-6 font-bold">Open batches</h3><div className="mt-3 space-y-3">{course.openBatches.length ? course.openBatches.map(batch => <div key={batch.batchId} className="rounded-xl border border-slate-200 p-4"><p className="font-semibold">{batch.batchCode}</p><p className="mt-1 text-sm text-slate-500">{batch.mentorName} · Starts {date(batch.startDate)}</p>{formatLiveSchedule(batch.liveClassSchedule) !== "None" && <p className="mt-1 text-xs text-blue-600">Live: {formatLiveSchedule(batch.liveClassSchedule)}{batch.liveClassTime ? ` at ${batch.liveClassTime}` : ""}</p>}<button onClick={() => enroll(batch.batchId)} className="mt-3 w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white">Start onboarding</button></div>) : <p className="text-sm text-slate-500">No batches are open for enrollment.</p>}</div></aside>;
}
