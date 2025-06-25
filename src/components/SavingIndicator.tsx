import { useIsMutating } from "@tanstack/react-query";

export function SavingIndicator() {
  const isSaving = useIsMutating({ mutationKey: ["save-dashboard"] }) > 0;

  if (!isSaving) return null;

  return (
    <span className="bg-blue-100 text-blue-800 px-1 text-sm rounded-md inline-flex animate-pulse">
      Saving...
    </span>
  );
}
