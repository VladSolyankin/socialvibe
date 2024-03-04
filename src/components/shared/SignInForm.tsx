import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useLoading } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Icons } from '../ui/icons';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Это поле обязательно' })
    .email({ message: 'Неверный формат email' }),
  password: z
    .string()
    .min(6, { message: 'Пароль должен быть не менее 6 символов' })
    .max(20, { message: 'Пароль не должен быть больше 20 символов' }),
});

export const SignInForm = () => {
  const { isLoading, onSubmit } = useLoading();
  const pageNavigator = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onFormSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(`Form values: ${values}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className='w-[50%] flex flex-col justify-center items-center gap-5'>
        <h1 className='text-3xl font-semibold'>Вход в аккаунт</h1>
        <p className='text-lg text-gray-400'>
          Введите логин и пароль для входа
        </p>

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='flex flex-col items-center my-3'>
              <Label>Логин (email)</Label>
              <FormControl>
                <Input placeholder='Логин тут...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}></FormField>

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='flex flex-col items-center my-3'>
              <Label>Пароль</Label>
              <FormControl>
                <Input placeholder='Пароль тут...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}></FormField>

        <Button type='submit'>Войти</Button>

        <div className='flex items-center justify-center gap-3'>
          <Separator className='w-24' />
          <Label className='text-md'>Или, войдите с помощью </Label>
          <Separator className='w-24' />
        </div>

        <Button
          variant='outline'
          type='button'
          disabled={isLoading}
          onClick={onSubmit}>
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
      </form>
    </Form>
  );
};
