export type WidgetType = 'weather' | 'stocks' | 'news';

export type WidgetMeta = {
  type: WidgetType;
  name: string;
  description: string;
};

const API_BASE = 'http://localhost:8000';

export const getAvailableWidgets = async (): Promise<WidgetMeta[]> => {
  const res = await fetch(`${API_BASE}/api/widgets`, {
    headers: {
      'Accept': 'application/json',
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch widget list");
  }

  return res.json();
};
