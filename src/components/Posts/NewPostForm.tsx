import { Post } from '@/atoms/PostsAtom'
import { firestore, storage } from '@/firebase/clientApp'
import { Alert, AlertIcon, Flex, Icon, Text } from '@chakra-ui/react'
import { User } from 'firebase/auth'
import { addDoc, collection, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { useRouter } from 'next/router'
import React, { useState, useRef } from 'react'
import { BiPoll } from 'react-icons/bi'
import { BsLink45Deg, BsMic } from 'react-icons/bs'
import { IoDocumentText, IoImageOutline } from 'react-icons/io5'
import ImageUpload from './ImageUpload'
import TabItem from './TabItem'
import TextInputs from './TextInputs'
type NewPostFormProps = {
  user: User
}

const formTabs = [
  {
    title: 'Post',
    icon: IoDocumentText,
  },
  {
    title: 'Images & Video',
    icon: IoImageOutline,
  },
  {
    title: 'Link',
    icon: BsLink45Deg,
  },
  {
    title: 'Poll',
    icon: BiPoll,
  },
  {
    title: 'Talk',
    icon: BsMic,
  },
]

export type TabItemIcon = {
  title: string
  icon: typeof Icon.arguments
}

const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
  const [tabSelected, setTabSelected] = useState(formTabs[0].title)
  const [selectedFile, setSelectedFile] = useState('')
  const [error, setError] = useState(false)
  const router = useRouter()
  const selectFileRef = useRef<HTMLInputElement>(null)

  const [textInputs, setTextInputs] = useState({ title: '', body: '' })
  const [loading, setLoading] = useState(false)
  const onTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = event
    setTextInputs((pre) => ({ ...pre, [name]: value }))
  }
  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0])
    }
    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target?.result as string)
      }
    }
  }

  const handleCreatePost = async () => {
    setLoading(true)
    if (error) {
      setError(false)
    }
    const communityId = router.query.communityId

    const newPost: Post = {
      communityId: communityId as string,
      creatorId: user?.uid,
      creatorDisplayName: user.email!.split('@')[0],
      title: textInputs.title,
      body: textInputs.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
    }

    try {
      const postDocRef = await addDoc(collection(firestore, 'posts'), newPost)

      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`)
        await uploadString(imageRef, selectedFile, 'data_url')
        const downloadUrl = await getDownloadURL(imageRef)
        await updateDoc(postDocRef, { imageURL: downloadUrl })
      }
    } catch (error: any) {
      setError(true)
      console.log('handleCreatePost error', error?.message)
    }
    setLoading(false)
    router.back()
  }
  return (
    <>
      <Flex direction="column" bg="white" borderRadius={4} mt={2}>
        <Flex width="100%">
          {formTabs.map((item, index) => (
            <TabItem item={item} selected={item.title === tabSelected} setTabSelected={setTabSelected} key={index} />
          ))}
        </Flex>
        {tabSelected === 'Post' && (
          <Flex p={4}>
            <TextInputs
              textInputs={textInputs}
              onChange={onTextChange}
              handleCreatePost={handleCreatePost}
              loading={loading}
            />
          </Flex>
        )}
        {tabSelected === 'Images & Video' && (
          <Flex p={4}>
            <ImageUpload
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              setSelectedTab={setTabSelected}
              selectFileRef={selectFileRef}
              onSelectImage={onSelectImage}
            />
          </Flex>
        )}
        {error && (
          <Alert status="error">
            <AlertIcon />
            <Text>Error Creating Post</Text>
          </Alert>
        )}
      </Flex>
    </>
  )
}
export default NewPostForm
