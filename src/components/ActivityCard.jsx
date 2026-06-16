import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export default function ActivityCard({ activity }) {
  if (!activity) return null;

  return (
    <div className="min-w-[250px] bg-slate-900 border border-slate-800 rounded-xl shadow-md overflow-hidden">
      {/* Activity photo thumbnail — only renders if a photo exists */}
      {activity.photo && (
        <img
          src={activity.photo}
          alt={activity.name}
          className="w-full h-32 object-cover"
        />
      )}

      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-white">
            {activity.name || "Untitled"}
          </h3>
          {activity.favorite && (
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          )}
        </div>

        <p className="text-slate-400 text-sm mt-1">{activity.type || "N/A"}</p>

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
    </div>
  );
}