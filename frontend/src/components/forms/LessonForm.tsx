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
import { Lesson } from '@/types/lesson';
import { lessonSchema } from './validation/lesson';
import { LessonStatus } from '@/enums/LessonEnum';
import YouTubeVideoPlayer from '../features/YouTubeVideoPlayer';

const LessonForm = ({sections, defaultSectionId, onSuccess, lesson} : {sections: Section[], defaultSectionId?: string, onSuccess?: ()=>void, lesson?: Lesson}) => {
  const form = useForm<z.infer<typeof lessonSchema>>({
    resolver: zodResolver(lessonSchema),
    defaultValues:  {
        name: lesson?.name ?? "",
        status: lesson?.status ?? "public",
        youtubeVideoId: lesson?.youtubeVideoId ?? "",
        description: lesson?.description ?? "",
        sectionId: lesson?.sectionId ?? defaultSectionId ?? sections[0]?.id ?? ""
    }
  });

    const { alertSuccess, alertError } = useToast();
    const { data, loading, error, request } = useApi("/lessons", lesson ? "PUT" : "POST");
    
    async function onSubmit(values: z.infer<typeof lessonSchema>) {
        request(values, lesson ? lesson.id : null).then((response) => {
            alertSuccess(`Lesson ${lesson ? "updated" : "created"} successfully`);
            form.reset(values);
        }).catch((error) => {
            console.error(`Error during course ${lesson ? "updating" : "creation"}:`, error);
            alertError("Something went wrong");
        });
    }

    useEffect(() => {
        if (!loading && error) {
            alertError("Something went wrong");
        }
        if (!loading && data) {
            if(onSuccess) onSuccess()
            alertSuccess("Lesson Added successfully");
        }
    }, [loading, error, data]);
    
  const videoId = form.watch("youtubeVideoId")
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit((values) => onSubmit({ ...values }))} className='flex gap-6 flex-col @container'>
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
                <FormField control={form.control} name="youtubeVideoId" render={({field})=>(
                    <FormItem>
                        <FormLabel>
                            <RequiredLabelIcon />
                            Youtube Video Id
                        </FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="sectionId" render={({field})=>(
                    <FormItem>
                        <FormLabel>
                            <RequiredLabelIcon />
                            Section
                        </FormLabel>
                        <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {sections.map(section => (
                                    <SelectItem key={section.id} value={section.id}>{section.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                 )} />
                <FormField control={form.control} name="description" render={({field})=>(
                    <FormItem>
                        <FormLabel>
                            Description
                        </FormLabel>
                        <FormControl>
                            <Textarea className="min-h-20 resize-none" {...field} value={field.value ?? ""} />
                        </FormControl>
                        <FormMessage />
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
                                {Object.values(LessonStatus).map(status => (
                                    <SelectItem key={status} value={status}>{status}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            
            <div className='self-end'>
                <Button disabled={form.formState.isSubmitting} type="submit">{lesson ? "Update" : "Save"}</Button>
            </div>
            {videoId && <div className='aspect-video'>
                    <YouTubeVideoPlayer videoId={videoId} />
                </div>}
        </form>
    </Form>
  )
}

export default LessonForm