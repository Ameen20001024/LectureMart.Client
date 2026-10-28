import { useEffect, useState } from "react";
import { BookOpen, Layers3, GraduationCap, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllCourses } from "../../services/course.service";
import { getAllBatches } from "../../services/batch.service";
import { getMentors, getStudents } from "../../services/admin.service";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ courses: 0, batches: 0, students: 0, mentors: 0 });
  useEffect(() => { Promise.all([getAllCourses(), getAllBatches(), getStudents(), getMentors()]).then(([courses,batches,students,mentors]) => setCounts({ courses:courses.length,batches:batches.length,students:students.length,mentors:mentors.length })).catch(()=>toast.error("Could not load dashboard totals")); }, []);
  const cards = [{name:"Courses", count:counts.courses, icon:BookOpen, to:"/admin/courses"}, {name:"Batches", count:counts.batches, icon:Layers3, to:"/admin/batches"}, {name:"Students", count:counts.students, icon:GraduationCap, to:"/admin/students"}, {name:"Mentors", count:counts.mentors, icon:UserRound, to:"/admin/mentors"}];
  return <div className="mx-auto max-w-6xl space-y-7"><div><p className="text-sm font-semibold text-blue-600">Admin workspace</p><h1 className="mt-1 text-3xl font-bold">Dashboard</h1><p className="mt-2 text-slate-500">A snapshot of the LectureMart learning catalog.</p></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(({name,count,icon:Icon,to})=>{const body=<div className="rounded-2xl border bg-white p-5"><div className="flex items-center justify-between"><span className="text-sm font-medium text-slate-500">{name}</span><Icon className="text-blue-600" size={20}/></div><p className="mt-4 text-3xl font-bold">{count}</p>{!to&&<p className="mt-1 text-xs text-slate-400">Read-only</p>}</div>; return to?<Link key={name} to={to} className="transition hover:-translate-y-0.5">{body}</Link>:<div key={name}>{body}</div>;})}</div><div className="grid gap-4 md:grid-cols-2"><Link to="/admin/courses" className="rounded-2xl bg-blue-600 p-6 text-white"><BookOpen/><h2 className="mt-4 text-xl font-bold">Manage courses</h2><p className="mt-1 text-blue-100">Edit catalog details and review associated batches.</p></Link><Link to="/admin/batches" className="rounded-2xl border bg-white p-6"><Layers3 className="text-blue-600"/><h2 className="mt-4 text-xl font-bold">Manage batches</h2><p className="mt-1 text-slate-500">Review enrollment, learners, and batch content.</p></Link></div></div>;
}
