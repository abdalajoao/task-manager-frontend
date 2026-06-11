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
      setActivities(
        Array.isArray(data)
          ? data
          : data.activities || []
      )
    );
  }, []);

  const total = activities.length;

  const completedActivities = activities.filter(
    (a) => a.status === "completed"
  );

  const plannedActivities = activities
    .filter((a) => a.status === "planned")
    .filter((a) =>
      search.trim() === ""
        ? true
        : (a.name || "")
            .toLowerCase()
            .includes(search.toLowerCase())
    )
    .filter((a) =>
      filters.onlyFavorites
        ? a.favorite === true
        : true
    )
    .sort((a, b) => {
      if (filters.sort === "az") {
        return (a.name || "").localeCompare(
          b.name || ""
        );
      }

      if (filters.sort === "za") {
        return (b.name || "").localeCompare(
          a.name || ""
        );
      }

      if (filters.sort === "oldest") {
        return (
          new Date(a.date || 0) -
          new Date(b.date || 0)
        );
      }

      return (
        new Date(b.date || 0) -
        new Date(a.date || 0)
      );
    });

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-sky-400 mb-4">
        Dashboard
      </h1>

      <div className="mb-8">
        <SearchBar
          onSearch={setSearch}
          onFilterClick={() =>
            setShowFilter(true)
          }
        />
      </div>

      {showFilter && (
        <FilterModal
          onClose={() => setShowFilter(false)}
          onApply={setFilters}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <p className="text-slate-400">Total</p>
          <p className="text-3xl font-bold text-sky-400">
            {total}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <p className="text-slate-400">Planned</p>
          <p className="text-3xl font-bold text-sky-400">
            {plannedActivities.length}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <p className="text-slate-400">Completed</p>
          <p className="text-3xl font-bold text-sky-400">
            {completedActivities.length}
          </p>
        </div>
      </div>

      <CompletedCarousel activities={activities} />

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-sky-400 mb-4">
          Planned Activities
        </h2>

        {plannedActivities.length === 0 ? (
          <p className="text-slate-400">
            No planned activities found.
          </p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {plannedActivities.map((a) => (
              <div
                key={a.id}
                className="min-w-[250px] bg-slate-900 border border-slate-800 rounded-xl p-4 flex-shrink-0"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-bold">
                    {a.name || "Untitled"}
                  </h3>

                  {a.favorite && (
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  )}
                </div>

                <p className="text-slate-400 text-sm">
                  {a.type || "N/A"}
                </p>

                <p className="text-xs text-slate-500">
                  {a.date || ""}
                </p>

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
            ))}
          </div>
        )}
      </div>

      <Link
        to="/activities"
        className="text-sky-400 hover:text-sky-300 mt-8 inline-block"
      >
        View all activities →
      </Link>
    </div>
  );
}