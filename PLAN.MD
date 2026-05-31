so here is my frontend i just want to add some feature in here so first of all i want u to help me a bit on my frontend


in desktop navbar there's still a bug i want u to make if the user on the tentang kami the navbar light up like the page i

then i i want u to help me to set up a bit of my backend

i need u to set up prisma 7 for next js in this app 

the schema is
model Account {
  id                String  @id @default(cuid())
  userId            String  @map("user_id")
  type              String
  provider          String
  providerAccountId String  @map("provider_account_id")
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique @map("session_token")
  userId       String   @map("user_id")
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime? @map("email_verified")
  password      String?
  role          String    @default("user")
  image         String?
  accounts      Account[]
  sessions      Session[]
  products      Product[]

  @@map("users")
}

and the others i think u should see the form in admin page there's i think gonna be 3 table
berita
tentang_kami
iklan

i need u to think what the schema good for that kind of form

next i need u to use auth js for the auth for the admin
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/prisma"
import Credentials from 'next-auth/providers/credentials'
import { signInValidation } from "./lib/zod"
import { compareSync } from "bcrypt-ts"
import { Adapter } from 'next-auth/adapters'
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {strategy: 'jwt'},
  pages: { 
    signIn: '/sign-in',
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        const validatedData = signInValidation.safeParse(credentials)

        if (!validatedData.success) {
          return null
        }

        const { email , password } = validatedData.data

        const user = await prisma.user.findUnique({
          where: {
            email
          }
        })

        if (!user || !user.password ) {
          throw new Error ('No user found')
        }

        const passwordMatch = compareSync(password, user.password)

        if (!passwordMatch) return null
        

        return user
      }
    })
  ],
  callbacks: {
    authorized({auth, request: { nextUrl }}){
      // const isLoggedIn = !!auth?.user
      // const protectedRoutes = ["/admin"]

      // if (!isLoggedIn && protectedRoutes.includes(nextUrl.pathname)) {
      //   return Response.redirect(new URL("/sign-in", nextUrl))
      // }

      // if (isLoggedIn && nextUrl.pathname.startsWith("/sign-in")) {
      //   return Response.redirect(new URL("/", nextUrl))
      // }

      // return true;

      const isLoggedIn = !!auth?.user
      const role = auth?.user.role

      const isOnAuthPage = nextUrl.pathname.startsWith("/sign-in")
      const isOnAdminPage = nextUrl.pathname.startsWith('/admin')

      if (isOnAdminPage && !isLoggedIn) {
        return Response.redirect(new URL("/sign-in", nextUrl))
      }

      if (isOnAdminPage && role !== "admin") {
        return Response.redirect(new URL("/", nextUrl))
      }

      if (isOnAuthPage && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl))
      }

      return true
    },

    jwt({token, user}){
      if (user) {
        token.role = user.role
      }

      return token
    },

    session({session, token}){
      session.user.id = token.sub
      session.user.role = token.role
      return session
    }


  }
})

i have made it before maybe this can be ur inspiration

next i need you to make pagination for the listing in the home screen so there will show jut 10  of the berita 

and i need you to add vercel blob to the image hosting i already put everything in .env file

then in admin i also need you to make  more page for only upload a image for a iklan

then in a beranda i want u to make some kind of a pop up like iklan every brp menit

and makesure all the data in root base from the db not dummy like now

and dont forget to integrate the authform make the form in different file so the page.tsx not using use client implement to all oage also

and i want u to make the edit berita page and for delete berita

i want u to add zod form validation for all just to add minimim 1 word so no blank data

ah yea in berita db skema i want u to add category but make it null untuk skrg cause the client want to make category feature but not now for scaling lah

yaa thats it if u have any question u can ask me