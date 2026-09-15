import { CalendarDays, Users } from "lucide-react";
import { toast } from "react-toastify";
import type { Batch } from "../../types/batch";

// Handle the enrollment logic (pending) and display batch information.

const batches: Batch[] = [
  {
    id: 1,
    name: "ASP.NET Morning Batch",
    courseName: "Full Stack ASP.NET Core & React",
    startDate: "2026-09-15",
    endDate: "2026-12-15",
    capacity: 40,
    enrolled: 27,
  },
  {
    id: 2,
    name: "React Weekend Batch",
    courseName: "Advanced React Development",
    startDate: "2026-09-20",
    endDate: "2026-11-20",
    capacity: 30,
    enrolled: 18,
  },
];

export default function BatchEnrollment() {
  const handleEnroll = (batchId: number) => {
    console.log("Enroll:", batchId);
    toast.success("Enrollment request submitted");
  };

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Batch Enrollment
        </h1>

        <p className="mt-2 text-slate-500">
          Choose a batch and enroll in your preferred schedule.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {batches.map((batch) => {
          const available =
            batch.capacity - batch.enrolled;

          return (
            <div
              key={batch.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    {batch.name}
                  </h2>

                  <p className="mt-1 text-blue-600">
                    {batch.courseName}
                  </p>
                </div>

                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                  {available} seats left
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="flex gap-3">
                  <CalendarDays className="text-slate-400" />

                  <div>
                    <p className="text-xs text-slate-500">
                      Duration
                    </p>

                    <p className="text-sm font-medium">
                      {batch.startDate} → {batch.endDate}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Users className="text-slate-400" />

                  <div>
                    <p className="text-xs text-slate-500">
                      Enrollment
                    </p>

                    <p className="text-sm font-medium">
                      {batch.enrolled}/{batch.capacity}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleEnroll(batch.id)}
                className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Enroll in Batch
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}