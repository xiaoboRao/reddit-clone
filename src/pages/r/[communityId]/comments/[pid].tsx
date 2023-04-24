import React, { useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Post } from '@/atoms/postsAtom'
import About from '@/components/Community/About'
import PageContentLayout from '@/components/Layout/PageContent'
import PostItem from '@/components/Posts/PostItem'
import { auth, firestore } from '@/firebase/clientApp'
import useCommunityData from '@/hooks/useCommunityData'
import { usePosts } from '@/hooks/usePosts'

type PostPageProps = {}

const PostPage: React.FC<PostPageProps> = () => {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const { community, pid } = router.query
  const { communityStateValue } = useCommunityData()
  const { postStateValue, setPostStateValue, onDeletePost, onVote, onSelectPost } = usePosts()

  const fetchPost = async (pid: string) => {
    console.log('FETCHING POST')

    try {
      const postDocRef = doc(firestore, 'posts', pid as string)
      const postDoc = await getDoc(postDocRef)

      setPostStateValue((prev) => ({
        ...prev,
        selectedPost: { id: postDoc.id, ...postDoc.data() } as Post,
      }))
    } catch (error: any) {
      console.log('fetchPost error', error.message)
    }
  }

  // Fetch post if not in already in state
  useEffect(() => {
    const { pid } = router.query

    if (pid && !postStateValue.selectedPost) {
      fetchPost(pid as string)
    }
  }, [router.query, postStateValue.selectedPost])

  return (
    <PageContentLayout>
      {/* Left Content */}
      <>
        <>
          {postStateValue.selectedPost && (
            <>
              <PostItem
                post={postStateValue.selectedPost}
                // postIdx={postStateValue.selectedPost.postIdx}
                onVote={onVote}
                onDeletePost={onDeletePost}
                userVoteValue={
                  postStateValue.postVotes.find((item) => item.postId === postStateValue.selectedPost!.id)?.voteValue
                }
                userIsCreator={user?.uid === postStateValue.selectedPost.creatorId}
              />
            </>
          )}
        </>
      </>
      {/* Right Content */}
      <>
        {communityStateValue.currentCommunity && (
          <About
            communityData={
              communityStateValue.currentCommunity
              // communityStateValue.visitedCommunities[community as string]
            }
          />
        )}
      </>
    </PageContentLayout>
  )
}
export default PostPage
