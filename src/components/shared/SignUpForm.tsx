import { useLoading } from '@/hooks';
import { Button } from '../ui/button';
import { Icons } from '../ui/icons';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Это поле обязательно' })
      .email({ message: 'Неверный формат email' }),
    password: z
      .string()
      .min(6, { message: 'Пароль должен быть не менее 6 символов' })
      .max(20, { message: 'Пароль не должен быть больше 20 символов' }),
    password_check: z.string().min(1, { message: 'Это поле обязательно' }),
  })
  .refine(data => data.password === data.password_check, {
    message: 'Пароли должны совпадать',
    path: ['password_check'],
  });

export const SignUpForm = () => {
  const { isLoading, onSubmit } = useLoading();
  const pageNavigator = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      password_check: '',
    },
  });

  const onFormSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className='w-[50%] flex flex-col justify-center items-center gap-5'>
        <h1 className='text-3xl font-semibold'>Регистрация</h1>
        <p className='text-lg text-gray-400'>
          Введите логин и пароль для входа
        </p>

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='flex flex-col items-center my-2' {...field}>
              <Label>Логин (email)</Label>
              <FormControl>
                <Input placeholder='Ваш логин тут...' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}></FormField>

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='flex flex-col items-center my-2' {...field}>
              <Label>Пароль</Label>
              <FormControl>
                <Input placeholder='Ваш пароль тут...' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}></FormField>

        <FormField
          control={form.control}
          name='password_check'
          render={({ field }) => (
            <FormItem className='flex flex-col items-center my-2' {...field}>
              <Label>Подтверждение</Label>
              <FormControl>
                <Input placeholder='Подтвердите пароль...' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}></FormField>

        <Button type='submit'>Создать аккаунт</Button>

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
          )}
          Gmail
        </Button>

        <Button
          variant='link'
          className='text-lg'
          onClick={() => pageNavigator('/sign_in')}>
          Уже есть аккаунт?
        </Button>
      </form>
    </Form>
  );
};
