// // import { BookOpen, Star, Users } from "lucide-react";
// import { Link } from "react-router-dom";
// import type { Batch } from "../../types/batch";

// interface MiniBatchCardProps {
//   Batch: Batch;
// }

// export default function MiniBatchCard({ Batch }: MiniBatchCardProps) {
//   return (
//     <Link
//       to={`/Batch/${Batch.id}`}
//       className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
//     >
//       {/* <div className="aspect-video bg-slate-200">
//         {course.thumbnail ? (
//           <img
//             src={course.thumbnail}
//             alt={course.courseName}
//             className="h-full w-full object-cover transition group-hover:scale-105"
//           />
//         ) : (
//           <div className="flex h-full items-center justify-center text-slate-400">
//             <BookOpen size={42} />
//           </div>
//         )}
//       </div> */}

//       <div className="p-5">
//         {/* <p className="text-sm font-medium text-blue-600">
//           {course.mentorName}
//         </p> */}

//         <h3 className="mt-2 line-clamp-2 text-lg font-bold">
//           {Batch.courseName} - ({Batch.courseCode})
//         </h3>

//         <h3>
//             {`Batch Code: ${Batch.batchCode}`}
//         </h3>

//         <h4 className="mt-2 line-clamp-2 text-lg font-bold">
//             {Batch.startDate} to {Batch.endDate || "Ongoing"}
//         </h4>     
        
//       </div>
//     </Link>
//   );
// }