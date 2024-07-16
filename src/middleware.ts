import { NextRequest, NextResponse } from 'next/server';
import { serverConfig } from './config';
import { HOME_ROUTE, ROOT_ROUTE } from './constants';

const protectedRoutes = [HOME_ROUTE];

export async function middleware(request: NextRequest) {
  const session = request.cookies.get(serverConfig.cookieName)?.value ?? '';

  // Redirect to login if session is not set
  if (!session && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL(ROOT_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // Redirect to home if session is set and user tries to access root
  if (session && request.nextUrl.pathname === ROOT_ROUTE) {
    const absoluteURL = new URL(HOME_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
