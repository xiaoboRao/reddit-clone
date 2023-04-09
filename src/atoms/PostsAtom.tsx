import { Timestamp } from 'firebase/firestore'
import { atom } from 'recoil'

export interface Post {
  id?: string
  communityId: string
  creatorId: string
  creatorDisplayName: string
  title: string
  body: string
  numberOfComments: number
  voteStatus: number
  imageURL?: string
  communityImageURL?: string
  createdAt: Timestamp
}

interface PostState {
  selectedPost: Post | null
  posts: Post[]
}

const DefaultPostState: PostState = {
  selectedPost: null,
  posts: [],
}

export const PostState = atom<PostState>({
  key: 'PostsState',
  default: DefaultPostState,
})
