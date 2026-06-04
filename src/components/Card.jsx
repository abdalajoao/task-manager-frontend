const BASE_URL = "https://YOUR-BACKEND-URL.onrender.com";

export async function getActivities() {
  const res = await fetch(`${BASE_URL}/activities`);
  return res.json();
}

export async function getActivity(id) {
  const res = await fetch(`${BASE_URL}/activities/${id}`);
  return res.json();
}

export async function createActivity(data) {
  const res = await fetch(`${BASE_URL}/activities`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateActivity(id, data) {
  const res = await fetch(`${BASE_URL}/activities/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteActivity(id) {
  const res = await fetch(`${BASE_URL}/activities/${id}`, {
    method: "DELETE",
  });
  return res.json();
}