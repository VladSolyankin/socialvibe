import { Card } from '@/components/ui/card';
import { getUserPosts, getUserProfileInfo } from '@/lib/firebase';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

export const News = () => {
  const [userPosts, setUserPosts] = useState(Array);
  const [userPostInfo, setUserPostInfo] = useState({});

  useEffect(() => {
    const getPostsFromFirestore = async () => {
      await getUserPosts()
        .then(res => res.docs.map(post => post.data()))
        .then(posts => setUserPosts(posts));
    };

    getPostsFromFirestore();
  }, []);

  return (
    <div id='posts' className='flex flex-col gap-10 border-2 rounded-xl p-3'>
      {userPosts.map(post => {
        getUserProfileInfo(post.user_id).then(res => setUserPostInfo(res));
        return (
          <Card
            key={nanoid()}
            className='flex flex-col gap-3 border-2 w-[35vw]'>
            <div className='flex flex-col p-2 gap-3'>
              <div className='flex items-center gap-3'>
                <img
                  src={true ? 'assets/default_profile.png' : ''}
                  alt=''
                  className='w-10 h-10'
                />
                <span>{userPostInfo.full_name}</span>
              </div>
              <div>{post.content}</div>
              <img src={post.images[0]} alt='' className='rounded-xl' />
            </div>
            <div id='post-buttons' className=''></div>
            <div id='comments'>
              {post.comments.map(comment => {
                return (
                  <div
                    key={nanoid()}
                    id='comment'
                    className='flex items-center border-t-2 border-gray-800 p-2 gap-3'>
                    <img
                      src={true ? 'assets/default_profile.png' : ''}
                      className='w-8 h-8'
                      alt=''
                    />
                    <div>
                      <span className='text-blue-500'>Some user</span>
                      <p className='text-sm'>{comment.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        );
      })}
    </div>
  );
};
