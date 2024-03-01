import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/ui/icons';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { useLoading } from '@/hooks';
import { useNavigate } from 'react-router-dom';

export const SignIn = () => {
  const { isLoading, onSubmit } = useLoading();
  const pageNavigator = useNavigate();

  return (
    <div
      className='flex h-screen w-screen items-center justify-center max-[1300px]:flex-col overflow-x-hidden'
      onSubmit={onSubmit}>
      <div className='flex laptop:flex-row laptop:flex-col h-[80%] w-[80%] border-2 border-gray-600 rounded-2xl'>
        <div className='w-[50%] relative p-5'>
          <img
            src='public/assets/socialvibe_logo.png'
            className='absolute pt-4'
          />
          <img
            className='h-full w-full object-fit rounded-xl'
            src='public/assets/signin_hero.avif'
          />
        </div>
        <div className='w-[50%] flex flex-col justify-center items-center gap-5'>
          <h1 className='text-3xl font-semibold'>Вход в аккаунт</h1>
          <p className='text-lg text-gray-400'>
            Введите логин и пароль для входа
          </p>

          <Label>Логин (email)</Label>
          <Input className='w-[300px]' placeholder='Логин тут...' />

          <Label>Пароль</Label>
          <Input className='w-[300px]' placeholder='Пароль тут...' />

          <Button onClick={() => pageNavigator('/')}>Войти</Button>

          <div className='flex items-center justify-center gap-3'>
            <Separator className='w-24' />
            <Label className='text-md'>Или, войдите с помощью </Label>
            <Separator className='w-24' />
          </div>

          <Button variant='outline' type='button' disabled={isLoading}>
            {isLoading ? (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <Icons.google className='mr-2 h-4 w-4' />
            )}{' '}
            Gmail
          </Button>

          <Button
            variant='link'
            className='text-lg'
            onClick={() => pageNavigator('/sign_up')}>
            Ещё нет аккаунта?
          </Button>
        </div>
      </div>
    </div>
  );
};
