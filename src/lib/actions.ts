'use server';

import { revalidatePath } from 'next/cache';
import { 
    getCurrentUser, 
    updateReadingStatus, 
    addThread, 
    addMessage, 
    type ReadingStatus 
} from '@/lib/data';

export async function updateReadingStatusAction(bookId: string, status: ReadingStatus) {
    const user = await getCurrentUser();
    updateReadingStatus(user.id, bookId, status);
    revalidatePath(`/books/${bookId}`);
    revalidatePath('/reading-list');
}

export async function createThreadAction(chapterId: string, formData: FormData) {
    const title = formData.get('title') as string;
    const user = await getCurrentUser();
    if (title) {
        addThread({
            chapterId: chapterId,
            title,
            createdBy: user.id,
        });
        revalidatePath(`/books/${(await getCurrentUser()).id}`); 
    }
}

export async function createMessageAction(threadId: string, formData: FormData) {
    const content = formData.get('content') as string;
    const user = await getCurrentUser();
    if (content) {
        addMessage({
            threadId,
            userId: user.id,
            content,
        });
        revalidatePath(`/threads/${threadId}`);
    }
}
