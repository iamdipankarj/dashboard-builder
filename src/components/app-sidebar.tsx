import * as React from "react"
import {
  Home,
  Box,
  MessageCircleQuestion,
  Sparkles
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { WidgetChatbot } from "@/components/WidgetChatbot";
import { useDashboard } from "@/hooks/useDashboard"
import { useSaveDashboard } from "@/hooks/useSaveDashboard"

const data = {
  navMain: [
    {
      title: "Ask AI",
      url: "#",
      icon: Sparkles,
    },
    {
      title: "Home",
      url: "#",
      icon: Home,
      isActive: true,
    },
    {
      title: "Widgets",
      url: "#",
      icon: Box,
      badge: "10",
    },
  ],
  navSecondary: [
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {
    widgets,
    addWidget,
    updateWidget,
    removeWidget,
    setWidgets
  } = useDashboard();

  const saveMutation = useSaveDashboard();

  const handleInstruction = (inst: any) => {
    if (inst.action === "add") {
      addWidget(inst.widget);
    } else if (inst.action === "remove") {
      const match = widgets.find(w => w.type === inst.widget);
      if (match) removeWidget(match.id);
    } else if (inst.action === "update") {
      const match = widgets.find(w => w.type === inst.widget);
      if (match) updateWidget(match.id, inst.config);
    } else if (inst.action === "clear") {
      setWidgets([]);
    }

    saveMutation.mutate(widgets);
  };

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <WidgetChatbot onInstruction={handleInstruction} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
