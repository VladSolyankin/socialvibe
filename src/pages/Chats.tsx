import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export const Chats = () => {
  const [userChats, setUserChats] = useState<IUserChats[]>();
  return (
    <div className='mt-4 h-screen max-w-5xl'>
      <CardContent className='h-full grid grid-cols-3 gap-6'>
        <div className='flex flex-col gap-3 col-span-1 p-2'>
          <CardTitle>💬 Сообщения</CardTitle>
          <CardDescription>
            Здесь вы можете общаться с друзьями или группами людей
          </CardDescription>
          <Input placeholder='🔍 Найти чат...' />
        </div>

        <Card className='h-full col-span-2 border-2'></Card>
      </CardContent>
    </div>
  );
};
