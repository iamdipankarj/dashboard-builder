import { useDashboard } from "@/hooks/useDashboard";
import { getAvailableWidgets } from "@/services/widgets";
import { useQuery } from "@tanstack/react-query";
import { useSaveDashboard } from "@/hooks/useSaveDashboard";
import DashboardGrid from "@/components/DashboardGrid";
import { Button } from "@/components/ui/button";
import { WidgetInstance, WidgetType } from "@/lib/types";
import { Loader2, WandSparkles } from "lucide-react";
import { WidgetChatbot } from "@/components/WidgetChatbot";
import { nanoid } from "nanoid";

export default function Dashboard() {
  const {
    widgets,
    setWidgets,
    addWidget,
    updateWidget,
    removeWidget
  } = useDashboard();

  const { data: widgetTypes = [], isLoading } = useQuery({
    queryKey: ["widget-types"],
    queryFn: getAvailableWidgets
  });

  const saveMutation = useSaveDashboard();

  const handleAddWidget = (type: WidgetType) => {
    const newWidget: WidgetInstance = {
      id: nanoid(),
      type,
      config: {}
    };
    addWidget(type); // or setWidgets([...widgets, newWidget])
    saveMutation.mutate([...widgets, newWidget]);
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

  const handleInstruction = (inst: {
    action: "add" | "remove" | "update" | "clear";
    widget: string;
    config?: Record<string, any>;
  }) => {
    if (inst.action === "add") {
      const newWidget: WidgetInstance = {
        id: nanoid(),
        type: inst.widget as WidgetType,
        config: inst.config || {}
      };
      setWidgets(prev => {
        const updated = [...prev, newWidget];
        saveMutation.mutate(updated); // mutate only after building from latest
        return updated;
      });
    }

    else if (inst.action === "remove") {
      setWidgets(prev => {
        const updated = prev.filter(w => w.type !== inst.widget);
        saveMutation.mutate(updated);
        return updated;
      });
    }

    else if (inst.action === "update") {
      setWidgets(prev => {
        const updated = prev.map(w =>
          w.type === inst.widget
            ? { ...w, config: inst.config || {} }
            : w
        );
        saveMutation.mutate(updated);
        return updated;
      });
    }

    else if (inst.action === "clear") {
      setWidgets([]);
      saveMutation.mutate([]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center">
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="animate-spin" />
            <span className="text-sm">Loading available widgets...</span>
          </div>
        ) : (
          <>
            {widgetTypes.map(w => (
              <Button key={w.type} onClick={() => handleAddWidget(w.type)}>
                Add {w.name}
              </Button>
            ))}
            <Button variant="outline" onClick={makeRandomOrder}>
              <WandSparkles /> AI Suggest
            </Button>
            <WidgetChatbot onInstruction={handleInstruction} />
          </>
        )}
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
