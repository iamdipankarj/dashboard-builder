import * as React from "react"
import {
  Home,
  Box,
  MessageCircleQuestion,
  Sparkles
} from "lucide-react"

import { NavSecondary } from "@/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  navSecondary: [
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  function onAskAIClick() {
    const input = document.getElementById('agent_input') as HTMLInputElement | null;
    input?.focus();
  }

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href='/'>
                <Home />
                <span>Home</span>
              </a>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <a href='/'>
                <Box />
                <span>Widgets</span>
              </a>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <button onClick={onAskAIClick}>
                <Sparkles />
                <span>Ask AI</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
