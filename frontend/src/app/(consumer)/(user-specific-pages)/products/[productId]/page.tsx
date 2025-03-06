import PurchaseButton from '@/components/common/PurchaseButton'
import { sectionSchema } from '@/components/forms/validation/section'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import useUser from '@/hooks/server-hooks/useUser'
import { cn } from '@/lib/utils'
import { Course } from '@/types/course'
import { Section } from '@/types/section'
import { User } from '@/types/user'
import { formatPlural } from '@/utils/formatPlural'
import { formatPrice } from '@/utils/formatPrice'
import { serverApi } from '@/utils/serverApi'
import { VideoIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'

const page = async ({params} : {params: Promise<{productId: string}>}) => {

    const {productId} = await params
    const {response, error} = await serverApi(`/products/${productId}`, "GET")
    const user: User | null = await useUser()

    if(error) {
        console.log(error)
        return <div>Error Loading Products</div>}
  
    const product: any = response?.data
    const coursesCount = product?.courses?.length || 0
    const lessonsCount = product?.courses?.reduce((totalLessons: number, course: Course) => {
        return totalLessons + course.sections.reduce((sectionLessons: number, section: Section) => {
            return sectionLessons + (section?.lessons?.length || 0);
        }, 0);
    }, 0);

  return (
    <div className='container my-6'>
        <div className='flex gap-16 items-center justify-between'>
            <div className='flex gap-6 flex-col items-start'>
                <div className='flex flex-col gap-2'>
                    <div className='text-xl'>
                        {formatPrice(product.priceInDollars)}
                    </div>
                    <h1 className='text-4xl font-semibold'>
                        {product.name}
                    </h1>
                    <div className='text-muted-foreground'>
                        {formatPlural(coursesCount, {
                            singular: "Course",
                            plural: "Courses"
                        })} ○
                        {formatPlural(lessonsCount, {
                            singular: "Lesson",
                            plural: "Lessons"
                        })}
                    </div>
                </div>
                <div className='text-xl '>
                    {product.description}
                </div>
                <Suspense fallback={<SkeletonButton className='h-12 w-36' />}>
                    <PurchaseButton productId={product.id} userId={user?.id ?? ''} />
                </Suspense>
            </div>
            <div className='relative aspect-video max-w-lg flex-grow'>
                <Image src={product.imageUrl} fill alt={product.name} className='object-contain rounded-xl' />
            </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 items-start'>
            {
                product.courses.map((course : any)=>(
                    <Card key={course.id}>
                        <CardHeader>
                            <CardTitle>{course.name}</CardTitle>
                            <CardDescription>
                                {formatPlural(course.sections.length, {
                                    singular: "Section",
                                    plural: "Sections"
                                })} ○
                                {formatPlural(course.sections.reduce((sectionLessons: number, section: Section) => {
                                    return sectionLessons + (section?.lessons?.length || 0);
                                }, 0), {
                                    singular: "Lesson",
                                    plural: "Lessons"
                                })}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="multiple" key={course.id}>
                                {course.sections.map((section: Section)=>(
                                    <AccordionItem key={section.id} value={section.id}>
                                        <AccordionTrigger className='flex gap-2'>
                                            <div className='flex flex-col flex-grow'>
                                                <span className='text-lg'>{section.name}</span>
                                                <span className='text-muted-foreground'>
                                                    {formatPlural(
                                                        section.lessons.length,
                                                        {
                                                            singular: "Lesson",
                                                            plural: "Lessons",
                                                        }
                                                    )}
                                                </span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className='flex flex-col gap-2'>
                                            {section.lessons.map((lesson)=>(
                                                <div key={lesson.id} className='flex items-center gap-2 text-base'>
                                                    <VideoIcon className='size-4' />
                                                    {lesson.status === "preview" ? (
                                                        <Link href={`/courses/${course.id}/lessons/${lesson.id}`}
                                                            className='underline text-blue-400'
                                                        >
                                                            {lesson.name}
                                                        </Link>
                                                    ) : lesson.name}
                                                </div>
                                            ))}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>

                    </Card>
                ))
            }
        </div>
    </div>
  )
}

export default page


function SkeletonButton({className} : {className?: string}){
    return (
        <div className={cn(buttonVariants({
            variant: "secondary",
            className: "pointer-events-none animate-pulse w-24"
        }),
        className)
        }>

        </div>
    )
}

// async function PurchaseButton({productId, userId}: {productId: string, userId: string}){
//     const {response, error} = await serverApi(`/purchases/user-own-product`, "GET", {userId, productId})
//     if(response?.data === true) return <p>You Already Own This Product</p>
//     else return <Button className='text-xl h-auto py-4 px-8 rounded-lg' asChild>
//         <Link href={`/products/${productId}/purchase`} >
//             Get Now
//         </Link>
//     </Button>
// }

