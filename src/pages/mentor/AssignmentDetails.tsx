import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Eye, FileText, X } from "lucide-react";
import { toast } from "react-toastify";
import { getAllSubmissions, getAssignmentById, gradeSubmission } from "../../services/assignment.service";
import api from "../../services/api";
import type { Assignment } from "../../types/assignment";

type Submission = { id: number; submissionId: number; studentId: number; studentName: string; fileName: string; submittedAt: string; overdue: boolean; gradePoint: number; isComplete: boolean };

export default function MentorAssignmentDetails() {
  const { batchId, assignmentId } = useParams();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [preview, setPreview] = useState<{ submission?: Submission; url: string; title: string } | null>(null);
  const [score, setScore] = useState(""); const [saving, setSaving] = useState(false);
  const load = useCallback(async () => { if (!assignmentId) return; try { const [a,s] = await Promise.all([getAssignmentById(Number(assignmentId)),getAllSubmissions(Number(assignmentId))]); setAssignment(a); setSubmissions(s as unknown as Submission[]); } catch { toast.error("Unable to load assignment details."); } }, [assignmentId]);
  // The assignment URL changes the resource loaded by this page.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void load(); }, [load]);
  const showFile = async (submission?: Submission) => {
    if (!assignmentId) return;
    try {
      const path = submission ? `/AssignmentSubmissions/${submission.submissionId}/file` : `/Assignments/${assignmentId}/file`;
      const response = await api.get(path,{responseType:"blob"}); const url = URL.createObjectURL(response.data);
      setPreview({submission,url,title:submission?.fileName ?? assignment?.fileName ?? "Assignment document"}); if (submission) setScore(String(submission.gradePoint));
    } catch { toast.error("Unable to preview this document."); }
  };
  const closePreview = () => { if(preview) URL.revokeObjectURL(preview.url); setPreview(null); };
  const saveGrade = async (complete: boolean) => { if(!preview?.submission) return; const grade=Number(score); if(!Number.isFinite(grade)||grade < -1||grade>(assignment?.gradePoints??0)) return toast.error("Enter a valid grade within the assignment maximum."); setSaving(true); try { await gradeSubmission(preview.submission.submissionId,grade,complete); toast.success(complete?"Submission graded.":"Resubmission requested."); closePreview(); await load(); } catch { toast.error("Unable to save the grade."); } finally {setSaving(false);} };
  if(!assignment) return <p className="text-slate-500">Loading assignment…</p>;
  return <section className="space-y-6"><Link to={`/mentor/batches/${batchId}/assignments`} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"><ArrowLeft size={16}/>Back to assignments</Link><header className="rounded-2xl border bg-white p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm font-semibold text-blue-600">Assignment dashboard</p><h1 className="mt-1 text-2xl font-bold">{assignment.title}</h1><p className="mt-3 whitespace-pre-wrap text-slate-600">{assignment.description||"No additional instructions."}</p></div><button onClick={()=>void showFile()} className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 font-semibold text-blue-600"><Eye size={16}/>Preview instructions</button></div><div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="rounded-xl bg-slate-50 p-3 text-sm">Posted <b className="block">{new Date(assignment.createdAt).toLocaleDateString()}</b></div><div className="rounded-xl bg-slate-50 p-3 text-sm">Deadline <b className="block">{new Date(assignment.deadLine).toLocaleString()}</b></div><div className="rounded-xl bg-slate-50 p-3 text-sm">Total grade <b className="block">{assignment.gradePoints} points</b></div></div></header><div><h2 className="text-xl font-bold">Submissions</h2><div className="mt-3 grid gap-3 md:grid-cols-2">{submissions.map(item=><article key={item.submissionId} className="rounded-xl border bg-white p-4"><div className="flex items-start justify-between gap-2"><div><b>{item.studentName}</b><p className="mt-1 text-sm text-slate-500">{item.fileName} · {new Date(item.submittedAt).toLocaleString()}</p></div><span className={`rounded-full px-2 py-1 text-xs ${item.overdue?"bg-amber-50 text-amber-700":"bg-slate-100 text-slate-600"}`}>{item.overdue?"Overdue":item.isComplete?"Graded":"Pending"}</span></div><p className="mt-2 text-sm">Grade: {item.gradePoint}</p><button onClick={()=>void showFile(item)} className="mt-3 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white"><Eye size={15}/>Preview and evaluate</button></article>)}{!submissions.length&&<p className="rounded-xl border border-dashed p-6 text-sm text-slate-500">No submissions yet.</p>}</div></div>{preview&&<div className="fixed inset-0 z-50 bg-slate-950/40"><aside className="ml-auto flex h-full w-full max-w-4xl flex-col bg-white shadow-2xl"><header className="flex items-center justify-between border-b p-4"><div className="flex items-center gap-2"><FileText className="text-blue-600"/><b className="truncate">{preview.title}</b></div><button onClick={closePreview} aria-label="Close preview"><X/></button></header><iframe title="Document preview" src={preview.url} className="min-h-0 flex-1 bg-slate-100"/><div className="border-t bg-white p-4 shadow-[0_-8px_24px_rgba(15,23,42,.08)]">{preview.submission?<><p className="font-semibold">Evaluate {preview.submission.studentName}</p><div className="mt-3 flex flex-wrap items-end gap-3"><label className="text-sm">Grade (max {assignment.gradePoints})<input type="number" min="-1" max={assignment.gradePoints} value={score} onChange={e=>setScore(e.target.value)} className="mt-1 block w-36 rounded-lg border px-3 py-2"/></label><button disabled={saving} onClick={()=>void saveGrade(true)} className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white">Save grade</button><button disabled={saving} onClick={()=>void saveGrade(false)} className="rounded-lg border border-amber-300 px-4 py-2 font-semibold text-amber-700">Request resubmission</button></div></>:<p className="text-sm text-slate-500">Assignment document preview.</p>}</div></aside></div>}</section>;
}
