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
import { db, storage, auth, rtdb } from './config';
import { IUserPhotos } from '@/types';
import { ref, uploadBytes } from 'firebase/storage';
import { set, ref as dbRef, get, child, update } from 'firebase/database';

const storageUserId = localStorage.getItem('userAuth');

export const getAllUsers = async () => {
  const users = [];
  const usersSnapshot = await getDocs(query(collection(db, '/users')));

  usersSnapshot.forEach(user => {
    users.push(user.data());
  });

  return users;
};
export const createUserDocument = async (
  userId: string | undefined,
  fullName: string,
  userEmail: string,
  birthDate: string
) => {
  try {
    console.log('creating user');
    await setDoc(doc(db, `users/${userId}`), {
      id: userId,
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

export const addUserFriend = async (id: string) => {
  const userRef = doc(db, `users/${storageUserId}`);
  const userDoc = await getDoc(userRef);

  const userFriends = userDoc.data().friends;

  userFriends.push(id);

  await updateDoc(userRef, { friends: userFriends });
};

export const deleteUserFriend = async (id: string) => {
  const userRef = doc(db, `users/${storageUserId}`);
  const userDoc = await getDoc(userRef);

  const userFriends = userDoc.data().friends;

  const filter = userFriends.filter((friendId: string) => friendId !== id);

  await updateDoc(userRef, { friends: filter });
};

export const getUserFriends = async () => {
  const userRef = doc(db, `users/${storageUserId}`);
  const userDoc = await getDoc(userRef);

  const friendsIds = userDoc.data().friends;

  const friendsPromises = friendsIds.map(id => getDoc(doc(db, `/users/${id}`)));

  const friendsData = (await Promise.all(friendsPromises))
    .map(doc => doc.data())
    .filter(data => data);

  return friendsData;
};

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
  const userAlbums = await getDoc(doc(db, `users/${storageUserId}`));

  const data = await userAlbums.data()?.photos.albums;

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

// RTDB

export const initializeDatabaseUser = friends => {
  const chats = friends.map((friend, index: number) => {
    return {
      title: friend.full_name,
      members: [friend.id, storageUserId],
    };
  });

  const chatObject = Object.assign({}, ...chats);

  get(child(dbRef(rtdb), `/users/${storageUserId}/chats`)).then(res => {
    const updates = {};
    updates[`users/${storageUserId}/chats`] = { ...res.val(), ...chats };
    update(dbRef(rtdb), updates);
  });
};

export const addNewChat = (title: string = 'title', members: [] = []) => {
  get(child(dbRef(rtdb), `/users/${storageUserId}/chats`)).then(res => {
    const lastChatIndex: number = Object.keys(res.val()).length;
    const newChat = {
      title: title,
      members: [...members, storageUserId],
    };
    const updates = {};
    updates[`users/${storageUserId}/chats/${lastChatIndex}`] = newChat;
    update(dbRef(rtdb), updates);
  });
};

export const addNewChatMessage = (chatIndex: number) => {
  get(child(dbRef(rtdb), `/users/${storageUserId}/chats/${chatIndex}`)).then(
    res => {
      const updates = {};
      updates[`users/${storageUserId}/chats/${chatIndex}`] = newChat;
      update(dbRef(rtdb), updates);
    }
  );
};

export const getDatabaseChats = () => {
  get(dbRef(rtdb)).then(res => console.log(res.val()));
};
