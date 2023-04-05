import React from 'react'
import { Box, Button, Flex, Icon, Text, Image } from '@chakra-ui/react'
import { FaReddit } from 'react-icons/fa'
import { Community } from '@/atoms/communitiesAtom'

type HeaderProps = {
  communityData: Community
}

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const isJoined = false

  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="blue.400" />
      <Flex justifyContent="center" bg="white" height="50%">
        <Flex width="95%" maxWidth="860px">
          {communityData.imageURL ? (
            <Image src={communityData.imageURL} />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position="relative"
              top={-3}
              color="blue.500"
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
              <Button variant={isJoined ? 'outline' : 'solid'} height="30px" pr={6} pl={6}>
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
