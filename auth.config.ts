import type { NextAuthConfig } from 'next-auth'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const role = (auth?.user as any)?.role

      const isOnAuthPage = nextUrl.pathname.startsWith('/login')
      const isOnAdminPage = nextUrl.pathname.startsWith('/admin')

      if (isOnAdminPage && !isLoggedIn) {
        return Response.redirect(new URL('/login', nextUrl))
      }

      if (isOnAdminPage && role !== 'admin') {
        return Response.redirect(new URL('/', nextUrl))
      }

      if (isOnAuthPage && isLoggedIn) {
        return Response.redirect(new URL('/admin', nextUrl))
      }

      return true
    },

    jwt({ token, user }) {
      if (user) token.role = (user as any).role
      return token
    },

    session({ session, token }) {
      session.user.id = token.sub as string
      ;(session.user as any).role = token.role
      return session
    },
  },
}
