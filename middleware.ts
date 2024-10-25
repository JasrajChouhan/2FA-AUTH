
import authConfig from "@/auth.config"
import NextAuth from "next-auth"

import {
  apiAuthPrifix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes
} from '@/routes'

export const { auth } = NextAuth(authConfig)

export default auth((req) => {
  // req.auth
  const { nextUrl } = req
  const isLoggedIn = !!req.auth


  const isApiAuthPrifix = nextUrl.pathname.startsWith(apiAuthPrifix)
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname)


  if (isApiAuthPrifix) {
    return;
  }

  if (isAuthRoutes) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoutes) {
    return Response.redirect(new URL('/auth/login', nextUrl))
  }

  // return null;

  console.log("\n---------------------------------------------\n")
  console.log("ROUTE :: ", req.nextUrl.pathname)
  console.log("IS LOGGED IN :: ", isLoggedIn)
  console.log("\n---------------------------------------------\n")

  return;
})


// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}