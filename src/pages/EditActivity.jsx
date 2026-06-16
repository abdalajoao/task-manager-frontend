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

  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load existing activity
  useEffect(() => {
    getActivity(id).then((data) => {
      setActivity(data);
      // Restore existing photo preview if available
      if (data?.photo) setPhotoPreview(data.photo);
      setLoading(false);
    });
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity((prev) => ({ ...prev, [name]: value }));
  };

  // Handle photo selection and generate a base64 preview
  function handlePhotoChange(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
      setActivity((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  }

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
      <h1 className="text-3xl font-bold text-sky-400 mb-6">Edit Activity</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
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

        {/* Photo upload field */}
        <div>
          <label className="block mb-2 text-slate-300">
            Activity Photo (optional)
          </label>
          <label className="flex items-center gap-3 cursor-pointer w-fit">
            <span className="bg-slate-700 hover:bg-slate-600 text-sm px-4 py-2 rounded-lg transition">
              {photoPreview ? "Change photo" : "Choose photo"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
          {photoPreview && (
            <img
              src={photoPreview}
              alt="Activity preview"
              className="mt-3 rounded-xl object-cover w-full max-h-64"
            />
          )}
        </div>

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