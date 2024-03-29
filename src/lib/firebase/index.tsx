import {
  DocumentData,
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db, storage, auth } from './config';
import { IUserPhotos } from '@/types';
import { ref, uploadBytes } from 'firebase/storage';

const storageUserId = localStorage.getItem('userAuth');

export const createUserDocument = async (
  userId: string | undefined,
  fullName: string,
  userEmail: string,
  birthDate: string
) => {
  try {
    console.log('creating user');
    await setDoc(doc(db, `users/${userId}`), {
      avatar_url: '',
      email: userEmail,
      full_name: fullName,
      info: {
        birth_date: birthDate,
        city: '',
        phone: '',
        status: '',
      },
      is_online: false,
      friends: [],
      photos: {
        albums: [],
        user_images: [],
      },
      post_ids: [],
    });

    await addDoc(collection(db, `users/${userId}/chats`), {});

    await addDoc(collection(db, `users/${userId}/posts`), {});
  } catch (error) {
    console.log(error);
  }
};

// Профиль
export const getCurrentUser = async (userId: string) => {
  const currentUser = await getDoc(doc(db, `users/${userId}`));

  return currentUser.data();
};

export const getUsersProfileInfo = async () => {
  const usersData: DocumentData[] = [];

  const q = query(collection(db, 'users'));

  const userDocs = await getDocs(q);

  userDocs.forEach(user => {
    usersData.push({ id: user.id, ...user.data() });
  });

  return usersData;
};

export const getUserFriends = () => {};

export const getUserProfilePosts = () => {};

export const createProfilePost = () => {};

export const deleteProfilePost = () => {};

export const editProfilePost = () => {};

export const editProfileInfo = () => {};

// Новости
export const getAllPosts = () => {};

export const getUserPosts = async () => {
  const q = query(collection(db, `users/${storageUserId}/posts`));

  const userPosts = await getDocs(q);

  return userPosts;
};

export const getLikedPosts = () => {};

export const createNewPost = () => {};

export const deleteUserPost = () => {};

export const editUserPost = () => {};

export const likeUserPost = () => {};

export const addPostComment = () => {};

export const deletePostComment = () => {};

export const editPostComment = () => {};

// Сообщения
export const getUserChats = () => {};

export const createNewChat = () => {};

export const deleteUserChat = () => {};

export const editUserChat = () => {};

// Чат
export const getChatMessages = () => {};

export const getChatImages = () => {};

export const getUserMessage = () => {};

export const sendNewMessage = () => {};

export const deleteUserMessage = () => {};

export const editUserMessage = () => {};

// Фотографии

export const getUserAlbums = async () => {
  const userImages = await getDoc(doc(db, `users/${storageUserId}`));

  const data = await userImages.data()?.photos.albums;

  return data;
};

export const getUserImages = async () => {
  const userImages = await getDoc(doc(db, `users/${storageUserId}`));

  const data = (await userImages.data()?.photos.user_images) as IUserPhotos[];

  return data;
};

export const addUserImage = async (imageTitle: string, imageUrl: string) => {
  const userRef = doc(db, `users/${storageUserId}`);
  const userImages = await getDoc(userRef);

  const newImage = {
    url: imageUrl,
    date: new Date().toLocaleDateString('ru-RU'),
    title: imageTitle,
  };

  const photos = userImages.data().photos;

  photos.user_images.push(newImage);

  await updateDoc(userRef, { photos });
};

export const addUserStorageImage = async (title: string, file: File) => {
  const userStorageRef = ref(storage, `users/${storageUserId}/images/${title}`);

  await uploadBytes(userStorageRef, file).then(() => console.log('file added'));
};

export const getUserAlbumImages = () => {};

export const deleteUserImage = async (index: number) => {
  const userRef = doc(db, `users/${storageUserId}`);
  const userImages = await getDoc(userRef);

  const photos = userImages.data().photos;

  photos.user_images.splice(index, 1);

  await updateDoc(userRef, { photos });
};

// Нейро-чат

export const getNeuroChatMessages = () => {};
