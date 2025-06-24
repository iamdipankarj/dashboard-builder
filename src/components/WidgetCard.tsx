import { WidgetInstance } from "@/lib/types";
import { WidgetRenderer } from "@/components/widgets";
import { WeatherForm } from "@/components/forms/WeatherForm";
import { StocksForm } from "@/components/forms/StocksForm";
import { NewsForm } from "@/components/forms/NewsForm";
import { Suspense, useState } from "react";

export default function WidgetCard({
  widget,
  onSave,
  onRemove,
  dragAttributes,
  dragListeners
}: {
  widget: WidgetInstance;
  onSave: (config: any) => void;
  onRemove: () => void;
  dragAttributes?: any;
  dragListeners?: any;
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
      <div className="flex justify-between items-center">
        <h3 className="font-bold">{widget.type.toUpperCase()}</h3>
        <div className="flex items-center gap-2">
          {/* Drag handle */}
          <div
            className="cursor-move px-1 text-gray-400 hover:text-gray-600"
            {...dragListeners}
            {...dragAttributes}
          >
            ⠿
          </div>

          {/* Config + Remove */}
          <button
            type="button"
            className="hover:text-blue-600"
            onClick={() => setEditing((prev) => !prev)}
          >
            ⚙️
          </button>
          <button
            type="button"
            className="hover:text-red-600"
            onClick={onRemove}
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="mt-3">
        {editing ? (
          <Form
            defaultValues={widget.config}
            onSave={(data) => {
              onSave(data);
              setEditing(false);
            }}
          />
        ) : (
          <Suspense fallback={<p>Loading widget...</p>}>
            <Renderer config={widget.config} />
          </Suspense>
        )}
      </div>
    </div>
  );
}
