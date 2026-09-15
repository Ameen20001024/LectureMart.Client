// import { Search } from "lucide-react";
// import { useMemo, useState } from "react";
// import CourseCard from "../../components/courses/CourseCard";
// import type { Course } from "../../types/course";

// const courses: Course[] = [
//   {
//     id: 1,
//     title: "Full Stack ASP.NET Core & React",
//     description:
//       "Build modern full-stack applications using ASP.NET Core and React.",
//     mentorName: "John Mentor",
//     duration: "12 weeks",
//     lectureCount: 48,
//     rating: 4.8,
//     studentCount: 320,
//   },
//   {
//     id: 2,
//     title: "Advanced React Development",
//     description:
//       "Learn modern React patterns and application architecture.",
//     mentorName: "Jane Mentor",
//     duration: "8 weeks",
//     lectureCount: 36,
//     rating: 4.7,
//     studentCount: 215,
//   },
// ];

// // const response = await courseService.getCourses(keyword);

// export default function AllCourses() {
//   const [keyword, setKeyword] = useState("");

//   const filteredCourses = useMemo(() => {
//     const value = keyword.trim().toLowerCase();

//     if (!value) {
//       return courses;
//     }

//     return courses.filter(
//       (course) =>
//         course.title.toLowerCase().includes(value) ||
//         course.description.toLowerCase().includes(value) ||
//         course.mentorName.toLowerCase().includes(value),
//     );
//   }, [keyword]);

//   return (
//     <section>
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold">
//           Explore Courses
//         </h1>

//         <p className="mt-2 text-slate-500">
//           Find the right course for your learning goals.
//         </p>
//       </div>

//       <div className="mb-8 flex max-w-2xl items-center rounded-xl border border-slate-200 bg-white px-4 shadow-sm">
//         <Search
//           size={20}
//           className="text-slate-400"
//         />

//         <input
//           value={keyword}
//           onChange={(event) =>
//             setKeyword(event.target.value)
//           }
//           placeholder="Search courses, topics or mentors..."
//           className="w-full bg-transparent px-3 py-3 outline-none"
//         />
//       </div>

//       {filteredCourses.length === 0 ? (
//         <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
//           <h3 className="font-semibold">
//             No courses found
//           </h3>

//           <p className="mt-2 text-sm text-slate-500">
//             Try another keyword.
//           </p>
//         </div>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
//           {filteredCourses.map((course) => (
//             <CourseCard
//               key={course.id}
//               course={course}
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }









import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "react-toastify";

import {
  getAllCourses,
} from "../../services/course.service";

import type { Course } from "../../types/course";

export default function AllCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await getAllCourses();
        setCourses(data);
      } catch {
        toast.error("Unable to load courses");
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    const search = keyword
      .trim()
      .toLowerCase();

    if (!search) {
      return courses;
    }

    return courses.filter(
      (course) =>
        course.courseName
          .toLowerCase()
          .includes(search) ||
        course.courseCode
          .toLowerCase()
          .includes(search) ||
        course.description
          ?.toLowerCase()
          .includes(search),
    );
  }, [courses, keyword]);

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold">
          Explore Courses
        </h1>

        <p className="mt-1 text-slate-500">
          Find the course you want to learn.
        </p>
      </div>

      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={keyword}
          onChange={(event) =>
            setKeyword(event.target.value)
          }
          placeholder="Search by course name, code or description..."
          className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-11 pr-4 shadow-sm outline-none focus:border-blue-500"
        />
      </div>

      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <article
              key={course.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex items-start justify-between">
                <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {course.courseCode}
                </span>

                <span className="text-sm text-yellow-600">
                  ★ {course.rating}
                </span>
              </div>

              <h2 className="text-xl font-semibold">
                {course.courseName}
              </h2>

              <p className="mt-2 line-clamp-3 text-sm text-slate-500">
                {course.description ||
                  "Course description unavailable."}
              </p>

              <div className="mt-5 flex justify-between border-t border-slate-100 pt-4 text-sm text-slate-500">
                <span>
                  {course.duration} months
                </span>

                <span className="font-semibold text-slate-800">
                  ₹{course.fee}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}