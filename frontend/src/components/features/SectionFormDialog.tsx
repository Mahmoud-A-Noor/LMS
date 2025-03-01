import React, { ReactNode } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import SectionForm from '../forms/SectionForm'
import {Section} from "../../types/section" 

const SectionFormDialog = ({courseId, section, children} : {courseId: string, section?: Section, children: ReactNode }) => {
    console.log(courseId)
  return (
    <Dialog>
        <>
            {children}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{section == null ? "New Section" : `Edit ${section.name}`}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    <SectionForm section={section} courseId={courseId}  />
                </div>
            </DialogContent>
        </>
    </Dialog>
  )
}

export default SectionFormDialog