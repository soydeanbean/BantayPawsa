import { useEffect, type ReactNode } from 'react';
import { onAuthChange, createUserProfile, getUserProfile } from '@/firebase/services';
import { useAuthStore } from '@/store/useAuthStore';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { setUser, setProfile, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      setUser(user);
      if (user) {
        await createUserProfile(user);
        const profile = await getUserProfile(user.uid);
        setProfile(profile);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [setUser, setProfile, setLoading]);

  return <>{children}</>;
}