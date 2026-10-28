import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import FallbackImage from "../../components/common/FallbackImage";
import { useAuth } from "../../hooks/useAuth";
import { getMentorWorkspace } from "../../services/admin.service";

export default function MentorBatches() {
  const { user } = useAuth(); const [batches, setBatches] = useState<{ id: number; batchCode: string; courseCode: string; startTime: string; endTime?: string }[]>([]);
  useEffect(() => { if (user?.mentorId) getMentorWorkspace(user.mentorId).then(data => setBatches(data.batches ?? [])).catch(() => toast.error("Unable to load your batches.")); }, [user?.mentorId]);
  return <section className="space-y-6"><header><p className="text-sm font-semibold text-blue-600">Mentor workspace</p><h1 className="text-3xl font-bold">My batches</h1><p className="mt-1 text-slate-500">Open a batch to manage videos, notes, students, assignments, and Q&A.</p></header><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{batches.map(batch => <Link key={batch.id} to={`/mentor/batches/${batch.id}`} className="overflow-hidden rounded-2xl border bg-white hover:border-blue-300"><FallbackImage alt="Batch cover" className="aspect-video w-full object-cover"/><div className="p-5"><p className="text-xs font-semibold text-blue-600">{batch.courseCode}</p><h2 className="mt-1 text-xl font-bold">{batch.batchCode}</h2><p className="mt-3 text-sm text-slate-500">Starts {new Date(batch.startTime).toLocaleDateString()}</p></div></Link>)}{!batches.length && <p className="rounded-xl border border-dashed p-8 text-center text-slate-500 md:col-span-2 xl:col-span-3">No batches are assigned to your mentor profile.</p>}</div></section>;
}
