import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import FileUpload from "../../components/common/FileUpload";

import {
  uploadLectureVideo,
} from "../../services/lectureVideo.service";
import { useAuth } from "../../hooks/useAuth";
import { isAllowedVideo } from "../../utils/uploadValidation";

export default function LectureVideos() {
  const { batchId } = useParams();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    event: React.FormEvent,
  ) {
    event.preventDefault();

    if (!batchId || !user?.mentorId || !file || !title.trim()) {
      toast.error(
        "Title and video are required.",
      );

      return;
    }
    if (!(await isAllowedVideo(file))) {
      toast.error("Upload a valid MP4, MOV, or WEBM video (maximum 500 MB).");
      return;
    }

    try {
      setLoading(true);

      await uploadLectureVideo({
        batchId: Number(batchId),
        mentorId: user.mentorId,
        title,
        description,
        video: file,
      });

      setTitle("");
      setDescription("");
      setFile(null);

      toast.success(
        "Lecture video uploaded.",
      );
    } catch {
      toast.error(
        "Failed to upload video.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl space-y-6 p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold">
          Upload Lecture Video
        </h1>

        <p className="text-slate-500">
          Batch #{batchId}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Lecture title
          </label>

          <input
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            placeholder="Introduction to C#"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Description
          </label>

          <textarea
            value={description}
            onChange={(event) =>
              setDescription(
                event.target.value,
              )
            }
            rows={4}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <FileUpload
          label="Video"
          accept=".mp4,.mov,.webm,video/mp4,video/quicktime,video/webm"
          file={file}
          onChange={setFile}
        />

        <button
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? "Uploading..."
            : "Upload Video"}
        </button>
      </form>
    </div>
  );
}
