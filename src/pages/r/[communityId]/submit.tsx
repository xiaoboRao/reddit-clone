import PageContentLayout from '@/components/Layout/PageContent'
import NewPostForm from '@/components/Posts/NewPostForm'
import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const submitPostPage: React.FC = () => {
  return (
    <PageContentLayout>
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text fontWeight={600}>Create a post</Text>
        </Box>
        <NewPostForm />
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
