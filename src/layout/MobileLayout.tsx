import { Label } from '@/components/ui/label';
import React from 'react';
import { AiOutlineWechat } from 'react-icons/ai';
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md';
import { PiHeadphones } from 'react-icons/pi';
import { RiHomeSmile2Line, RiMessage3Line } from 'react-icons/ri';

export const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='fex justify-start w-screen'>
      <div className='flex justify-between items-center mx-8 my-2'>
        <img
          className='h-12 h-12 rounded-lg'
          src='/assets/socialvibe_logo.svg'
          alt='SocialVibe logo picture'
        />
        <div className='flex'>
          <div className='flex flex-col items-center'>
            <img
              className='w-10 h-10'
              src={true ? '/assets/default_profile.png' : ''}
              alt=''
            />
            <Label className='text-sm'>Ваш профиль</Label>
          </div>
        </div>
      </div>
      <div className='flex m-8 min-h-screen'>
        <div className='fixed bottom-0 left-0 w-full'>
          <ul className='flex w-full justify-evenly'>
            <li className='max-w-max p-2 flex gap-2 hover:bg-blue-400 hover:rounded-xl'>
              <RiHomeSmile2Line />
              <Label className='hidden md:block'>Новости</Label>
            </li>
            <li className='max-w-max p-2 flex gap-2 hover:bg-blue-400 hover:rounded-xl'>
              <RiMessage3Line />
              <Label className='hidden md:block'>Сообщения</Label>
            </li>
            <li className='max-w-max p-2 flex gap-2 hover:bg-blue-400 hover:rounded-xl'>
              <PiHeadphones />
              <Label className='hidden md:block'>Музыка</Label>
            </li>
            <li className='max-w-max p-2 flex gap-2 hover:bg-blue-400 hover:rounded-xl'>
              <MdOutlinePhotoSizeSelectActual />
              <Label className='hidden md:block'>Фотографии</Label>
            </li>
            <li className='max-w-max p-2 flex gap-2 hover:bg-blue-400 hover:rounded-xl'>
              <AiOutlineWechat />
              <Label className='hidden md:block'>Нейро-чат</Label>
            </li>
          </ul>
        </div>

        <div className='w-full border-2 border-gray-600 rounded-xl'>
          {children}
        </div>
      </div>
    </div>
  );
};
