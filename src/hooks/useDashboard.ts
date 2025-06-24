import { useEffect, useState } from "react";
import { WidgetInstance, WidgetType } from "@/lib/types";
import { getDashboard } from "@/services/dashboard";
import { nanoid } from "nanoid";
import {
  loadFromStorage,
  saveToStorage,
  clearStorage
} from "@/lib/storage";

export function useDashboard() {
  const [widgets, setWidgets] = useState<WidgetInstance[]>([]);

  // Load from localStorage first
  useEffect(() => {
    const local = loadFromStorage();
    if (local && Array.isArray(local)) {
      setWidgets(local);
    } else {
      getDashboard()
        .then((data) => {
          setWidgets(data);
          saveToStorage(data);
        })
        .catch(console.error);
    }
  }, []);

  // Save to localStorage on every update
  useEffect(() => {
    saveToStorage(widgets); // always persist, even empty array
  }, [widgets]);

  const addWidget = (type: WidgetType) => {
    const newWidget: WidgetInstance = {
      id: nanoid(),
      type,
      config: {}
    };
    setWidgets((prev) => [...prev, newWidget]);
  };

  const updateWidget = (id: string, config: Record<string, any>) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, config } : w))
    );
  };

  const removeWidget = (id: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id));
  };

  return {
    widgets,
    setWidgets,
    addWidget,
    updateWidget,
    removeWidget,
    clearStorage
  };
}
