import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Purchase } from '@/types/purchase'
import { formatDate } from '@/utils/formatters/formatDate'
import { formatPrice } from '@/utils/formatters/formatPrice'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const UserPurchaseTable = ({purchases} : {purchases: Purchase[]}) => {
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {purchases.map((purchase)=>(
                <TableRow key={purchase.id}>
                    <TableCell>
                        <div className='flex items-center gap-4'>
                            <Image src={purchase.productDetails.imageUrl} alt={purchase.productDetails.name} width={192} height={192} />
                            <div className='flex flex-col gap-1'>
                                <div className='font-semibold'>
                                    {purchase.productDetails.name}
                                </div>
                                <div className='text-muted-foreground'>
                                    {formatDate(purchase.createdAt)}
                                </div>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        {purchase.refundedAt ? (
                            <Badge variant="outline">Refunded</Badge>
                        ) : (
                            formatPrice(purchase.pricePaidInCents / 100)
                        )}
                    </TableCell>
                    <TableCell>
                        <Button variant="outline" asChild>
                            <Link href={`purchases/${purchase.id}`}>Details</Link>
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}

export default UserPurchaseTable