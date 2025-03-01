import { deleteCourseSection } from '@/actions/course/deleteCourseSection';
import DeleteButton from '@/components/features/DeleteButton';
import LessonFormDialog from '@/components/features/LessonFormDialog';
import SectionFormDialog from '@/components/features/SectionFormDialog';
import SortableLessonList from '@/components/features/SortableList/SortableLessonList';
import SortableSectionList from '@/components/features/SortableList/SortableSectionList';
import CourseForm from '@/components/forms/CourseForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import PageHeader from '@/components/ui/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApi } from '@/hooks/useApi';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';
import { Course } from '@/types/course';
import { Section } from '@/types/section';
import { serverApi } from '@/utils/serverApi';
import { EyeClosedIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import React from 'react'

const page = async ({params} : {params: Promise<{courseId :string}>}) =>{
    const {courseId} = await params;
    const course = await getCourse(courseId)

  return (
    <div className='container my-6'>
<PageHeader title={(course as { name: string }).name} />
        {course && <Tabs defaultValue='lessons'>
            <TabsList>
                <TabsTrigger value='lessons'>Lessons</TabsTrigger>
                <TabsTrigger value='details'>Details</TabsTrigger> 
            </TabsList>
            <TabsContent value='lessons'>
                <Card>
                    <CardHeader className='flex items-center flex-row justify-between'>
                        <CardTitle>Sections</CardTitle>
                        <SectionFormDialog courseId={course.id}>
                            <DialogTrigger asChild>
                                <Button variant="outline">
                                    <PlusIcon /> New Section
                                </Button>
                            </DialogTrigger>
                        </SectionFormDialog>
                    </CardHeader>
                    <CardContent>
                        <SortableSectionList courseId={course.id} sections={course.sections} />
                    </CardContent>
                </Card>
                <hr className='my-4' />
                {course.sections.map(section => (
                    <Card>
                        <CardHeader className='flex items-center flex-row justify-between'>
                            <CardTitle className={cn("flex items-center gap-2", section.status === "private" && "text-muted-foreground")}>
                                {section.status === "private" && <EyeClosedIcon />}
                                {section.name}
                            </CardTitle>
                            <LessonFormDialog defaultSectionId={section.id} sections={course.sections}>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        <PlusIcon /> New Lesson
                                    </Button>
                                </DialogTrigger>
                            </LessonFormDialog>
                        </CardHeader>
                        <CardContent>
                            <SortableLessonList lessons={section.lessons} sections={course.sections} />
                        </CardContent>
                    </Card>
                ))}
            </TabsContent>
            <TabsContent value='details'>
                <Card>
                    <CardHeader>
                        <CourseForm course={course} />
                    </CardHeader>
                </Card>
            </TabsContent>
        </Tabs>}
    </div>
  )
}

export default page


async function getCourse(courseId: string): Promise<Course | null> {
    const { response, error } = await serverApi("/courses", "GET", null, courseId);
    if (error) return null;
    else if (response?.status === 200 && response.data) return response.data as Course;
    else return null;
}

// async function deleteCourseSection(courseSectionId: string) {
//     const { response, error } = await serverApi("/course-section", "DELETE", null, courseSectionId);
//     if (error) return <div>Error loading course Data.</div>;
//     else if(response?.status === 200) return response.data;
//     else return null
// }