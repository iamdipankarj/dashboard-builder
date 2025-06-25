import { useIsMutating } from "@tanstack/react-query";

export function SavingIndicator() {
  const isSaving = useIsMutating({ mutationKey: ["save-dashboard"] }) > 0;

  if (!isSaving) return null;

  return (
    <span className="bg-blue-300 text-blue-900 px-1 text-sm rounded-md inline-flex animate-pulse">
      Saving...
    </span>
  );
}
