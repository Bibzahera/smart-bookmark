'use client'
import { createClient } from '@/lib/supabaseClient'
const supabase = createClient()


export default function Login() {

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
       options: {
        // Redirect user to dashboard after login
        redirectTo: 'http://localhost:3000/dashboard'
      }
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200">
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center">
        <h1 className="text-3xl font-bold mb-6">Smart Bookmark 💖</h1>
        <button
          onClick={loginWithGoogle}
          className="bg-pink-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-pink-600 transition"
        >
          Sign in with Google ✨
        </button>
      </div>
    </div>
  )
}
