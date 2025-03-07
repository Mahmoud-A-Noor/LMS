import PurchaseTable from '@/components/features/tables/PurchaseTable'
import PageHeader from '@/components/ui/PageHeader'
import { Purchase } from '@/types/purchase'
import { serverApi } from '@/utils/serverApi'
import React from 'react'

const page = async () => {

  const response = await serverApi("/purchases", "GET")
  const purchases = response.response?.data as Purchase[] | []

  return (
    <div className='container my-6'>
      <PageHeader title='Sales' />
      <PurchaseTable purchases={purchases} />
    </div>
  )
}

export default page