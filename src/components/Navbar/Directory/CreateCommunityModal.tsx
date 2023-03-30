import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsFillEyeFill, BsFillPersonFill } from 'react-icons/bs'
import { HiLockClosed } from 'react-icons/hi'

type CreateCommunityModalProps = {
  open: boolean
  handleClose: () => void
}

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ open, handleClose }) => {
  const [communityName, setCommunityName] = useState('')
  const [charRemaining, setCharRemaining] = useState(21)
  const [communityType, setCommunityType] = useState('public')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return
    setCommunityName(event.target.value)
    setCharRemaining(21 - event.target.value.length)
  }
  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a community</ModalHeader>
          <Box pl="24px" pr="24px">
            <Divider />
            <ModalCloseButton />
            <ModalBody flexDirection="column" padding="10px 0">
              <Text fontWeight={600} fontSize="15px">
                Name
              </Text>
              <Text fontSize="11px" color="gray.500">
                Community names including capitalization cannot be changed
              </Text>
              <Text position="relative" top="30px" left="10px" width="20px" color="gray.400">
                r/
              </Text>
              <Input position="relative" fontSize="sm" pl="22px" value={communityName} onChange={handleChange} />
              <Text color={charRemaining === 0 ? 'red' : 'gray.500'} fontSize="10px">
                {charRemaining} Characters remaining
              </Text>
              <Box mt="16px" mb="16px">
                <Text fontWeight={600} fontSize={15}>
                  Community Type
                </Text>
                <Stack spacing={2}>
                  <Checkbox
                    name="public"
                    isChecked={communityType === 'public'}
                    onChange={() => setCommunityType('public')}
                  >
                    <Flex alignItems="center">
                      <Icon as={BsFillPersonFill} mr="5px" color="gray.500" />
                      <Text fontSize="15px" mr="5px">
                        Public
                      </Text>
                      <Text fontSize="8px" color="gray.500" pt="5px">
                        Anyone can view, post, and comment to this community
                      </Text>
                    </Flex>
                  </Checkbox>

                  <Checkbox
                    name="restricted"
                    isChecked={communityType === 'restricted'}
                    onChange={() => setCommunityType('restricted')}
                  >
                    <Flex alignItems="center">
                      <Icon as={BsFillEyeFill} color="gray.500" mr="5px" />
                      <Text fontSize="15px" mr="5px">
                        Restricted
                      </Text>
                      <Text fontSize="8px" color="gray.500" pt="5px">
                        Anyone can view this community, but only approved users can post
                      </Text>
                    </Flex>
                  </Checkbox>

                  <Checkbox
                    name="private"
                    isChecked={communityType === 'private'}
                    onChange={() => setCommunityType('private')}
                  >
                    <Flex alignItems="center">
                      <Icon as={HiLockClosed} color="gray.500" mr="5px" />
                      <Text fontSize="15px" mr="5px">
                        Private
                      </Text>
                      <Text fontSize="8px" color="gray.500" pt="5px">
                        Only approved users can view and submit to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button variant="outline" height="30px" mr="10px" onClick={handleClose}>
              Close
            </Button>
            <Button variant="solid" height="30px">
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default CreateCommunityModal
