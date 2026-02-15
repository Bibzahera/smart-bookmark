
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

const supabase = createClient()

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      setLoading(false)
    }
    checkUser()

    // Listen to login/logout events
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const loginWithGoogle = async () => {
    // No redirectTo here → user stays on login page
    await supabase.auth.signInWithOAuth({ provider: 'google' })
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const goToDashboard = () => {
    router.push('/dashboard')
  }

  if (loading) return <p className="text-center mt-20">Loading...</p>

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 to-pink-200 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-6 text-purple-700">Smart Bookmark 💖</h1>

        {!user ? (
          <button
            onClick={loginWithGoogle}
            className="bg-purple-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-purple-600 transition w-full"
          >
            Sign in with Google ✨
          </button>
        ) : (
          <div className="space-y-4">
            <p className="text-lg font-semibold">Welcome, {user.email}!</p>
            <button
              onClick={goToDashboard}
              className="bg-purple-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-purple-600 transition w-full"
            >
              Go to Dashboard
            </button>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-red-600 transition w-full"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
