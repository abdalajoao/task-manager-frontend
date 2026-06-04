import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createActivity } from "../services/api";

export default function AddActivity() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    type: "",
    date: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await createActivity(form);

    if (result) {
      navigate("/activities");
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/activities" className="text-sky-400">
          ← Back
        </Link>

        <h1 className="text-3xl font-bold mt-2">
          Add Activity
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4"
      >
        <input
          name="name"
          placeholder="Activity name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-800"
        />

        <input
          name="type"
          placeholder="Type"
          value={form.type}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-800"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-800"
        />

        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded"
        >
          Save Activity
        </button>
      </form>
    </div>
  );
}