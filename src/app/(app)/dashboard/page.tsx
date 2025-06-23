import { getBooks } from '@/lib/data';
import { BookCard, BookCardSkeleton } from '@/components/book-card';
import { Suspense } from 'react';

export const metadata = {
  title: 'Dashboard | BookCircle',
};

async function BooksGrid() {
  const books = await getBooks();
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

function BooksGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <BookCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold font-headline">Discover Books</h1>
        <p className="text-muted-foreground">Browse through the collection and pick a book to discuss.</p>
      </div>
      <Suspense fallback={<BooksGridSkeleton />}>
        <BooksGrid />
      </Suspense>
    </div>
  );
}
