import { getThread, getMessagesForThread, getUser, getCurrentUser, addMessage, type Message, getChapter, getBook } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { ChevronRight, Send } from 'lucide-react';
import SummarizeThread from '@/components/summarize-thread';
import { type User } from '@/lib/data';

async function MessageItem({ message }: { message: Message }) {
  const user = await getUser(message.userId);
  return (
    <div className="flex gap-4">
      <Avatar>
        <AvatarImage src={user?.avatar} data-ai-hint="person portrait" />
        <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-bold">{user?.name}</p>
          <p className="text-xs text-muted-foreground">{message.createdAt}</p>
        </div>
        <p className="text-foreground/90">{message.content}</p>
      </div>
    </div>
  );
}

async function NewMessageForm({ threadId }: { threadId: string }) {
    const currentUser = await getCurrentUser();

    async function createMessageAction(formData: FormData) {
        'use server';
        const content = formData.get('content') as string;
        if (content) {
            addMessage({
                threadId,
                userId: currentUser.id,
                content
            });
        }
    }

    return (
         <form action={createMessageAction} className="relative">
            <Textarea
              name="content"
              placeholder="Write your message..."
              className="pr-20 min-h-[60px]"
              required
            />
            <Button type="submit" size="icon" className="absolute right-2.5 top-1/2 -translate-y-1/2">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
    );
}

export default async function ThreadPage({ params }: { params: { id: string } }) {
  const thread = await getThread(params.id);
  
  if (!thread) {
    notFound();
  }
  
  const messages = await getMessagesForThread(params.id);
  const chapter = await getChapter(thread.chapterId);
  const book = chapter ? await getBook(chapter.bookId) : undefined;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center text-sm text-muted-foreground mb-4 flex-wrap">
        {book ? (
          <Link href={`/books/${book.id}`} className="hover:text-primary">{book.title}</Link>
        ) : (
          <Link href="/dashboard" className="hover:text-primary">Books</Link>
        )}
        <ChevronRight className="h-4 w-4 mx-1" />
        {chapter ? (
          <span className="text-muted-foreground">{chapter.title}</span>
        ) : (
          <span className="text-muted-foreground">Chapter</span>
        )}
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-foreground font-medium">{thread.title}</span>
      </div>

      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline">{thread.title}</h1>
          {chapter && book && (
            <p className="text-muted-foreground">
              In <span className="font-medium text-foreground/80">{chapter.title}</span> of <Link href={`/books/${book.id}`} className="text-primary hover:underline font-medium">{book.title}</Link>
            </p>
          )}
        </div>
        <SummarizeThread messages={messages} />
      </header>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-8">
            {messages.map(message => (
              <MessageItem key={message.id} message={message} />
            ))}
          </div>
          <div className="pt-6 border-t">
            <NewMessageForm threadId={thread.id} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
