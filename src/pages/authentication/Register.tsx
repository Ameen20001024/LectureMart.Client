import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  registerSchema,
  type RegisterFormData,
} from "../../schemas/auth.schema";

import { registerUser } from "../../services/auth.service";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await registerUser(data);

      const user = {
        userId: response.userId,
        username: response.username,
        email: response.email,
        role: [],
      };

      login(response.accessToken, user);

      toast.success("Account created successfully!");

      navigate("/student/dashboard", {
        replace: true,
      });
    } catch {
      toast.error("Unable to create account");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl sm:p-10">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            Create your account
          </h1>

          <p className="mt-2 text-slate-500">
            Start your learning journey with LectureMart.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <FormField
            label="Username"
            type="text"
            error={errors.username?.message}
            {...register("username")}
          />

          <FormField
            label="Email"
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />

          <FormField
            label="Password"
            type="password"
            error={errors.password?.message}
            {...register("password")}
          />

          <FormField
            label="Confirm Password"
            type="password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <button
            disabled={isSubmitting}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {isSubmitting
              ? "Creating account..."
              : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

interface FormFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function FormField({
  label,
  error,
  ...props
}: FormFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}