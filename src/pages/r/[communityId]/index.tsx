import { Community, CommunityState } from '@/atoms/communitiesAtom'
import { firestore } from '@/firebase/clientApp'
import { doc, getDoc } from 'firebase/firestore'
import { GetServerSidePropsContext } from 'next'
import safeJsonStringify from 'safe-json-stringify'

import React, { useEffect, useState } from 'react'
import CommunityNotFound from '@/components/Community/CommunityNotFound'
import Header from '@/components/Community/Header'
import PageContentLayout from '@/components/Layout/PageContent'
import CreatePostLink from '@/components/Community/CreatePostLink'
import Posts from '@/components/Posts/Posts'
import { useRecoilState } from 'recoil'
import About from '@/components/Community/About'

type CommunityPageProps = {
  communityName: string
}

const CommunityPage: React.FC<CommunityPageProps> = ({ communityName }) => {
  const [communityData, setCommunityData] = useState({})
  const [communityStateValue, setCommunityStateValue] = useRecoilState(CommunityState)

  const getCommunityData = async () => {
    try {
      const communityDocRef = doc(firestore, 'communities', communityName)
      const communityDoc = await getDoc(communityDocRef)

      if (communityDoc.exists()) {
        setCommunityData(JSON.parse(safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })))
        setCommunityStateValue((pre) => ({
          ...pre,
          currentCommunity: { id: communityDoc.id, ...communityDoc.data() } as Community,
        }))
      } else {
        setCommunityData('')
      }
    } catch (error) {
      // could add error page here
      console.log('get ServerSideProps Error', error)
    }
  }
  useEffect(() => {
    getCommunityData()
  }, [communityName])
  if (!communityData) return <CommunityNotFound />
  return (
    <>
      <Header communityData={communityData as Community} />
      <PageContentLayout>
        <>
          <CreatePostLink />
          <Posts communityData={communityData as Community} />
        </>
        <>
          <About communityData={communityData as Community} />
        </>
      </PageContentLayout>
    </>
  )
}
export default CommunityPage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      communityName: context.query.communityId as string,
    },
  }
}
