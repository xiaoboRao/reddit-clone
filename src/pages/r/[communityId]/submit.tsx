import { CommunityState } from '@/atoms/communitiesAtom'
import About from '@/components/Community/About'
import PageContentLayout from '@/components/Layout/PageContent'
import NewPostForm from '@/components/Posts/NewPostForm'
import { auth } from '@/firebase/clientApp'
import useCommunityData from '@/hooks/useCommunityData'
import { Box, Text } from '@chakra-ui/react'
import { User } from 'firebase/auth'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilValue } from 'recoil'

const submitPostPage: React.FC = () => {
  const [user] = useAuthState(auth)
  const { communityStateValue } = useCommunityData()

  return (
    <PageContentLayout>
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text fontWeight={600}>Create a post</Text>
        </Box>

        {user && <NewPostForm user={user as User} />}
      </>

      {communityStateValue.currentCommunity && (
        <>
          <About communityData={communityStateValue.currentCommunity} pt={6} onCreatePage />
        </>
      )}
    </PageContentLayout>
  )
}
export default submitPostPage
