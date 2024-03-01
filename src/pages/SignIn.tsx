import React from 'react'

export const SignIn = () => {
  return (
    <div className='flex'>
        <div className="w-[50%]">
            <img src="public/assets/signin_hero.png" />
        </div>
        <div className="w-[50%] flex flex-col justify-center items-center">
            <h1 className='text-2xl font-semibold'>Вход в аккаунт</h1>
            <p className='text-lg'>Введите логин и пароль для входа</p>
        </div>
    </div>
  )
}
