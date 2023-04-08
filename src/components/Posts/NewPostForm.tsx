import { Flex, Icon } from '@chakra-ui/react'
import React, { useState, useRef } from 'react'
import { BiPoll } from 'react-icons/bi'
import { BsLink45Deg, BsMic } from 'react-icons/bs'
import { IoDocumentText, IoImageOutline } from 'react-icons/io5'
import ImageUpload from './ImageUpload'
import TabItem from './TabItem'
import TextInputs from './TextInputs'
type NewPostFormProps = {}

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

const NewPostForm: React.FC<NewPostFormProps> = () => {
  const [tabSelected, setTabSelected] = useState(formTabs[0].title)
  const [selectedFile, setSelectedFile] = useState('')
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

  const handleCreatePost = () => {}
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
      </Flex>
    </>
  )
}
export default NewPostForm
