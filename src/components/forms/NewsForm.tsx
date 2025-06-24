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
import { newsSources } from "@/helpers/data";

const schema = z.object({
  source: z
    .string({
      required_error: "Please select a source.",
    })
})

export function NewsForm({
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
          name="source"
          render={({ field }) => (
            <FormItem className="flex-1">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a source" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {newsSources.map((source) => (
                    <SelectItem key={source.id} value={source.id}>
                      {source.name}
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
