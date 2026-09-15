import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Video,
  FileText,
  ClipboardList,
  Users,
} from "lucide-react";
import { toast } from "react-toastify";

import {
  getBatchById,
} from "../../services/batch.service";

import type { Batch } from "../../types/batch";

export default function BatchDetails() {
  const { id } = useParams();

  const [batch, setBatch] =
    useState<Batch | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    async function loadBatch() {
      try {
        const data = await getBatchById(
          Number(id),
        );

        setBatch(data);
      } catch {
        toast.error(
          "Unable to load batch",
        );
      }
    }

    loadBatch();
  }, [id]);

  if (!batch) {
    return (
      <div className="p-8">
        Loading batch...
      </div>
    );
  }

  const sections = [
    {
      title: "Lecture Videos",
      description:
        "Upload and manage lecture videos.",
      icon: Video,
      href: `/mentor/batches/${batch.id}/videos`,
    },
    {
      title: "Lecture Notes",
      description:
        "Upload study material and lecture notes.",
      icon: FileText,
      href: `/mentor/batches/${batch.id}/notes`,
    },
    {
      title: "Assignments",
      description:
        "Create assignments and review submissions.",
      icon: ClipboardList,
      href: `/mentor/batches/${batch.id}/assignments`,
    },
    {
      title: "Students",
      description:
        "View students enrolled in this batch.",
      icon: Users,
      href: `/mentor/batches/${batch.id}/students`,
    },
  ];

  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div>
        <p className="text-sm font-medium text-blue-600">
          Batch
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          {batch.batchCode}
        </h1>

        <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
          <span>
            Starts{" "}
            {new Date(
              batch.startDate,
            ).toLocaleDateString()}
          </span>

          {batch.endDate && (
            <span>
              Ends{" "}
              {new Date(
                batch.endDate,
              ).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {sections.map((section) => {
          const Icon = section.icon;

          return (
            <Link
              key={section.title}
              to={section.href}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Icon size={23} />
              </div>

              <h2 className="text-lg font-semibold">
                {section.title}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {section.description}
              </p>

              <span className="mt-5 inline-block text-sm font-semibold text-blue-600">
                Manage →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}