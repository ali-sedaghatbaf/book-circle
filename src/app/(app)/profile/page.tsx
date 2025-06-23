import { getCurrentUser } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pen } from 'lucide-react';

export default async function ProfilePage() {
  const user = await getCurrentUser();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-headline">Your Profile</h1>
        <Button variant="outline">
          <Pen className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>
      <Card>
        <CardContent className="pt-6 flex flex-col sm:flex-row items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.avatar} data-ai-hint="person portrait" />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-muted-foreground">Joined on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
             <p className="text-muted-foreground">user-id: {user.id}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
