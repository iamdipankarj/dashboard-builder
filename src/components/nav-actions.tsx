"use client"

import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"

export function NavActions() {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Button variant="outline" size="default">
        <Save /> Save
      </Button>
    </div>
  )
}
