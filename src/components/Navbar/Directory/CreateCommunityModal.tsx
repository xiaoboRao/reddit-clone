import { communityState } from '@/atoms/communitiesAtom'
import { auth, firestore } from '@/firebase/clientApp'
import useDirectory from '@/hooks/useDirectory'
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
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BsFillEyeFill, BsFillPersonFill } from 'react-icons/bs'
import { HiLockClosed } from 'react-icons/hi'
import { useSetRecoilState } from 'recoil'

type CreateCommunityModalProps = {
  open: boolean
  handleClose: () => void
}

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ open, handleClose }) => {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const [communityName, setCommunityName] = useState('')
  const [charRemaining, setCharRemaining] = useState(21)
  const [communityType, setCommunityType] = useState('public')
  const [communityNameLengthError, setCommunityNameLengthError] = useState('')
  const [createCommunityloading, setcreateCommunityloading] = useState(false)
  const setSnippetState = useSetRecoilState(communityState)
  const { toggleMenuOpen } = useDirectory()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return
    setCommunityName(event.target.value)
    setCharRemaining(21 - event.target.value.length)
  }

  const handleCreateCommunity = async () => {
    // Validate the community name
    if (communityNameLengthError) setCommunityNameLengthError('')
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/
    if (format.test(communityName) || communityName.length < 3) {
      return setCommunityNameLengthError(
        'Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores.'
      )
    }
    setcreateCommunityloading(true)
    try {
      const communityRef = doc(firestore, 'communities', communityName)
      // Check if the community exists in the firestore

      await runTransaction(firestore, async (transaction) => {
        const communitySnap = await transaction.get(communityRef)
        if (communitySnap.exists()) {
          throw new Error(`Sorry, /r${communityName} is taken, plase try another`)
        }
        // Create a new community
        transaction.set(communityRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
          imageURL: '',
        })
        // Create a new community for current user
        transaction.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communityName), {
          communityId: communityName,
          isModerator: true,
          imageURL: '',
        })
      })
      console.log('Transaction successfully committed!')
    } catch (error: any) {
      console.log('handleCreateCommunity error: ' + error)
      setCommunityNameLengthError(error.message)
    }
    setSnippetState((prev) => ({
      ...prev,
      mySnippets: [],
    }))
    toggleMenuOpen()
    handleClose()
    router.push(`/r/${communityName}`)
  }
  return (
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
            <Text fontSize="10px" color="red">
              {communityNameLengthError}
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
          <Button variant="solid" height="30px" isLoading={createCommunityloading} onClick={handleCreateCommunity}>
            Create Community
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default CreateCommunityModal
