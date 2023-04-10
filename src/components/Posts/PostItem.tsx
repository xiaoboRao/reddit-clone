import React, { useState } from 'react'
import { Flex, Icon, Image, Skeleton, Spinner, Stack, Text } from '@chakra-ui/react'
import moment from 'moment'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsChat } from 'react-icons/bs'
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from 'react-icons/io5'
import { Post } from '@/atoms/PostsAtom'

export type PostItemContentProps = {
  post: Post
  onVote: () => void
  onDeletePost: () => {}
  userIsCreator: boolean
  userVoteValue: number
  onSelectPost?: () => void
}

const PostItem: React.FC<PostItemContentProps> = ({
  post,
  onVote,
  onSelectPost,
  onDeletePost,
  userVoteValue,
  userIsCreator,
}) => {
  const [loadingImage, setLoadingImage] = useState(true)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const singlePostView = !onSelectPost // function not passed to [pid]

  const handleDelete = () => {}

  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor={singlePostView ? 'white' : 'gray.300'}
      borderRadius={singlePostView ? '4px 4px 0px 0px' : '4px'}
      cursor={singlePostView ? 'unset' : 'pointer'}
      _hover={{ borderColor: singlePostView ? 'none' : 'gray.500' }}
      onClick={() => onSelectPost}
    >
      <Flex
        direction="column"
        align="center"
        bg={singlePostView ? 'none' : 'gray.100'}
        p="10px"
        width="40px"
        borderRadius={singlePostView ? '0' : '3px 0px 0px 3px'}
      >
        <Icon
          as={userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline}
          color={userVoteValue === 1 ? 'brand.100' : 'gray.400'}
          fontSize="22px"
          cursor="pointer"
          onClick={() => onVote()}
        />
        <Text fontSize="12px" fontWeight={600}>
          {post.voteStatus}
        </Text>
        <Icon
          as={userVoteValue === -1 ? IoArrowDownCircleSharp : IoArrowDownCircleOutline}
          color={userVoteValue === -1 ? '#4379FF' : 'gray.400'}
          fontSize="22px"
          cursor="pointer"
          onClick={() => onVote()}
        />
      </Flex>
      <Flex direction="column" width="100%">
        <Stack spacing="5px" p="10px 10px">
          {post.createdAt && (
            <Stack direction="row" spacing="12px" align="center" fontSize="9px">
              <Text color="gray.500" fontSize="12px">
                Posted by u/{post.creatorDisplayName} {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
              </Text>
            </Stack>
          )}
          <Text fontSize="18px" fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize="14px">{post.body}</Text>
          {post.imageURL && (
            <Flex justify="center" align="center" p="10px">
              {loadingImage && <Skeleton height="200px" width="100%" borderRadius="10px" />}
              <Image
                // width="80%"
                // maxWidth="500px"
                maxHeight="460px"
                src={post.imageURL}
                display={loadingImage ? 'none' : 'unset'}
                onLoad={() => setLoadingImage(false)}
                alt="Post Image"
              />
            </Flex>
          )}
        </Stack>
        <Flex ml="10px" mb="5px" color="gray.500" fontWeight={600}>
          <Flex align="center" p="8px 10px" borderRadius="10px" _hover={{ bg: 'gray.200' }} cursor="pointer">
            <Icon as={BsChat} mr="10px" />
            <Text fontSize="12px">{post.numberOfComments}</Text>
          </Flex>
          <Flex align="center" p="8px 10px" borderRadius="10px" _hover={{ bg: 'gray.200' }} cursor="pointer">
            <Icon as={IoArrowRedoOutline} mr="10px" />
            <Text fontSize="12px">Share</Text>
          </Flex>
          <Flex align="center" p="8px 10px" borderRadius="10px" _hover={{ bg: 'gray.200' }} cursor="pointer">
            <Icon as={IoBookmarkOutline} mr="10px" />
            <Text fontSize="12px">Save</Text>
          </Flex>
          {userIsCreator && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius="10px"
              _hover={{ bg: 'gray.200' }}
              cursor="pointer"
              onClick={handleDelete}
            >
              {loadingDelete ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} mr="10px" />
                  <Text fontSize="9px">Delete</Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default PostItem