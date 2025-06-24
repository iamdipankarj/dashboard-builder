export type WidgetType = 'weather' | 'stocks' | 'news';

export type WidgetMeta = {
  type: WidgetType;
  name: string;
  description: string;
};

export const getAvailableWidgets = async (): Promise<WidgetMeta[]> => {
  return [
    { type: 'weather', name: 'Weather', description: 'Shows weather' },
    { type: 'stocks', name: 'Stocks', description: 'Tracks stock prices' },
    { type: 'news', name: 'News', description: 'Top news headlines' },
  ];
};
