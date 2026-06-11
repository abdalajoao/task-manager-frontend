import { X } from "lucide-react";
import { useState } from "react";

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "A–Z", value: "az" },
  { label: "Z–A", value: "za" },
];

export default function FilterModal({ onClose, onApply }) {
  const [selectedSort, setSelectedSort] = useState("newest");
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const handleApply = () => {
    onApply({ sort: selectedSort, onlyFavorites });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-t-2xl p-6 shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-white">Filter Activities</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sort */}
        <div className="mb-4">
          <p className="text-sm font-medium text-slate-400 mb-2">Sort by</p>
          <div className="grid grid-cols-2 gap-2">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedSort(opt.value)}
                className={`py-2 rounded-xl text-sm border transition ${
                  selectedSort === opt.value
                    ? "bg-sky-500 text-white border-sky-500"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Only favorites toggle */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-medium text-slate-400">Only favorites</p>
          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`w-11 h-6 rounded-full transition-colors ${
              onlyFavorites ? "bg-sky-500" : "bg-slate-700"
            }`}
          >
            <span
              className={`block w-5 h-5 bg-white rounded-full shadow transform transition-transform mx-0.5 ${
                onlyFavorites ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedSort("newest");
              setOnlyFavorites(false);
            }}
            className="flex-1 py-2 rounded-xl border border-slate-700 text-sm text-slate-300 hover:bg-slate-800 transition"
          >
            Clear
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-2 rounded-xl bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 transition"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}