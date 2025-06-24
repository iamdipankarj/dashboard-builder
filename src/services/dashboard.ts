import { WidgetInstance } from "@/lib/types";

const API_URL = "http://localhost:8000/api/dashboard"; // adjust if needed

export async function getDashboard(): Promise<WidgetInstance[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch dashboard");
  return res.json();
}

export async function saveDashboard(layout: WidgetInstance[]) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json'
    },
    body: JSON.stringify({ layout })
  });

  if (!res.ok) {
    throw new Error("Failed to save dashboard");
  }

  return res.json();
}
