"use client"
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'
import { formatPlural } from '@/utils/formatters/formatPlural'
import { Button } from '../../ui/button'
import Link from 'next/link'
import { Trash2Icon } from 'lucide-react'
import ActionButton from '../../common/ActionButton'
import { useToast } from '@/hooks/useToast'
import { useApi } from '@/hooks/useApi'

const CourseTable = ({courses} : {courses : {
    id: string,
    name: string,
    lessonsCount: number,
    sectionsCount: number,
    studentsCount: number,
}[]}) => {


    const {request, data, loading, error} = useApi("/courses", "DELETE")

    function deleteCourse(courseId: string) {
        const {alertError, alertSuccess} = useToast()
        request(null, courseId)
            .then(response => {
                console.log("delete: ", response)
                if (response.status === 204) {
                    alertSuccess("Course deleted successfully")
                } else {
                    alertError("Unexpected response from server")
                }
            })
            .catch(() => {
                alertError(error || "Something went wrong")
            })
    }

  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>
                    {formatPlural(courses.length, {
                        singular: "course", 
                        plural: "courses"
                    })}
                </TableHead>
                <TableHead> Students </TableHead>
                <TableHead> Actions </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {courses.map((course)=>(
                <TableRow key={course.id}>
                    <TableCell>
                        <div className="flex flex-col gap-1">
                            <div className='font-semibold'>{course.name}</div>
                            <div className='text-muted-foreground'>
                                {formatPlural(course.sectionsCount, {
                                    singular: "section",
                                    plural: "sections"})
                                }
                                ⚪ {" "}
                                {formatPlural(course.lessonsCount, {
                                    singular: "lesson",
                                    plural: "lessons"})
                                }
                            </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        {course.studentsCount}
                    </TableCell>
                    <TableCell>
                        <div className="flex gap-2">
                            <Button asChild>
                                <Link href={`/admin/courses/${course.id}/edit`}>Edit</Link>
                            </Button>
                            <Button onClick={()=>deleteCourse(course.id)}>
                                Delete
                                {/* <Link href={`/admin/courses/${course.id}/edit`}>
                                    Delete
                                    <Trash2Icon />
                                </Link> */}
                            </Button>
                            {/* <ActionButton action={() => }>
                                <Trash2Icon />
                                <span className="sr-only">Delete</span>
                            </ActionButton> */}
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}

export default CourseTable