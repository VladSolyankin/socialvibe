import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../config';

export const useUserSignIn = async (email: string, password: string) => {
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
  await createUserWithEmailAndPassword(auth, email, password).then(
    userCredentials => {
      console.log(`${userCredentials.user.uid} user created`);
    }
  );
};
