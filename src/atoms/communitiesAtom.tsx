import { Timestamp } from 'firebase/firestore'
import { atom } from 'recoil'

export interface Community {
  id: string
  creatorId: string
  numberOfMembers: number
  privacyType: 'public' | 'restrictied' | 'private'
  createdAt?: Timestamp
  imageURL?: string
}

export interface CommunitySnippt {
  communityId: string
  isModerator?: boolean
  imageURL?: string
}

interface CommunityState {
  mySnippets: CommunitySnippt[]
  currentCommunity?: Community
}
const DefaultCommunityState: CommunityState = {
  mySnippets: [],
}

export const communityState = atom<CommunityState>({
  key: 'CommunityState',
  default: DefaultCommunityState,
})
