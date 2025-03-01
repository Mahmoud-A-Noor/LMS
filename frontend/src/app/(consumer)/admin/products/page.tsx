import CourseTable from '@/components/features/CourseTable'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/ui/PageHeader'
import Link from 'next/link'
import React from 'react'
import { serverApi } from '@/utils/serverApi'
import ProductTable from '@/components/features/ProductTable'


const page = async() => {
  const { response, error } = await serverApi("/products", "GET");

  if (error) return <div>Error loading courses.</div>;

  const products: any[] = Array.isArray(response?.data) ? response.data : [];

  return (
    <div className='container my-6'>
      <PageHeader title='Products'>
        <Button asChild>
          <Link href="products/new">
           New Product
          </Link>
        </Button>
      </PageHeader>

      <ProductTable products={products} />
    </div>
  );
}

export default page