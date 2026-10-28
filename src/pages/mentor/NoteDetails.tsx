import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { toast } from "react-toastify";
import { getBatchById } from "../../services/batch.service";
import { getLectureNoteFileUrl } from "../../services/lectureNotes.service";
import type { BatchNote } from "../../types/batch";

export default function MentorNoteDetails() {
  const { batchId, noteId } = useParams();
  const [note, setNote] = useState<BatchNote | null>(null);
  useEffect(() => {
    if (!batchId || !noteId) return;
    getBatchById(Number(batchId)).then(batch => {
      const item = batch.lectureNotes?.find(candidate => candidate.noteId === Number(noteId));
      if (item) setNote(item);
      else toast.error("Lecture note not found in this batch.");
    }).catch(() => toast.error("Unable to load lecture note."));
  }, [batchId, noteId]);
  if (!note || !noteId) return <p className="text-slate-500">Loading lecture note…</p>;
  const fileUrl = getLectureNoteFileUrl(Number(noteId));
  return <section className="space-y-5"><Link to={`/mentor/batches/${batchId}`} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"><ArrowLeft size={16}/>Back to batch</Link><article className="rounded-2xl border bg-white p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div className="flex items-start gap-3"><FileText className="mt-1 text-blue-600"/><div><p className="text-sm font-semibold text-blue-600">Lecture note</p><h1 className="text-2xl font-bold">{note.title}</h1><p className="mt-2 whitespace-pre-wrap text-slate-600">{note.description||"No additional description."}</p><p className="mt-3 text-xs text-slate-400">Posted {new Date(note.createdAt).toLocaleString()}</p></div></div><a href={fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white"><Download size={16}/>Open / download</a></div></article><iframe title={`${note.title} preview`} src={fileUrl} className="h-[75vh] w-full rounded-xl border bg-white"/></section>;
}
