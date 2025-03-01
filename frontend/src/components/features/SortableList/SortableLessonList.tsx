"use client"
import { Section } from '@/types/section'
import React from 'react'
import { SortableItem, SortableList } from './SortableList'
import SectionFormDialog from '../SectionFormDialog'
import { DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import DeleteButton from '../DeleteButton'
import { EyeClosedIcon, VideoIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useApi } from '@/hooks/useApi'
import { Lesson } from '@/types/lesson'
import LessonFormDialog from '../LessonFormDialog'
import { deleteLesson } from '@/actions/lesson/deleteLesson'

const SortableLessonList = ({sections, lessons} : {sections: Section[], lessons: Lesson[] })=>{
  
  const { data, loading, error, request } = useApi("/lessons/order", "PUT");
  async function updateSectionLessonOrder(newOrder: string[]): Promise<{ error: boolean; message: string; }> {
    return request({newOrder}, null)
      .then(response => {
        console.log(response)
        if (response?.status === 200) {
          return { error: false, message: "Course order updated successfully" };
        }
        throw new Error("Unexpected response status");
      })
      .catch(() => {
        return { error: true, message: "Course order couldn't be updated" };
      });
  }

  return (
    <SortableList items={lessons} onOrderChange={updateSectionLessonOrder}>
        {items => items.map((lesson)=>(
            <SortableItem key={lesson.id} id={lesson.id} className='flex items-center gap-1'>
              <div className={cn("contents", lesson.status === "private" && "text-muted-foreground")}>
                  {lesson.status === "private" && (
                      <EyeClosedIcon className='size-4' />
                  )}
                  {lesson.status === "preview" && (
                      <VideoIcon className='size-4' />
                  )}
                  {lesson.name}
              </div>
              <LessonFormDialog lesson={lesson} sections={sections} >
                  <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className='ml-auto'>
                          Edit
                      </Button>
                  </DialogTrigger> 
              </LessonFormDialog>
              <DeleteButton action={deleteLesson} data={lesson.id}  />
            </SortableItem>
        ))}
    </SortableList>
  )
}

export default SortableLessonList