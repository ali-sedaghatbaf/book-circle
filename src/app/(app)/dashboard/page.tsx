'use client';

import { getBooks, type Book, getCurrentUser, getReadingList, type UserBook } from '@/lib/data';
import { BookCard, BookCardSkeleton } from '@/components/book-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { Search, PlusCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// --- Reusable Components for this page ---

function BookCarousel({ title, books }: { title: string; books: Book[] }) {
  if (books.length === 0) {
    return null;
  }
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold font-headline">{title}</h2>
      <div className="relative">
        <div className="flex space-x-6 overflow-x-auto pb-4 -mb-4">
          {books.map((book) => (
            <div key={book.id} className="w-52 md:w-60 flex-shrink-0">
              <BookCard book={book} />
            </div>
          ))}
        </div>
        <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
}

function BookCarouselSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="flex space-x-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="w-52 md:w-60 flex-shrink-0">
                        <BookCardSkeleton />
                    </div>
                ))}
            </div>
        </div>
    )
}

function AllBooksGrid({ books, noBooksMessage }: { books: Book[], noBooksMessage: string }) {
  if (books.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">{noBooksMessage}</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

function AllBooksGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <BookCardSkeleton key={i} />
      ))}
    </div>
  );
}

// --- Main Dashboard Page Component ---

export default function DashboardPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [readingList, setReadingList] = useState<UserBook[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const user = await getCurrentUser();
        const [allBooks, userReadingList] = await Promise.all([
            getBooks(),
            getReadingList(user.id)
        ]);
        setBooks(allBooks);
        setReadingList(userReadingList);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const recentlyAdded = useMemo(() => {
      // In a real app, this would be based on creation date
      return [...books].slice(-5).reverse();
  }, [books]);

  const forYouBooks = useMemo(() => {
    if (readingList.length === 0 || books.length === 0) {
      return [];
    }
    const readingListBookIds = new Set(readingList.map(item => item.bookId));
    const readAuthors = new Set<string>();

    books.forEach(book => {
      if (readingListBookIds.has(book.id)) {
        readAuthors.add(book.author);
      }
    });

    if (readAuthors.size === 0) return [];

    const recommendations = books.filter(book =>
      !readingListBookIds.has(book.id) && readAuthors.has(book.author)
    );
    
    return recommendations.slice(0, 5);
  }, [books, readingList]);

  const filteredBooks = useMemo(() => {
    if (!searchQuery) {
      return books;
    }
    return books.filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [books, searchQuery]);

  return (
    <div className="space-y-12">
        {isLoading ? (
            <div className='space-y-12'>
                <BookCarouselSkeleton />
                <BookCarouselSkeleton />
            </div>
        ) : (
            <>
                <BookCarousel title="For You" books={forYouBooks} />
                <BookCarousel title="Recently Added" books={recentlyAdded} />
            </>
        )}
      
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold font-headline">Explore All Books</h2>
                <p className="text-muted-foreground">Browse through the entire collection.</p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative flex-grow md:flex-grow-0 md:min-w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search by title or author..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Button asChild>
                    <Link href="/add-book">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Book
                    </Link>
                </Button>
            </div>
        </div>
        
        {isLoading ? (
            <AllBooksGridSkeleton />
        ) : (
            <AllBooksGrid books={filteredBooks} noBooksMessage="No books found matching your search." />
        )}
      </section>
    </div>
  );
}
