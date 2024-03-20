import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from 'firebase/firestore';
import { db, storage, auth } from './config';

const storageUserId = localStorage.getItem('userAuth');

export const createUserDocument = async (
  userId: string | undefined,
  fullName: string,
  userEmail: string,
  birthDate: string
) => {
  try {
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

export const getUserProfileInfo = async (uid: 'string') => {
  const userInfo = await getDoc(doc(db, `users/${uid}`));

  return userInfo.data();
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

export const getUserAlbums = () => {};

export const getUserImages = async () => {
  const userImages = await getDoc(doc(db, `users/${storageUserId}`));

  const data = (await userImages.data()?.photos.user_images) as IUserPhotos[];

  return data;
};

export const getUserAlbumImages = () => {};

// Нейро-чат

export const getNeuroChatMessages = () => {};
