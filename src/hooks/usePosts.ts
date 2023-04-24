import { authModalState } from '../atoms/authuthModalAtoms'
import { useEffect } from 'react'
import { CommunityState } from '@/atoms/communitiesAtom'
import { Post, PostState, PostVote } from '@/atoms/postsAtom'
import { auth, firestore, storage } from '@/firebase/clientApp'
import { collection, deleteDoc, doc, getDocs, query, where, writeBatch } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useRouter } from 'next/router'

export const usePosts = () => {
  const [user] = useAuthState(auth)
  const [postStateValue, setPostStateValue] = useRecoilState(PostState)
  const communityStateValue = useRecoilValue(CommunityState)
  const router = useRouter()

  const setAuthModalState = useSetRecoilState(authModalState)
  const onSelectPost = (post: Post) => {
    setPostStateValue((prev) => ({
      ...prev,
      selectedPost: { ...post },
    }))
    router.push(`/r/${post.communityId}/comments/${post.id}`)
  }
  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      // TODO: delete image from object storage

      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`)
        await deleteObject(imageRef)
      }
      // TODO: delete post from posts collection
      const postDocRef = doc(firestore, `posts/${post.id}`)
      await deleteDoc(postDocRef)
      // TODO: update post recoil data
      setPostStateValue((pre) => ({ ...pre, posts: pre.posts.filter((item) => item.id !== post?.id) }))
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const onVote = async (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => {
    // check for a user ,if  not , open the auth modal
    if (!user?.uid) {
      setAuthModalState({ open: true, view: 'login' })
      return
    }
    event.stopPropagation()
    const { voteStatus } = post
    // if user has voted a post
    const existingVote = postStateValue.postVotes.find((vote) => vote.postId === post.id)

    try {
      let voteChange = vote
      const batch = writeBatch(firestore)

      const updatedPost = { ...post }
      const updatedPosts = [...postStateValue.posts]
      let updatedPostVotes = [...postStateValue.postVotes]
      if (!existingVote) {
        const postVoteRef = doc(collection(firestore, 'users', `${user?.uid}/postVotes`))

        const newVote: PostVote = {
          id: postVoteRef.id,
          postId: post.id!,
          communityId,
          voteValue: vote,
        }

        batch.set(postVoteRef, newVote)
        updatedPost.voteStatus = updatedPost.voteStatus + vote
        updatedPostVotes = [...updatedPostVotes, newVote]
      }
      // exsiting vote
      else {
        const postVoteRef = doc(firestore, 'users', `${user?.uid}/postVotes/${existingVote.id}`)
        // if user has voted already, then reset the vote
        if (existingVote.voteValue === vote) {
          // reset post voteStatus
          updatedPost.voteStatus = updatedPost.voteStatus - vote
          updatedPostVotes = updatedPostVotes.filter((vote) => vote.id !== existingVote.id)
          batch.delete(postVoteRef)
          voteChange *= -1
        }
        // flip the vote
        else {
          updatedPost.voteStatus = voteStatus + 2 * vote
          let voteIndex = postStateValue.postVotes.findIndex((vote) => vote.id === existingVote.id)
          updatedPostVotes[voteIndex] = {
            ...existingVote,
            voteValue: vote,
          }

          batch.update(postVoteRef, { voteValue: vote })
          voteChange = 2 * vote
        }
      }

      let postVoteRef = doc(firestore, 'posts', post.id!)
      batch.update(postVoteRef, {
        voteStatus: vote,
      })

      await batch.commit()
      const postIndex = postStateValue.posts.findIndex((post) => post.id === post.id)
      updatedPosts[postIndex] = updatedPost
      setPostStateValue((pre) => ({
        ...pre,
        posts: updatedPosts,
        postVotes: updatedPostVotes,
      }))
      /**
       * Optimistically update the UI
       * Used for single page view [pid]
       * since we don't have real-time listener there
       */
      if (postStateValue.selectedPost) {
        setPostStateValue((prev) => ({
          ...prev,
          selectedPost: updatedPost,
        }))
      }
    } catch (error: any) {
      console.log('Voting Post Error', error.message)
    }
  }

  // persist the postVotes avoid losing data when refresh pages
  const getCommunityPostVotes = async (communityId: string) => {
    const postVotesQuery = query(
      collection(firestore, `users/${user?.uid}/postVotes`),
      where('communityId', '==', communityId)
    )
    const postVoteDocs = await getDocs(postVotesQuery)
    const postVotes = postVoteDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    console.log('postVotes, ', postVotes)
    setPostStateValue((prev) => ({
      ...prev,
      postVotes: postVotes as PostVote[],
    }))
  }

  useEffect(() => {
    if (!user?.uid || !communityStateValue.currentCommunity) return
    getCommunityPostVotes(communityStateValue.currentCommunity.id)
  }, [user, communityStateValue.currentCommunity])

  useEffect(() => {
    // Logout or no authenticated user
    if (!user?.uid) {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }))
      return
    }
  }, [user])

  return {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    onVote,
    onSelectPost,
  }
}
