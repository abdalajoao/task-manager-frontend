const BASE_URL = import.meta.env.VITE_API_URL;


console.log("BASE_URL =", BASE_URL);
/* ───────────────────────────────
   GET ALL ACTIVITIES
─────────────────────────────── */
export async function getActivities() {
  try {
    const res = await fetch(`${BASE_URL}/activities`);
    if (!res.ok) throw new Error("Failed to fetch activities");
    return await res.json();
  } catch (error) {
    console.error("getActivities error:", error);
    return { activities: [] };
  }
}

/* ───────────────────────────────
   GET ACTIVITY BY ID
─────────────────────────────── */
export async function getActivity(id) {
  try {
    const res = await fetch(`${BASE_URL}/activities/${id}`);
    if (!res.ok) throw new Error("Activity not found");
    return await res.json();
  } catch (error) {
    console.error("getActivity error:", error);
    return null;
  }
}

/* ───────────────────────────────
   CREATE ACTIVITY
─────────────────────────────── */
export async function createActivity(data) {
  try {
    const res = await fetch(`${BASE_URL}/activities`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create activity");
    return await res.json();
  } catch (error) {
    console.error("createActivity error:", error);
    return null;
  }
}

/* ───────────────────────────────
   UPDATE ACTIVITY
─────────────────────────────── */
export async function updateActivity(id, data) {
  try {
    const res = await fetch(`${BASE_URL}/activities/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update activity");
    return await res.json();
  } catch (error) {
    console.error("updateActivity error:", error);
    return null;
  }
}

/* ───────────────────────────────
   DELETE ACTIVITY
─────────────────────────────── */
export async function deleteActivity(id) {
  try {
    const res = await fetch(`${BASE_URL}/activities/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete activity");
    return await res.json();
  } catch (error) {
    console.error("deleteActivity error:", error);
    return null;
  }
}

/* ───────────────────────────────
   TOGGLE FAVORITE
   Sends a PATCH request to update the favorite field on an activity
─────────────────────────────── */
export async function toggleFavorite(id, isFavorite) {
  try {
    const res = await fetch(`${BASE_URL}/activities/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ favorite: isFavorite }),
    });
    if (!res.ok) throw new Error("Failed to update favorite status");
    return await res.json();
  } catch (error) {
    console.error("toggleFavorite error:", error);
    return null;
  }
}