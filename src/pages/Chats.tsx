import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  addNewChat,
  getDatabaseChats,
  getUserFriends,
  initializeDatabaseUser,
} from '@/lib/firebase';
import { CornerDownLeft, Mic, Paperclip } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ChatItem } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import { BsFilterRight } from 'react-icons/bs';
import { MdAddCircleOutline } from 'react-icons/md';
import Emoji from 'react-emoji-render';

export const Chats = () => {
  const [userChats, setUserChats] = useState<IUserChats[]>();
  const [userFriends, setUserFriends] = useState([]);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    fetchedFriends();
  }, []);

  useEffect(() => {
    initializeChats();
  });

  const initializeChats = async () => {
    await getDatabaseChats();
    await initializeDatabaseUser(userFriends);
  };

  const fetchedFriends = async () => {
    const fetch = await getUserFriends();
    setUserFriends(() => fetch);
  };

  const onChatSelect = async () => {
    setIsChatVisible(true);
  };

  const onChatSearch = async () => {};

  const onMessageSend = () => {
    setCurrentMessage('');
  };

  const onMessageChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentMessage(e.target.value);
  };

  const onAddNewChat = async () => {
    await addNewChat();
  };

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
                <DropdownMenuItem
                  className='flex gap-1 items-center'
                  onClick={onAddNewChat}>
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
          <div className='flex flex-col gap-1'>
            {userFriends.map(friend => {
              return (
                <div>
                  <ChatItem
                    className='text-black rounded-lg focus-within:ring-1 hover:ring-2 ring-blue-400'
                    avatar={
                      friend.avatar_url
                        ? friend.avatar_url
                        : 'assets/default_profile.png'
                    }
                    alt={'Reactjs'}
                    title={friend.full_name}
                    subtitle={'What are you doing?'}
                    date={new Date()}
                    unread={0}
                    onClick={() => onChatSelect()}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {isChatVisible ? (
          <div className='relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2'>
            <div className='flex-1'></div>
            <div className='relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring'>
              <Label htmlFor='message' className='sr-only'>
                Message
              </Label>
              <Textarea
                value={currentMessage}
                id='message'
                placeholder='Введите ваше сообщение...'
                className='min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0'
                onChange={e => onMessageChanged(e)}
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
                  <Button
                    size='sm'
                    className='ml-auto gap-1.5'
                    onClick={() => onMessageSend()}>
                    Отправить
                    <CornerDownLeft className='size-3.5' />
                  </Button>
                </TooltipProvider>
              </div>
            </div>
          </div>
        ) : (
          <div className='relative flex h-full min-h-[50vh] flex-col justify-center items-center gap-5 rounded-xl bg-muted/50 p-4 lg:col-span-2'>
            <Emoji className='text-5xl'>👈😎</Emoji>
            <span className='text-lg'>Выбери, с кем ты будешь общаться</span>
          </div>
        )}
      </CardContent>
    </div>
  );
};

/*

users:
  user1:
    chat1:
      title:
      last_message:
      last_time_sent:
    chat2:

    messages:
      chat1:
        m1
        m2
        m3
      chat2:
        m1
        m2
        ...
    
  user2:
    chat1:
    chat2:
*/
