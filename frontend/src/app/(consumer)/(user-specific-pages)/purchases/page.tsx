import UserPurchaseTable from '@/components/features/tables/UserPurchaseTable'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/ui/PageHeader'
import useUser from '@/hooks/server-hooks/useUser'
import { Purchase } from '@/types/purchase'
import { serverApi } from '@/utils/serverApi'
import Link from 'next/link'
import React from 'react'

const page = async () => {
    const {response, error} = await serverApi(`purchases/mine`, "GET")
    const purchases: Purchase[] = Array.isArray(response?.data) ? response.data : [];

    if(purchases.length === 0) return (
        <div className='flex flex-col gap-2 items-start'>
            You have made no purchases yet
            <Button size="lg" asChild>
                <Link href="/" >Browse Courses</Link>
            </Button>
        </div>
    )

  return (
    <div className='container my-6'>
        <PageHeader title='Purchase History' />
        <UserPurchaseTable purchases={purchases} />
    </div>
  )
}

export default page