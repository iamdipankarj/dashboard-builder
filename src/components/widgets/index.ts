import { NewsWidget } from '@/components/widgets/NewsWidget';
import { StocksWidget } from '@/components/widgets/StocksWidget';
import { WeatherWidget } from '@/components/widgets/WeatherWidget';

export const WidgetRenderer = {
  weather: WeatherWidget,
  stocks: StocksWidget,
  news: NewsWidget
};
