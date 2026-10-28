import { useRef } from "react";

interface FileUploadProps {
  label: string;
  accept?: string;
  file: File | null;
  onChange: (file: File | null) => void;
}

export default function FileUpload({
  label,
  accept,
  file,
  onChange,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-blue-500 hover:bg-blue-50"
      >
        <p className="font-medium text-slate-700">
          {file
            ? file.name
            : "Click to choose a file"}
        </p>

        {file && (
          <p className="mt-1 text-xs text-slate-500">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        onChange={(event) => {
          const selectedFile =
            event.target.files?.[0] ?? null;

          onChange(selectedFile);
        }}
      />
    </div>
  );
}
