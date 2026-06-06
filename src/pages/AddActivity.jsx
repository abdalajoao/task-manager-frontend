
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createActivity } from "../services/api";

export default function AddActivity() {
  const navigate = useNavigate();

  const [activity, setActivity] = useState({
    name: "",
    type: "",
    date: "",
    status: "planned",
    notes: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setActivity({
      ...activity,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await createActivity(activity);

    navigate("/activities");
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link to="/activities" className="text-sky-400 hover:text-sky-300">
            ← Back to Activities
          </Link>

          <h1 className="text-4xl font-bold mt-3">Add Activity</h1>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Activity Name</label>
            <input
              name="name"
              value={activity.name}
              onChange={handleChange}
              type="text"
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
            />
          </div>

          <div>
            <label className="block mb-2">Type</label>
            <input
              name="type"
              value={activity.type}
              onChange={handleChange}
              type="text"
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
            />
          </div>

          <div>
            <label className="block mb-2">Date</label>
            <input
              name="date"
              value={activity.date}
              onChange={handleChange}
              type="date"
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
            />
          </div>

          <div>
            <label className="block mb-2">Status</label>
            <select
              name="status"
              value={activity.status}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
            >
              <option value="planned">Planned</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Notes</label>
            <textarea
              name="notes"
              value={activity.notes}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
            />
          </div>

          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-600 px-5 py-3 rounded-lg"
          >
            Save Activity
          </button>
        </form>
      </div>
    </div>
  );
}