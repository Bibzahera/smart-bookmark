import { createClient } from "@/lib/supabaseClient"

const supabase = createClient()

export const fetchBookmarks = async (userId: string) => {
  const { data } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return data || []
}

export const addBookmark = async (userId: string, title: string, url: string) => {
  await supabase.from('bookmarks').insert([
    { user_id: userId, title, url }
  ])
}

export const deleteBookmark = async (id: string) => {
  await supabase.from('bookmarks').delete().eq('id', id)
}

export const subscribeToBookmarks = (userId: string, setBookmarks: any) => {
  supabase
    .channel('bookmarks')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'bookmarks', filter: `user_id=eq.${userId}` },
      async () => {
        const data = await fetchBookmarks(userId)
        setBookmarks(data)
      }
    )
    .subscribe()
}
