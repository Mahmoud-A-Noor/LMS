import CourseForm from '@/components/forms/CourseForm'
import PageHeader from '@/components/ui/PageHeader'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import React from 'react'

const page = () => {

  // useAuthGuard()

  return (
    <div className='container my-6'>
      <PageHeader title='New Course'/>
      <CourseForm />
    </div>
  )
}

export default page