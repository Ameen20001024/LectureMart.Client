import { Download, FileText } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FileUpload from "../../components/common/FileUpload";
import { useAuth } from "../../hooks/useAuth";
import { getBatchById } from "../../services/batch.service";
import { getLectureNoteFileUrl, uploadLectureNote } from "../../services/lectureNotes.service";
import type { Batch } from "../../types/batch";
import { allowedDocumentAccept, isAllowedDocument } from "../../utils/uploadValidation";


export default function MentorNotes() {
  const { batchId } = useParams();
  const { user } = useAuth();
  const [batch, setBatch] = useState<Batch | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const load = useCallback(async () => {
    if (!batchId) return;
    try { setBatch(await getBatchById(Number(batchId))); } catch { toast.error("Unable to load notes."); }
  }, [batchId]);
  // The asynchronous loader synchronizes this page with the batch selected in the URL.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void load(); }, [load]);
  const upload = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!batchId || !user?.mentorId || !title.trim() || !file) return toast.error("A title and supported note file are required.");
    if (!(await isAllowedDocument(file, "note"))) return toast.error("Upload a valid PDF, DOC, DOCX, PPT, or PPTX file (maximum 25 MB).");
    setSaving(true);
    try {
      await uploadLectureNote({ batchId: Number(batchId), mentorId: user.mentorId, title: title.trim(), description, file });
      setTitle(""); setDescription(""); setFile(null); toast.success("Lecture note uploaded."); await load();
    } catch { toast.error("Unable to upload the lecture note."); } finally { setSaving(false); }
  };
  return <section className="space-y-6"><header><h1 className="text-2xl font-bold">Lecture notes</h1><p className="mt-1 text-slate-500">Upload study material and open an existing note to preview or download it.</p></header>
    <form onSubmit={upload} className="grid gap-3 rounded-2xl border bg-white p-5 md:grid-cols-2"><input required value={title} onChange={e => setTitle(e.target.value)} placeholder="Note title" className="rounded-xl border px-3 py-2"/><input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description (optional)" className="rounded-xl border px-3 py-2"/><div className="md:col-span-2"><FileUpload label="PDF, DOC, DOCX, PPT, or PPTX" accept={allowedDocumentAccept("note")} file={file} onChange={setFile}/></div><button disabled={saving} className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white disabled:opacity-60 md:justify-self-start">{saving ? "Uploading…" : "Upload note"}</button></form>
    <div className="grid gap-4 md:grid-cols-2">{(batch?.lectureNotes ?? []).map(note => <a key={note.noteId} href={getLectureNoteFileUrl(note.noteId)} target="_blank" rel="noreferrer" className="rounded-xl border bg-white p-5 hover:border-blue-300"><FileText className="text-blue-600"/><h2 className="mt-4 font-bold">{note.title}</h2><p className="mt-1 text-sm text-slate-500">{note.description}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600"><Download size={15}/>Preview / download</span></a>)}{batch && !batch.lectureNotes?.length && <p className="rounded-xl border border-dashed p-8 text-slate-500">No notes have been posted.</p>}</div></section>;
}
