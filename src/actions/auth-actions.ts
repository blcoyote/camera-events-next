'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { HOME_ROUTE, ROOT_ROUTE } from '@/constants';
import { serverConfig } from '@/config';

export async function createSession(uid: string) {
  cookies().set(serverConfig.cookieName, uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30, // One day
    path: '/',
  });

  redirect(HOME_ROUTE);
}

export async function removeSession() {
  cookies().delete(serverConfig.cookieName);

  redirect(ROOT_ROUTE);
}
