import { useDashboard } from "@/hooks/use-dashboard";
import WidgetCard from "@/components/widget-card";
import { getAvailableWidgets } from "@/services/widgets";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const {
    widgets,
    addWidget,
    updateWidget,
    removeWidget
  } = useDashboard();

  const { data: widgetTypes = [] } = useQuery({
    queryKey: ['widget-types'],
    queryFn: getAvailableWidgets
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Smart Dashboard</h1>

      <div className="flex space-x-4">
        {widgetTypes.map(w => (
          <Button key={w.type} onClick={() => addWidget(w.type)}>
            Add {w.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {widgets.map(widget => (
          <WidgetCard
            key={widget.id}
            widget={widget}
            onRemove={() => removeWidget(widget.id)}
            onSave={(config) => updateWidget(widget.id, config)}
          />
        ))}
      </div>
    </div>
  );
}
