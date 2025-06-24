import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveDashboard } from "@/services/dashboard";
import { WidgetInstance } from "@/lib/types";
import { toast } from "sonner";

export function useSaveDashboard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (widgets: WidgetInstance[]) => saveDashboard(widgets),
    onMutate: async (newWidgets) => {
      await queryClient.cancelQueries({ queryKey: ["dashboard"] });
      const prev = queryClient.getQueryData<WidgetInstance[]>(["dashboard"]);
      queryClient.setQueryData(["dashboard"], newWidgets);
      return { prev };
    },
    onSuccess: () => {
      toast.success('Dashboard saved.')
    },
    onError: (_, __, context) => {
      toast.error('Failed to save dashboard.')
      if (context?.prev) {
        queryClient.setQueryData(["dashboard"], context.prev);
      }
    }
  });
}
