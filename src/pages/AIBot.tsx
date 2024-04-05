import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HfInference } from '@huggingface/inference';
import { nanoid } from 'nanoid';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { useChat } from 'ai/react';
import { getBotAnswer } from '@/lib/hf';

export const AIBot = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const hf = new HfInference(import.meta.env.VITE_HF_TOKEN);
  const [userMessages, setUserMessages] = useState([]);
  const [botMessages, setBotMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allMessages, setAllMessages] = useState<
    { text: string; sender: 'user' | 'bot' }[]
  >([]);
  const [currentMessage, setCurrentMessage] = useState('');

  const onEnterPressed = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentMessage) {
      const response = await getBotAnswer(currentMessage);
      console.log(response);
      const newUserMessage = { text: currentMessage, sender: 'user' };
      setUserMessages(prevMessages => [...prevMessages, currentMessage]);
      setAllMessages(prevMessages => [...prevMessages, newUserMessage]);
      setIsLoading(true);
      setTimeout(() => {
        const newBotMessage = {
          text: `${response}`,
          sender: 'bot',
        };
        setBotMessages(prev => [...prev, `${response}`]);
        setAllMessages(prevMessages => [...prevMessages, newBotMessage]);
        setCurrentMessage('');
        setIsLoading(false);
      }, 1000);
    }
  };

  const onCurrentMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentMessage(e.target.value);
  };

  return (
    <Tabs defaultValue='chat'>
      <TabsList className='flex items-center justify-center mx-auto mt-5 w-[300px] gap-5'>
        <TabsTrigger value='chat'>Чат</TabsTrigger>
        <TabsTrigger value='image'>Генерация картинок</TabsTrigger>
      </TabsList>
      <TabsContent value='chat' className='min-w-3xl'>
        <div className='h-screen flex flex-col items-center p-3 w-[70vw] gap-10'>
          <Card className='flex flex-col w-[80%] border-2 z-10'>
            <CardContent>
              <div className='relative flex flex-col items-center justify-between text-lg'>
                <div className='flex items-center justify-center'>
                  🧠 Задайте любой вопрос и получите на него ответ
                  <Popover>
                    <PopoverTrigger>
                      <IoMdInformationCircleOutline className='absolute top-3 right-5 w-6 h-6' />
                    </PopoverTrigger>
                    <PopoverContent className='w-64'>
                      Напишите текст в поле снизу и нажмите Enter (либо на
                      кнопку отправить)
                    </PopoverContent>
                  </Popover>
                </div>
                <CardDescription>
                  Вопросы правильно воспринимаются только на английском языке
                </CardDescription>
              </div>
            </CardContent>
          </Card>
          <Card className='h-full w-[80%] overflow-auto'>
            <div className='px-5 pt-5'>
              {messages.map((message, index) => {
                const isLastMessage = index === messages.length - 1;
                const isBotMessage = message.sender === 'bot';

                return (
                  <div
                    key={nanoid()}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                    {isLoading && isLastMessage ? (
                      <div className='flex items-center gap-5'>
                        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-l-2 border-blue-600'></div>
                        <Label className='text-sm'>Бот думает...</Label>
                      </div>
                    ) : (
                      <div
                        className={`max-w-[50%] p-2 rounded-md ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'}`}>
                        {message.text}
                      </div>
                    )}
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
      </TabsContent>
      <TabsContent
        value='image'
        className='min-w-[50vw] h-screen'></TabsContent>
    </Tabs>
  );
};
