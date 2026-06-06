import { useEffect, useState } from "react";
import { getActivities } from "../services/api";
import { Link } from "react-router-dom";
import CompletedCarousel from "../components/CompletedCarousel";

export default function Dashboard() {
  // ─── State ───────────────────────────────────────────────────
  const [activities, setActivities] = useState([]);

  // ─── Fetch all activities from the API on mount ───────────────
  useEffect(() => {
    getActivities().then((data) =>
      setActivities(Array.isArray(data) ? data : data.activities || [])
    );
  }, []);

  // ─── Derived data ─────────────────────────────────────────────
  const total = activities.length;
  const completedActivities = activities.filter((a) => a.status === "completed");
  const plannedActivities = activities.filter((a) => a.status === "planned");

  // ─── Render ───────────────────────────────────────────────────
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-sky-400 mb-8">Dashboard</h1>

      {/* ── Stats cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <p className="text-slate-400">Total</p>
          <p className="text-3xl font-bold text-sky-400">{total}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <p className="text-slate-400">Planned</p>
          <p className="text-3xl font-bold text-sky-400">{plannedActivities.length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <p className="text-slate-400">Completed</p>
          <p className="text-3xl font-bold text-sky-400">{completedActivities.length}</p>
        </div>
      </div>

      {/* ── Completed activities carousel ── */}
      {/* CompletedCarousel receives all activities and filters internally by status === "completed" */}
      <CompletedCarousel activities={activities} />

      {/* ── Planned activities section ── */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-sky-400 mb-4">Planned Activities</h2>

        {/* Show message if there are no planned activities */}
        {plannedActivities.length === 0 ? (
          <p className="text-slate-400">No planned activities yet.</p>
        ) : (
          // Horizontal scrollable row of planned activity cards
          <div className="flex gap-4 overflow-x-auto pb-4">
            {plannedActivities.map((a) => (
              <div
                key={a.id}
                className="min-w-[250px] bg-slate-900 border border-slate-800 rounded-xl p-4 flex-shrink-0"
              >
                {/* Activity name */}
                <h3 className="font-bold">{a.name || "Untitled"}</h3>

                {/* Activity type */}
                <p className="text-slate-400 text-sm">{a.type || "N/A"}</p>

                {/* Activity date */}
                <p className="text-xs text-slate-500">{a.date || ""}</p>

                {/* Optional stats: duration and calories */}
                <div className="flex gap-3 mt-2">
                  {a.duration && (
                    <span className="text-xs text-slate-400">⏱ {a.duration}min</span>
                  )}
                  {a.calories && (
                    <span className="text-xs text-slate-400">🔥 {a.calories}kcal</span>
                  )}
                </div>

                {/* Link to activity detail page */}
                <Link
                  to={`/activity/${a.id}`}
                  className="text-sky-400 text-sm mt-2 inline-block"
                >
                  View →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Link to full activities list ── */}
      <Link
        to="/activities"
        className="text-sky-400 hover:text-sky-300 mt-8 inline-block"
      >
        View all activities →
      </Link>
    </div>
  );
}