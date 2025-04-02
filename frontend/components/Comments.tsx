'use client'

import { useEffect, useState } from 'react'

type Comment = {
  id: number
  user_name: string
  content: string
  created_at: string
}

export default function Comments({ movieId, userId }: { movieId: number; userId: number }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")

  const fetchComments = async () => {
    const res = await fetch(`http://localhost/CineScope/backend/getComments.php?movie_id=${movieId}`)
    const data = await res.json()
    setComments(data)
  }

  useEffect(() => {
    fetchComments()
  }, [movieId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    await fetch(`http://localhost/CineScope/backend/addComment.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        movie_id: movieId,
        content: newComment,
      }),
    })

    setNewComment("")
    fetchComments()
  }

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full p-2 border rounded mb-2"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Leave a comment..."
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Post Comment
        </button>
      </form>

      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="bg-gray-100 p-3 rounded shadow">
            <p className="font-semibold">{comment.user_name}</p>
            <p className="text-sm text-gray-600">{new Date(comment.created_at).toLocaleString()}</p>
            <p className="mt-2">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
