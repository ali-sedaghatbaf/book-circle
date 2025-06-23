import { redirect } from 'next/navigation';

// This page is a remnant from before internationalization was added.
// It now redirects to the default locale version of this page.
export default function BookPage({ params }: { params: { id: string } }) {
  redirect(`/en/books/${params.id}`);
  return null;
}
