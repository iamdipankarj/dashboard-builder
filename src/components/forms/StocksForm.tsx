import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { stockSymbols } from "@/helpers/data";

const schema = z.object({
  symbol: z
    .string({
      required_error: "Please select a symbol.",
    })
})

export function StocksForm({
  defaultValues,
  onSave
}: {
  defaultValues: any;
  onSave: (data: any) => void;
}) {
  const form = useForm<z.infer<typeof schema>>({
    defaultValues,
    resolver: zodResolver(schema),
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className="flex gap-4">
        <FormField
          control={form.control}
          name="symbol"
          render={({ field }) => (
            <FormItem className="flex-1">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a symbol" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {stockSymbols.map((stock) => (
                    <SelectItem key={stock.symbol} value={stock.symbol}>
                      {stock.symbol} — {stock.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="flex-shrink-0">Submit</Button>
      </form>
    </Form>
  )
}
