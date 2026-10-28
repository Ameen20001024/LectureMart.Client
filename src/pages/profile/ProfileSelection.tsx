import { GraduationCap, Shield, UserRound } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { Role } from "../../types/auth";

const profileHome: Record<Role, string> = {
  Student: "/courses",
  Mentor: "/mentor/batches",
  Admin: "/admin/dashboard",
};

export default function ProfileSelection() {
  const { user, switchProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const roles = user?.roles ?? [];
  if (!user || !user.roles.includes("Student") || user.roles.length < 2) {
    const destination = user?.roles.includes("Admin") ? "/admin/dashboard" : user?.roles.includes("Mentor") ? "/mentor/batches" : "/courses";
    return <Navigate to={destination} replace />;
  }
  const choose = (role: Role) => {
    switchProfile(role);
    const from = location.state?.from as string | undefined;
    const compatible = role === "Admin" ? from?.startsWith("/admin") : role === "Student" ? from?.startsWith("/student") || from === "/courses" || from?.startsWith("/course/") : from?.startsWith("/mentor");
    navigate(compatible ? from! : profileHome[role], { replace: true });
  };

  return <div className="mx-auto max-w-3xl"><div className="rounded-3xl bg-white p-8 shadow-sm"><p className="text-sm font-semibold text-blue-600">LectureMart profiles</p><h1 className="mt-2 text-3xl font-bold">Choose how you want to continue</h1><p className="mt-2 text-slate-500">You can switch profiles later from the top navigation.</p><div className="mt-8 grid gap-4 md:grid-cols-2">{roles.map(role => <button key={role} onClick={() => choose(role)} className="rounded-2xl border border-slate-200 p-6 text-left transition hover:border-blue-400 hover:bg-blue-50"><ProfileIcon role={role} /><h2 className="mt-4 text-xl font-bold">{role}</h2><p className="mt-2 text-sm text-slate-500">{roleDescription(role)}</p></button>)}</div></div></div>;
}
function ProfileIcon({ role }: { role: Role }) { const Icon = role === "Student" ? GraduationCap : role === "Admin" ? Shield : UserRound; return <Icon className="text-blue-600" size={28} />; }

function roleDescription(role: Role) {
  if (role === "Student") return "Browse courses, manage enrolled batches, and submit work.";
  if (role === "Admin") return "Manage courses, batches, enrollment, and learning materials.";
  return "Open the available mentor workspace.";
}
