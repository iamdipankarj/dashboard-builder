import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  source: z.string().min(1, "Source is required")
});

export function NewsForm({
  defaultValues,
  onSave
}: {
  defaultValues: any;
  onSave: (data: any) => void;
}) {
  const { register, handleSubmit, formState } = useForm({
    defaultValues,
    resolver: zodResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-2">
      <Input {...register("source")} placeholder="Enter source" />
      {formState.errors.source && (
        <p className="text-red-500 text-sm">{formState.errors.source.message}</p>
      )}
      <Button type="submit">Save</Button>
    </form>
  );
}
