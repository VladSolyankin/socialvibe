import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { KeyboardEvent, useState, useRef, useEffect } from 'react';
import { IoMdInformationCircleOutline } from 'react-icons/io';

export const AIBot = () => {
  const [userMessages, setUserMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [userMessages]);

  const onEnterPressed = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setUserMessages(prevMessages => [...prevMessages, e.target.value]);
      e.target.value = '';
    }
  };

  return (
    <div className='h-screen flex flex-col items-center p-3 gap-3'>
      <Card className='sticky top-0 w-[80%] h-12 border-2 z-10'>
        <CardContent>
          <div className='h-12 flex items-center justify-between text-lg'>
            🧠 Задайте любой вопрос и получите на него ответ
            <Popover>
              <PopoverTrigger>
                <IoMdInformationCircleOutline className='w-6 h-6' />
              </PopoverTrigger>
              <PopoverContent className='w-64'>
                Напишите текст в поле снизу и нажмите Enter (либо на кнопку
                отправить)
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>
      <Card className='relative h-full w-[80%] z-0 overflow-y-auto'>
        <div className='absolute h-[calc(100% + 160px)] w-[80%] right-5 bottom-0'>
          {userMessages.map((message, index) => (
            <div key={index} className='flex justify-end mb-2'>
              <div className='bg-blue-600 text-white p-2 rounded-md'>
                {message}
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Input
        className='w-[80%] h-12'
        placeholder='Введите запрос...'
        onKeyDown={e => onEnterPressed(e)}
      />
    </div>
  );
};
