import { BookOpen, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import type { Course } from "../../types/course";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({
  course,
}: CourseCardProps) {
  return (
    <Link
      to={`/courses/${course.id}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="aspect-video bg-slate-200">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            <BookOpen size={42} />
          </div>
        )}
      </div>

      <div className="p-5">
        <p className="text-sm font-medium text-blue-600">
          {course.mentorName}
        </p>

        <h3 className="mt-2 line-clamp-2 text-lg font-bold">
          {course.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-slate-500">
          {course.description}
        </p>

        <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <BookOpen size={14} />
            {course.lectureCount} lectures
          </span>

          <span className="flex items-center gap-1">
            <Users size={14} />
            {course.studentCount}
          </span>

          <span className="flex items-center gap-1">
            <Star
              size={14}
              className="fill-yellow-400 text-yellow-400"
            />
            {course.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}