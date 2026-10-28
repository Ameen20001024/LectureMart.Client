import { LogOut, Repeat2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import FallbackImage from "../common/FallbackImage";

const homeByProfile = {
  Student: "/courses",
  Mentor: "/mentor/batches",
  Admin: "/admin/dashboard",
} as const;

export default function Navbar() {
  const { user, activeProfile, logout } = useAuth();
  const navigate = useNavigate();
  const canSwitch = Boolean(user?.roles.includes("Student") && user.roles.length > 1);
  const home = activeProfile ? homeByProfile[activeProfile] : "/courses";
  return <header className="sticky top-0 z-40 border-b border-slate-200 bg-white"><div className="flex h-16 items-center justify-between px-4 md:px-8"><button onClick={() => navigate(home)} className="text-xl font-bold text-blue-600">LectureMart</button><div className="flex items-center gap-3"><div className="hidden text-right sm:block"><p className="text-sm font-semibold">{user?.username}</p><p className="text-xs text-slate-500">{user?.roles.join(", ")}</p></div>{canSwitch && <button onClick={() => navigate("/profiles")} title="Switch profile" className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"><Repeat2 size={19} /></button>}<button onClick={() => canSwitch ? navigate("/profiles") : navigate(home)} aria-label={canSwitch ? "Open profiles" : "Go to dashboard"} className="h-10 w-10 overflow-hidden rounded-full border border-slate-200 bg-slate-100"><FallbackImage alt="Profile" className="h-full w-full object-cover" /></button><button onClick={async () => { await logout(); navigate("/login", { replace: true }); }} className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"><LogOut size={20} /></button></div></div></header>;
}
