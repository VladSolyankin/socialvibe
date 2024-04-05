import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Emoji from 'react-emoji-render';

export const Profile = () => {
  return (
    <div className='flex flex-col items-center p-3'>
      <div className='flex flex-col items-center gap-3'>
        <Emoji className='text-5xl'>👀</Emoji>
        <Label>Ваш профиль</Label>
      </div>
      <div className='max-w-[70vw] flex gap-5 p-5'>
        <div className='flex flex-col gap-5 mb-4'>
          <div className='flex flex-col justify-center items-center border-2 p-5 gap-3 rounded-xl'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger>
                      <img
                        src='assets/default_profile.png'
                        className='rounded-full h-24 w-24 object-cover hover:brightness-75 transition duration-150 ease-in-out'
                        alt=''
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <h4>Изменить фотографию</h4>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div>
              <Label className='text-2xl font-bold'>Иван Иванов</Label>
            </div>
          </div>
          <div className='flex flex-col items-center gap-3 border-2 p-5 rounded-xl'>
            <Label>Дата регистрации</Label>
            <p className='text-gray-400'>01.01.2022</p>
          </div>
        </div>
        <div className='flex flex-col gap-10'>
          <div className='border-2 mb-4 p-5 rounded-xl'>
            <div className='space-y-4'>
              <p>
                <b className='mr-2'>Город:</b> Москва
              </p>
              <p>
                <b className='mr-2'>Телефон:</b> +7 900 000-00-00
              </p>
              <p>
                <b className='mr-2'>Статус:</b> Работаю
              </p>
              <p className='text-gray-400'>О себе:</p>
              <p className='text-gray-600'>
                Я отличный программист, который никогда не задерживается с
                дедлайнами.
              </p>
              <Button className='w-full'>Изменить информацию</Button>
            </div>
          </div>
          <div className='border-2 mb-4 p-5 rounded-xl'>
            <h2 className='text-2xl font-bold'>Посты</h2>
            <p className='text-gray-400'>
              здесь будут посты, которые ты публикуешь
            </p>
          </div>
          <div className='border-2 mb-4 p-5 rounded-xl'>
            <h2 className='text-2xl font-bold'>Друзья</h2>
            <p className='text-gray-400'>
              здесь будут твои друзья, которые тоже используют эту платформу
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
