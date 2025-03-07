"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CheckCircle2Icon, VideoIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

const CoursePageClient = ({course} : {course: {
    id: string
    sections: {
        id: string
        name: string
        lessons: {
            id: string
            name: string
            isComplete: boolean
        }[]
    }[]
}}) => {

    const {lessonId} = useParams()
    const defaultValue = typeof lessonId === "string" ? course.sections.find((section)=>section.lessons.find((lesson)=>lesson.id === lessonId)) : course.sections[0]

  return (
    <Accordion type="multiple" defaultValue={defaultValue ? [defaultValue.id] : undefined}>
        {course.sections.map((section)=> (
            <AccordionItem key={section.id} value={section.id}>
                <AccordionTrigger className='text-lg'>{section.name}</AccordionTrigger>
                <AccordionContent className='flex flex-col gap-2'>
                    {section.lessons.map((lesson)=>(
                        <Button key={lesson.id} variant="ghost" className={cn("justify-start", lesson.id === lessonId && "bg-accent/75 text-accent-foreground")} asChild>
                            <Link href={`/courses/${course.id}/lessons/${lesson.id}`}>
                                <VideoIcon />
                                {lesson.name}
                                {lesson.isComplete && <CheckCircle2Icon className='ml-auto' />}
                            </Link>
                        </Button>
                    ))}
                </AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
  )
}

export default CoursePageClient