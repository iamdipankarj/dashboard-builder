import { apiBase } from "@/services/api";

export type WidgetType = 'weather' | 'stocks' | 'news';

export type WidgetMeta = {
  type: WidgetType;
  name: string;
  description: string;
};

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
