import PageContentLayout from '@/components/Layout/PageContent'
import NewPostForm from '@/components/Posts/NewPostForm'
import { auth } from '@/firebase/clientApp'
import { Box, Text } from '@chakra-ui/react'
import { User } from 'firebase/auth'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

const submitPostPage: React.FC = () => {
  const [user] = useAuthState(auth)
  return (
    <PageContentLayout>
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text fontWeight={600}>Create a post</Text>
        </Box>

        {user && <NewPostForm user={user as User} />}
      </>
      <>
        <Box>
          <Text>Create A Post</Text>
        </Box>
      </>
    </PageContentLayout>
  )
}
export default submitPostPage
