'use client';

import { useState } from 'react';
import { useRouter } from '@/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { addBook } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { BookPlus, Loader2, Search } from 'lucide-react';
import Image from 'next/image';
import { searchBooks } from '@/ai/flows/search-books-flow';
import type { SearchBooksOutput } from '@/ai/flows/search-books-flow';

type BookSearchResult = SearchBooksOutput['books'][0];

export default function AddBookPage() {
  // Form fields state
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [summary, setSummary] = useState('');
  const [coverImage, setCoverImage] = useState('');

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BookSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [manualEntry, setManualEntry] = useState(false);
  
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const router = useRouter();
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery) return;
    setIsSearching(true);
    setSearchResults([]);
    setManualEntry(false);
    try {
      const result = await searchBooks({ query: searchQuery });
      if (result.books.length === 0) {
        toast({
          title: 'No Results',
          description: 'No books found for your query. Try different keywords.',
        });
      }
      setSearchResults(result.books);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Search Error',
        description: 'Failed to search for books. Check your API key or try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectBook = (book: BookSearchResult) => {
    setTitle(book.title);
    setAuthor(book.authors?.join(', ') || 'Unknown Author');
    setSummary(book.summary || '');
    setCoverImage(book.coverImage || '');
    setSearchResults([]);
    setSearchQuery('');
    setManualEntry(false);
  };
  
  const clearForm = () => {
    setTitle('');
    setAuthor('');
    setSummary('');
    setCoverImage('');
  }

  const handleToggleManualEntry = () => {
    setManualEntry(prev => !prev);
    clearForm();
    setSearchResults([]);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !author || !summary) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill out all required fields to add a book.',
        variant: 'destructive',
      });
      return;
    }
    setIsSubmitting(true);
    try {
      addBook({ title, author, summary, coverImage });
      toast({
        title: 'Book Added!',
        description: `"${title}" has been added to the library.`,
      });
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add the book. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormDisabled = !manualEntry && !title;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline mb-1">Add a New Book</h1>
        <p className="text-muted-foreground">Search for a book or enter the details manually.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>1. Search for a Book</CardTitle>
          <CardDescription>Use the Google Books API to find a book and autofill the details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, author, or ISBN..."
                className="pl-10"
                disabled={isSearching}
              />
            </div>
            <Button type="submit" disabled={isSearching || !searchQuery}>
              {isSearching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Search
            </Button>
          </form>
          {isSearching && (
            <div className="text-center py-6 text-muted-foreground">
              <Loader2 className="mx-auto h-8 w-8 animate-spin mb-2" />
              <p>Searching...</p>
            </div>
          )}
          {searchResults.length > 0 && (
            <div className="mt-6 space-y-3 max-h-96 overflow-y-auto pr-2">
              <h3 className="font-semibold">Search Results</h3>
              {searchResults.map((book) => (
                <div
                  key={book.googleBooksId}
                  className="flex items-center gap-4 p-3 rounded-md border hover:bg-secondary cursor-pointer"
                  onClick={() => handleSelectBook(book)}
                >
                  <Image
                    src={book.coverImage || 'https://placehold.co/60x90.png'}
                    alt={`Cover of ${book.title}`}
                    width={50}
                    height={75}
                    className="rounded shadow-sm object-cover"
                    data-ai-hint="book cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{book.title}</p>
                    <p className="text-sm text-muted-foreground">{book.authors?.join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or
            </span>
          </div>
        </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>2. Book Details</CardTitle>
                <CardDescription>Confirm the details below or enter them manually.</CardDescription>
            </div>
            <Button variant="outline" onClick={handleToggleManualEntry}>
                {manualEntry ? 'Cancel Manual Entry' : 'Enter Manually'}
            </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Book Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., The Hobbit"
                disabled={isSubmitting || isFormDisabled}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author(s)</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g., J.R.R. Tolkien"
                disabled={isSubmitting || isFormDisabled}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="A brief summary of the book..."
                className="min-h-[120px]"
                disabled={isSubmitting || isFormDisabled}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image URL</Label>
              <Input
                id="coverImage"
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://example.com/cover.png"
                disabled={isSubmitting || isFormDisabled}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting || isFormDisabled}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <BookPlus className="mr-2 h-4 w-4" />
              )}
              Add Book to Library
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
