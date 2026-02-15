// 'use client'
// import { createClient } from '@/lib/supabaseClient'
// const supabase = createClient()


// export default function Login() {

//   const loginWithGoogle = async () => {
//     await supabase.auth.signInWithOAuth({
//       provider: 'google',
//        options: {
//         // Redirect user to dashboard after login
//         redirectTo: 'http://localhost:3000/dashboard'
//       }
//     })
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200">
//       <div className="bg-white p-10 rounded-3xl shadow-2xl text-center">
//         <h1 className="text-3xl font-bold mb-6">Smart Bookmark 💖</h1>
//         <button
//           onClick={loginWithGoogle}
//           className="bg-pink-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-pink-600 transition"
//         >
//           Sign in with Google ✨
//         </button>
//       </div>
//     </div>
//   )
// }
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

const supabase = createClient()

export default function Login() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        setUser(data.user)
        router.push('https://smart-bookmark-psi-sable.vercel.app/dashboard') // redirect immediately if already logged in
      }
    }
    getUser()

    // Listen for login/logout events
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user)
        router.push('/dashboard') // redirect after successful login
      } else {
        setUser(null)
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [router])

  // Google login
  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
  }

  // Logout
  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200">
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center space-y-6">
        <h1 className="text-3xl font-bold mb-6"> Bookmark 💖</h1>

        {!user ? (
          <button
            onClick={loginWithGoogle}
            className="bg-pink-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-pink-600 transition"
          >
            Sign in with Google ✨
          </button>
        ) : (
          <>
            <p className="text-green-600 font-semibold">
              Welcome, {user.email}!
            </p>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  )
}
