import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../config';
import { createUserDocument } from '..';

export const useUserSignIn = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password).then(
    userCredentials => {
      console.log(`${userCredentials.user.uid} user logged`);
    }
  );
};

export const useUserSignUp = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password).then(
    userCredentials => {
      console.log(`${userCredentials.user.uid} user created`);
    }
  );
};
