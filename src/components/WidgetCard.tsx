import { Suspense, useState } from "react";
import { WidgetInstance } from "@/lib/types";
import { WidgetRenderer } from "@/components/widgets";
import { WeatherForm } from "@/components/forms/WeatherForm";
import { StockForm } from "@/components/forms/StockForm";
import { NewsForm } from "@/components/forms/NewsForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { GripVertical, Pencil, Trash } from "lucide-react";

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
    stock: StockForm,
    news: NewsForm
  }[widget.type];

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <CardTitle>{widget.type.toUpperCase()}</CardTitle>
          <div className="flex items-center gap-2">
            <Button className="cursor-move" variant='outline' size='icon' asChild>
              <div
                {...dragListeners}
                {...dragAttributes}
              >
                <GripVertical />
              </div>
            </Button>

            <Button
              type="button"
              variant="outline"
              size='icon'
              onClick={() => setEditing((prev) => !prev)}
            >
              <Pencil />
            </Button>

            <Button
              type="button"
              variant="secondary"
              size='icon'
              onClick={onRemove}
            >
              <Trash />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  )
}
