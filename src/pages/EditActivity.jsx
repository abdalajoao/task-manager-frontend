import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getActivity, updateActivity } from "../services/api";

export default function EditActivity() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState({
    name: "",
    type: "",
    status: "planned",
    date: "",
    duration: "",
    calories: "",
    notes: "",
    favorite: false,
  });

  const [loading, setLoading] = useState(true);

  // Load existing activity
  useEffect(() => {
    getActivity(id).then((data) => {
      setActivity(data);
      setLoading(false);
    });
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setActivity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateActivity(id, activity);

    navigate(`/activity/${id}`);
  };

  if (loading) {
    return <div className="p-6 text-slate-400">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-sky-400 mb-6">
        Edit Activity
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-xl"
      >
        <input
          name="name"
          value={activity.name || ""}
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-900 border border-slate-700"
          placeholder="Name"
        />

        <input
          name="type"
          value={activity.type || ""}
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-900 border border-slate-700"
          placeholder="Type"
        />

        <input
          name="date"
          value={activity.date || ""}
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-900 border border-slate-700"
          type="date"
        />

        <input
          name="duration"
          value={activity.duration || ""}
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-900 border border-slate-700"
          placeholder="Duration"
        />

        <input
          name="calories"
          value={activity.calories || ""}
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-900 border border-slate-700"
          placeholder="Calories"
        />

        <textarea
          name="notes"
          value={activity.notes || ""}
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-900 border border-slate-700"
          placeholder="Notes"
        />

        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded text-white"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}