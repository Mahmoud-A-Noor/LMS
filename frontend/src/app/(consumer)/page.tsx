import ProductCard from '@/components/features/ProductCard'
import { Product } from '@/types/product'
import { serverApi } from '@/utils/serverApi'
import React from 'react'

const HomePage = async () => {
    const response = await serverApi("/products/public", "GET")
    const products = response?.response?.data ?? []
  return (
    <div className='container my-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {(products as Product[]).map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}

export default HomePage