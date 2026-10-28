import { FileText } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FileUpload from "../../components/common/FileUpload";
import { useAuth } from "../../hooks/useAuth";
import { uploadAssignment } from "../../services/assignment.service";
import { getBatchById } from "../../services/batch.service";
import type { Batch, BatchAssignment } from "../../types/batch";
import { allowedDocumentAccept, isAllowedDocument } from "../../utils/uploadValidation";


export default function Assignments() {
  const { batchId } = useParams(); const navigate = useNavigate();
  const { user } = useAuth();
  const [batch, setBatch] = useState<Batch | null>(null);
  const [title, setTitle] = useState(""); const [description, setDescription] = useState(""); const [deadline, setDeadline] = useState(""); const [gradePoints, setGradePoints] = useState("100"); const [file, setFile] = useState<File | null>(null); const [saving, setSaving] = useState(false);
  const load = useCallback(async () => { if (!batchId) return; try { setBatch(await getBatchById(Number(batchId))); } catch { toast.error("Unable to load assignments."); } }, [batchId]);
  // The URL-selected batch is loaded asynchronously.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void load(); }, [load]);
  const create = async (event: React.FormEvent) => { event.preventDefault(); if (!batchId || !user?.mentorId || !title.trim() || !deadline || !file) return toast.error("Complete every required assignment field."); if (!(await isAllowedDocument(file, "assignment"))) return toast.error("Upload a valid PDF, DOC, DOCX, or ZIP file (maximum 25 MB)."); setSaving(true); try { await uploadAssignment({ batchId: Number(batchId), mentorId: user.mentorId, title: title.trim(), description, dueDate: deadline, gradePoints: Number(gradePoints), file }); setTitle(""); setDescription(""); setDeadline(""); setGradePoints("100"); setFile(null); toast.success("Assignment uploaded."); await load(); } catch { toast.error("Unable to upload the assignment."); } finally { setSaving(false); } };
  const open = (assignment: BatchAssignment) => navigate(`/mentor/batches/${batchId}/assignments/${assignment.id}`);
  return <section className="space-y-6"><header><h1 className="text-2xl font-bold">Assignments</h1><p className="mt-1 text-slate-500">Create assignments, review submissions, and record grades.</p></header>
    <form onSubmit={create} className="grid gap-3 rounded-2xl border bg-white p-5 md:grid-cols-2"><input required value={title} onChange={e => setTitle(e.target.value)} placeholder="Assignment title" className="rounded-xl border px-3 py-2"/><input required type="datetime-local" value={deadline} onChange={e => setDeadline(e.target.value)} className="rounded-xl border px-3 py-2"/><textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Instructions (optional)" className="min-h-24 rounded-xl border px-3 py-2 md:col-span-2"/><label className="text-sm">Grade points<input required min="1" type="number" value={gradePoints} onChange={e => setGradePoints(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2"/></label><div className="md:col-span-2"><FileUpload label="PDF, DOC, DOCX, or ZIP" accept={allowedDocumentAccept("assignment")} file={file} onChange={setFile}/></div><button disabled={saving} className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white disabled:opacity-60 md:justify-self-start">{saving ? "Uploading…" : "Create assignment"}</button></form>
    <div className="grid gap-4 md:grid-cols-2">{(batch?.assignments ?? []).map(assignment => <button key={assignment.id} onClick={() => void open(assignment)} className="rounded-2xl border bg-white p-5 text-left hover:border-blue-300"><FileText className="text-blue-600"/><div className="mt-4 flex justify-between gap-3"><h2 className="font-bold">{assignment.title}</h2><span className="text-sm font-semibold text-blue-600">{assignment.gradePoints} pts</span></div><p className="mt-2 line-clamp-2 text-sm text-slate-500">{assignment.description || "No additional instructions."}</p><p className="mt-3 text-xs text-slate-500">Due {assignment.deadLine ? new Date(assignment.deadLine).toLocaleString() : "—"}</p></button>)}{batch && !batch.assignments?.length && <p className="rounded-xl border border-dashed p-8 text-slate-500">No assignments have been posted.</p>}</div>
    </section>;
}
