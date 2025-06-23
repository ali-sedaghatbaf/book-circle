
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
import { BookOpen, Book, LayoutDashboard, User, MessageSquareText } from 'lucide-react';
import { getBooks } from '@/lib/data';
import { type Book as BookType } from '@/lib/data';
import { useState, useEffect } from 'react';

export default function AppSidebar() {
  const pathname = usePathname();
  const [books, setBooks] = useState<BookType[]>([]);

  useEffect(() => {
    getBooks().then(setBooks);
  }, []);

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
            <SidebarMenuButton asChild isActive={pathname === '/dashboard'} tooltip="Dashboard">
              <Link href="/dashboard">
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/my-threads'} tooltip="My Threads">
              <Link href="/my-threads">
                <MessageSquareText />
                <span>My Threads</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/profile'} tooltip="Profile">
              <Link href="/profile">
                <User />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
             <p className="px-2 py-1 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">All Books</p>
          </SidebarMenuItem>

          {books.map((book) => (
            <SidebarMenuItem key={book.id}>
              <SidebarMenuButton asChild size="sm" isActive={pathname === `/books/${book.id}`} tooltip={book.title}>
                <Link href={`/books/${book.id}`}>
                  <Book />
                  <span>{book.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
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
