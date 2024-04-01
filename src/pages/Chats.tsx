import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { Label } from '@/components/ui/label';
import { Badge, Paperclip, Mic, CornerDownLeft } from 'lucide-react';
import { useState } from 'react';
import { ChatItem, MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import { BsFilterRight } from 'react-icons/bs';
import { MdAddCircleOutline } from 'react-icons/md';

export const Chats = () => {
  const [userChats, setUserChats] = useState<IUserChats[]>();
  return (
    <div className='mt-4 h-screen max-w-5xl'>
      <CardContent className='h-full grid grid-cols-3 gap-6'>
        <div className='flex flex-col gap-3 col-span-1 p-2'>
          <div className='flex items-center justify-between'>
            <CardTitle>💬 Сообщения</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant='secondary'>
                  <BsFilterRight className='w-6 h-6 rounded-xl cursor-pointer' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className='flex gap-1 items-center'>
                  <MdAddCircleOutline className='w-4 h-4' />
                  Создать новый чат
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardDescription>
            Здесь вы можете общаться с друзьями или группами людей
          </CardDescription>
          <Input placeholder='🔍 Найти чат...' />
          <div>
            <ChatItem
              className='text-black'
              avatar={
                'https://firebasestorage.googleapis.com/v0/b/socialvibe-92a74.appspot.com/o/cat.jpg?alt=media&token=ee01de80-84c0-4f6f-843b-a8ae4495443a'
              }
              alt={'Reactjs'}
              title={'Hello'}
              subtitle={'What are you doing?'}
              date={new Date()}
              unread={0}
            />
            <ChatItem
              className='text-black'
              avatar={
                'https://firebasestorage.googleapis.com/v0/b/socialvibe-92a74.appspot.com/o/cat.jpg?alt=media&token=ee01de80-84c0-4f6f-843b-a8ae4495443a'
              }
              alt={'Reactjs'}
              title={'Hello'}
              subtitle={'What are you doing?'}
              date={new Date()}
              unread={0}
            />
          </div>
        </div>

        <div className='relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2'>
          <div className='flex-1' />
          <div className='relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring'>
            <Label htmlFor='message' className='sr-only'>
              Message
            </Label>
            <Textarea
              id='message'
              placeholder='Введите ваше сообщение...'
              className='min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0'
            />
            <div className='flex items-center p-3 pt-0'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant='ghost' size='icon'>
                      <Paperclip className='size-4' />
                      <span className='sr-only'>Прикрепить файл</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side='top'>Прикрепить файл</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant='ghost' size='icon'>
                      <Mic className='size-4' />
                      <span className='sr-only'>Голосовой ввод</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side='top'>Голосовой ввод</TooltipContent>
                </Tooltip>
                <Button size='sm' className='ml-auto gap-1.5'>
                  Отправить
                  <CornerDownLeft className='size-3.5' />
                </Button>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
};
