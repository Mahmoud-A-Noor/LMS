"use client"
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'
import { formatPlural } from '@/utils/formatPlural'
import { Button } from '../../ui/button'
import Link from 'next/link'
import { Badge, EyeIcon, LockIcon, Trash2Icon } from 'lucide-react'
import ActionButton from '../../common/ActionButton'
import { useToast } from '@/hooks/useToast'
import { useApi } from '@/hooks/useApi'
import { Product } from '@/types/product'
import Image from 'next/image'
import { formatPrice } from '@/utils/formatPrice'
import { ProductStatus } from '@/enums/ProductStatus'

const ProductTable = ({products} : {products : Product[]}) => {


    const {request, data, loading, error} = useApi("/products", "DELETE")

    function deleteProduct(productId: string) {
        const {alertError, alertSuccess} = useToast()
        request(null, productId)
            .then(response => {
                if (response.status === 200) {
                    alertSuccess("Course deleted successfully")
                } else {
                    alertError("Unexpected response from server")
                }
            })
            .catch(() => {
                alertError(error || "Something went wrong")
            })
    }

  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>
                    {formatPlural(products.length, {
                        singular: "product", 
                        plural: "products"
                    })}
                </TableHead>
                <TableHead> Clients </TableHead>
                <TableHead> Status </TableHead>
                <TableHead> Actions </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {products.map((product)=>(
                <TableRow key={product.id}>
                    <TableCell>
                        <div className="flex items-center gap-4">
                            <Image className='object-cover rounded size-12' src={product.imageUrl} alt={product.name} width={192} height={192} />
                            <div className="flex flex-col gap-1">
                                <div className='font-semibold'>
                                    {product.name}
                                </div>
                                <div className='text-muted-foreground'>
                                    {
                                        formatPlural(product.courseCount, {singular: "course", plural: "courses"})
                                    } ⚪ {" "}
                                    {formatPrice(product.priceInDollars)}
                                </div>
                             </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        {product.clientCount}
                    </TableCell>
                    <TableCell>
                        <Badge className='inline-flex items-center gap-2'>
                            {getStatusIcon(product.status)} {product.status}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        <div className="flex gap-2">
                            <Button asChild>
                                <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                            </Button>
                            <Button onClick={()=>deleteProduct(product.id)}>
                                Delete
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}

export default ProductTable


function getStatusIcon(status: ProductStatus) {
    const Icon = {
        public: EyeIcon,
        private: LockIcon
    }[status]

    return <Icon className='size-4' />
}