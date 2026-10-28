import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Video, FileText, ClipboardList, Users, CalendarDays, Upload } from "lucide-react";
import { toast } from "react-toastify";

import {
  getBatchById,
  getBatchEnrollments,
} from "../../services/batch.service";

import type { Batch } from "../../types/batch";
import FallbackImage from "../../components/common/FallbackImage";
import { getCourseById } from "../../services/course.service";
import type { CourseDetails } from "../../types/course";
import { formatLiveSchedule } from "../../utils/liveSchedule";

export default function BatchDetails() {
  const { id } = useParams();

  const [batch, setBatch] =
    useState<Batch | null>(null);
  const [studentCount, setStudentCount] = useState(0);
  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [tab, setTab] = useState<"videos" | "notes" | "students" | "assignments">("videos");

  useEffect(() => {
    if (!id) {
      return;
    }

    async function loadBatch() {
      try {
        const data = await getBatchById(
          Number(id),
        );

        setBatch(data);
        const [enrollments, courseDetails] = await Promise.all([getBatchEnrollments(Number(id)), getCourseById(data.courseId)]);
        setStudentCount(enrollments.filter((enrollment) => enrollment.isActive).length);
        setCourse(courseDetails);
      } catch {
        toast.error(
          "Unable to load batch",
        );
      }
    }

    loadBatch();
  }, [id]);

  if (!batch) {
    return (
      <div className="p-8">
        Loading batch...
      </div>
    );
  }

  const tabs = [{ id: "videos", label: "Videos", icon: Video }, { id: "notes", label: "Notes", icon: FileText }, { id: "students", label: "Students", icon: Users }, { id: "assignments", label: "Assignments", icon: ClipboardList }] as const;

  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div className="grid gap-6 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
        <FallbackImage
          alt={`${batch.courseName} course cover`}
          className="aspect-video w-full rounded-2xl bg-slate-100 object-cover"
        />
        <div>
        <p className="text-sm font-medium text-blue-600">
          Batch
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          {batch.batchCode}
        </h1>

        <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
          <span>
            Starts{" "}
            {new Date(
              batch.startDate,
            ).toLocaleDateString()}
          </span>

          {batch.endDate && (
            <span>
              Ends{" "}
              {new Date(
                batch.endDate,
              ).toLocaleDateString()}
            </span>
          )}
        </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {[
          [studentCount, "Enrolled students"],
          [batch.videos?.length ?? 0, "Videos"],
          [batch.lectureNotes?.length ?? 0, "Notes"],
          [batch.assignments?.length ?? 0, "Assignments"],
          [formatLiveSchedule(batch.liveClassSchedule), "Live schedule"],
        ].map(([value, label]) => <div key={String(label)} className="rounded-xl border bg-white p-4"><p className="text-xl font-bold">{value}</p><p className="mt-1 text-xs text-slate-500">{label}</p></div>)}
      </div>

      <div className="rounded-2xl border bg-white p-5"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm font-semibold text-blue-600">{batch.courseCode} · {batch.batchCode}</p><h2 className="mt-1 text-xl font-bold">{batch.courseName}</h2><p className="mt-2 max-w-3xl text-sm text-slate-600">{course?.description || "Course information"}</p><p className="mt-3 flex items-center gap-2 text-sm text-slate-500"><CalendarDays size={15}/>{formatLiveSchedule(batch.liveClassSchedule)}{batch.liveClassTime ? ` at ${batch.liveClassTime}` : ""}</p></div><Link to={`/mentor/batches/${batch.id}/videos`} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white"><Upload size={16}/>Upload video</Link></div></div>
      <div className="flex gap-2 overflow-x-auto border-b">{tabs.map(({id,label,icon:Icon})=><button key={id} onClick={()=>setTab(id)} className={`inline-flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold ${tab===id?"border-blue-600 text-blue-600":"border-transparent text-slate-500"}`}><Icon size={16}/>{label}</button>)}</div>
      {tab === "videos" && <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{(batch.videos??[]).map(video=><Link key={video.id} to={`/mentor/batches/${batch.id}/videos/${video.id}`} className="overflow-hidden rounded-xl border bg-white hover:border-blue-300"><FallbackImage alt={`${video.title} thumbnail`} className="aspect-video w-full object-cover"/><div className="p-4"><h3 className="font-bold">{video.title}</h3><p className="mt-1 line-clamp-2 text-sm text-slate-500">{video.description}</p></div></Link>)}<Link to={`/mentor/batches/${batch.id}/videos`} className="grid min-h-40 place-items-center rounded-xl border border-dashed text-sm font-semibold text-blue-600">+ Upload video</Link></div>}
      {tab === "notes" && <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{(batch.lectureNotes??[]).map(note=><Link key={note.noteId} to={`/mentor/batches/${batch.id}/notes/${note.noteId}`} className="rounded-xl border bg-white p-5 hover:border-blue-300"><FileText className="text-blue-600"/><h3 className="mt-3 font-bold">{note.title}</h3><p className="mt-1 text-sm text-slate-500">{note.description||"Lecture note"}</p></Link>)}<Link to={`/mentor/batches/${batch.id}/notes`} className="grid min-h-32 place-items-center rounded-xl border border-dashed text-sm font-semibold text-blue-600">+ Upload notes</Link></div>}
      {tab === "students" && <Link to={`/mentor/batches/${batch.id}/students`} className="block rounded-xl border bg-white p-5 hover:border-blue-300"><Users className="text-blue-600"/><p className="mt-3 font-bold">{studentCount} enrolled students</p><p className="mt-1 text-sm text-slate-500">Open the roster and student profiles →</p></Link>}
      {tab === "assignments" && <div className="grid gap-4 md:grid-cols-2">{(batch.assignments??[]).map(item=><Link key={item.id} to={`/mentor/batches/${batch.id}/assignments/${item.id}`} className="rounded-xl border bg-white p-5 hover:border-blue-300"><ClipboardList className="text-blue-600"/><h3 className="mt-3 font-bold">{item.title}</h3><p className="mt-1 text-sm text-slate-500">{item.gradePoints} points · Due {item.deadLine?new Date(item.deadLine).toLocaleDateString():"—"}</p></Link>)}<Link to={`/mentor/batches/${batch.id}/assignments`} className="grid min-h-32 place-items-center rounded-xl border border-dashed text-sm font-semibold text-blue-600">+ Create assignment</Link></div>}
    </div>
  );
}
