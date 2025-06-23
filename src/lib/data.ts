export type User = {
  id: string;
  name: string;
  avatar: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  summary: string;
  coverImage: string;
};

export type Chapter = {
  id: string;
  bookId: string;
  title: string;
  chapterNumber: number;
};

export type Thread = {
  id: string;
  chapterId: string;
  title: string;
  createdBy: string; // userId
  createdAt: string;
};

export type Message = {
  id: string;
  threadId: string;
  userId: string;
  content: string;
  createdAt: string;
};

const users: User[] = [
  { id: 'user-1', name: 'Alice', avatar: 'https://placehold.co/40x40.png?text=A' },
  { id: 'user-2', name: 'Bob', avatar: 'https://placehold.co/40x40.png?text=B' },
  { id: 'user-3', name: 'Charlie', avatar: 'https://placehold.co/40x40.png?text=C' },
];

const books: Book[] = [
  {
    id: 'book-1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    summary: 'A story of the fabulously wealthy Jay Gatsby and his new love for the beautiful Daisy Buchanan.',
    coverImage: 'https://placehold.co/300x450.png',
  },
  {
    id: 'book-2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    summary: 'A novel about the serious issues of rape and racial inequality.',
    coverImage: 'https://placehold.co/300x450.png',
  },
  {
    id: 'book-3',
    title: '1984',
    author: 'George Orwell',
    summary: 'A dystopian social science fiction novel and cautionary tale.',
    coverImage: 'https://placehold.co/300x450.png',
  },
  {
    id: 'book-4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    summary: 'A romantic novel of manners written by Jane Austen in 1813.',
    coverImage: 'https://placehold.co/300x450.png',
  },
];

const chapters: Chapter[] = [
  { id: 'ch-1-1', bookId: 'book-1', title: 'Chapter 1', chapterNumber: 1 },
  { id: 'ch-1-2', bookId: 'book-1', title: 'Chapter 2', chapterNumber: 2 },
  { id: 'ch-1-3', bookId: 'book-1', title: 'Chapter 3', chapterNumber: 3 },
  { id: 'ch-2-1', bookId: 'book-2', title: 'Chapter 1', chapterNumber: 1 },
  { id: 'ch-2-2', bookId: 'book-2', title: 'Chapter 2', chapterNumber: 2 },
  { id: 'ch-3-1', bookId: 'book-3', title: 'Part 1, Chapter 1', chapterNumber: 1 },
  { id: 'ch-4-1', bookId: 'book-4', title: 'Chapter 1', chapterNumber: 1 },
];

const threads: Thread[] = [
  { id: 'thread-1', chapterId: 'ch-1-1', title: 'Symbolism of the Green Light', createdBy: 'user-1', createdAt: '2 days ago' },
  { id: 'thread-2', chapterId: 'ch-1-1', title: 'Narrator\'s perspective', createdBy: 'user-2', createdAt: '3 days ago' },
  { id: 'thread-3', chapterId: 'ch-2-1', title: 'Atticus\'s character', createdBy: 'user-3', createdAt: '5 days ago' },
];

const messages: Message[] = [
  { id: 'msg-1', threadId: 'thread-1', userId: 'user-1', content: 'I think the green light represents Gatsby\'s hopes and dreams for the future.', createdAt: '2 days ago' },
  { id: 'msg-2', threadId: 'thread-1', userId: 'user-2', content: 'Absolutely! It seems to be a symbol of an unattainable dream, always just out of reach.', createdAt: '2 days ago' },
  { id: 'msg-3', threadId: 'thread-1', userId: 'user-1', content: 'And it\'s tied to Daisy, of course.', createdAt: '1 day ago' },
  { id: 'msg-4', threadId: 'thread-2', userId: 'user-2', content: 'Nick Carraway as a narrator is interesting. Is he reliable?', createdAt: '3 days ago' },
  { id: 'msg-5', threadId: 'thread-3', userId: 'user-3', content: 'Atticus Finch is such a moral compass in the story.', createdAt: '5 days ago' },
];

export const getBooks = async (): Promise<Book[]> => {
  return new Promise(resolve => setTimeout(() => resolve(books), 500));
};

export const getBook = async (id: string): Promise<Book | undefined> => {
  return new Promise(resolve => setTimeout(() => resolve(books.find(b => b.id === id)), 500));
};

export const getChapters = async (bookId: string): Promise<Chapter[]> => {
  return new Promise(resolve => setTimeout(() => resolve(chapters.filter(c => c.bookId === bookId)), 500));
};

export const getChapter = async (id: string): Promise<Chapter | undefined> => {
  return new Promise(resolve => setTimeout(() => resolve(chapters.find(c => c.id === id)), 500));
};

export const getThreadsForChapter = async (chapterId: string): Promise<Thread[]> => {
  return new Promise(resolve => setTimeout(() => resolve(threads.filter(t => t.chapterId === chapterId)), 500));
};

export const getThread = async (id: string): Promise<Thread | undefined> => {
  return new Promise(resolve => setTimeout(() => resolve(threads.find(t => t.id === id)), 500));
};

export const getMessagesForThread = async (threadId: string): Promise<Message[]> => {
  return new Promise(resolve => setTimeout(() => resolve(messages.filter(m => m.threadId === threadId)), 500));
};

export const getUser = async (id: string): Promise<User | undefined> => {
  return new Promise(resolve => setTimeout(() => resolve(users.find(u => u.id === id)), 100));
};

export const getCurrentUser = async (): Promise<User> => {
  // In a real app, this would get the currently authenticated user.
  return new Promise(resolve => setTimeout(() => resolve(users[0]), 100));
};

// Functions to add data (for client-side simulation)
export const addThread = (thread: Omit<Thread, 'id' | 'createdAt'>): Thread => {
    const newThread: Thread = {
        ...thread,
        id: `thread-${Date.now()}`,
        createdAt: 'Just now',
    };
    threads.push(newThread);
    return newThread;
}

export const addMessage = (message: Omit<Message, 'id' | 'createdAt'>): Message => {
    const newMessage: Message = {
        ...message,
        id: `msg-${Date.now()}`,
        createdAt: 'Just now',
    };
    messages.push(newMessage);
    return newMessage;
}
