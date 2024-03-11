import { Label } from '@/components/ui/label';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { auth } from '@/lib/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { AiOutlineWechat } from 'react-icons/ai';
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md';
import { PiHeadphones } from 'react-icons/pi';
import { RiHomeSmile2Line, RiMessage3Line } from 'react-icons/ri';
import { Outlet, useNavigate } from 'react-router-dom';

export const DesktopLayout = () => {
  const { toast } = useToast();
  const pageNavigator = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isLogged')) {
      onAuthStateChanged(auth, () => {
        toast({
          title: '✅ Вы успешно вошли',
          description: 'Для навигации используйте меню слева',
        });
      });
      localStorage.removeItem('isLogged');
    }
  }, []);
  return (
    <div className='w-full'>
      <div className='flex m-8 min-h-screen'>
        <div className='basis-1/6'>
          <div className='flex flex-col items-start px-2'>
            <img
              className='h-12 h-12 rounded-lg'
              src='/assets/socialvibe_logo.svg'
              alt='SocialVibe logo picture'
            />
          </div>
          <div className='flex items-center my-5 gap-3 p-2'>
            <img
              className='w-10 h-10'
              src={true ? '/assets/default_profile.png' : ''}
              alt=''
            />
            <Label
              className='text-lg'
              onClick={() => pageNavigator('/profile')}>
              Профиль
            </Label>
          </div>

          <ul className='flex flex-col w-[150px]'>
            <li className='flex items-center max-w-max p-2 flex gap-2 hover:bg-blue-400 hover:rounded-xl'>
              <RiHomeSmile2Line />
              <Label className='text-lg' onClick={() => pageNavigator('/news')}>
                Новости
              </Label>
            </li>
            <li className='flex items-center max-w-max p-2 flex gap-2 hover:bg-blue-400 hover:rounded-xl'>
              <RiMessage3Line />
              <Label
                className='text-lg'
                onClick={() => pageNavigator('/chats')}>
                Сообщения
              </Label>
            </li>
            <li className='flex items-center max-w-max p-2 flex gap-2 hover:bg-blue-400 hover:rounded-xl'>
              <PiHeadphones />
              <Label
                className='text-lg'
                onClick={() => pageNavigator('/music')}>
                Музыка
              </Label>
            </li>
            <li className='flex items-center max-w-max p-2 flex gap-2 hover:bg-blue-400 hover:rounded-xl'>
              <MdOutlinePhotoSizeSelectActual />
              <Label
                className='text-lg'
                onClick={() => pageNavigator('/photos')}>
                Фотографии
              </Label>
            </li>
            <li className='flex items-center max-w-max p-2 flex gap-2 hover:bg-blue-400 hover:rounded-xl'>
              <AiOutlineWechat />
              <Label className='text-lg' onClick={() => pageNavigator('/ai')}>
                Нейро-чат
              </Label>
            </li>
          </ul>
        </div>

        <div className='basis-5/6 border-2 border-gray-600 rounded-xl'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
