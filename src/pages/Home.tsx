import { Label } from '@/components/ui/label';
import React, { useState } from 'react';

export const Home = () => {
  return (
    <div className='flex justify-start w-screen m-8 p-8 border-2 border-gray-600 rounded-xl'>
      <div className='basis-1/4'>
        <div className='bg-white rounded-lg h-14 w-64'>
          <img
            className='w-64 h-12'
            src='public/assets/socialvibe_logo.png'
            alt='SocialVibe logo picture'
          />
        </div>
        <ul>
          <li>
            <img src='' alt='' />
            <Label>Новости</Label>
          </li>
          <li>
            <img src='' alt='' />
            <Label>Сообщения</Label>
          </li>
          <li>
            <img src='' alt='' />
            <Label>Музыка</Label>
          </li>
          <li>
            <img src='' alt='' />
            <Label>Фотографии</Label>
          </li>
          <li>
            <img src='' alt='' />
            <Label>Исскуственный интеллект</Label>
          </li>
        </ul>
      </div>

      <div className='basis-2/4'></div>

      <div className='flex justify-end basis-1/4'>
        <div className='flex flex-col items-center'>
          <img
            className='w-16 h-16'
            src={true ? 'public/assets/default_profile.png' : ''}
            alt=''
          />
          <Label>Ваш профиль</Label>
        </div>
      </div>
    </div>
  );
};
