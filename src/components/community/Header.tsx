import React from 'react'
import { Box, Button, Flex, Icon, Text, Image } from '@chakra-ui/react'
import { FaReddit } from 'react-icons/fa'
import { Community } from '@/atoms/communitiesAtom'
import useCommunityData from '@/hooks/useCommunityData'

type HeaderProps = {
  communityData: Community
}

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const { communityStateValue, onJoinOrLeaveCommunity, loading } = useCommunityData()
  const isJoined = !!communityStateValue.mySnippets.find((snippet) => snippet.communityId === communityData.id)

  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="blue.400" />
      <Flex justifyContent="center" bg="white" height="50%">
        <Flex width="95%" maxWidth="860px">
          {communityStateValue.currentCommunity?.imageURL ? (
            <Image
              borderRadius="full"
              boxSize="66px"
              src={communityStateValue.currentCommunity.imageURL}
              alt="Dan Abramov"
              position="relative"
              top={-3}
              color="blue.500"
              border="4px solid white"
            />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position="relative"
              top={-3}
              color="red.500"
              border="4px solid white"
              borderRadius="50%"
            />
          )}

          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={800} fontSize="16px">
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize="10px" color="gray.400">
                r/{communityData.id}
              </Text>
            </Flex>
            <Flex>
              <Button
                variant={isJoined ? 'outline' : 'solid'}
                height="30px"
                pr={6}
                pl={6}
                isLoading={loading}
                onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
              >
                {isJoined ? 'Joined' : 'Join'}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
export default Header
