import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActivity } from "../services/api";

export default function ActivityDetails() {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    getActivity(id).then(setActivity);
  }, [id]);

  if (!activity) {
    return (
      <div className="p-6 text-slate-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-sky-400 mb-6">
        {activity.name}
      </h1>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-2">
        <p><span className="text-slate-400">Type:</span> {activity.type}</p>
        <p><span className="text-slate-400">Status:</span> {activity.status}</p>
        <p><span className="text-slate-400">Date:</span> {activity.date}</p>
        <p><span className="text-slate-400">Notes:</span> {activity.notes}</p>
      </div>
    </div>
  );
}