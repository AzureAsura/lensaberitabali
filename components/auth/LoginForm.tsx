'use client'
import { useActionState, useEffect } from 'react'
import { signInFunction } from '@/lib/actions/auth'
import { toast } from 'sonner'

const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(signInFunction, null)

  useEffect(() => {
    if (state?.message) toast.error(state.message)
  }, [state])

  return (
    <form action={formAction} className="space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <label htmlFor="email" className="type-label text-white/90">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full bg-white text-gray-900 px-6 py-3.5 rounded-full outline-none focus:ring-2 focus:ring-white/50 transition-all text-center font-medium"
          required
        />
      </div>

      <div className="flex flex-col space-y-2 text-center">
        <label htmlFor="password" className="type-label text-white/90">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full bg-white text-gray-900 px-6 py-3.5 rounded-full outline-none focus:ring-2 focus:ring-white/50 transition-all text-center font-medium"
          required
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-white text-primary type-label font-bold py-3.5 rounded-full shadow-md hover:bg-gray-100 active:scale-[0.98] transition-all uppercase disabled:opacity-60"
        >
          {isPending ? 'Masuk...' : 'Masuk'}
        </button>
      </div>
    </form>
  )
}

export default LoginForm
