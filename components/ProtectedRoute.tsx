// 'use client'
// import { useEffect, useState } from 'react'
// import { createClient } from "@/lib/supabaseClient"

// const supabase = createClient()

// export default function ProtectedRoute({ children }: any) {
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     checkUser()
//   }, [])

//   const checkUser = async () => {
//     const { data } = await supabase.auth.getUser()
//     if (!data.user) {
//       window.location.href = '/login'
//     } else {
//       setLoading(false)
//     }
//   }

//   if (loading) return <p className="text-center mt-20">Loading...</p>

//   return children
// }
'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabaseClient'

const supabase = createClient()

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        window.location.href = '/login'
      } else {
        setLoading(false)
      }
    }
    checkUser()
  }, [])

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>
  }

  return <>{children}</>
}
