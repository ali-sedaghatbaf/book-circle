import { redirect } from 'next/navigation';

// This page is a remnant from before internationalization was added.
// It now redirects to the default locale version of this page.
export default function AddBookPage() {
  redirect('/en/add-book');
  return null;
}
