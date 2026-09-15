import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getRolesFromToken } from "../../utils/jwt";
import { loginSchema, type LoginFormData } from "../../schemas/auth.schema";
import { loginUser } from "../../services/auth.service";
import { useAuth } from "../../hooks/useAuth";
import type { Role } from "../../types/auth";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
  try {
    const response = await loginUser(data);

    const roles = getRolesFromToken(response.accessToken);

    const user = {
      userId: response.userId,
      username: response.username,
      email: response.email,
      role: roles,
    };

    login(response.accessToken, user);

    toast.success("Welcome back!");

    const from =
      location.state?.from?.pathname ||
      getDashboardPath(roles);

    navigate(from, { replace: true });
  } catch {
    toast.error("Invalid email or password");
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">

        <div className="hidden bg-blue-600 p-12 text-white md:flex md:flex-col md:justify-between">
          <div>
            <div className="mb-8 text-3xl font-bold">
              LectureMart
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Learn.
              <br />
              Practice.
              <br />
              Grow.
            </h1>

            <p className="mt-6 max-w-sm text-blue-100">
              Your complete learning platform for courses,
              lectures, assignments and live classes.
            </p>
          </div>

          <p className="text-sm text-blue-200">
            Learn from anywhere, anytime.
          </p>
        </div>

        <div className="p-8 sm:p-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">
              Welcome back
            </h2>

            <p className="mt-2 text-slate-500">
              Sign in to continue learning.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Forgot password?
              </Link>
            </div>

            <button
              disabled={isSubmitting}
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function getDashboardPath(role: Role[]): string {
  if (role.includes("Admin")) {
    return "/admin/dashboard";
  }

  if (role.includes("Mentor")) {
    return "/mentor/dashboard";
  }

  return "/student/dashboard";
}