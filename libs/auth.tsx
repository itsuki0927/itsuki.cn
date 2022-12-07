'use client';

import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  User,
} from 'firebase/auth';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { toast } from 'react-hot-toast';
import { createUser } from './db';
import { auth } from './firebase';

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
AuthContext.displayName = 'AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('error');
  }
  console.log('useAuth context', context);
  return context;
};

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const formatUser = (user: User | UserRecord) => {
  const { providerId } = user.providerData[0];
  const provider = providerId.replace('.com', '');
  return {
    uid: user.uid,
    email: user.email ?? '',
    nickname: user.displayName || user.email || '',
    avatar: user.photoURL || '',
    provider,
  };
};

const useProvideAuth = () => {
  const [user, setUser] = useState<Member | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUser = useCallback(async (rawUser: User | null) => {
    if (rawUser) {
      const formatedUser = formatUser(rawUser);
      const token = await rawUser.getIdToken();
      const userWithToken = { ...formatedUser, token };

      createUser(formatedUser.uid, formatedUser);
      console.log('userWithToken', userWithToken);
      setUser(userWithToken);

      setLoading(false);
      return formatUser;
    }
    console.log('user null', rawUser);
    setUser(null);
    setLoading(false);
    return null;
  }, []);

  const signInWithGoogle = useCallback(() => {
    if (auth) {
      setLoading(true);
      signInWithPopup(auth, googleProvider)
        .then(result => {
          const rawUser = result.user;
          handleUser(rawUser);
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const { email } = error.customData;
          const credential = GoogleAuthProvider.credentialFromError(error);
          handleUser(null);
          toast.error(`登录失败：${errorCode}`);
          console.log('errorCode:', errorCode);
          console.log('errorMessage:', errorMessage);
          console.log('email:', email);
          console.log('credential:', credential);
        });
    }
  }, [handleUser]);

  const signInWithGithub = useCallback(() => {
    if (auth) {
      setLoading(true);
      signInWithPopup(auth, githubProvider)
        .then(result => {
          const rawUser = result.user;
          handleUser(rawUser);
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const { email } = error.customData;
          const credential = GithubAuthProvider.credentialFromError(error);
          toast.error(`登录失败：${errorCode}`);
          handleUser(null);
          console.log('errorCode:', errorCode);
          console.log('errorMessage:', errorMessage);
          console.log('email:', email);
          console.log('credential:', credential);
        });
    }
  }, [handleUser]);

  const signout = useCallback(() => {
    setLoading(true);
    auth.signOut();
  }, []);

  useEffect(() => {
    console.log('init auth', auth);
    setLoading(true);
    const unsubscribe = auth.onIdTokenChanged(rawUser => {
      console.log('onIdTokenChanged', rawUser);
      handleUser(rawUser);
    });

    return () => {
      setLoading(false);
      unsubscribe();
    };
  }, [handleUser]);

  const returnedValue = useMemo(
    () => ({
      signInWithGoogle,
      signInWithGithub,
      signout,
      user,
      loading,
    }),
    [loading, signInWithGithub, signInWithGoogle, signout, user]
  );

  return returnedValue;
};

export const AuthProvider = ({ children }: any) => {
  const value = useProvideAuth();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
