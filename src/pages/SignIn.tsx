import { SignInForm } from '@/components/shared/SignInForm';
import { Toaster } from '@/components/ui/toaster';

export const SignIn = () => {
  return (
    <div className='flex h-screen w-screen items-center justify-center max-[1300px]:flex-col overflow-x-hidden'>
      <div className='flex laptop:flex-row laptop:flex-col h-[80%] w-[80%] border-2 border-gray-600 rounded-2xl'>
        <div className='w-[50%] relative p-5'>
          <img src='/assets/socialvibe_logo.png' className='absolute pt-4' />
          <img
            className='h-full w-full object-fit rounded-xl'
            src='/assets/signin_hero.avif'
          />
        </div>
        <SignInForm />
      </div>
      <Toaster />
    </div>
  );
};
