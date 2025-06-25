export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export type WidgetType = 'weather' | 'stock' | 'news';

export type WidgetInstance = {
  id: string;
  type: WidgetType;
  config: Record<string, any>;
};

export type WidgetMeta = {
  type: WidgetType;
  name: string;
  description: string;
};
