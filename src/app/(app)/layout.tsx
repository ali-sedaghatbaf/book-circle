import AppSidebar from '@/components/app-sidebar';
import { SidebarProvider, Sidebar, SidebarInset, SidebarHeader, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <AppSidebar />
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg font-headline">
              <BookOpen className="h-6 w-6 text-primary" />
              <span>BookCircle</span>
            </Link>
          </div>
          <Avatar>
            <AvatarImage src="https://placehold.co/40x40.png?text=A" data-ai-hint="person portrait" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </header>
        <main className="p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
