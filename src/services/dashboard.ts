import { WidgetInstance } from "@/lib/types";

export async function getDashboard(): Promise<WidgetInstance[]> {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/dashboard`);
  if (!res.ok) throw new Error("Failed to fetch dashboard");
  return res.json();
}

export async function saveDashboard(layout: WidgetInstance[]) {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/dashboard`, {
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
