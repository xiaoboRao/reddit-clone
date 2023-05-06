import { Community } from '@/atoms/communitiesAtom'
import { Post } from '@/atoms/postsAtom'
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
  const { postStateValue, setPostStateValue, onDeletePost, onSelectPost, onVote } = usePosts()
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
    }
    setLoading(false)
  }

  useEffect(() => {
    getPosts()
  }, [communityData])

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postStateValue.posts.map((post, index) => (
            <PostItem
              key={post.id}
              post={post}
              onVote={onVote}
              onDeletePost={onDeletePost}
              userVoteValue={postStateValue.postVotes.find((vote) => vote.postId === post.id)?.voteValue}
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
