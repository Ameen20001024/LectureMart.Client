import {  Users } from "lucide-react";
import { Link } from "react-router-dom";
import type { StudentEnrollments } from "../../types/student";
import type { Student } from "../../types/student";
import MiniEnrollmentCard from "../enrollments/MiniEnrollmentCard";
import FallbackImage from "../common/FallbackImage";

interface StudentCardProps {
  student: Student;
  enrollments?: StudentEnrollments[];
}

const StudentCard = ({ student, enrollments = [] }: StudentCardProps) => {
  return (
    <Link
      to={`/Student/${student.id}`}
      className="block group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="p-4">
        <div className="mb-4 flex items-center gap-3">
          <FallbackImage
            alt={`${student.Name} profile`}
            className="h-14 w-14 rounded-full border border-slate-200 bg-slate-100 object-cover"
          />
          <div>
            <h3 className="text-lg font-bold">{student.Name}</h3>
            <p className="text-muted-foreground">{student.email}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {`Active Since ${student.RegistrationDate}`}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>{enrollments.length} Enrollments</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
            {enrollments.map((enrollment) => (
              <MiniEnrollmentCard key={enrollment.BatchId} StudentEnrollments={enrollment} />
            ))}
        </div>


      </div>
    </Link>
  )
}

export default StudentCard
