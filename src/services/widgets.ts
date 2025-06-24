import { WidgetMeta } from "@/lib/types";
import { apiBase } from "@/services/api";

export const getAvailableWidgets = async (): Promise<WidgetMeta[]> => {
  const res = await fetch(`${apiBase}/api/widgets`, {
    headers: {
      'Accept': 'application/json',
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch widget list");
  }

  return res.json();
};
