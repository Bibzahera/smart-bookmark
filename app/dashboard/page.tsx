
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabaseClient'
const supabase = createClient()
import ProtectedRoute from '@/components/ProtectedRoute'
import BookmarkForm from '@/components/BookmarkForm'
import BookmarkList from '@/components/BookmarkList'
import { fetchBookmarks, subscribeToBookmarks } from '@/lib/bookmarkService'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [bookmarks, setBookmarks] = useState<any[]>([])

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const { data } = await supabase.auth.getUser()
    if (data.user) {
      setUser(data.user)
      fetchBookmarks(data.user.id).then(setBookmarks)
      subscribeToBookmarks(data.user.id, setBookmarks)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-10">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-2xl">
          <h1 className="text-2xl font-bold mb-6">My Bookmarks 💖</h1>

          <BookmarkForm user={user} />
          <BookmarkList bookmarks={bookmarks} />
        </div>
      </div>
    </ProtectedRoute>
  )
}