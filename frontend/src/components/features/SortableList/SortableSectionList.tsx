"use client"
import { Section } from '@/types/section'
import React from 'react'
import { SortableItem, SortableList } from './SortableList'
import SectionFormDialog from '../SectionFormDialog'
import { DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import DeleteButton from '../DeleteButton'
import { deleteCourseSection } from '@/actions/course/deleteCourseSection'
import { EyeClosedIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useApi } from '@/hooks/useApi'

const SortableSectionList = ({courseId, sections} : {courseId: string, sections: Section[] })=>{
  
  const { data, loading, error, request } = useApi("/course-section/order", "PUT");

  async function updateCourseSectionOrder(newOrder: string[]): Promise<{ error: boolean; message: string; }> {
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
    <SortableList items={sections} onOrderChange={updateCourseSectionOrder}>
        {items => items.map((section)=>(
            <SortableItem key={section.id} id={section.id} className='flex items-center gap-1'>
              <div className={cn("contents", section.status === "private" && "text-muted-foreground")}>
                  {section.status === "private" && (
                      <EyeClosedIcon className='size-4' />
                  )}
                  {section.name}
              </div>
              <SectionFormDialog courseId={courseId} section={section}>
                  <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className='ml-auto'>
                          Edit
                      </Button>
                  </DialogTrigger> 
              </SectionFormDialog>
              <DeleteButton action={deleteCourseSection} data={section.id}  />
            </SortableItem>
        ))}
    </SortableList>
  )
}

export default SortableSectionList