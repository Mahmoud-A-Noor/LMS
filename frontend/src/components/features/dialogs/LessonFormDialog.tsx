"use client"
import React, { ReactNode, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import SectionForm from '../forms/SectionForm'
import {Section} from "../../types/section" 
import { Lesson } from '@/types/lesson'
import LessonForm from '../forms/LessonForm'

const LessonFormDialog = ({sections, defaultSectionId, children, lesson} : {sections: Section[], defaultSectionId?: string, children: ReactNode, lesson?: Lesson }) => {
  
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <>
            {children}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{lesson == null ? "New Lesson" : `Edit ${lesson.name}`}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    <LessonForm sections={sections} onSuccess={()=>setIsOpen(false)} lesson={lesson} defaultSectionId={defaultSectionId}  />
                </div>
            </DialogContent>
        </>
    </Dialog>
  )
}

export default LessonFormDialog