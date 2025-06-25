import { WidgetInstance } from "@/lib/types";
import { apiBase } from "@/services/api";

const api = `${apiBase}/api/dashboard`

export async function getDashboard(): Promise<WidgetInstance[]> {
  const res = await fetch(api);
  if (!res.ok) throw new Error("Failed to fetch dashboard");
  return res.json();
}

export async function saveDashboard(layout: WidgetInstance[]) {
  const res = await fetch(api, {
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
