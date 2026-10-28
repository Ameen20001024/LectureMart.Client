// import { BookOpen, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
// import type { Batch } from "../../types/batch";
import type { StudentEnrollments } from "../../types/student";

interface MiniEnrollmentCardProps {
  StudentEnrollments: StudentEnrollments;
}

export default function MiniEnrollmentCard({ StudentEnrollments }: MiniEnrollmentCardProps) {
  return (
    <Link
      to={`/Batch/${StudentEnrollments.BatchId}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      

      <div className="p-5">
        {/* <p className="text-sm font-medium text-blue-600">
          {course.mentorName}
        </p> */}

        <h3 className="mt-2 line-clamp-2 text-lg font-bold">
          {StudentEnrollments.CourseName} - ({StudentEnrollments.CourseCode})
        </h3>

        <h3>
            {`Batch Code: ${StudentEnrollments.BatchCode}`}
        </h3>

        <h4 className="mt-2 line-clamp-2 text-lg font-bold">
            {`Enrollment Date: ${StudentEnrollments.EnrollmentDate}`}
        </h4> 

        <h3>{StudentEnrollments.IsActive ? "Ongoing" : "Completed"}</h3>    
        
      </div>
    </Link>
  );
}