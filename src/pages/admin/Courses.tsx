import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Plus,
  Search,
  Trash2,
  Pencil,
} from "lucide-react";

import {
  deleteCourse,
  getAllCourses,
} from "../../services/course.service";

import type { Course } from "../../types/course";

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadCourses() {
    try {
      setLoading(true);

      const data = await getAllCourses();
      setCourses(data);
    } catch {
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    const value = keyword
      .trim()
      .toLowerCase();

    if (!value) {
      return courses;
    }

    return courses.filter(
      (course) =>
        course.courseName
          .toLowerCase()
          .includes(value) ||
        course.courseCode
          .toLowerCase()
          .includes(value) ||
        course.description
          ?.toLowerCase()
          .includes(value),
    );
  }, [courses, keyword]);

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Delete this course?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteCourse(id);

      setCourses((current) =>
        current.filter(
          (course) => course.id !== id,
        ),
      );

      toast.success("Course deleted");
    } catch {
      toast.error("Failed to delete course");
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        Loading courses...
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Courses
          </h1>

          <p className="text-slate-500">
            Manage LectureMart courses.
          </p>
        </div>

        <Link
          to="/admin/courses/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Course
        </Link>
      </div>

      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={keyword}
          onChange={(event) =>
            setKeyword(event.target.value)
          }
          placeholder="Search courses..."
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold uppercase text-blue-600">
                  {course.courseCode}
                </span>

                <h2 className="mt-1 text-lg font-semibold">
                  {course.courseName}
                </h2>
              </div>

              <span className="rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700">
                ★ {course.rating}
              </span>
            </div>

            <p className="line-clamp-3 text-sm text-slate-500">
              {course.description ||
                "No description available."}
            </p>

            <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
              <span>
                {course.duration} months
              </span>

              <span>
                ₹{course.fee}
              </span>
            </div>

            <div className="mt-5 flex gap-2">
              <Link
                to={`/admin/courses/edit/${course.id}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-sm font-medium hover:bg-slate-50"
              >
                <Pencil size={16} />
                Edit
              </Link>

              <button
                onClick={() =>
                  handleDelete(course.id)
                }
                className="rounded-lg border border-red-200 px-3 text-red-600 hover:bg-red-50"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
          No courses found.
        </div>
      )}
    </div>
  );
}