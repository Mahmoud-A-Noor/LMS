import useUser from '@/hooks/server-hooks/useUser'
import { Course } from '@/types/course'
import { serverApi } from '@/utils/serverApi'
import { notFound } from 'next/navigation'
import React, { ReactNode, Suspense } from 'react'
import CoursePageClient from './_client'

const CoursePageLayout = async ({params, children} : {params: Promise<{courseId: string}>, children: ReactNode}) => {

    const {courseId} = await params
    const {response, error} = await serverApi("/courses", "GET", null, courseId)
    const course: any = response?.data

    if(!course) return notFound()

    return <div className='grid grid-cols-[300px,1fr] gap-8 container'>
        <div className='py-4'>
            <div className='text-lg font-semibold'>
                {course.name}
            </div>
            <Suspense fallback={<CoursePageClient course={mapCourse(course, [])} />}>
                <SuspenseBoundary course={course} />
            </Suspense>
        </div>
        <div className='py-4'>
            {children}
        </div>
    </div>
}

export default CoursePageLayout


async function SuspenseBoundary({course} : {course: Course}){
    const user = await useUser()
    const {response, error} = await serverApi("/user-lesson-complete/user-specific", "GET")
    const completedLessonsIds = response?.data as string[]

    return <CoursePageClient course={mapCourse(course, completedLessonsIds)} />
}


function mapCourse(
    course: Course,
    completedLessonsIds: string[]
){
    return {
        ...course,
        sections: course.sections.map((section)=>{
            return {
                ...section,
                lessons: section.lessons.map((lesson)=>{
                    return {
                        ...lesson,
                        isComplete: completedLessonsIds.includes(lesson.id)
                    }
                })
            }
        })
    }
}