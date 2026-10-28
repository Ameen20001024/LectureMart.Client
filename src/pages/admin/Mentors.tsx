import { useEffect, useState } from "react";
import { Mail, Pencil, UserRound, X } from "lucide-react";
import { toast } from "react-toastify";
import FallbackImage from "../../components/common/FallbackImage";
import { getMentors, onboardMentor, updateMentor } from "../../services/admin.service";

type Mentor = { mentorId: number; name?: string; gender?: string; dateOfBirth?: string; username?: string; email?: string; fixedSalary?: number; onboardingDate?: string };
const blank = { email: "", name: "", gender: "", dateOfBirth: "", fixedSalary: 0, onboardingDate: new Date().toISOString().slice(0, 10) };

export default function AdminMentors() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [selected, setSelected] = useState<Mentor | null>(null);
  const [editing, setEditing] = useState<Mentor | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(blank);
  const [saving, setSaving] = useState(false);
  const load = () => getMentors().then(setMentors).catch(() => toast.error("Unable to load mentors."));
  useEffect(() => { void load(); }, []);

  const start = (mentor?: Mentor) => {
    setEditing(mentor ?? null);
    setShowForm(true);
    setForm(mentor ? { email: mentor.email ?? "", name: mentor.name ?? "", gender: mentor.gender ?? "", dateOfBirth: mentor.dateOfBirth?.slice(0, 10) ?? "", fixedSalary: mentor.fixedSalary ?? 0, onboardingDate: mentor.onboardingDate?.slice(0, 10) ?? blank.onboardingDate } : blank);
  };
  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      if (editing) await updateMentor(editing.mentorId, { ...form, username: editing.username ?? "", email: form.email });
      else await onboardMentor(form);
      toast.success(editing ? "Mentor updated." : "Mentor onboarded.");
      setSelected(null); setEditing(null); setShowForm(false); setForm(blank); await load();
    } catch { toast.error("Unable to save mentor."); } finally { setSaving(false); }
  };
  const closeForm = () => { setEditing(null); setShowForm(false); setForm(blank); };

  return <section className="space-y-6">
    <header className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm font-semibold text-blue-600">Admin workspace</p><h1 className="text-3xl font-bold">Mentors</h1><p className="mt-1 text-slate-500">Onboard registered users and maintain mentor details.</p></div><button onClick={() => start()} className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white">Onboard mentor</button></header>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{mentors.map(mentor => <button key={mentor.mentorId} onClick={() => setSelected(mentor)} className="rounded-2xl border bg-white p-5 text-left hover:border-blue-300"><div className="flex items-center gap-3"><FallbackImage alt="Mentor profile" className="h-12 w-12 rounded-full object-cover"/><div className="min-w-0"><b className="block truncate">{mentor.name || "Unnamed mentor"}</b><p className="truncate text-sm text-slate-500">{mentor.email}</p></div></div><p className="mt-3 text-xs text-slate-400">@{mentor.username}</p><p className="mt-3 text-sm font-semibold text-blue-600">View details →</p></button>)}</div>

    {selected && <div className="fixed inset-0 z-40 flex justify-end bg-slate-950/40" onClick={() => setSelected(null)}><aside className="h-full w-full max-w-lg overflow-y-auto bg-white p-6 shadow-2xl" onClick={event => event.stopPropagation()}><div className="flex items-start justify-between"><div className="flex items-center gap-4"><FallbackImage alt="Mentor profile" className="h-16 w-16 rounded-full object-cover"/><div><p className="text-sm font-semibold text-blue-600">Mentor profile</p><h2 className="text-2xl font-bold">{selected.name || "Unnamed mentor"}</h2></div></div><button onClick={() => setSelected(null)} aria-label="Close details"><X/></button></div><div className="mt-7 space-y-4 rounded-xl bg-slate-50 p-4 text-sm"><p className="flex items-center gap-2"><Mail size={16} className="text-blue-600"/>{selected.email || "No email available"}</p><p className="flex items-center gap-2"><UserRound size={16} className="text-blue-600"/>@{selected.username || "—"}</p><p>Gender: {selected.gender || "Not specified"}</p><p>Date of birth: {selected.dateOfBirth ? new Date(selected.dateOfBirth).toLocaleDateString() : "—"}</p><p>Onboarding date: {selected.onboardingDate ? new Date(selected.onboardingDate).toLocaleDateString() : "—"}</p><p>Fixed salary: {selected.fixedSalary ?? "—"}</p></div><button onClick={() => { const mentor = selected; setSelected(null); start(mentor); }} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white"><Pencil size={16}/>Edit mentor</button></aside></div>}

    {showForm && <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4"><form onSubmit={save} className="w-full max-w-xl space-y-4 rounded-2xl bg-white p-6"><div><p className="text-sm font-semibold text-blue-600">{editing ? "Mentor management" : "Step 1 · Locate registered user"}</p><h2 className="text-xl font-bold">{editing ? "Edit mentor" : "Onboard mentor"}</h2></div>{!editing && <label className="block text-sm font-medium">Registered user email<input required type="email" autoFocus value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} placeholder="user@example.com" className="mt-1 w-full rounded-lg border px-3 py-2"/></label>}<div className="grid gap-3 sm:grid-cols-2"><label className="text-sm font-medium">Name<input required value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2"/></label><label className="text-sm font-medium">Gender<input value={form.gender} onChange={event => setForm({ ...form, gender: event.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2"/></label><label className="text-sm font-medium">Date of birth<input required type="date" value={form.dateOfBirth} onChange={event => setForm({ ...form, dateOfBirth: event.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2"/></label><label className="text-sm font-medium">Fixed salary<input type="number" min="0" value={form.fixedSalary} onChange={event => setForm({ ...form, fixedSalary: Number(event.target.value) })} className="mt-1 w-full rounded-lg border px-3 py-2"/></label>{!editing&&<label className="text-sm font-medium sm:col-span-2">Onboarding date<input required type="date" value={form.onboardingDate} onChange={event => setForm({ ...form, onboardingDate: event.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2"/></label>}</div><div className="flex justify-end gap-2"><button type="button" onClick={closeForm} className="rounded-lg border px-4 py-2">Cancel</button><button disabled={saving} className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white">{saving ? "Saving…" : "Save"}</button></div></form></div>}
  </section>;
}
