'use client';
import { onAuthStateChanged } from '@/libs/firebase/auth';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';

export function useUserSession(InitSession: string | null) {
  const [userUid, setUserUid] = useState<string | null>(InitSession);

  // Listen for changes to the user session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUserUid(authUser.uid);
      } else {
        setUserUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return { userUid };
}
