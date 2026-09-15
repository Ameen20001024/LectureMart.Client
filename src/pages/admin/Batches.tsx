import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Pencil,
} from "lucide-react";
import { toast } from "react-toastify";

import {
  deleteBatch,
  getAllBatches,
} from "../../services/batch.service";

import type { Batch } from "../../types/batch";

export default function Batches() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadBatches() {
    try {
      const data = await getAllBatches();
      setBatches(data);
    } catch {
      toast.error("Unable to load batches");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBatches();
  }, []);

  async function handleDelete(id: number) {
    if (
      !window.confirm(
        "Delete this batch?",
      )
    ) {
      return;
    }

    try {
      await deleteBatch(id);

      setBatches((current) =>
        current.filter(
          (batch) => batch.id !== id,
        ),
      );

      toast.success("Batch deleted");
    } catch {
      toast.error("Unable to delete batch");
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Batches
          </h1>

          <p className="text-slate-500">
            Manage course batches.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700">
          <Plus size={18} />
          Create Batch
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="px-5 py-4">
                  Batch
                </th>
                <th className="px-5 py-4">
                  Course
                </th>
                <th className="px-5 py-4">
                  Mentor
                </th>
                <th className="px-5 py-4">
                  Start
                </th>
                <th className="px-5 py-4">
                  Status
                </th>
                <th className="px-5 py-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {batches.map((batch) => (
                <tr key={batch.id}>
                  <td className="px-5 py-4 font-medium">
                    {batch.batchCode}
                  </td>

                  <td className="px-5 py-4">
                    {batch.courseId}
                  </td>

                  <td className="px-5 py-4">
                    {batch.mentorId}
                  </td>

                  <td className="px-5 py-4">
                    {new Date(
                      batch.startDate,
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        batch.isCompleted
                          ? "bg-slate-100 text-slate-600"
                          : "bg-green-50 text-green-700"
                      }`}
                    >
                      {batch.isCompleted
                        ? "Completed"
                        : "Active"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button className="rounded-lg border p-2 hover:bg-slate-50">
                        <Pencil size={15} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(batch.id)
                        }
                        className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}