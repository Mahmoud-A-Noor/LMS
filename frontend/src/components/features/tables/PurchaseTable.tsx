import { Badge } from '@/components/ui/badge'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table'
import { Purchase } from '@/types/purchase'
import { formatDate } from '@/utils/formatters/formatDate'
import { formatPlural } from '@/utils/formatters/formatPlural'
import { formatPrice } from '@/utils/formatters/formatPrice'
import React from 'react'
import RefundButton from '../RefundButton'
import Image from 'next/image'

const PurchaseTable = ({purchases} : {purchases: Purchase[]}) => {

  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>{formatPlural(purchases.length, {
                    singular: "Sale",
                    plural: "Sales"
                })}</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {purchases.map((purchase)=>{
                const productDetails = typeof purchase.productDetails === "string" ? JSON.parse(purchase.productDetails) : purchase.productDetails;
                return (
                    <TableRow key={purchase.id}>
                        <TableCell>
                            <div className='flex items-center gap-4'>
                                <Image src={productDetails.image_url} alt={productDetails.name} width={192} height={192} />
                                <div className='flex flex-col gap-1'>
                                    <div className='font-semibold'>
                                        {productDetails.name}
                                    </div>
                                    <div className='text-muted-foreground'>
                                        {formatDate(purchase.createdAt)}
                                    </div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            {purchase.user.username}
                        </TableCell>
                        <TableCell>
                            {purchase.refundedAt ? (
                                <Badge variant="outline">Refunded</Badge>
                            ) : (
                                formatPrice(purchase.pricePaidInCents / 100)
                            )}
                        </TableCell>
                        <TableCell>
                            {purchase.refundedAt === null && purchase.pricePaidInCents > 0 && (
                                <RefundButton paymentIntentId={purchase.stripePaymentIntentId} />
                            )}
                        </TableCell>
                    </TableRow>
                )
            })}
        </TableBody>
    </Table>
  )
}

export default PurchaseTable