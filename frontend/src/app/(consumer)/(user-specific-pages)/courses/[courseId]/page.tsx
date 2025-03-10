import PageHeader from '@/components/ui/PageHeader'
import { Course } from '@/types/course'
import { serverApi } from '@/utils/serverApi'
import { notFound } from 'next/navigation'
import React from 'react'

const page = async ({params} : {params: Promise<{courseId: string}>}) => {

  const {courseId} = await params
  const course = await serverApi("/courses", "GET", null, courseId) as unknown as Course

  if(course === null) return notFound()

  return (
    <div className="my-6 container">
      <PageHeader className='mb-2' title={course.name} />
      <p className='text-muted-foreground'>{course.description}</p>
    </div>
  )
}

export default page