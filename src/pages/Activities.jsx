import { useEffect, useState } from "react";
import { getActivities } from "../services/api";
import { Link } from "react-router-dom";

export default function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getActivities().then((data) => setActivities(data.activities || []));
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-sky-400">
          Activities
        </h1>

        <Link
          to="/add"
          className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-lg"
        >
          + Add
        </Link>
      </div>

      <div className="space-y-4">
        {activities.map((a) => (
          <div
            key={a.id}
            className="bg-slate-900 border border-slate-800 p-5 rounded-xl"
          >
            <h3 className="text-xl font-bold">{a.name}</h3>
            <p className="text-slate-400">{a.type}</p>
            <p className="text-sm text-slate-500">{a.date}</p>

            <Link
              to={`/activity/${a.id}`}
              className="text-sky-400 text-sm mt-2 inline-block"
            >
              View details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}