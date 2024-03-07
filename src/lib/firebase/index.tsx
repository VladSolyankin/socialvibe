import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { db, storage, auth } from './config';

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

export const getUserProfileInfo = () => {};

export const getUserFriends = () => {};

export const getUserProfilePosts = () => {};

export const createProfilePost = () => {};

export const deleteProfilePost = () => {};

export const editProfilePost = () => {};

export const editProfileInfo = () => {};

// Новости
export const getAllPosts = () => {};

export const getUserPosts = () => {};

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

export const getUserImages = () => {};

export const getUserAlbumImages = () => {};

// Нейро-чат

export const getNeuroChatMessages = () => {};
