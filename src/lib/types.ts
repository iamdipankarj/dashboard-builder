export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export type WidgetType = 'weather' | 'stocks' | 'news';

export type WidgetInstance = {
  id: string;
  type: WidgetType;
  config: Record<string, any>;
};
