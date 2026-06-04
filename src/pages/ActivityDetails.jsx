import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActivity } from "../services/api";

export default function ActivityDetails() {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActivity(id).then((data) => {
      setActivity(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-slate-400">
        Loading...
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="p-6 text-red-400">
        Activity not found
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-sky-400 mb-6">
        {activity.name || "Untitled"}
      </h1>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-2">
        <p>Type: {activity.type || "N/A"}</p>
        <p>Status: {activity.status || "planned"}</p>
        <p>Date: {activity.date || "N/A"}</p>
        <p>Notes: {activity.notes || "No notes"}</p>
      </div>
    </div>
  );
}