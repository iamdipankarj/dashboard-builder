import { lazy } from "react";

export const WidgetRenderer = {
  weather: lazy(() => import('@/components/widgets/WeatherWidget')),
  stock: lazy(() => import('@/components/widgets/StockWidget')),
  news: lazy(() => import('@/components/widgets/NewsWidget'))
};
