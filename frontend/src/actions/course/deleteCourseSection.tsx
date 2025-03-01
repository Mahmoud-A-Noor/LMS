"use client";

import { useToast } from '@/hooks/useToast';
import {useApi} from '@/hooks/useApi';

export async function deleteCourseSection(formData: FormData) {

    const {alertSuccess, alertError} = useToast()
    const { error, request } = useApi("/course-section", "DELETE");

    const id = formData.get("id") as string;
    const response = await request(null, id)
    if (error) {
        alertError("Course couldn't be deleted")
        return <div>Error loading course Data.</div>
    } else if(response?.status === 200){
        alertSuccess("Course deleted successfully")
        return response.data
    }
    else return null;
}