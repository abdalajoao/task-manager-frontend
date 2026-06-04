import { Link } from "react-router-dom";

export default function AddActivity() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link
            to="/activities"
            className="text-sky-400 hover:text-sky-300"
          >
            ← Back to Activities
          </Link>

          <h1 className="text-4xl font-bold mt-3">
            Add Activity
          </h1>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <form className="space-y-4">
          <div>
            <label className="block mb-2">Activity Name</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
            />
          </div>

          <div>
            <label className="block mb-2">Type</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
            />
          </div>

          <div>
            <label className="block mb-2">Date</label>
            <input
              type="date"
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