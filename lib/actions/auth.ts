'use server'

import { signIn, signOut } from '@/auth'
import prisma from '../prisma'
import { registerValidation, signInValidation } from '../zod'
import { hashSync } from 'bcrypt-ts'
import { redirect } from 'next/navigation'
import { AuthError } from 'next-auth'

export const registerFunction = async (prevState: any, formData: FormData) => {
  const validatedData = registerValidation.safeParse(
    Object.fromEntries(formData.entries())
  )

  if (!validatedData.success) {
    return { error: validatedData.error.flatten().fieldErrors }
  }

  const { name, email, password } = validatedData.data
  const hashedPassword = hashSync(password, 10)

  try {
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    })
  } catch {
    return { message: 'Failed to register user' }
  }

  redirect('/')
}

export const signOutFunction = async () => {
  await signOut({ redirectTo: '/login' })
}

export const signInFunction = async (prevState: unknown, formData: FormData) => {
  const validatedData = signInValidation.safeParse(
    Object.fromEntries(formData.entries())
  )

  if (!validatedData.success) {
    return { error: validatedData.error.flatten().fieldErrors }
  }

  const { email, password } = validatedData.data

  try {
    await signIn('credentials', { email, password, redirectTo: '/admin' })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { message: 'Invalid credentials' }
        default:
          return { message: 'Something went wrong' }
      }
    }
    throw error
  }
}
