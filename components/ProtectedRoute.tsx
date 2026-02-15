'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

const supabase = createClient()

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Check current session
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push('/login')
      } else {
        setUser(data.user)
        setLoading(false)
      }
    }
    checkUser()

    // Listen to auth state changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        router.push('/login')
      } else {
        setUser(session.user)
        setLoading(false)
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [router])

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>
  }

  return <>{children}</>
}
