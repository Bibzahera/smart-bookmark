// 'use client'
// import { useState } from 'react'
// import { addBookmark } from '@/lib/bookmarkService'

// export default function BookmarkForm({ user }: any) {
//   const [title, setTitle] = useState('')
//   const [url, setUrl] = useState('')

//   const handleAdd = async () => {
//     if (!title || !url) return
//     await addBookmark(user.id, title, url)
//     setTitle('')
//     setUrl('')
//   }

//   return (
//     <div className="flex gap-3 mb-6">
//       <input
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Title"
//         className="border p-2 rounded w-1/3"
//       />
//       <input
//         value={url}
//         onChange={(e) => setUrl(e.target.value)}
//         placeholder="URL"
//         className="border p-2 rounded w-1/2"
//       />
//       <button
//         onClick={handleAdd}
//         className="bg-purple-500 text-white px-4 rounded hover:bg-purple-600"
//       >
//         Add ✨
//       </button>
//     </div>
//   )
// }
'use client'
import { useState } from 'react'
import { addBookmark } from '@/lib/bookmarkService'

interface BookmarkFormProps {
  user: { id: string } | null
}

export default function BookmarkForm({ user }: BookmarkFormProps) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleAdd = async () => {
    if (!title || !url || !user) return
    await addBookmark(user.id, title, url)
    setTitle('')
    setUrl('')
  }

  return (
    <div className="flex gap-3 mb-6">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 rounded w-1/3"
      />
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL"
        className="border p-2 rounded w-1/2"
      />
      <button
        onClick={handleAdd}
        className="bg-purple-500 text-white px-4 rounded hover:bg-purple-600"
      >
        Add ✨
      </button>
    </div>
  )
}
