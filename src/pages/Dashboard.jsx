import { useEffect, useState } from "react";
import { getActivities } from "../services/api";
import { Link } from "react-router-dom";
import CompletedCarousel from "../components/CompletedCarousel";

export default function Dashboard() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getActivities().then((data) =>
      setActivities(data.activities || [])
    );
  }, []);

  const total = activities.length;

  const done = activities.filter(
    (a) =>
      a.status?.toLowerCase() === "done" ||
      a.status?.toLowerCase() === "completed"
  ).length;

  const planned = activities.filter(
    (a) => a.status?.toLowerCase() === "planned"
  ).length;

  const completedActivities = activities.filter(
    (a) =>
      a.status?.toLowerCase() === "done" ||
      a.status?.toLowerCase() === "completed"
  );

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-sky-400 mb-8">
        Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <p className="text-slate-400">Total</p>
          <p className="text-3xl font-bold text-sky-400">{total}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <p className="text-slate-400">Planned</p>
          <p className="text-3xl font-bold text-sky-400">{planned}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <p className="text-slate-400">Done</p>
          <p className="text-3xl font-bold text-sky-400">{done}</p>
        </div>
      </div>

      {/* CAROUSEL DE COMPLETAS */}
      <CompletedCarousel activities={completedActivities} />

      <div className="mt-10">
        <Link
          to="/activities"
          className="text-sky-400 hover:text-sky-300"
        >
          View all activities →
        </Link>
      </div>
    </div>
  );
}