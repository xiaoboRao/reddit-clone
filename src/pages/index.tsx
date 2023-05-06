import { useEffect } from 'react'
import { Stack } from '@chakra-ui/react'
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from 'firebase/firestore'
import type { NextPage } from 'next'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Post, PostVote } from '@/atoms/postsAtom'
import CreatePostLink from '@/components/Community/CreatePostLink'
import Recommendations from '@/components/Community/Recommendations'
import PageContentLayout from '@/components/Layout/PageContent'
import PostLoader from '@/components/Posts/PostLoader'
import PostItem from '@/components/Posts/PostItem'
import { auth, firestore } from '@/firebase/clientApp'
import { usePosts } from '@/hooks/usePosts'
import Premium from '@/components/Community/Premium'
import PersonalHome from '@/components/Community/PersonalHome'
import useCommunityData from '@/hooks/useCommunityData'

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth)
  const { postStateValue, setPostStateValue, onVote, onSelectPost, onDeletePost, loading, setLoading } = usePosts()
  const { communityStateValue } = useCommunityData()

  const getUserHomePosts = async () => {
   
    setLoading(true)
    try {
      /**
       * if snippets has no length (i.e. user not in any communities yet)
       * do query for 20 posts ordered by voteStatus
       */
      const feedPosts: Post[] = []

      // User has joined communities
      if (communityStateValue.mySnippets.length) {
        const myCommunityIds = communityStateValue.mySnippets.map((snippet) => snippet.communityId)
        // Getting 2 posts from 3 communities that user has joined
        let postPromises: Array<Promise<QuerySnapshot<DocumentData>>> = []
        ;[0, 1, 2].forEach((index) => {
          if (!myCommunityIds[index]) return

          postPromises.push(
            getDocs(query(collection(firestore, 'posts'), where('communityId', '==', myCommunityIds[index]), limit(3)))
          )
        })
        const queryResults = await Promise.all(postPromises)
        /**
         * queryResults is an array of length 3, each with 0-2 posts from
         * 3 communities that the user has joined
         */
        queryResults.forEach((result) => {
          const posts = result.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Post[]
          feedPosts.push(...posts)
        })
      }
      // User has not joined any communities yet
      else {
        const postQuery = query(collection(firestore, 'posts'), orderBy('voteStatus', 'desc'), limit(10))
        const postDocs = await getDocs(postQuery)
        const posts = postDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[]
        feedPosts.push(...posts)
      }

      setPostStateValue((prev) => ({
        ...prev,
        posts: feedPosts,
      }))

      // if not in any, get 5 communities ordered by number of members
      // for each one, get 2 posts ordered by voteStatus and set these to postState posts
    } catch (error: any) {}
    setLoading(false)
  }

  const getNoUserHomePosts = async () => {
   
    setLoading(true)
    try {
      const postQuery = query(collection(firestore, 'posts'), orderBy('voteStatus', 'desc'), limit(10))
      const postDocs = await getDocs(postQuery)
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }))
    } catch (error: any) {}
    setLoading(false)
  }

  const getUserPostVotes = async () => {
    const postIds = postStateValue.posts.map((post) => post.id)
    const postVotesQuery = query(collection(firestore, `users/${user?.uid}/postVotes`), where('postId', 'in', postIds))
    const unsubscribe = onSnapshot(postVotesQuery, (querySnapshot) => {
      const postVotes = querySnapshot.docs.map((postVote) => ({
        id: postVote.id,
        ...postVote.data(),
      }))

      setPostStateValue((prev) => ({
        ...prev,
        postVotes: postVotes as PostVote[],
      }))
    })

    return () => unsubscribe()
  }

  useEffect(() => {
    /**
     * initSnippetsFetched ensures that user snippets have been retrieved;
     * the value is set to true when snippets are first retrieved inside
     * of getSnippets in useCommunityData
     */
    if (!communityStateValue.snippetsFetched) return

    if (user) {
      getUserHomePosts()
    }
  }, [user, communityStateValue.snippetsFetched])

  useEffect(() => {
    if (!user && !loadingUser) {
      getNoUserHomePosts()
    }
  }, [user, loadingUser])

  useEffect(() => {
    if (!user?.uid || !postStateValue.posts.length) return
    getUserPostVotes()

    // Clear postVotes on dismount
    return () => {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }))
    }
  }, [postStateValue.posts, user?.uid])

  return (
    <PageContentLayout>
      <>
        {user && <CreatePostLink />}
        {loading ? (
          <PostLoader />
        ) : (
          <Stack>
            {postStateValue.posts.map((post: Post, index) => (
              <PostItem
                key={post.id}
                post={post}
                postIdx={index}
                onVote={onVote}
                onDeletePost={onDeletePost}
                userVoteValue={postStateValue.postVotes.find((item) => item.postId === post.id)?.voteValue}
                userIsCreator={user?.uid === post.creatorId}
                onSelectPost={onSelectPost}
                homePage
              />
            ))}
          </Stack>
        )}
      </>
      <Stack spacing={5} position="sticky" top="14px">
        <Recommendations />
        <Premium />
        <PersonalHome />
      </Stack>
    </PageContentLayout>
  )
}

export default Home
