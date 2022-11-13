'use client';

import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  User,
  getAuth,
  Auth,
} from 'firebase/auth';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createUser } from './db';
import { createFirebaseApp } from './firebase';

export interface Member {
  email: string | null;
  nickname: string | null;
  avatar: string | null;
  uid: string;
  token: string;
  provider: string;
}

interface AuthContextType {
  signInWithGoogle: () => void;
  signInWithGithub: () => void;
  signout: () => void;
  user: Member | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  signInWithGoogle: () => {},
  signInWithGithub: () => {},
  signout: () => {},
  user: {} as Member,
  loading: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('error');
  }
  return context;
};

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const formatUser = async (user: User) => {
  const token = await user.getIdToken();
  const { providerId } = user.providerData[0];
  const provider = providerId.replace('.com', '');
  return {
    uid: user.uid,
    email: user.email,
    nickname: user.displayName || user.email,
    avatar: user.photoURL,
    provider,
    token,
  };
};

const useProvideAuth = () => {
  const [user, setUser] = useState<Member | null>(null);
  const [loading, setLoading] = useState(false);
  const authRef = useRef<Auth | null>(null);

  const handleUser = useCallback(async (rawUser: User | null) => {
    if (rawUser) {
      const formatedUser = await formatUser(rawUser);
      const { token, ...userWithoutToken } = formatedUser;

      createUser(formatedUser.uid, userWithoutToken);
      setUser(formatedUser);

      setLoading(false);
      return formatUser;
    }
    setUser(null);
    setLoading(false);
    return false;
  }, []);

  const signInWithGoogle = () => {
    if (authRef.current) {
      setLoading(true);
      signInWithPopup(authRef.current, googleProvider)
        .then(result => {
          const rawUser = result.user;
          handleUser(rawUser);
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const { email } = error.customData;
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log('errorCode:', errorCode);
          console.log('errorMessage:', errorMessage);
          console.log('email:', email);
          console.log('credential:', credential);
        });
    }
  };

  const signInWithGithub = () => {
    if (authRef.current) {
      setLoading(true);
      signInWithPopup(authRef.current, githubProvider)
        .then(result => {
          const rawUser = result.user;
          handleUser(rawUser);
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const { email } = error.customData;
          const credential = GithubAuthProvider.credentialFromError(error);
          console.log('errorCode:', errorCode);
          console.log('errorMessage:', errorMessage);
          console.log('email:', email);
          console.log('credential:', credential);
        });
    }
  };

  const signout = () => {
    setLoading(true);
    authRef.current?.signOut().then(() => {
      handleUser(null);
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    const firebaseApp = createFirebaseApp();
    const auth = getAuth(firebaseApp);
    authRef.current = auth;
    const unsubscribe = auth.onIdTokenChanged(handleUser);

    return () => unsubscribe();
  }, [handleUser]);

  return {
    signInWithGoogle,
    signInWithGithub,
    signout,
    user,
    loading,
  } as const;
};

export const AuthProvider = ({ children }: any) => {
  const value = useProvideAuth();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
