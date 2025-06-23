import { getBook, getChapters, getThreadsForChapter, addThread, getCurrentUser } from '@/lib/data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { MessageSquare, PlusCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);
  if (!book) {
    return { title: 'Book Not Found' };
  }
  return {
    title: `${book.title} | BookCircle`,
  };
}

async function ChapterDiscussions({ chapterId }: { chapterId: string }) {
    const threads = await getThreadsForChapter(chapterId);
    const currentUser = await getCurrentUser();

    // This is a placeholder for form handling. In a real app, this would be a server action.
    async function createThreadAction(formData: FormData) {
        'use server';
        const title = formData.get('title') as string;
        if(title) {
            // In a real app, you'd revalidate the path.
            // Here we just add to our mock data.
            addThread({
                chapterId: chapterId,
                title,
                createdBy: currentUser.id
            })
        }
    }

    return (
        <div className="space-y-4 pl-4 pt-2">
            <div className="flex justify-between items-center">
                <h4 className="font-semibold">Discussion Threads</h4>
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            New Thread
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Start a New Discussion Thread</DialogTitle>
                        <DialogDescription>
                            What's on your mind? Create a new thread to discuss a topic from this chapter.
                        </DialogDescription>
                        </DialogHeader>
                        <form action={createThreadAction} className="space-y-4">
                            <div>
                                <Label htmlFor="title" className="sr-only">Thread Title</Label>
                                <Input id="title" name="title" placeholder="Enter thread title..." required />
                            </div>
                            <Button type="submit" className="w-full">Create Thread</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            {threads.length > 0 ? (
                <ul className="space-y-2">
                {threads.map(thread => (
                    <li key={thread.id}>
                    <Link href={`/threads/${thread.id}`} className="block rounded-md p-3 hover:bg-secondary transition-colors">
                        <div className="flex justify-between items-center">
                        <p className="font-medium">{thread.title}</p>
                        <Badge variant="outline">{thread.createdAt}</Badge>
                        </div>
                    </Link>
                    </li>
                ))}
                </ul>
            ) : (
                <div className="text-center py-6 text-muted-foreground bg-secondary/50 rounded-md">
                    <MessageSquare className="mx-auto h-8 w-8 mb-2" />
                    <p>No discussions yet.</p>
                    <p className="text-sm">Be the first to start one!</p>
                </div>
            )}
        </div>
    );
}

export default async function BookPage({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);
  const chapters = await getChapters(params.id);

  if (!book) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <header className="flex flex-col md:flex-row gap-6 md:gap-8 items-start mb-8">
        <Image
          src={book.coverImage}
          alt={`Cover of ${book.title}`}
          width={200}
          height={300}
          className="rounded-lg shadow-md object-cover flex-shrink-0"
          data-ai-hint="book cover"
        />
        <div className="space-y-3">
          <h1 className="text-4xl font-bold font-headline">{book.title}</h1>
          <p className="text-xl text-muted-foreground">by {book.author}</p>
          <p className="text-base">{book.summary}</p>
        </div>
      </header>

      <section>
        <h2 className="text-2xl font-bold font-headline mb-4">Chapters</h2>
        <Accordion type="single" collapsible className="w-full">
          {chapters.map(chapter => (
            <AccordionItem value={`item-${chapter.id}`} key={chapter.id}>
              <AccordionTrigger className="text-lg hover:bg-secondary/50 px-4 rounded-md">
                {chapter.title}
              </AccordionTrigger>
              <AccordionContent>
                <ChapterDiscussions chapterId={chapter.id} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
