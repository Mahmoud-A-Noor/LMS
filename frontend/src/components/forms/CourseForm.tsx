"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { courseSchema } from './validation/course';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import RequiredLabelIcon from './components/RequiredLabelIcon';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useApi } from '@/hooks/useApi';
import { useToast } from '@/hooks/useToast';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

const CourseForm = ({course} : {course?: {id: string, name: string, description: string}}) => {
  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues:  course ?? {
        name: "",
        description: ""
    }
  });
  const router = useRouter(); 

    const { alertSuccess, alertError } = useToast();
    const { data, loading, error, request } = useApi("/courses", course ? "PUT" : "POST");
    async function onSubmit(values: z.infer<typeof courseSchema>) {
        request(values, course ? course.id : null).then((response)=>{
            alertSuccess(`Course ${course ? "updated" : "created"} successfully`);
            form.reset(values);
            if(!course && response.data && response.data.id) router.push(`/admin/courses/${response.data.id}/edit`);
            if(course) router.refresh()
        }).catch((error)=>{
            console.error(`Error during course ${course ? "updating" : "creation"}:`, error);
            alertError("Something went wrong");
        })
    }

    useEffect(() => {
        if (!loading && error) {
            alertError("Something went wrong");
        }
    }, [loading, error]);
    
  
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-6 flex-col'>
            <FormField control={form.control} name="name" render={({field})=>(
                <FormItem>
                    <FormLabel>
                        <RequiredLabelIcon />
                        Name
                    </FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                </FormItem>
            )} />
            <FormField control={form.control} name="description" render={({field})=>(
                <FormItem>
                    <FormLabel>
                        <RequiredLabelIcon />
                        Description
                    </FormLabel>
                    <FormControl>
                        <Textarea className="min-h-20 resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <div className='self-end'>
                <Button disabled={form.formState.isSubmitting} type="submit">{course ? "Update" : "Save"}</Button>
            </div>
        </form>
    </Form>
  )
}

export default CourseForm