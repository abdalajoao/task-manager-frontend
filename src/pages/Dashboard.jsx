import { useEffect, useState } from "react";
import { getActivities } from "../services/api";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import CompletedCarousel from "../components/CompletedCarousel";
import SearchBar from "../components/SearchBar";
import FilterModal from "../components/FilterModal";

export default function Dashboard() {
  const [activities, setActivities] = useState([]);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const [filters, setFilters] = useState({
    sort: "newest",
    onlyFavorites: false,
  });

  // Fetch all activities
  useEffect(() => {
    getActivities().then((data) =>
      setActivities(Array.isArray(data) ? data : data.activities || [])
    );
  }, []);

  const plannedActivities = activities
    .filter((a) => a.status === "planned")
    .filter((a) =>
      search.trim() === ""
        ? true
        : (a.name || "").toLowerCase().includes(search.toLowerCase())
    )
    .filter((a) => (filters.onlyFavorites ? a.favorite === true : true))
    .sort((a, b) => {
      if (filters.sort === "az")
        return (a.name || "").localeCompare(b.name || "");
      if (filters.sort === "za")
        return (b.name || "").localeCompare(a.name || "");
      if (filters.sort === "oldest")
        return new Date(a.date || 0) - new Date(b.date || 0);
      return new Date(b.date || 0) - new Date(a.date || 0);
    });

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-sky-400 mb-4">Dashboard</h1>

      <div className="mb-8">
        <SearchBar onSearch={setSearch} onFilterClick={() => setShowFilter(true)} />
      </div>

      {showFilter && (
        <FilterModal onClose={() => setShowFilter(false)} onApply={setFilters} />
      )}

      {/* Planned Activities */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-sky-400 mb-4">
          Planned Activities
        </h2>

        {plannedActivities.length === 0 ? (
          <p className="text-slate-400">No planned activities found.</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {plannedActivities.map((a) => (
              <div
                key={a.id}
                className="min-w-[250px] bg-slate-900 border border-slate-800 rounded-xl flex-shrink-0 overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold">{a.name || "Untitled"}</h3>
                    {a.favorite && (
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    )}
                  </div>

                  <p className="text-slate-400 text-sm">{a.type || "N/A"}</p>

                  <p className="text-xs text-slate-500">{a.date || ""}</p>

                  <div className="flex gap-3 mt-2">
                    {a.duration && (
                      <span className="text-xs text-slate-400">
                        ⏱ {a.duration}min
                      </span>
                    )}
                    {a.calories && (
                      <span className="text-xs text-slate-400">
                        🔥 {a.calories}kcal
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/activity/${a.id}`}
                    className="text-sky-400 text-sm mt-2 inline-block"
                  >
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Activities */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-sky-400 mb-4">
          Completed Activities
        </h2>
        <CompletedCarousel activities={activities} />
      </div>

      <Link
        to="/activities"
        className="text-sky-400 hover:text-sky-300 mt-4 inline-block"
      >
        View all activities →
      </Link>
    </div>
  );
}