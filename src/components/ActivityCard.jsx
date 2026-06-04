import { Link } from "react-router-dom";

export default function ActivityCard({ activity }) {
  // 🔒 proteção contra crash
  if (!activity) return null;

  return (
    <div className="min-w-[250px] bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md">
      <h3 className="text-xl font-bold text-white">
        {activity.name || "Untitled"}
      </h3>

      <p className="text-slate-400 text-sm mt-1">
        {activity.type || "N/A"}
      </p>

      <p className="text-slate-500 text-xs mt-1">
        {activity.date || "No date"}
      </p>

      <span
        className={`inline-block mt-3 px-2 py-1 text-xs rounded ${
          activity.status === "done"
            ? "bg-green-600/20 text-green-400"
            : "bg-yellow-600/20 text-yellow-400"
        }`}
      >
        {activity.status || "planned"}
      </span>

      <Link
        to={`/activity/${activity.id}`}
        className="block mt-3 text-sky-400 text-sm hover:text-sky-300"
      >
        View details →
      </Link>
    </div>
  );
}