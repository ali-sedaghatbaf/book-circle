'use server';
/**
 * @fileOverview A flow for searching books using the Google Books API.
 * - searchBooks - A function that searches for books.
 * - SearchBooksInput - The input type for the searchBooks function.
 * - SearchBooksOutput - The return type for the searchBooks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BookSearchResultSchema = z.object({
  googleBooksId: z.string(),
  title: z.string(),
  authors: z.array(z.string()),
  summary: z.string().optional(),
  coverImage: z.string().optional(),
});

const SearchBooksInputSchema = z.object({
  query: z.string().describe('The search query for books.'),
});
export type SearchBooksInput = z.infer<typeof SearchBooksInputSchema>;

const SearchBooksOutputSchema = z.object({
    books: z.array(BookSearchResultSchema)
});
export type SearchBooksOutput = z.infer<typeof SearchBooksOutputSchema>;

export async function searchBooks(input: SearchBooksInput): Promise<SearchBooksOutput> {
  return searchBooksFlow(input);
}

const searchBooksFlow = ai.defineFlow(
  {
    name: 'searchBooksFlow',
    inputSchema: SearchBooksInputSchema,
    outputSchema: SearchBooksOutputSchema,
  },
  async (input) => {
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    if (!apiKey) {
      throw new Error('Google Books API key is not set in environment variables.');
    }

    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(input.query)}&key=${apiKey}&maxResults=10`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Google Books API request failed with status ${response.status}`);
      }
      const data = await response.json();
      const books = (data.items || []).map((item: any) => ({
        googleBooksId: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || [],
        summary: item.volumeInfo.description || '',
        coverImage: item.volumeInfo.imageLinks?.thumbnail.replace('http://', 'https://') || 'https://placehold.co/300x450.png',
      }));

      return { books };
    } catch (error) {
      console.error('Error fetching from Google Books API:', error);
      return { books: [] };
    }
  }
);
