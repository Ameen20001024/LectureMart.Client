import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
// import ForgotPassword from "./pages/authentication/ForgotPassword";

import DashboardLayout from "./layouts/DashboardLayout";

import ProtectedRoute from "./routes/ProtectedRoutes";
// import RoleRoute from "./routes/RoleRoute";

// import StudentDashboard from "./pages/student/Dashboard";
// import MyCourses from "./pages/student/MyCourses";

// import CourseDetails from "./pages/student/CourseDetails";
// import LecturePlayer from "./pages/student/LecturePlayer";
// import Assignments from "./pages/student/Assignments";
// import AssignmentDetails from "./pages/student/AssignmentDetails";
// import Notes from "./pages/student/Notes";
// import Questions from "./pages/student/Questions";
// import LiveClasses from "./pages/student/LiveClasses";
// import Reviews from "./pages/student/Reviews";
// import Certificates from "./pages/student/Certificates";
// import Profile from "./pages/student/Profile";

import AllCourses from "./pages/course/AllCourses";

// import MentorDashboard from "./pages/mentor/Dashboard";
// import MentorCourses from "./pages/mentor/Courses";
// import CreateCourse from "./pages/mentor/CreateCourse";
// import EditCourse from "./pages/mentor/EditCourse";
// import LectureVideos from "./pages/mentor/LectureVideos";
// import MentorAssignments from "./pages/mentor/Assignments";
// import MentorStudents from "./pages/mentor/Students";
// import MentorQuestions from "./pages/mentor/Questions";
// import MentorLiveClasses from "./pages/mentor/LiveClasses";
// import MentorReviews from "./pages/mentor/Reviews";

import BatchEnrollment from "./pages/batch/BatchEnrollment";

// import AdminDashboard from "./pages/admin/Dashboard";
// import AdminUsers from "./pages/admin/Users";
// import AdminStudents from "./pages/admin/Students";
// import AdminMentors from "./pages/admin/Mentors";
// import AdminCourses from "./pages/admin/Courses";
// import AdminBatches from "./pages/admin/Batches";
// import AdminReports from "./pages/admin/Reports";

export default function App() {
  return (
    <Routes>
      {/* Authentication */}

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      /> */}

      {/* Protected application */}

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>

          {/* Student */}

          {/* <Route element={<RoleRoute allowedRoles={["Student"]} />}>
            <Route
              path="/student/dashboard"
              element={<StudentDashboard />}
            />

            <Route
              path="/student/courses"
              element={<MyCourses />}
            />

            <Route
              path="/student/assignments"
              element={<Assignments />}
            />

            <Route
              path="/student/assignments/:id"
              element={<AssignmentDetails />}
            />

            <Route
              path="/student/notes"
              element={<Notes />}
            />

            <Route
              path="/student/questions"
              element={<Questions />}
            />

            <Route
              path="/student/live-classes"
              element={<LiveClasses />}
            />

            <Route
              path="/student/reviews"
              element={<Reviews />}
            />

            <Route
              path="/student/certificates"
              element={<Certificates />}
            />

            <Route
              path="/student/batch-enrollment"
              element={<BatchEnrollment />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />
          </Route> */}

          {/* Shared course browsing */}

          <Route
            path="/courses"
            element={<AllCourses />}
          />

          <Route
            path="/course/batch-enrollment"
            element={<BatchEnrollment />}
          />
          

          {/* <Route
            path="/courses/:id"
            element={<CourseDetails />}
          /> */}

          {/* <Route
            path="/courses/:courseId/lectures/:lectureId"
            element={<LecturePlayer />}
          /> */}

          {/* Mentor */}

          {/* <Route element={<RoleRoute allowedRoles={["Mentor"]} />}>
            <Route
              path="/mentor/dashboard"
              element={<MentorDashboard />}
            />

            <Route
              path="/mentor/courses"
              element={<MentorCourses />}
            />

            <Route
              path="/mentor/courses/create"
              element={<CreateCourse />}
            />

            <Route
              path="/mentor/courses/:id/edit"
              element={<EditCourse />}
            />

            <Route
              path="/mentor/lecture-videos"
              element={<LectureVideos />}
            />

            <Route
              path="/mentor/assignments"
              element={<MentorAssignments />}
            />

            <Route
              path="/mentor/students"
              element={<MentorStudents />}
            />

            <Route
              path="/mentor/questions"
              element={<MentorQuestions />}
            />

            <Route
              path="/mentor/live-classes"
              element={<MentorLiveClasses />}
            />

            <Route
              path="/mentor/reviews"
              element={<MentorReviews />}
            />
          </Route> */}

          {/* Admin */}

          {/* <Route element={<RoleRoute allowedRoles={["Admin"]} />}>
            <Route
              path="/admin/dashboard"
              element={<AdminDashboard />}
            />

            <Route
              path="/admin/users"
              element={<AdminUsers />}
            />

            <Route
              path="/admin/students"
              element={<AdminStudents />}
            />

            <Route
              path="/admin/mentors"
              element={<AdminMentors />}
            />

            <Route
              path="/admin/courses"
              element={<AdminCourses />}
            />

            <Route
              path="/admin/batches"
              element={<AdminBatches />}
            />

            <Route
              path="/admin/reports"
              element={<AdminReports />}
            />
          </Route> */}

        </Route>
      </Route>

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="*"
        element={
          <div className="flex min-h-screen items-center justify-center">
            <h1 className="text-3xl font-bold">
              404 — Page Not Found
            </h1>
          </div>
        }
      />
    </Routes>
  );
}