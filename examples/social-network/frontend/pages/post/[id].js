import Head from 'next/head'
import Header from '../../components/Header'
import Post from '../../components/Post'
import UserContext from '../../context/user'
import WS from '../../helpers/ws'
import db from '../../../db.json'

export default function PostPage({ user, post }) {
  if (!user) {
    return (
      <div>
        No user has been found with this id.
      </div>
    )
  }

  if (typeof window !== 'undefined') {
    WS.init()
  }

  return (
    <UserContext.Provider value={user}>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Head>
          <title>The Social Network</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex-1 relative z-0 flex overflow-hidden w-full justify-center">
          <main className="w-full flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last xl:max-w-screen-sm xl:w-full">
            <Header profile={user} />
            <div className="mt-20 px-4">
              <Post post={post} user={post.user} />
            </div>
          </main>
        </div>
      </div>
    </UserContext.Provider>
  )
}

export async function getServerSideProps({ query }) {
  const { posts, users, likes } = db
  const post = posts.find(p => p.id === Number(query.id))

  return {
    props: {
      user: users[query.user],
      post: {
        ...post,
        ...{
          user: users[post.userId],
          likes: likes.filter(l => l.postId === post.id),
        }
      }
    }
  }
}
