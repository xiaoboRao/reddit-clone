import { communityState } from '@/atoms/communitiesAtom'
import useCommunityData from '@/hooks/useCommunityData'
import { Box, Flex, Icon, MenuItem, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaReddit } from 'react-icons/fa'
import { GrAdd } from 'react-icons/gr'
import { useRecoilValue } from 'recoil'
import CreateCommunityModal from './CreateCommunityModal'
import MenuListItem from './MenuListItem'

const Communities: React.FC = () => {
  // const [open, setOpen] = useState(false)
  const { communityStateValue, toggleCommunityOpen } = useCommunityData()
  const mySnippets = useRecoilValue(communityState).mySnippets

  console.log('mySnippets', mySnippets)
  return (
    <>
      <CreateCommunityModal open={communityStateValue.isOpen} handleClose={toggleCommunityOpen} />
      {mySnippets.find((item) => item.isModerator) && (
        <Box mt={3} mb={4}>
          <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
            MODERATING
          </Text>
          {mySnippets
            .filter((item) => item.isModerator)
            .map((snippet) => (
              <MenuListItem
                key={snippet.communityId}
                displayText={`r/${snippet.communityId}`}
                link={`/r/${snippet.communityId}`}
                icon={FaReddit}
                iconColor="brand.100"
              />
            ))}
        </Box>
      )}
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
          MY COMMUNITIES
        </Text>
        <MenuItem width="100%" fontSize="10pt" _hover={{ bg: 'gray.100' }} onClick={toggleCommunityOpen}>
          <Flex alignItems="center">
            <Icon fontSize={20} mr={2} as={GrAdd} />
            Create Community
          </Flex>
        </MenuItem>
        {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            icon={FaReddit}
            displayText={`r/${snippet.communityId}`}
            link={`/r/${snippet.communityId}`}
            iconColor="brand.100"
            imageURL={snippet.imageURL}
          />
        ))}
      </Box>
    </>
  )
}
export default Communities
