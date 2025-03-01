import CourseForm from '@/components/forms/CourseForm'
import ProductForm from '@/components/forms/ProductForm'
import PageHeader from '@/components/ui/PageHeader'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import { serverApi } from '@/utils/serverApi'
import React from 'react'

const page = async () => {
    const { response, error } = await serverApi("/courses", "GET"); // Fetching courses data

    if (error) return <div>Error loading courses.</div>;
  
    const coursesData: any[] = Array.isArray(response?.data) ? response.data : [];
  // useAuthGuard()

  return (
    <div className='container my-6'>
      <PageHeader title='New Product'/>
      <ProductForm courses={coursesData} />
    </div>
  )
}

export default page