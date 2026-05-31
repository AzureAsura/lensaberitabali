import LoginForm from '@/components/auth/LoginForm'

const LoginPage = () => {
  return (
    <main className="w-full min-h-screen bg-gray-50 flex items-center justify-center font-sans px-4">
      <div className="w-full max-w-md bg-primary rounded-[32px] p-8 md:p-10 shadow-lg text-white">
        <h1 className="type-page-title text-white text-center mb-8">
          Log in
        </h1>
        <LoginForm />
      </div>
    </main>
  )
}

export default LoginPage
