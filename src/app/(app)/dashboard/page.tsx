'use client';

import { getBooks, type Book } from '@/lib/data';
import { BookCard, BookCardSkeleton } from '@/components/book-card';
import { Input } from '@/components/ui/input';
import { useState, useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';

function BooksGrid({ books }: { books: Book[] }) {
  if (books.length === 0) {
    return (
      <div className="col-span-full text-center py-10">
        <p className="text-muted-foreground">No books found matching your search.</p>
      </div>
    );
  }
  return (
    <>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </>
  );
}

function BooksGridSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <BookCardSkeleton key={i} />
      ))}
    </>
  );
}

export default function DashboardPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true);
      const allBooks = await getBooks();
      setBooks(allBooks);
      setIsLoading(false);
    };
    loadBooks();
  }, []);

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
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-headline">Discover Books</h1>
          <p className="text-muted-foreground">Browse through the collection and pick a book to discuss.</p>
        </div>
        <div className="relative w-full md:w-auto md:min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          <BooksGridSkeleton />
        ) : (
          <BooksGrid books={filteredBooks} />
        )}
      </div>
    </div>
  );
}