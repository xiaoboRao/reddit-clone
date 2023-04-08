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
  mySnippts: CommunitySnippt[]
}
const DefaultCommunityState: CommunityState = {
  mySnippts: [],
}

export const CommunityState = atom<CommunityState>({
  key: 'CommunityState',
  default: DefaultCommunityState,
})
