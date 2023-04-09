import { Community } from '@/atoms/communitiesAtom'
import { firestore } from '@/firebase/clientApp'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect } from 'react'

type PostsProps = {
  communityData: Community
}

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  console.log('communityData', communityData)
  const getPosts = async () => {
    try {
      const postQuery = query(
        collection(firestore, 'posts'),
        where('communityId', '==', communityData.id),
        orderBy('createdAt', 'desc')
      )

      const postDocs = await getDocs(postQuery)
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    } catch (error: any) {
      console.log('getPosts error', error?.message)
    }
  }
  useEffect(() => {
    getPosts()
  }, [communityData])

  return <div>Posts</div>
}
export default Posts
