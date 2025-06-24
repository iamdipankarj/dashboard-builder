import { useDashboard } from "@/hooks/useDashboard";
import { getAvailableWidgets } from "@/services/widgets";
import { useQuery } from "@tanstack/react-query";
import { useSaveDashboard } from "@/hooks/useSaveDashboard";
import DashboardGrid from "@/components/DashboardGrid";
import { Button } from "@/components/ui/button";
import { WidgetType } from "@/lib/types";
import { WandSparkles } from "lucide-react";

export default function Dashboard() {
  const {
    widgets,
    setWidgets,
    addWidget,
    updateWidget,
    removeWidget
  } = useDashboard();

  const { data: widgetTypes = [] } = useQuery({
    queryKey: ["widget-types"],
    queryFn: getAvailableWidgets
  });

  const saveMutation = useSaveDashboard();

  const handleAddWidget = (type: WidgetType) => {
    addWidget(type);
    const newLayout = [...widgets, { id: "temp", type, config: {} }];
    saveMutation.mutate(newLayout);
  };

  const handleReorder = (newOrder: typeof widgets) => {
    setWidgets(newOrder);
    saveMutation.mutate(newOrder);
  };

  const handleUpdateConfig = (id: string, config: any) => {
    updateWidget(id, config);
    const updated = widgets.map(w =>
      w.id === id ? { ...w, config } : w
    );
    saveMutation.mutate(updated);
  };

  const handleRemove = (id: string) => {
    const updated = widgets.filter(w => w.id !== id);
    removeWidget(id);
    saveMutation.mutate(updated);
  };

  const makeRandomOrder = () => {
    const suggestions = widgetTypes.map(w => ({
      id: crypto.randomUUID(),
      type: w.type,
      config: {}
    }));
    setWidgets(suggestions);
    saveMutation.mutate(suggestions);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap gap-4">
        {widgetTypes.map(w => (
          <Button key={w.type} size='sm' onClick={() => handleAddWidget(w.type)}>
            Add {w.name}
          </Button>
        ))}
        <Button variant="outline" size='sm' onClick={makeRandomOrder}>
          <WandSparkles /> AI Suggest
        </Button>
      </div>

      <DashboardGrid
        widgets={widgets}
        onReorder={handleReorder}
        onRemove={handleRemove}
        onSaveConfig={handleUpdateConfig}
      />
    </div>
  );
}
