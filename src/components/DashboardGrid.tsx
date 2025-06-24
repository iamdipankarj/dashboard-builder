import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { WidgetInstance } from "@/lib/types";
import WidgetCard from "@/components/WidgetCard";

type Props = {
  widgets: WidgetInstance[];
  onReorder: (newOrder: WidgetInstance[]) => void;
  onSaveConfig: (id: string, config: any) => void;
  onRemove: (id: string) => void;
};

function SortableItem({
  widget,
  onRemove,
  onSaveConfig
}: {
  widget: WidgetInstance;
  onRemove: () => void;
  onSaveConfig: (config: any) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    boxShadow: isDragging ? "0 0 0 2px #3b82f6" : undefined,
    zIndex: isDragging ? 999 : 1,
    pointerEvents: isDragging ? "none" : "auto",
    position: isDragging ? 'relative' : 'static'
  } as any;

  return (
    <div ref={setNodeRef} style={style}>
      <WidgetCard
        widget={widget}
        dragAttributes={attributes}
        dragListeners={listeners}
        onRemove={onRemove}
        onSave={onSaveConfig}
      />
    </div>
  );
}

export default function DashboardGrid({
  widgets,
  onReorder,
  onSaveConfig,
  onRemove
}: Props) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = widgets.findIndex(w => w.id === active.id);
    const newIndex = widgets.findIndex(w => w.id === over.id);
    const newOrder = arrayMove(widgets, oldIndex, newIndex);
    onReorder(newOrder);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext
        items={widgets.map(w => w.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="relative z-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {widgets.map(widget => (
            <SortableItem
              key={widget.id}
              widget={widget}
              onRemove={() => onRemove(widget.id)}
              onSaveConfig={(config) => onSaveConfig(widget.id, config)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
