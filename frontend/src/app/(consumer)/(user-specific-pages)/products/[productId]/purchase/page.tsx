import StripeCheckoutForm from '@/components/features/StripeCheckoutForm'
import useUser from '@/hooks/server-hooks/useUser'
import { cn } from '@/lib/utils'
import { Product } from '@/types/product'
import { User } from '@/types/user'
import { serverApi } from '@/utils/serverApi'
import { Loader2Icon } from 'lucide-react'
import { redirect } from 'next/navigation'
import React, { ComponentProps, Suspense } from 'react'

const PurchasePage = async ({params, searchParams} : {params: Promise<{productId: string}>, searchParams: Promise<{authMode: string}>}) => {

    const {productId} = await params
    const {response, error} = await serverApi(`/products/${productId}`, "GET")

  return (
    <Suspense fallback={<LoadingSpinner className="my-6 size-36 mx-auto" />}>
        <SuspendedComponent params={params} />
    </Suspense>
  )
}

export default PurchasePage


function LoadingSpinner({className, ...props} : ComponentProps<typeof Loader2Icon>){
    return (
        <Loader2Icon className={cn("animate-spin text-blue-400",className)} {...props} />
    )
}

async function SuspendedComponent({ params }: {params: Promise<{productId: string}>}){

    const { productId } = await params
    const productResponse = await serverApi(`/products/${productId}`, "GET")
    const product = productResponse.response?.data
    const user = await useUser()
    // const userResponse = await serverApi(`/users/me`, "GET")
    // const user = userResponse.response.data
    const {response, error} = await serverApi(`/purchases/user-own-product`, "GET", {userId: user?.id, productId})
    if(response?.data) redirect("/courses")

    return (
        <div className='container my-6'>
            <StripeCheckoutForm product={product as Product} user={user as User} />
        </div>
    )
}