import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  location: z.string().min(1, "Location is required")
});

export function WeatherForm({
  defaultValues,
  onSave
}: {
  defaultValues: any;
  onSave: (data: any) => void;
}) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
    resolver: zodResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-2">
      <Input {...register("location")} placeholder="Enter location" />
      {errors.location?.message && (
        <p className="text-red-500 text-sm">{String(errors.location.message)}</p>
      )}
      <Button type="submit">Save</Button>
    </form>
  );
}
