import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  symbol: z.string().min(1, "Symbol is required")
});

export function StocksForm({
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
      <Input {...register("symbol")} placeholder="Enter symbol" />
      {errors.symbol?.message && (
        <p className="text-red-500 text-sm">{String(errors.symbol.message)}</p>
      )}
      <Button type="submit">Save</Button>
    </form>
  );
}
