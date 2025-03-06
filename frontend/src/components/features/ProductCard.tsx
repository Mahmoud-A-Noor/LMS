import React, { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'
import { formatPrice } from '@/utils/formatPrice'

const ProductCard = ({id, imageUrl, name, priceInDollars, description} : {id: string, imageUrl: string, name: string, priceInDollars: number, description: string}) => {  
return (
    <Card className='overflow-hidden flex flex-col w-full max-w-[500px] mx-auto'>
        <div className='relative aspect-video w-full'>
            <Image src={imageUrl} alt={name} className="object-cover" fill />
        </div>
        <CardHeader className='space-y-0'>
            <CardDescription>
                {formatPrice(priceInDollars)}
            </CardDescription>
            <CardTitle className='text-xl'>
                {name}
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p className='line-clamp-4'>
                {description}
            </p>
        </CardContent>
        <CardFooter className='mt-auto'>
            <Button className='w-full text-md py-y' asChild>
                <Link href={`/products/${id}`}>
                    View Course
                </Link>
            </Button>
        </CardFooter>
    </Card>
  )
}

export default ProductCard


async function Price({price} : {price: number}){

}