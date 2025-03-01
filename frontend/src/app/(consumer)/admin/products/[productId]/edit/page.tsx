import CourseForm from '@/components/forms/CourseForm'
import ProductForm from '@/components/forms/ProductForm'
import PageHeader from '@/components/ui/PageHeader'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import { serverApi } from '@/utils/serverApi'
import { notFound } from 'next/navigation'
import React from 'react'

const page = async ({params} : {params: Promise<{productId: string}>}) => {

    const {productId} = await params
    const productResponse = await serverApi(`/products/${productId}`, "GET");
    if (productResponse.error) return <div>Error loading product.</div>;
    const product = productResponse.response?.data;
    if (!product) return notFound();

    const coursesResponse = await serverApi("/courses", "GET");
    if (coursesResponse.error) return <div>Error loading courses.</div>;
    const coursesData: any[] = Array.isArray(coursesResponse.response?.data) ? coursesResponse.response.data : [];
  
  // useAuthGuard()

  return (
    <div className='container my-6'>
      <PageHeader title='New Product'/>
      <ProductForm product={{...product, courseIds: product.courses.map((course)=>course.id)}} courses={coursesData} />
    </div>
  )
}

export default page
