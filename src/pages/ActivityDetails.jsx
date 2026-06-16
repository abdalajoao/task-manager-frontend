import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getActivity, deleteActivity, toggleFavorite } from "../services/api";
import { Trash2, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function ActivityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Fetch activity on page load
  useEffect(() => {
    getActivity(id).then((data) => {
      setActivity(data);
      setIsFavorite(data?.favorite || false);
      setLoading(false);
    });
  }, [id]);

  // Delete activity
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this activity?"))
      return;
    setDeleting(true);
    await deleteActivity(id);
    navigate("/activities");
  };

  // Toggle favorite status and persist to API
  const handleFavorite = async () => {
    const next = !isFavorite;
    setIsFavorite(next);
    const updated = await toggleFavorite(id, next);
    if (updated) setActivity(updated);
  };

  if (loading) {
    return <div className="p-6 text-slate-400">Loading...</div>;
  }

  if (!activity) {
    return <div className="p-6 text-red-400">Activity not found</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-sky-400">
          {activity.name || "Untitled"}
        </h1>

        <div className="flex items-center gap-3">
          <button
            onClick={handleFavorite}
            aria-label="Toggle favorite"
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`w-7 h-7 transition-colors ${
                isFavorite
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-slate-500 hover:text-yellow-300"
              }`}
            />
          </button>

          <Link
            to={`/activity/edit/${id}`}
            className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-xl text-sm font-medium"
          >
            Update
          </Link>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
          >
            <Trash2 className="w-4 h-4" />
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-2">
        {/* Activity photo — full width, only renders if a photo exists */}
        {activity.photo && (
          <img
            src={activity.photo}
            alt={activity.name}
            className="w-full max-h-80 object-cover rounded-xl mb-4"
          />
        )}

        <p>Type: {activity.type || "N/A"}</p>
        <p>Status: {activity.status || "planned"}</p>
        <p>Date: {activity.date || "N/A"}</p>

        {activity.duration && <p>Duration: {activity.duration} min</p>}
        {activity.calories && <p>Calories: {activity.calories} kcal</p>}

        <p>Notes: {activity.notes || "No notes"}</p>
      </div>
    </div>
  );
}