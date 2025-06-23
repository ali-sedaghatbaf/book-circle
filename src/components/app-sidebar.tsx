
'use client';

import { Link, usePathname } from '@/navigation';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { BookOpen, BookText, LayoutDashboard, User, MessageSquareText, PlusCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AppSidebar() {
  const pathname = usePathname();
  const t = useTranslations('AppSidebar');

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
            <SidebarMenuButton asChild isActive={checkActive('/dashboard')} tooltip={t('dashboard')}>
              <Link href="/dashboard">
                <LayoutDashboard />
                <span>{t('dashboard')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={checkActive('/add-book')} tooltip={t('addBook')}>
              <Link href="/add-book">
                <PlusCircle />
                <span>{t('addBook')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={checkActive('/my-threads')} tooltip={t('myThreads')}>
              <Link href="/my-threads">
                <MessageSquareText />
                <span>{t('myThreads')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={checkActive('/reading-list')} tooltip={t('readingList')}>
              <Link href="/reading-list">
                <BookText />
                <span>{t('readingList')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={checkActive('/profile')} tooltip={t('profile')}>
              <Link href="/profile">
                <User />
                <span>{t('profile')}</span>
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
