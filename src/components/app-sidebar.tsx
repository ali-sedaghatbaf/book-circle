
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { BookOpen, BookText, LayoutDashboard, User, MessageSquareText, PlusCircle } from 'lucide-react';

export default function AppSidebar() {
  const pathname = usePathname();

  const checkActive = (path: string) => {
    // Exact match for dashboard, startsWith for others
    if (path === '/dashboard') return pathname === path;
    return pathname.startsWith(path);
  }

  return (
    <>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg font-headline">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="group-data-[collapsible=icon]:hidden">BookCircle</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={checkActive('/dashboard')} tooltip="Dashboard">
              <Link href="/dashboard">
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={checkActive('/add-book')} tooltip="Add Book">
              <Link href="/add-book">
                <PlusCircle />
                <span>Add Book</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={checkActive('/my-threads')} tooltip="My Threads">
              <Link href="/my-threads">
                <MessageSquareText />
                <span>My Threads</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={checkActive('/reading-list')} tooltip="Reading List">
              <Link href="/reading-list">
                <BookText />
                <span>Reading List</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={checkActive('/profile')} tooltip="Profile">
              <Link href="/profile">
                <User />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="group-data-[collapsible=icon]:hidden">
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} BookCircle
        </div>
      </SidebarFooter>
    </>
  );
}
