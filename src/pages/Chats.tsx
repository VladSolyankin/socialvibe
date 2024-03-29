import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { ChatItem, MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

export const Chats = () => {
  const [userChats, setUserChats] = useState<IUserChats[]>();
  return (
    <div className='mt-4 h-screen max-w-5xl'>
      <CardContent className='h-full grid grid-cols-3 gap-6'>
        <div className='flex flex-col gap-3 col-span-1 p-2'>
          <CardTitle>💬 Сообщения</CardTitle>
          <CardDescription>
            Здесь вы можете общаться с друзьями или группами людей
          </CardDescription>
          <Input placeholder='🔍 Найти чат...' />

          <div>
            <ChatItem
              className='text-black'
              avatar={
                'https://firebasestorage.googleapis.com/v0/b/socialvibe-92a74.appspot.com/o/cat.jpg?alt=media&token=ee01de80-84c0-4f6f-843b-a8ae4495443a'
              }
              alt={'Reactjs'}
              title={'Hello'}
              subtitle={'What are you doing?'}
              date={new Date()}
              unread={0}
            />
            <ChatItem
              className='text-black'
              avatar={
                'https://firebasestorage.googleapis.com/v0/b/socialvibe-92a74.appspot.com/o/cat.jpg?alt=media&token=ee01de80-84c0-4f6f-843b-a8ae4495443a'
              }
              alt={'Reactjs'}
              title={'Hello'}
              subtitle={'What are you doing?'}
              date={new Date()}
              unread={0}
            />
          </div>
        </div>

        <Card className='h-full col-span-2 border-2'>
          <MessageBox
            className='text-black'
            reply={{
              photoURL:
                'https://firebasestorage.googleapis.com/v0/b/socialvibe-92a74.appspot.com/o/cat.jpg?alt=media&token=ee01de80-84c0-4f6f-843b-a8ae4495443a',
              title: 'Влад Солянкин',
              titleColor: '#8717ae',
              message: 'Эво я тут что-то умное написал',
            }}
            onReplyMessageClick={() => console.log('reply clicked!')}
            position={'left'}
            type={'text'}
            text={'Как же он прав!'}
          />
          <MessageBox
            className='text-black'
            reply={{
              photoURL: 'https://facebook.github.io/react/img/logo.svg',
              title: 'NEKITKOT',
              titleColor: '#8717ae',
              message: 'Я кот!',
            }}
            onReplyMessageClick={() => console.log('reply clicked!')}
            position={'right'}
            type={'text'}
            text={'Ты попуг'}
          />
        </Card>
      </CardContent>
    </div>
  );
};
