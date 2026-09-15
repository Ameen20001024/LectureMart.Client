import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  Home,
  MessageCircle,
  Users,
  Video,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Sidebar() {
  const { user } = useAuth();

  const links =
    user?.role.includes("Admin")
      ? adminLinks
      : user?.role.includes("Mentor")
        ? mentorLinks
        : user?.role.includes("Student")
        ?studentLinks
        : generalLinks;

  return (
    <aside className="hidden min-h-[calc(100vh-4rem)] w-64 border-r border-slate-200 bg-white p-4 lg:block">
      <nav className="space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`
            }
          >
            <link.icon size={19} />
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

const studentLinks = [
  {
    to: "/student/dashboard",
    label: "Dashboard",
    icon: Home,
  },
  {
    to: "/student/courses",
    label: "My Courses",
    icon: BookOpen,
  },
  {
    to: "/student/assignments",
    label: "Assignments",
    icon: ClipboardList,
  },
  {
    to: "/student/questions",
    label: "Q&A",
    icon: MessageCircle,
  },
  {
    to: "/student/live-classes",
    label: "Live Classes",
    icon: Video,
  },
];

const mentorLinks = [
  {
    to: "/mentor/dashboard",
    label: "Dashboard",
    icon: Home,
  },
  {
    to: "/mentor/courses",
    label: "Courses",
    icon: BookOpen,
  },
  {
    to: "/mentor/students",
    label: "Students",
    icon: Users,
  },
  {
    to: "/mentor/assignments",
    label: "Assignments",
    icon: ClipboardList,
  },
  {
    to: "/mentor/questions",
    label: "Q&A",
    icon: MessageCircle,
  },
];

const adminLinks = [
  {
    to: "/admin/dashboard",
    label: "Dashboard",
    icon: Home,
  },
  {
    to: "/admin/users",
    label: "Users",
    icon: Users,
  },
  {
    to: "/admin/courses",
    label: "Courses",
    icon: BookOpen,
  },
  {
    to: "/admin/batches",
    label: "Batches",
    icon: GraduationCap,
  },
];

const generalLinks = [
  {
    to: "/course/AllCourses",
    label: "Browse Courses",
    icon: GraduationCap,
  },
];