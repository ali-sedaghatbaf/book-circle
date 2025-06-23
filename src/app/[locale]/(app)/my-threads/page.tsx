import { getCurrentUser, getThreadsForUser, getChapter, getBook } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from '@/navigation';
import { MessageSquareText, ChevronRight } from 'lucide-react';

export default async function MyThreadsPage() {
  const user = await getCurrentUser();
  const threads = await getThreadsForUser(user.id);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold font-headline mb-6">My Discussion Threads</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Discussions</CardTitle>
          <CardDescription>Threads you've created or participated in.</CardDescription>
        </CardHeader>
        <CardContent>
          {threads.length > 0 ? (
            <ul className="space-y-3">
              {threads.map(async (thread) => {
                const chapter = await getChapter(thread.chapterId);
                const book = chapter ? await getBook(chapter.bookId) : undefined;
                return (
                    <li key={thread.id}>
                        <Link href={`/threads/${thread.id}`} className="block rounded-lg p-4 hover:bg-secondary transition-colors border">
                            <p className="font-medium text-lg">{thread.title}</p>
                            <div className="flex items-center text-sm text-muted-foreground mt-1 flex-wrap">
                                {book && (
                                  <>
                                    <span>{book.title}</span>
                                    <ChevronRight className="h-4 w-4 mx-1" />
                                  </>
                                )}
                                <span>{chapter?.title ?? 'Unknown Chapter'}</span>
                                <span className="mx-2 text-xs">•</span>
                                <span className="text-xs">{thread.createdAt}</span>
                            </div>
                        </Link>
                    </li>
                )
              })}
            </ul>
          ) : (
            <div className="text-center py-10 text-muted-foreground bg-secondary/50 rounded-md">
              <MessageSquareText className="mx-auto h-10 w-10 mb-3" />
              <p className="font-semibold">No threads yet.</p>
              <p className="text-sm">Start a new discussion on a book page!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
