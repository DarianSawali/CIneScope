'use client'

import { useState, useEffect } from 'react'

type Props = {
  movieId: number
}

export default function Comments({ movieId }: Props) {
  const [comments, setComments] = useState<{ name: string; content: string }[]>([])
  const [newComment, setNewComment] = useState("")
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const id = localStorage.getItem('user_id')
    setUserId(id)

    fetch(`http://localhost/CineScope/backend/getComments.php?movie_id=${movieId}`)
      .then(res => res.json())
      .then(data => setComments(data))
  }, [movieId])

  const handlePost = async () => {
    if (!newComment.trim() || !userId) return

    const res = await fetch("http://localhost/CineScope/backend/addComment.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        movie_id: movieId,
        content: newComment
      })
    })

    const data = await res.json()

    if (data.success) {
      setComments(prev => [{ name: "You", content: newComment }, ...prev])
      setNewComment("")
    }
  }

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-3">Comments</h3>

      {userId ? (
        <div className="mb-4">
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Leave a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handlePost}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Post
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-600 mb-4">You must be logged in to comment.</p>
      )}

      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <ul className="space-y-2">
          {comments.map((comment, idx) => (
            <li key={idx} className="border-b pb-2">
              <strong>{comment.name}</strong>
              <p>{comment.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
