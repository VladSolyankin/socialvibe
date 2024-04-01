import { ModeToggle } from '@/components/shared/ModeToggle';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';
import { auth } from '@/lib/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { AiOutlineWechat } from 'react-icons/ai';
import { IoMenu } from 'react-icons/io5';
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md';
import { PiHeadphones } from 'react-icons/pi';
import { RiHomeSmile2Line, RiMessage3Line } from 'react-icons/ri';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaUserFriends } from 'react-icons/fa';
import { useUserLogOut } from '@/lib/firebase/auth';

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

  const onUserLogout = () => {
    useUserLogOut();
    pageNavigator('/sign_in');
  };
  return (
    <div className='w-full'>
      <div className='flex items-center justify-center m-8 min-h-screen'>
        <div className='border-2 border-gray-600 rounded-xl'>
          <Outlet />
        </div>
      </div>
      <Sheet>
        <SheetTrigger>
          <IoMenu className='fixed top-10 left-10 h-10 w-10' />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className='flex flex-row items-center gap-2'>
            <div className='flex flex-col items-center'>
              <img
                className='h-12 rounded-lg'
                src='/assets/socialvibe_logo.svg'
                alt='SocialVibe logo picture'
              />
            </div>
            <div className='flex flex-col pb-3'>
              <SheetTitle>SocialVibe</SheetTitle>
              <h2>Меню навигации</h2>
            </div>
          </SheetHeader>
          <div className='basis-1/6'>
            <div className='flex justify-center items-center my-5 gap-3 p-2'>
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
            <ul className='flex flex-col items-start w-[150px]'>
              <li className='flex justify-center items-center max-w-max p-2 gap-2 hover:bg-blue-400 hover:rounded-xl'>
                <RiHomeSmile2Line className='w-6 h-6' />
                <Label
                  className='text-lg'
                  onClick={() => pageNavigator('/news')}>
                  Новости
                </Label>
              </li>
              <li className='flex justify-center items-center max-w-max p-2 gap-2 hover:bg-blue-400 hover:rounded-xl'>
                <FaUserFriends className='w-6 h-6' />
                <Label
                  className='text-lg'
                  onClick={() => pageNavigator('/friends')}>
                  Друзья
                </Label>
              </li>
              <li className='flex justify-center items-center max-w-max p-2 gap-2 hover:bg-blue-400 hover:rounded-xl'>
                <RiMessage3Line className='w-6 h-6' />
                <Label
                  className='text-lg'
                  onClick={() => pageNavigator('/chats')}>
                  Сообщения
                </Label>
              </li>
              <li className='flex justify-center items-center max-w-max p-2 gap-2 hover:bg-blue-400 hover:rounded-xl'>
                <PiHeadphones className='w-6 h-6' />
                <Label
                  className='text-lg'
                  onClick={() => pageNavigator('/music')}>
                  Музыка
                </Label>
              </li>
              <li className='flex justify-center items-center max-w-max p-2 gap-2 hover:bg-blue-400 hover:rounded-xl'>
                <MdOutlinePhotoSizeSelectActual className='w-6 h-6' />
                <Label
                  className='text-lg'
                  onClick={() => pageNavigator('/photos')}>
                  Фотографии
                </Label>
              </li>
              <li className='flex justify-center items-center max-w-max p-2 gap-2 hover:bg-blue-400 hover:rounded-xl'>
                <AiOutlineWechat className='w-6 h-6' />
                <Label className='text-lg' onClick={() => pageNavigator('/ai')}>
                  Нейро-чат
                </Label>
              </li>
            </ul>
          </div>
          <Button
            className='fixed bottom-5 right-5'
            variant='destructive'
            onClick={() => onUserLogout()}>
            Выйти
          </Button>
        </SheetContent>
      </Sheet>

      <ModeToggle />
    </div>
  );
};
