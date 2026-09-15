import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import FileUpload from "../../components/common/FileUpload";

import {
  uploadAssignment,
} from "../../services/assignment.service";

export default function Assignments() {
  const { batchId } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [deadline, setDeadline] =
    useState("");
  const [gradePoints, setGradePoints] =
    useState("100");

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    event: React.FormEvent,
  ) {
    event.preventDefault();

    if (!batchId || !title || !file) {
      toast.error(
        "Title and assignment file are required.",
      );

      return;
    }

    try {
      setLoading(true);

      await uploadAssignment({
        batchId: Number(batchId),
        title,
        description,
        deadLine: deadline,
        gradePoints: Number(
          gradePoints,
        ),
        file,
      });

      toast.success(
        "Assignment uploaded.",
      );

      setTitle("");
      setDescription("");
      setDeadline("");
      setGradePoints("100");
      setFile(null);
    } catch {
      toast.error(
        "Failed to upload assignment.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl space-y-6 p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold">
          Create Assignment
        </h1>

        <p className="text-slate-500">
          Batch #{batchId}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <input
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          placeholder="Assignment title"
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
        />

        <textarea
          value={description}
          onChange={(event) =>
            setDescription(
              event.target.value,
            )
          }
          placeholder="Description"
          rows={4}
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
        />

        <div>
          <label className="mb-2 block text-sm font-medium">
            Deadline
          </label>

          <input
            type="datetime-local"
            value={deadline}
            onChange={(event) =>
              setDeadline(
                event.target.value,
              )
            }
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Grade points
          </label>

          <input
            type="number"
            min="1"
            value={gradePoints}
            onChange={(event) =>
              setGradePoints(
                event.target.value,
              )
            }
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
          />
        </div>

        <FileUpload
          label="Assignment file"
          file={file}
          onChange={setFile}
        />

        <button
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white disabled:opacity-50"
        >
          {loading
            ? "Uploading..."
            : "Create Assignment"}
        </button>
      </form>
    </div>
  );
}