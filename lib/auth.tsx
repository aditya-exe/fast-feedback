import React, {useState, useEffect, createContext, useContext} from "react";
import {signInWithPopup, GithubAuthProvider, onAuthStateChanged, auth, signOut} from "./firebase";
import type {User} from "./firebase";

export interface ContextTypes {
  user: User | null | undefined;
  signInWithGitHub: () => Promise<User | null>;
  sign_out: () => Promise<void> | null;
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
  const [user, setUser] = useState<User | null>(null);

  const signInWithGitHub = async () => {
    const res = await signInWithPopup(auth, new GithubAuthProvider());
    setUser(res.user);
    return res.user;
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
