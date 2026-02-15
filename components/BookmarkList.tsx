// 'use client'
// import { deleteBookmark } from '@/lib/bookmarkService'

// export default function BookmarkList({ bookmarks }: any) {
//   return (
//     <ul className="space-y-4">
//       {bookmarks.map((b: any) => (
//         <li key={b.id} className="bg-gray-50 p-4 rounded-xl shadow flex justify-between">
//           <div>
//             <p className="font-semibold">{b.title}</p>
//             <a href={b.url} target="_blank" className="text-blue-500 text-sm">
//               {b.url}
//             </a>
//           </div>
//           <button onClick={() => deleteBookmark(b.id)} className="text-red-500">
//             Delete
//           </button>
//         </li>
//       ))}
//     </ul>
//   )
// }
'use client'
import { deleteBookmark } from '@/lib/bookmarkService'

interface Bookmark {
  id: string
  title: string
  url: string
}

interface BookmarkListProps {
  bookmarks: Bookmark[]
}

export default function BookmarkList({ bookmarks }: BookmarkListProps) {
  return (
    <ul className="space-y-4">
      {bookmarks.map((b) => (
        <li
          key={b.id}
          className="bg-gray-50 p-4 rounded-xl shadow flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{b.title}</p>
            <a
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-sm"
            >
              {b.url}
            </a>
          </div>
          <button
            onClick={() => deleteBookmark(b.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}
