"use client"
import ProductCard from '@/components/features/ProductCard'
import { Product } from '@/types/product'
import API from '@/utils/apiConfig'
import { serverApi } from '@/utils/serverApi'
import React, { useEffect, useState } from 'react'

const HomePage = () => {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      API
        .get("/products/public")
        .then((res) => setProducts(res.data))
        .catch((err) => console.error(err));
    }, []);

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