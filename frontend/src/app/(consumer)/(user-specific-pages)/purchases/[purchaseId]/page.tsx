import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import PageHeader from '@/components/ui/PageHeader'
import { Purchase } from '@/types/purchase'
import { formatDate } from '@/utils/formatters/formatDate'
import { serverApi } from '@/utils/serverApi'
import Link from 'next/link'
import React from 'react'

const page = async ({params} : {params: Promise<{purchaseId: string}>}) => {

  const {purchaseId} = await params
  const {response, error} = await serverApi("/purchases", "GET", null, purchaseId)
  const purchase = response?.data as Purchase
  
  const chargeReceipt = await serverApi("/stripe-custom/receipt", "GET", null, purchase.stripePaymentIntentId)
  const receiptUrl = (chargeReceipt?.response?.data as {receiptUrl: string}).receiptUrl

  
  return (
    <div className='container my-6'> 
      <PageHeader title="Purchase Details">
        {receiptUrl && (
          <Button variant="outline" asChild>
            <Link target="_blank" href={receiptUrl} > 
              View Receipt
            </Link>
          </Button>
        )}
      </PageHeader>

      <Card>
        <CardHeader className='pb-4'>
          <div className='flex justify-between items-start gap-4'>
            <div className='flex flex-col gap-1'>
              <CardTitle>
                Receipt
              </CardTitle>
              <CardDescription>
                ID: {purchaseId}
              </CardDescription>
            </div>
            <Badge className='text-base'>
              {purchase.refundedAt ? "Refunded" : "Paid"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className='pb-4 grid grid-cols-2 gap-8 border-t pt-4'>
          <div>
            <label className='text-sm text-muted-foreground'>Date</label>
            <div>{formatDate(purchase.createdAt)}</div>
          </div>
          <div>
            <label className='text-sm text-muted-foreground'>Product</label>
            <div>{purchase.product.name}</div>
          </div>
          <div>
            <label className='text-sm text-muted-foreground'>Customer</label>
            <div>{purchase.user.id}</div>
          </div>
          <div>
            <label className='text-sm text-muted-foreground'>Seller</label>
            <div>MMM</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default page