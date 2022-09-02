import {getApp, getApps, initializeApp} from "@firebase/app";
import {onAuthStateChanged, signInWithPopup, GithubAuthProvider, signOut, User, getAuth} from "@firebase/auth";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "@firebase/storage";

const app = !getApps().length ? initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
}) : getApp();

const db = getFirestore()
const storage = getStorage()
const auth = getAuth();

export {app, db, storage, onAuthStateChanged, signInWithPopup, GithubAuthProvider, signOut, auth};
export type {User};
