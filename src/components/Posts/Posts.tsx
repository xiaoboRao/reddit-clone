import { Community } from '@/atoms/communitiesAtom'
import { Post } from '@/atoms/PostsAtom'
import { auth, firestore } from '@/firebase/clientApp'
import { usePosts } from '@/hooks/usePosts'
import PostLoader from './PostLoader'
import { Stack } from '@chakra-ui/react'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import PostItem from './PostItem'

type PostsProps = {
  communityData: Community
}

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const [user] = useAuthState(auth)

  const [loading, setLoading] = useState(false)
  const { postStateValue, setPostStateValue } = usePosts()
  const getPosts = async () => {
    setLoading(true)
    try {
      const postQuery = query(
        collection(firestore, 'posts'),
        where('communityId', '==', communityData.id),
        orderBy('createdAt', 'desc')
      )

      const postDocs = await getDocs(postQuery)
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setPostStateValue((prev) => ({ ...prev, posts: posts as Post[] }))
    } catch (error: any) {
      console.log('getPosts error', error?.message)
    }
    setLoading(false)
  }

  const onVote = async () => {}
  const onSelectPost = async () => {}
  const onDeletePost = async () => {}
  useEffect(() => {
    getPosts()
  }, [communityData])

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postStateValue.posts.map((post: Post, index) => (
            <PostItem
              key={post.id}
              post={post}
              // postIdx={index}
              onVote={onVote}
              onDeletePost={onDeletePost}
              userVoteValue={0}
              userIsCreator={user?.uid === post.creatorId}
              onSelectPost={onSelectPost}
            />
          ))}
        </Stack>
      )}
    </>
  )
}
export default Posts
