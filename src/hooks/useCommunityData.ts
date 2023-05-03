import { Community, communityState, CommunitySnippt } from '@/atoms/communitiesAtom'
import { authModalState } from '@/atoms/authModalAtoms'

import { auth, firestore, storage } from '@/firebase/clientApp'
import { useEffect, useState } from 'react'
import { collection, doc, getDoc, getDocs, increment, writeBatch } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import { ref } from 'firebase/storage'
const useCommunityData = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState)
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

      setCommunityStateValue((pre) => {
        return { ...pre, mySnippets: allCommunitySnippets as CommunitySnippt[], snippetsFetched: true }
      })

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

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter((item) => item.communityId !== communityId),
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

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }))
    } catch (error: any) {
      console.log('join community error', error)
      setError(error?.message)
    }
    setLoading(false)
  }

  const getCommunityData = async (communityId: string) => {
    // this causes weird memory leak error - not sure why
    console.log('GETTING COMMUNITY DATA')

    try {
      const communityDocRef = doc(firestore, 'communities', communityId as string)
      const communityDoc = await getDoc(communityDocRef)
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          id: communityDoc.id,
          ...communityDoc.data(),
        } as Community,
      }))
    } catch (error: any) {
      console.log('getCommunityData error', error.message)
    }
  }

  useEffect(() => {
    if (!user) {
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [],
        snippetsFetched: false,
      }))
      return
    }
    getAllCommunitySnippets()
  }, [user])

  useEffect(() => {
    const { communityId } = router.query
    if (communityId && !communityStateValue.currentCommunity) {
      getCommunityData(communityId as string)
    }
  }, [router.query, communityStateValue.currentCommunity])

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  }
}
export default useCommunityData
