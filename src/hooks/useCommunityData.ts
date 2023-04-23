import { Community, CommunityState, CommunitySnippt } from '@/atoms/communitiesAtom'
import { authModalState } from '@/atoms/AuthModalAtoms'

import { auth, firestore } from '@/firebase/clientApp'
import { useEffect, useState } from 'react'
import { collection, doc, getDocs, increment, writeBatch } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState, useSetRecoilState } from 'recoil'
const useCommunityData = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [communityStateValue, setCommunityStateValue] = useRecoilState(CommunityState)
  const setAuthModalState = useSetRecoilState(authModalState)
  const [user] = useAuthState(auth)

  const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
    if (!user) {
      setAuthModalState({ open: true, view: 'login' })
      return
    }
    setLoading(true)
    if (isJoined) {
      onLeaveCommunity(communityData.id)
      return
    }
    onJoinCommunity(communityData)
  }

  const getAllCommunitySnippets = async () => {
    setLoading(true)
    try {
      const querySnapshot = await getDocs(collection(firestore, `users/${user?.uid}/communitySnippets`))
      const allCommunitySnippets = querySnapshot.docs.map((doc) => ({ ...doc.data() }))

      setCommunityStateValue(() => ({ mySnippts: allCommunitySnippets as CommunitySnippt[] }))
      console.log('allCommunitySnippets', allCommunitySnippets)
    } catch (error) {
      console.log('getAllCommunitySnippets error', error)
    } finally {
      setLoading(false)
    }
  }

  const onLeaveCommunity = async (communityId: string) => {
    try {
      const batch = writeBatch(firestore)

      const userCommunityRef = doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
      batch.delete(userCommunityRef)

      const communityRef = doc(firestore, `communities`, communityId)
      batch.update(communityRef, { numberofMemebers: increment(-1) })

      await batch.commit()

      setCommunityStateValue((pre) => ({
        mySnippts: pre.mySnippts.filter((mySnippt) => mySnippt.communityId !== communityId),
      }))
    } catch (error: any) {
      console.log('join community error', error)
      setError(error?.message)
    }
    setLoading(false)
  }
  const onJoinCommunity = async (communityData: Community) => {
    const newSnippet: CommunitySnippt = { communityId: communityData.id, imageURL: communityData?.imageURL || '' }
    try {
      const batch = writeBatch(firestore)

      const userCommunityRef = doc(firestore, `users/${user?.uid}/communitySnippets`, communityData.id)
      batch.set(userCommunityRef, newSnippet)

      const communityRef = doc(firestore, `communities`, communityData.id)
      batch.update(communityRef, { numberofMemebers: increment(1) })

      await batch.commit()

      setCommunityStateValue((pre) => ({ mySnippts: [...pre.mySnippts, newSnippet] }))
    } catch (error: any) {
      console.log('join community error', error)
      setError(error?.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!user) return
    getAllCommunitySnippets()
  }, [user])

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  }
}
export default useCommunityData
