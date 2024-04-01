import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { nanoid } from 'nanoid';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { IoMdInformationCircleOutline } from 'react-icons/io';

export const AIBot = () => {
  const [userMessages, setUserMessages] = useState([]);
  const [botMessages, setBotMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<
    { text: string; sender: 'user' | 'bot' }[]
  >([]);
  const [currentMessage, setCurrentMessage] = useState('');

  const onEnterPressed = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentMessage) {
      const newUserMessage = { text: currentMessage, sender: 'user' };
      setUserMessages(prevMessages => [...prevMessages, currentMessage]);
      setMessages(prevMessages => [...prevMessages, newUserMessage]);
      setIsLoading(true);
      setTimeout(() => {
        const newBotMessage = {
          text: `Ответ на: ${currentMessage}`,
          sender: 'bot',
        };
        setBotMessages(prev => [...prev, `Ответ на: ${currentMessage}`]);
        setMessages(prevMessages => [...prevMessages, newBotMessage]);
        setIsLoading(false);
      }, 1000);
      setCurrentMessage('');
    }
  };

  const onCurrentMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentMessage(e.target.value);
  };

  return (
    <div className='h-screen flex flex-col items-center p-3 w-[70vw] gap-10 border-2 rounded-xl'>
      <Card className='top-0 w-[80%] h-12 border-2 z-10'>
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
      <Card className='h-full w-[80%] overflow-auto'>
        <div className='px-5 pt-5'>
          {messages.map((message, index) => {
            return isLoading ? (
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'>
                Ау
              </div>
            ) : (
              <div
                key={nanoid()}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                <div
                  className={`p-2 rounded-md ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'}`}>
                  {message.text}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      <Input
        value={currentMessage}
        className='w-[80%] h-12'
        placeholder='Введите запрос...'
        onChange={e => onCurrentMessageChange(e)}
        onKeyDown={e => onEnterPressed(e)}
      />
    </div>
  );
};
