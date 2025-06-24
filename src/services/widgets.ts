export type WidgetType = 'weather' | 'stocks' | 'news';

export type WidgetMeta = {
  type: WidgetType;
  name: string;
  description: string;
};

export const getAvailableWidgets = async (): Promise<WidgetMeta[]> => {
  const res = await fetch('https://larakit.dipankarjana.com/api/widgets', {
    headers: {
      'Accept': 'application/json',
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch widget list");
  }

  return res.json();
};
