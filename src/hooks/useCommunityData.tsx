import { Community, CommunityState, CommunitySnippt } from '@/atoms/communitiesAtom'
import { auth, firestore } from '@/firebase/clientApp'
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState } from 'recoil'
const useCommunityData = () => {
  const [loading, setLoading] = useState(false)
  const [communityStateValue, setCommunityStateValue] = useRecoilState(CommunityState)
  const [user] = useAuthState(auth)

  const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
    setLoading(true)
    if (isJoined) {
      onLeaveCommunity(communityData.id)
      return
    }
    onJoinCommunity(communityData)
  }

  const getAllCommunitySnippets = async () => {
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

  const onLeaveCommunity = (communityId: string) => {}
  const onJoinCommunity = (communityData: Community) => {}

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
