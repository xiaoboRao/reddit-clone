import { communityState } from '@/atoms/communitiesAtom'
import About from '@/components/Community/About'
import PageContentLayout from '@/components/Layout/PageContent'
import NewPostForm from '@/components/Posts/NewPostForm'
import { auth } from '@/firebase/clientApp'
import { Box, Text } from '@chakra-ui/react'
import { User } from 'firebase/auth'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilValue } from 'recoil'

const SubmitPostPage: React.FC = () => {
  const [user] = useAuthState(auth)
  const communityStateValue = useRecoilValue(communityState)

  return (
    <PageContentLayout>
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text fontWeight={600}>Create a post</Text>
        </Box>

        {user && (
          <NewPostForm
            user={user as User}
            communityId={communityStateValue.currentCommunity?.id}
            communityImageURL={communityStateValue.currentCommunity?.imageURL}
          />
        )}
      </>

      {communityStateValue.currentCommunity && (
        <>
          <About communityData={communityStateValue.currentCommunity} pt={6} onCreatePage />
        </>
      )}
    </PageContentLayout>
  )
}
export default SubmitPostPage
