'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BookMarked, ChevronDown, Loader2 } from 'lucide-react';
import { updateReadingStatusAction } from '@/lib/actions';
import { type ReadingStatus } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

type ReadingStatusInfo = {
  [key in ReadingStatus]: { text: string };
};

const statusInfo: ReadingStatusInfo = {
  WANT_TO_READ: { text: 'Want to Read' },
  CURRENTLY_READING: { text: 'Currently Reading' },
  FINISHED: { text: 'Finished' },
};

export default function AddToReadingList({
  bookId,
  currentStatus,
}: {
  bookId: string;
  currentStatus: ReadingStatus | null;
}) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleStatusChange = (status: ReadingStatus) => {
    startTransition(async () => {
      try {
        await updateReadingStatusAction(bookId, status);
        toast({
          title: 'Success!',
          description: `Book status updated to "${statusInfo[status].text}".`,
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to update reading status.',
          variant: 'destructive',
        });
      }
    });
  };

  const buttonText = currentStatus ? statusInfo[currentStatus].text : 'Add to Reading List';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={isPending} className="min-w-[200px]">
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <BookMarked className="mr-2 h-4 w-4" />
          )}
          <span>{buttonText}</span>
          <ChevronDown className="ml-auto h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {(Object.keys(statusInfo) as ReadingStatus[]).map((status) => (
          <DropdownMenuItem
            key={status}
            onClick={() => handleStatusChange(status)}
            disabled={isPending || status === currentStatus}
          >
            {statusInfo[status].text}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
