import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from './lib/prisma'
import Credentials from 'next-auth/providers/credentials'
import { signInValidation } from './lib/zod'
import { compareSync } from 'bcrypt-ts'
import { Adapter } from 'next-auth/adapters'
import { authConfig } from './auth.config'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedData = signInValidation.safeParse(credentials)
        if (!validatedData.success) return null

        const { email, password } = validatedData.data
        const user = await prisma.user.findUnique({ where: { email } })

        if (!user || !user.password) return null

        const passwordMatch = compareSync(password, user.password)
        if (!passwordMatch) return null

        return user
      },
    }),
  ],
})
