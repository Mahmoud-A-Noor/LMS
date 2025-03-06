import CourseTable from '@/components/features/tables/CourseTable'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/ui/PageHeader'
import Link from 'next/link'
import React from 'react'
import { serverApi } from '@/utils/serverApi'


const page = async() => {
  const { response, error } = await serverApi("/courses", "GET"); // Fetching courses data

  if (error) return <div>Error loading courses.</div>;

  const coursesData: any[] = Array.isArray(response?.data) ? response.data : [];

  return (
    <div className='container my-6'>
      <PageHeader title='Courses'>
        <Button asChild>
          <Link href="courses/new">
           New Course
          </Link>
        </Button>
      </PageHeader>

      <CourseTable courses={coursesData} />
    </div>
  );
}

export default page