import { WidgetInstance } from "@/lib/types";
import { WidgetRenderer } from "@/components/widgets";
import { WeatherForm } from "@/components/forms/WeatherForm";
import { StocksForm } from "@/components/forms/StocksForm";
import { NewsForm } from "@/components/forms/NewsForm";
import { useState } from "react";

export default function WidgetCard({
  widget,
  onSave,
  onRemove
}: {
  widget: WidgetInstance;
  onSave: (config: any) => void;
  onRemove: () => void;
}) {
  const [editing, setEditing] = useState(false);

  const Renderer = WidgetRenderer[widget.type];
  const Form = {
    weather: WeatherForm,
    stocks: StocksForm,
    news: NewsForm
  }[widget.type];

  return (
    <div className="bg-white shadow p-4 rounded border">
      <div className="flex justify-between">
        <h3 className="font-bold">{widget.type.toUpperCase()}</h3>
        <div className="space-x-2">
          <button onClick={() => setEditing(e => !e)}>Edit</button>
          <button onClick={onRemove}>Trash</button>
        </div>
      </div>
      {editing ? (
        <Form defaultValues={widget.config} onSave={(data: any) => {
          onSave(data);
          setEditing(false);
        }} />
      ) : (
        <Renderer config={widget.config} />
      )}
    </div>
  );
}
