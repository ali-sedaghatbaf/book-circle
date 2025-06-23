'use client';

import { usePathname, useRouter } from '@/navigation';
import { useLocale, useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Languages } from 'lucide-react';
import { useTransition } from 'react';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('LocaleSwitcher');
  const [isPending, startTransition] = useTransition();

  const onSelectChange = (value: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: value });
    });
  };

  return (
    <div className="flex items-center gap-2">
       <Select defaultValue={locale} onValueChange={onSelectChange} disabled={isPending}>
        <SelectTrigger className="w-[120px] h-9">
            <div className='flex items-center gap-2'>
                <Languages className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder={t('label')} />
            </div>
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="en">{t('en')}</SelectItem>
            <SelectItem value="es">{t('es')}</SelectItem>
        </SelectContent>
       </Select>
    </div>
  );
}
