import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  addUserFriend,
  deleteUserFriend,
  getAllUsers,
  getCurrentUser,
  getUserFriends,
} from '@/lib/firebase';
import React, { useEffect, useState } from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa';
import Emoji from 'react-emoji-render';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { nanoid } from 'nanoid';

export const Friends = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [isAddFriendDialogOpen, setIsAddFriendDialogOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [isSearched, setIsSearched] = useState(false);
  const userId = localStorage.getItem('userAuth');

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    fetchUserFriends();
  }, []);

  const onSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearched(true);
    const filter = users.filter(user =>
      user.full_name.toLowerCase().includes(e.target.value)
    );
    setFilteredUsers(filter);
  };

  const onSearchFriends = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearched(true);
    const filter = friends.filter(friend =>
      friend.full_name.toLowerCase().includes(e.target.value)
    );
    setFilteredFriends(filter);
  };

  const fetchAllUsers = async () => {
    const fetchedUsers = await getAllUsers();
    const filteredUsers = fetchedUsers.filter(user => user.id !== userId);
    setUsers(filteredUsers);
  };

  const fetchUserProfile = async () => {
    const info = await getCurrentUser(userId as string);
    setUserProfile(() => info);
  };

  const fetchUserFriends = async () => {
    const fetchedFriends = await getUserFriends();
    setFriends(fetchedFriends);
  };

  const onAddFriend = async (id: string) => {
    await addUserFriend(id as string);
    await fetchUserProfile();
    await fetchUserFriends();
  };

  const onTabChange = () => {
    setIsSearched(false);
    setFilteredFriends([]);
    setFilteredUsers([]);
  };

  const onDeleteFriend = async (id: string) => {
    await deleteUserFriend(id);
    await fetchUserProfile();
    await fetchUserFriends();
  };

  console.log;

  return (
    <div className='min-h-screen min-w-[50vw]'>
      <Tabs defaultValue='friends'>
        <TabsList className='ml-5 mt-5'>
          <TabsTrigger value='friends' onClick={onTabChange}>
            Мои друзья
          </TabsTrigger>
          <TabsTrigger value='users' onClick={onTabChange}>
            Все пользователи
          </TabsTrigger>
        </TabsList>
        <TabsContent value='friends'>
          <div className='flex flex-col p-5 gap-5'>
            <div className='flex flex-col gap-3 items-center'>
              <FaUserFriends className='w-6 h-6' />
              <Label>Мои друзья</Label>
              <Label className='text-[12px] text-gray-400'>
                Да-да, все здесь...
              </Label>
            </div>
            <Input
              placeholder='🔍 Найти друга...'
              onChange={e => onSearchFriends(e)}
            />
            <Card className='flex flex-col h-full p-5'>
              {friends.length ? (
                (isSearched ? filteredFriends : friends).length ? (
                  <div>
                    {(isSearched ? filteredFriends : friends).map(friend => (
                      <div
                        key={nanoid()}
                        className='flex items-center justify-between gap-5 w-full'>
                        <div className='flex gap-5 items-center'>
                          <img
                            src={
                              friend.avatar_url
                                ? friend.avatar_url
                                : 'assets/default_profile.png'
                            }
                            alt=''
                            className='w-8 h-8'
                          />
                          <span>{friend.full_name}</span>
                        </div>

                        <Dialog
                          open={isAddFriendDialogOpen}
                          onOpenChange={setIsAddFriendDialogOpen}>
                          <DialogTrigger>
                            <Button
                              variant='destructive'
                              className='text-sm focus-within:ring-1'>
                              Удалить из друзей
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <span>
                                Вы уверены, что хотите удалить{' '}
                                <span className='text-red-400'>
                                  {' '}
                                  {friend.full_name}{' '}
                                </span>
                                из друзей?
                              </span>
                            </DialogHeader>
                            <DialogFooter>
                              <DialogClose className='flex gap-3'>
                                <Button>Нет</Button>
                                <Button
                                  variant='destructive'
                                  onClick={() => onDeleteFriend(friend.id)}>
                                  Да
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='flex flex-col items-center gap-3'>
                    <Emoji className='text-5xl'>😟</Emoji>
                    <span>Никого не нашли</span>
                  </div>
                )
              ) : (
                <div className='flex flex-col items-center gap-3'>
                  <Emoji className='text-5xl'>😟</Emoji>
                  <span>У вас нет друзей</span>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>
        <TabsContent value='users'>
          <div className='flex flex-col p-5 gap-5'>
            <div className='flex flex-col gap-3 items-center'>
              <AiOutlineUsergroupAdd className='w-6 h-6' />
              <Label>Пользователи</Label>
              <Label className='text-[12px] text-gray-400'>
                Великий глобальный поиск...
              </Label>
            </div>
            <Input
              placeholder='🔍 Найти пользователя...'
              onChange={e => onSearchUser(e)}
            />
            <Card className='flex flex-col h-full p-5'>
              {users.length ? (
                (isSearched ? filteredFriends : friends) ? (
                  <div>
                    {(isSearched ? filteredUsers : users).map(user => (
                      <div
                        key={nanoid()}
                        className='flex items-center justify-between gap-5 w-full'>
                        <div className='flex gap-5 items-center'>
                          <img
                            src={
                              user.avatar_url
                                ? user.avatar_url
                                : 'assets/default_profile.png'
                            }
                            alt=''
                            className='w-8 h-8'
                          />
                          <span>{user.full_name}</span>
                        </div>

                        {userProfile.friends.includes(user.id) ? (
                          <Label className='text-sm text-blue-500'>
                            Уже в друзьях
                          </Label>
                        ) : (
                          <Dialog
                            open={isAddFriendDialogOpen}
                            onOpenChange={setIsAddFriendDialogOpen}>
                            <DialogTrigger>
                              <Button className='text-sm focus-within:ring-1'>
                                Добавить в друзья
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <span>
                                  Вы уверены, что хотите добавить{' '}
                                  <span className='text-blue-400'>
                                    {' '}
                                    {user.full_name}{' '}
                                  </span>
                                  в друзья?
                                </span>
                              </DialogHeader>
                              <DialogFooter>
                                <DialogClose className='flex gap-3'>
                                  <Button variant='destructive'>Нет</Button>
                                  <Button onClick={() => onAddFriend(user.id)}>
                                    Да
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='flex flex-col items-center gap-3'>
                    <Emoji className='text-5xl'>😟</Emoji>
                    <span>Никого не нашли</span>
                  </div>
                )
              ) : (
                <Label>Загрузка...</Label>
              )}
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
