import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

export default function SearchBar({ onSearch, onFilterClick }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex items-center flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
        <Search className="text-gray-400 w-4 h-4 mr-2 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Pesquisar atividade..."
          className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
        />
      </div>
      <button
        onClick={onFilterClick}
        className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm text-sm text-gray-600 hover:bg-gray-50 transition"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filtrar
      </button>
    </div>
  );
}