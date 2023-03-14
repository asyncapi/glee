import Head from 'next/head'
import Header from '../components/Header'
import Post from '../components/Post'
import UserContext from '../context/user'
import WS from '../helpers/ws'
import db from '../../db.json'

export default function Home({ user, posts }) {
  if (!user) {
    return <div>No user has been found with this id.</div>
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
              {posts.map((post, index) => (
                <Post post={post} user={post.user} key={index} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </UserContext.Provider>
  )
}

export async function getServerSideProps({ query }) {
  const { users, posts, likes } = db
  return {
    props: {
      user: users[query.user],
      posts: posts.map((p) => ({ ...p, user: users[p.userId], likes: likes.filter((like) => like.postId === p.id) })),
    },
  }
}
