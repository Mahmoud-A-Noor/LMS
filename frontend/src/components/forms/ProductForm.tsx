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
import { productSchema } from './validation/product';
import { Product } from '@/types/product';
import { ProductStatus } from '@/enums/ProductStatus';
import { Course } from '@/types/course';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { MultiSelect } from '../ui/custom/MultiSelect';

const ProductForm = ({product, courses} : {product?: Product & { courseIds: string[] }, courses: Course[]}) => {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues:  product ?? {
        name: "",
        description: "",
        courseIds: [],
        imageUrl: "",
        priceInDollars: 0,
        status: ProductStatus.PRIVATE,
    }
  });

  const router = useRouter(); 

    const { alertSuccess, alertError } = useToast();
    const { data, loading, error, request } = useApi("/products", product ? "PUT" : "POST");
    async function onSubmit(values: z.infer<typeof productSchema>) {
        request(values, product ? product.id : null).then((response)=>{
            alertSuccess(`Course ${product ? "updated" : "created"} successfully`);
            form.reset(values);
            if(!product && response.data && response.data.id) window.location.href = `/admin/products`;
            if(product) window.location.href = `/admin/products`;
        }).catch((error)=>{
            console.error(`Error during course ${product ? "updating" : "creation"}:`, error);
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
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 items-start'>
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
                <FormField control={form.control} name="priceInDollars" render={({field})=>(
                    <FormItem>
                        <FormLabel>
                            <RequiredLabelIcon />
                            Price
                        </FormLabel>
                        <FormControl>
                            <Input type='number' {...field} step={1} min={0} onChange={(e)=>field.onChange(isNaN(e.target.valueAsNumber) ? "" : e.target.valueAsNumber)} />
                        </FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="imageUrl" render={({field})=>(
                    <FormItem>
                        <FormLabel>
                            <RequiredLabelIcon />
                            Image URL
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
                                {Object.values(ProductStatus).map(status => (
                                    <SelectItem key={status} value={status}>{status}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
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
            </div>
            <FormField control={form.control} name="courseIds" render={({field})=>(
                <FormItem>
                    <FormLabel>
                        <RequiredLabelIcon />
                        Included Courses
                    </FormLabel>
                    <FormControl>
                        <MultiSelect selectPlaceholder='Select Courses' searchPlaceholder='Search Courses' options={courses} getLabel={(c) => c.name} getValue={(c) => c.id} selectedValues={field.value} onSelectedValuesChange={field.onChange}  />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <div className='self-end'>
                <Button disabled={form.formState.isSubmitting} type="submit">{product ? "Update" : "Save"}</Button>
            </div>
        </form>
    </Form>
  )
}

export default ProductForm