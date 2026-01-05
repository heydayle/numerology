import { ChartNoAxesColumn, Crown, FingerprintPattern, Move3D, Star } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Life path number",
    url: "#life-path-number",
    icon: Crown,
  },
  {
    title: "Birthday and Additude",
    url: "#birthday-number",
    icon: FingerprintPattern,
  },
  {
    title: "Birthday chart",
    url: "#birthday-chart",
    icon: ChartNoAxesColumn,
  },
  {
    title: "Birthday arrow meanings",
    url: "#birthday-arrow",
    icon: Move3D,
  },
  {
    title: "Power of name",
    url: "#power-of-name",
    icon: Star,
  },
]

export function AppSidebar() {
  return (
    <Sidebar side="right">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Pagination</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}