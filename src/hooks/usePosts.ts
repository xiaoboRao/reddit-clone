import { PostState } from '@/atoms/PostsAtom'
import { useRecoilState } from 'recoil'

export const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(PostState)

  return {
    postStateValue,
    setPostStateValue,
  }
}
