import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoutes";
import RoleRoute from "./routes/RoleRoute";
import { useAuth } from "./hooks/useAuth";

const Login = lazy(() => import("./pages/authentication/Login"));
const Register = lazy(() => import("./pages/authentication/Register"));
const BatchEnrollment = lazy(() => import("./pages/batch/BatchEnrollment"));
const AllCourses = lazy(() => import("./pages/course/AllCourses"));
const ProfileSelection = lazy(() => import("./pages/profile/ProfileSelection"));
const StudentBatchDetails = lazy(() => import("./pages/student/BatchDetails"));
const LecturePlayer = lazy(() => import("./pages/student/LecturePlayer"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminCourses = lazy(() => import("./pages/admin/Courses"));
const AdminBatches = lazy(() => import("./pages/admin/Batches"));
const AdminBatchDetails = lazy(() => import("./pages/admin/BatchDetails"));
const AdminStudents = lazy(() => import("./pages/admin/Students"));
const AdminMentors = lazy(() => import("./pages/admin/Mentors"));
const MentorBatches = lazy(() => import("./pages/mentor/Batches"));
const MentorBatchDetails = lazy(() => import("./pages/mentor/BatchDetails"));
const MentorNotes = lazy(() => import("./pages/mentor/Notes"));
const MentorStudents = lazy(() => import("./pages/mentor/Students"));
const LectureVideos = lazy(() => import("./pages/mentor/LectureVideos"));
const MentorAssignments = lazy(() => import("./pages/mentor/Assignments"));
const MentorVideoDetails = lazy(() => import("./pages/mentor/VideoDetails"));
const MentorStudentDetails = lazy(() => import("./pages/mentor/StudentDetails"));
const MentorAssignmentDetails = lazy(() => import("./pages/mentor/AssignmentDetails"));
const MentorNoteDetails = lazy(() => import("./pages/mentor/NoteDetails"));

export default function App() {
  return <Suspense fallback={<div className="grid min-h-screen place-items-center text-slate-500">Loading…</div>}><Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route element={<ProtectedRoute />}><Route element={<DashboardLayout />}>
      <Route path="/profiles" element={<ProfileSelection />} />
      <Route path="/courses" element={<AllCourses />} />
      <Route path="/course/batch-enrollment" element={<BatchEnrollment />} />
      <Route element={<RoleRoute allowedRoles={["Student"]} />}>
        <Route path="/student/batches/:batchId" element={<StudentBatchDetails />} />
        <Route path="/student/batches/:batchId/videos/:lectureId" element={<LecturePlayer />} />
      </Route>
      <Route element={<RoleRoute allowedRoles={["Admin"]} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/batches" element={<AdminBatches />} />
        <Route path="/admin/batches/:batchId" element={<AdminBatchDetails />} />
        <Route path="/admin/students" element={<AdminStudents />} />
        <Route path="/admin/mentors" element={<AdminMentors />} />
      </Route>
      <Route element={<RoleRoute allowedRoles={["Mentor"]} />}>
        <Route path="/mentor/batches" element={<MentorBatches />} />
        <Route path="/mentor/batches/:id" element={<MentorBatchDetails />} />
        <Route path="/mentor/batches/:batchId/notes" element={<MentorNotes />} />
        <Route path="/mentor/batches/:batchId/notes/:noteId" element={<MentorNoteDetails />} />
        <Route path="/mentor/batches/:batchId/students" element={<MentorStudents />} />
        <Route path="/mentor/batches/:batchId/students/:studentId" element={<MentorStudentDetails />} />
        <Route path="/mentor/batches/:batchId/videos" element={<LectureVideos />} />
        <Route path="/mentor/batches/:batchId/videos/:videoId" element={<MentorVideoDetails />} />
        <Route path="/mentor/batches/:batchId/assignments" element={<MentorAssignments />} />
        <Route path="/mentor/batches/:batchId/assignments/:assignmentId" element={<MentorAssignmentDetails />} />
      </Route>
    </Route></Route>
    <Route path="/" element={<ProfileLanding />} />
    <Route path="*" element={<ProfileLanding />} />
  </Routes></Suspense>;
}

function ProfileLanding() {
  const { user, isLoading, activeProfile, switchProfile } = useAuth();
  useEffect(() => {
    if (!user || (user.roles.includes("Student") && user.roles.length > 1)) return;
    const preferred = user.roles.includes("Admin") ? "Admin" : user.roles.includes("Mentor") ? "Mentor" : "Student";
    if (activeProfile !== preferred) switchProfile(preferred);
  }, [user, activeProfile, switchProfile]);
  if (isLoading) return <div className="grid min-h-screen place-items-center text-slate-500">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.roles.includes("Student") && user.roles.length > 1) return <Navigate to="/profiles" replace />;
  return <Navigate to={user.roles.includes("Admin") ? "/admin/dashboard" : user.roles.includes("Mentor") ? "/mentor/batches" : "/courses"} replace />;
}
