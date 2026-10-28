import { BookOpen, Grid2X2, Layers3, LayoutDashboard } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllCourses } from "../../services/course.service";
import { useAuth } from "../../hooks/useAuth";

export default function Sidebar() {
  const { activeProfile } = useAuth();
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => { getAllCourses().then(courses => setCategories([...new Set(courses.map(course => course.category))].sort())).catch(() => undefined); }, []);
  const links = useMemo(() => activeProfile === "Mentor" ? [{ label: "My batches", to: "/mentor/batches", icon: Layers3 }] : activeProfile === "Admin" ? [
    { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Courses", to: "/admin/courses", icon: BookOpen },
    { label: "Batches", to: "/admin/batches", icon: Layers3 },
    { label: "Students", to: "/admin/students", icon: Grid2X2 },
    { label: "Mentors", to: "/admin/mentors", icon: Grid2X2 },
  ] : [{ label: "All courses", to: "/courses", icon: Grid2X2 }, ...categories.map(category => ({ label: category, to: `/courses?category=${encodeURIComponent(category)}`, icon: BookOpen }))], [activeProfile, categories]);
  return <aside className="hidden min-h-[calc(100vh-4rem)] w-64 border-r border-slate-200 bg-white p-4 lg:block"><p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">{activeProfile === "Admin" ? "Admin workspace" : "Browse courses"}</p><nav className="space-y-1">{links.map(link => <NavLink key={link.to} to={link.to} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${isActive ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"}`}><link.icon size={18} />{link.label}</NavLink>)}</nav></aside>;
}
