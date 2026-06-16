import { Link } from "react-router-dom";

export default function CompletedCarousel({ activities }) {
  const completed = activities.filter(
    (a) => a.status === "completed"
  );

  if (!completed.length) {
    return (
      <p className="text-slate-400 mt-6">
        No completed activities yet.
      </p>
    );
  }

  return (
    <div className="mt-10">
      <div className="flex gap-4 overflow-x-auto pb-4">
        {completed.map((a) => (
          <div
            key={a.id}
            className="min-w-[250px] bg-slate-900 border border-slate-800 rounded-xl p-4 flex-shrink-0"
          >
            <h3 className="font-bold">
              {a.name || "Untitled"}
            </h3>

            <p className="text-slate-400 text-sm">
              {a.type || "N/A"}
            </p>

            <p className="text-xs text-slate-500">
              {a.date || ""}
            </p>

            <Link
              to={`/activity/${a.id}`}
              className="text-sky-400 text-sm mt-2 inline-block"
            >
              View →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}