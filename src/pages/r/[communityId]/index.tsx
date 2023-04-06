import { Community } from '@/atoms/communitiesAtom'
import { firestore } from '@/firebase/clientApp'
import { doc, getDoc } from 'firebase/firestore'
import { GetServerSidePropsContext } from 'next'
import safeJsonStringify from 'safe-json-stringify'

import React, { useEffect, useState } from 'react'
import CommunityNotFound from '@/components/community/CommunityNotFound'
import Header from '@/components/community/Header'
import PageContentLayout from '@/components/Layout/PageContent'

type CommunityPageProps = {
  communityName: string
}

const CommunityPage: React.FC<CommunityPageProps> = ({ communityName }) => {
  const [communityData, setCommunityData] = useState({})
  const getCommunityData = async () => {
    try {
      const communityDocRef = doc(firestore, 'communities', communityName)
      const communityDoc = await getDoc(communityDocRef)
      communityDoc.exists()
        ? setCommunityData(JSON.parse(safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })))
        : setCommunityData('')
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
          <div>LHS</div>
        </>
        <>
          <div>RHS</div>
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
