import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-sky-400">
            Task Manager
          </h1>
          <p className="text-slate-400 text-sm">
            Organize your activities
          </p>
        </div>

        <div className="flex gap-4">
          <Link
            to="/"
            className={`px-3 py-2 rounded-lg ${
              isActive("/")
                ? "bg-sky-500 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/activities"
            className={`px-3 py-2 rounded-lg ${
              isActive("/activities")
                ? "bg-sky-500 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            Activities
          </Link>

          <Link
            to="/add"
            className={`px-3 py-2 rounded-lg ${
              isActive("/add")
                ? "bg-sky-500 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            Add Activity
          </Link>
        </div>
      </div>
    </nav>
  );
}