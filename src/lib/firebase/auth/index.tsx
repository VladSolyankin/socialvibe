import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../config';

export const useUserSignIn = async (email: string, password: string) => {
  console.log('auth1');
  await signInWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
      localStorage.setItem('userAuth', userCredentials.user.uid);
      console.log(`${userCredentials.user.uid} user logged`);
    })
    .catch(err => {
      console.log('Ошибка входа: ', err.message);
    });
};

export const useUserSignUp = async (email: string, password: string) => {
  console.log('auth2');
  await createUserWithEmailAndPassword(auth, email, password).then(
    userCredentials => {
      console.log(`${userCredentials.user.uid} user created`);
    }
  );
};

export const useUserLogOut = async () => {
  await signOut(auth).then(() => console.log('signed out'));
  localStorage.clear();
};
