import { useEffect, useState } from "react";
import { getActivities } from "../services/api";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export default function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getActivities().then((data) =>
      setActivities(
        Array.isArray(data)
          ? data
          : data.activities || []
      )
    );
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
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">
                  {a.name || "Untitled"}
                </h3>

                <p className="text-slate-400">
                  {a.type || "N/A"}
                </p>

                <p className="text-sm text-slate-500">
                  {a.date || "No date"}
                </p>
              </div>

              {a.favorite && (
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              )}
            </div>

            <div className="mt-3">
              <span
                className={`inline-block px-2 py-1 text-xs rounded ${
                  a.status === "completed"
                    ? "bg-green-600/20 text-green-400"
                    : "bg-yellow-600/20 text-yellow-400"
                }`}
              >
                {a.status}
              </span>
            </div>

            <Link
              to={`/activity/${a.id}`}
              className="text-sky-400 text-sm mt-3 inline-block hover:text-sky-300"
            >
              View details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}