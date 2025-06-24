import { lazy } from "react";

export const WidgetRenderer = {
  weather: lazy(() => import('@/components/widgets/WeatherWidget')),
  stocks: lazy(() => import('@/components/widgets/StocksWidget')),
  news: lazy(() => import('@/components/widgets/NewsWidget'))
};
