import { getCurrentUser, getReadingList, getBook, type Book } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookCard } from '@/components/book-card';
import { BookText } from 'lucide-react';

async function ReadingListGrid({ bookIds, status }: { bookIds: string[]; status: string }) {
    if (bookIds.length === 0) {
        return (
            <div className="text-center py-10 text-muted-foreground bg-secondary/50 rounded-md mt-4">
                <BookText className="mx-auto h-10 w-10 mb-3" />
                <p className="font-semibold">No books in this list.</p>
                <p className="text-sm">Explore the dashboard to add some!</p>
            </div>
        )
    }

    const books = (await Promise.all(bookIds.map(id => getBook(id)))).filter(Boolean) as Book[];

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
            {books.map(book => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    )
}

export default async function ReadingListPage() {
  const user = await getCurrentUser();
  const readingList = await getReadingList(user.id);
  
  const currentlyReading = readingList.filter(item => item.status === 'CURRENTLY_READING').map(item => item.bookId);
  const wantToRead = readingList.filter(item => item.status === 'WANT_TO_READ').map(item => item.bookId);
  const finished = readingList.filter(item => item.status === 'FINISHED').map(item => item.bookId);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold font-headline mb-6">My Reading List</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Personal Library</CardTitle>
          <CardDescription>Keep track of the books you're reading, want to read, and have finished.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="currently-reading" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="currently-reading">Currently Reading ({currentlyReading.length})</TabsTrigger>
                    <TabsTrigger value="want-to-read">Want to Read ({wantToRead.length})</TabsTrigger>
                    <TabsTrigger value="finished">Finished ({finished.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="currently-reading">
                   <ReadingListGrid bookIds={currentlyReading} status="Currently Reading" />
                </TabsContent>
                <TabsContent value="want-to-read">
                    <ReadingListGrid bookIds={wantToRead} status="Want to Read" />
                </TabsContent>
                <TabsContent value="finished">
                    <ReadingListGrid bookIds={finished} status="Finished" />
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
