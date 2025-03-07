import { courseSchema } from '@/components/forms/validation/course'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import PageHeader from '@/components/ui/PageHeader'
import useUser from '@/hooks/server-hooks/useUser'
import { formatPlural } from '@/utils/formatters/formatPlural'
import { serverApi } from '@/utils/serverApi'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='container my-6'>
        <PageHeader title='Courses' />
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
            <CourseGrid />
        </div>
    </div>
  )
}

async function CourseGrid() {
    const user = useUser()
    const {response, error} = await serverApi("/user-course-accesses/user-courses", "GET")
    const userCourses = Array.isArray(response?.data) ? response.data : []

    if(userCourses.length === 0){
        return <div className='flex flex-col gap-2 items-start'>
            You have no courses yet
            <Button size="lg" asChild>
                <Link href="/" >Browse Courses</Link>
            </Button>
        </div>
    }

    return userCourses.map((course) => {
        return (
            <Card key={course.id} className='overflow-hidden flex flex-col'>
                <CardHeader>
                    <CardTitle>{course.name}</CardTitle>
                    <CardDescription>
                        {formatPlural(course.sectionCount, {
                            singular: "section",
                            plural: "sections"
                        })}
                        {" - "}
                        {formatPlural(course.lessonCount, {
                            singular: "lesson",
                            plural: "lessons"
                        })}
                    </CardDescription>
                </CardHeader>
                <CardContent className='line-clamp-3' title={course.description}>
                    {course.description}
                </CardContent>
                <div className='flex-grow' />
                <CardFooter>
                    <Button asChild>
                        <Link href={`/courses/${course.id}`}>
                            View Course
                        </Link>
                    </Button>
                </CardFooter>
                <div className='bg-accent h-2 -mt-2' style={{width: `${course.completedLessonsCount / course.lessonCount * 100}%`}} />
            </Card>
        )
    })
}

export default page