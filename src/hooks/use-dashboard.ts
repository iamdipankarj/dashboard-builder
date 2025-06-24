import { useEffect, useState } from "react";
import { WidgetInstance, WidgetType } from "@/lib/types";
import { nanoid } from "nanoid";

export function useDashboard() {
  const [widgets, setWidgets] = useState<WidgetInstance[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("dashboard");
    if (stored) {
      setWidgets(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboard", JSON.stringify(widgets));
  }, [widgets]);

  const addWidget = (type: WidgetType) => {
    const newWidget: WidgetInstance = {
      id: nanoid(),
      type,
      config: {}
    };
    setWidgets(prev => [...prev, newWidget]);
  };

  const updateWidget = (id: string, config: Record<string, any>) => {
    setWidgets(prev =>
      prev.map(w => (w.id === id ? { ...w, config } : w))
    );
  };

  const removeWidget = (id: string) => {
    setWidgets(prev => prev.filter(w => w.id !== id));
  };

  return {
    widgets,
    addWidget,
    updateWidget,
    removeWidget,
    setWidgets
  };
}
