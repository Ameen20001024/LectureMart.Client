import { LogOut, Menu, UserCircle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">

        <div className="flex items-center gap-3">
          <button className="rounded-lg p-2 hover:bg-slate-100 lg:hidden">
            <Menu size={20} />
          </button>

          <span className="text-xl font-bold text-blue-600">
            LectureMart
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold">
              {user?.username}
            </p>

            <p className="text-xs text-slate-500">
              {user?.role}
            </p>
          </div>

          <button
            onClick={() => navigate("/profile")}
            className="rounded-full p-2 hover:bg-slate-100"
          >
            <UserCircle />
          </button>

          <button
            onClick={handleLogout}
            className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}