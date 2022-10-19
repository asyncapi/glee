import { useContext, useEffect, useState } from 'react'
import { HeartIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import WS from '../helpers/ws'
import UserContext from '../context/user'
import Avatar from './Avatar'

export default function Post({ post, user }) {
  const loggedInUser = useContext(UserContext)
  const [liked, setLiked] = useState(!!post.likes.find(l => l.postId === post.id && l.userId === loggedInUser.id))
  const [likeCount, setLikes] = useState(post.likes.filter(l => l.postId === post.id).length)

  const onLike = () => {
    if (liked) {
      WS.send('dislike', { postId: post.id, userId: loggedInUser.id })
      setLiked(false)
    } else {
      WS.send('like', { postId: post.id, userId: loggedInUser.id })
      setLiked(true)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      WS.listen('likes_count_updated', (data) => {
        if (data.postId === post.id) {
          setLikes(data.totalCount)
        }
      })
    }
  }, [])

  return (
    <div className="mb-16">
      <div className="mb-4">
        <Avatar imageUrl={user.imageUrl} name={user.name} className="mr-4" />
        <strong>{user.name}</strong>
      </div>
      <p className="text-gray-700 my-2" dangerouslySetInnerHTML={{__html: post.text}} />
      <img className="w-full object-cover max-h-96" src={post.imageUrl} alt="" />
      <div className="mt-2">
        <button
          type="button"
          className={`inline-flex items-center px-3 py-2 text-md font-medium ${liked ? 'text-red-600' : 'text-gray-700'} bg-white hover:text-red-600 focus:outline-none`}
          onClick={onLike}
        >
          {
            liked ? (
              <HeartIconSolid className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            ) : (
              <HeartIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            )
          }
          {likeCount}
        </button>
      </div>
    </div>
  )
}
