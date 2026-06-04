import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Activities from "./pages/Activities";
import ActivityDetails from "./pages/ActivityDetails";
import AddActivity from "./pages/AddActivity";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="max-w-6xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/activity/:id" element={<ActivityDetails />} />
          <Route path="/add" element={<AddActivity />} />
        </Routes>
      </main>
    </div>
  );
}