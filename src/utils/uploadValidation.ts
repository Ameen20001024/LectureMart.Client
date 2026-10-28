type DocumentKind = "note" | "assignment" | "submission";

const documentRules: Record<DocumentKind, { extensions: string[]; contentTypes: string[] }> = {
  note: {
    extensions: [".pdf", ".doc", ".docx", ".ppt", ".pptx"],
    contentTypes: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
  },
  assignment: {
    extensions: [".pdf", ".doc", ".docx", ".zip"],
    contentTypes: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/zip", "application/x-zip-compressed"],
  },
  submission: {
    extensions: [".pdf", ".doc", ".docx", ".zip"],
    contentTypes: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/zip", "application/x-zip-compressed"],
  },
};

const maxDocumentBytes = 25 * 1024 * 1024;
const videoContentTypes: Record<string, string> = { ".mp4": "video/mp4", ".mov": "video/quicktime", ".webm": "video/webm" };
const maxVideoBytes = 500 * 1024 * 1024;

export function allowedDocumentAccept(kind: DocumentKind): string {
  const rules = documentRules[kind];
  return [...rules.extensions, ...rules.contentTypes].join(",");
}

export async function isAllowedDocument(file: File, kind: DocumentKind): Promise<boolean> {
  const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  const rules = documentRules[kind];
  if (!rules.extensions.includes(extension) || !rules.contentTypes.includes(file.type.toLowerCase()) || file.size === 0 || file.size > maxDocumentBytes) return false;
  const signature = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  if (extension === ".pdf") return startsWith(signature, [0x25, 0x50, 0x44, 0x46, 0x2d]);
  if (extension === ".doc" || extension === ".ppt") return startsWith(signature, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]);
  if ([".docx", ".pptx", ".zip"].includes(extension)) return startsWith(signature, [0x50, 0x4b]);
  return false;
}

export async function isAllowedVideo(file: File): Promise<boolean> {
  const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  if (!(extension in videoContentTypes) || file.type.toLowerCase() !== videoContentTypes[extension] || file.size === 0 || file.size > maxVideoBytes) return false;
  const signature = new Uint8Array(await file.slice(0, 8).arrayBuffer());
  if (extension === ".webm") return startsWith(signature, [0x1a, 0x45, 0xdf, 0xa3]);
  return signature.length >= 8 && new TextDecoder().decode(signature.slice(4, 8)) === "ftyp";
}

function startsWith(value: Uint8Array, prefix: number[]): boolean {
  return value.length >= prefix.length && prefix.every((byte, index) => value[index] === byte);
}
