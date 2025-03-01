"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { sectionSchema } from './validation/section';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import RequiredLabelIcon from './components/RequiredLabelIcon';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useApi } from '@/hooks/useApi';
import { useToast } from '@/hooks/useToast';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Section } from '@/types/section';

const SectionForm = ({section, courseId} : {section?: Section, courseId : string}) => {
  const form = useForm<z.infer<typeof sectionSchema>>({
    resolver: zodResolver(sectionSchema),
    defaultValues:  section ?? {
        name: "",
        status: "public"
    }
  });
  const router = useRouter(); 

    const { alertSuccess, alertError } = useToast();
    const { data, loading, error, request } = useApi("/course-section", section ? "PUT" : "POST");
    
    async function onSubmit(values: z.infer<typeof sectionSchema> & { courseId: string }) {
        request(values, section ? section.id : null).then((response) => {
            alertSuccess(`Section ${section ? "updated" : "created"} successfully`);
            form.reset(values);
        }).catch((error) => {
            console.error(`Error during course ${section ? "updating" : "creation"}:`, error);
            alertError("Something went wrong");
        });
    }

    useEffect(() => {
        if (!loading && error) {
            alertError("Something went wrong");
        }
    }, [loading, error]);
    
  
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit((values) => onSubmit({ ...values, courseId }))} className='flex gap-6 flex-col @container'>
            <div className='grid grid-cols-1 @lg:grid-cols-2 gap-6'>
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
                <FormField control={form.control} name="status" render={({field})=>(
                    <FormItem>
                        <FormLabel>
                            <RequiredLabelIcon />
                            Status
                        </FormLabel>
                        <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem key={"public"} value="public">Public</SelectItem>
                                <SelectItem key={"private"} value="private">Private</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
            )} />
            </div>
            
            <div className='self-end'>
                <Button disabled={form.formState.isSubmitting} type="submit">{section ? "Update" : "Save"}</Button>
            </div>
        </form>
    </Form>
  )
}

export default SectionForm