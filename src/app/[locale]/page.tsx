'use client';

import { Button } from '@/components/ui/button';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('LandingPage');
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-8 text-center">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <main className="relative z-10 flex flex-col items-center">
        <div className="bg-primary/20 p-4 rounded-full mb-6 border border-primary/30">
          <BookOpen className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold font-headline text-foreground mb-4">
          {t('title')}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
          {t('description')}
        </p>
        <Link href="/login" passHref>
          <Button size="lg">
            {t('getStarted')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </main>
      <footer className="absolute bottom-4 text-muted-foreground text-sm">
        © {new Date().getFullYear()} BookCircle. All rights reserved.
      </footer>
    </div>
  );
}
