import React, {useState, useEffect, createContext, useContext} from "react";
import {signInWithPopup, GithubAuthProvider, onAuthStateChanged, auth, signOut} from "./firebase";
import type {User} from "./firebase";
import {createUser} from "./db";
import {UserCredential} from "@firebase/auth";

//types
export interface ContextTypes {
  user: User | null | undefined | UserType;
  signInWithGitHub: () => Promise<false | null | undefined>;
  sign_out: () => Promise<void> | null;
}

interface UserType {
  uid: string;
  email: string | null;
  name: string | null;
  provider: string;
  photoUrl: string | null;
}

const authContext = createContext<ContextTypes>({
  user: null,
  signInWithGitHub: () => Promise.resolve(null),
  sign_out: () => Promise.resolve(),
});

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext);
}


const useProvideAuth = (): ContextTypes => {
  const [user, setUser] = useState<User | null | UserType>(null);

  const handleUser = (rawUser: User) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      createUser(user.uid, user);
      setUser(user);
    } else {
      setUser(null);
      return false;
    }
  }

  const signInWithGitHub = async () => {
    return await signInWithPopup(auth, new GithubAuthProvider())
      .then((res: UserCredential) => handleUser(res.user));
  }

  const sign_out = async () => {
    await signOut(auth);
    setUser(null);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return {
    user,
    signInWithGitHub,
    sign_out,
  }
}

const formatUser = (user: User) => {
  // const token = await user.getIdToken();
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    // token
  };
};