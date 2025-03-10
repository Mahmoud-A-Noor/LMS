import YouTubeVideoPlayer from '@/components/features/YouTubeVideoPlayer'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/ui/PageHeader'
import useUser from '@/hooks/server-hooks/useUser'
import { Course } from '@/types/course'
import { Lesson } from '@/types/lesson'
import { serverApi } from '@/utils/serverApi'
import { CheckSquare2Icon, LockIcon, XSquareIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import { YouTubePlayer } from 'react-youtube'

const page = async ({ params }: { params: Promise<{ courseId: string, lessonId: string }> }) => {
  const { courseId, lessonId } = await params
  const lesson = await serverApi("/lessons", "GET", null, lessonId) as unknown as Course

  if (lesson === null) return notFound()

  return (
    <Suspense fallback={null}>
      <SuspenseBoundary lesson={lesson as unknown as Lesson} courseId={courseId} />
    </Suspense>
  )
}

export default page

async function SuspenseBoundary({ lesson, courseId }: { lesson: Lesson, courseId: string }) {

  const user = await useUser()
  const isLessonCompleteResponse = await serverApi("/lessons/is-lesson-complete", "POST", { lessonId: lesson.id, userId: user?.id })
  const isLessonComplete = isLessonCompleteResponse.response?.data
  
  const doesUserHaveAccessResponse = await serverApi("/user-course-accesses/have-access", "POST", { courseId, userId: user?.id })
  const doesUserHaveAccess = doesUserHaveAccessResponse.response?.data as boolean

  const canViewResponse = await serverApi("/lessons/can-view-lesson", "POST", { lessonId: lesson.id, userId: user?.id })
  const canView = canViewResponse.response?.data

  const prevLessonResponse = await serverApi(`/lessons/${lesson.id}/previous`, "GET")
  const prevLesson = prevLessonResponse.response?.data as {id: string}

  const nextLessonResponse = await serverApi(`/lessons/${lesson.id}/previous`, "GET")
  const nextLesson = nextLessonResponse.response?.data as {id: string}

  return (
    <div className='my-4 flex flex-col gap-4'>
      <div className='aspect-video'>
        {canView ? (
          <YouTubeVideoPlayer 
            videoId={lesson.youtubeVideoId} 
            onFinishedVideo={!isLessonComplete ? () => updateLessonCompleteStatus({lessonId: lesson.id, userId: user?.id ?? ''}) : undefined} 
          />
        ) : (
        <div className='flex items-center justify-center bg-primary text-primary-foreground h-full w-full'>
          <LockIcon className='size-16' />
        </div>
        )}
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex justify-between items-start gap-4'>
          <h1 className='text-2xl font-semibold'>{lesson.name}</h1>
          <div className='flex gap-2 justify-end'>
            <Button variant="outline" disabled={!!prevLesson} asChild>
              <Link href={`/courses/${courseId}/lessons/${prevLesson.id}`}>
                Previous
              </Link>
            </Button>
            {doesUserHaveAccess &&
              (
              <Button variant="outline" onClick={()=>updateLessonCompleteStatus({lessonId: lesson.id, userId: user?.id ?? ''})}>
                <div className='flex gap-2 items-center'>
                  {isLessonComplete ? (
                    <>
                      <CheckSquare2Icon /> Mark Incomplete
                    </>
                  ) : (
                    <>
                      <XSquareIcon /> Mark Complete
                    </>
                  )}
                </div>
              </Button>
              )
            }
            <Button variant="outline" disabled={!!nextLesson} asChild>
              <Link href={`/courses/${courseId}/lessons/${nextLesson.id}`}>
                Next
              </Link>
            </Button>
        </div>
      </div>
      {
        canView ? (
          lesson.description && <p>{lesson.description}</p>
        ) : (
          <p>This lesson is locked, Please purchase the course to view it.</p>
        )
      }
      </div>
    </div>
  )
}


async function updateLessonCompleteStatus({lessonId, userId} : {lessonId: string, userId: string}) {
  "use server"
  await serverApi("/user-lesson-complete/complete-lesson", "POST", {
    userId,
    lessonId
  }, null)
}