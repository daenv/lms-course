'use client'

import {Chapter, Course} from "@prisma/client";
import * as z from "zod";
import {useState} from "react";
import {Loader2, PlusCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {ChaptersList} from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/chapter/chapterl-list";
import axios from "axios";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

interface ChapterFormProps {
    initialData: Course & { chapters: Chapter[] }
    courseId: string
}

const formSchema = z.object({
    title: z.string().min(1)
})

export const ChapterForm = ({initialData, courseId}: ChapterFormProps) => {
    const [isCreating, setIsCreating] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const router = useRouter()
    const toggleCreating = () => {
        setIsCreating(current => !current)
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ''
        }
    })
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/chapters`, values)
            toast.success('Chapter created')
            toggleCreating()
            router.refresh()
        } catch {
            toast.error('Something went wrong')
        }
    }
    const onReorder = async (updateData: { id: string; position: number } []) => {
        try {
            setIsUploading(true)
            await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
                list: updateData
            })
            toast.success('Chapters reordered')
            router.refresh()

        } catch {
            toast.error('Something went wrong')
        }
    }
    const isEdit = (id: string) => {
        router.push(`/teacher/course/${courseId}/chapters/${id}`)
    }
    const {isSubmitting, isValid} = form.formState
    return (
        <div className={'relative mt-6 border bg-slate-100 rounded-md p-4'}>
            {isUploading && (
                <div
                    className={'absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center'}>
                    <Loader2 className={'animate-spin h-6 w-6 text-sky-700'}/>
                </div>
            )}
            <div className={'font-medium flex items-center justify-between'}>
                Course chapters
                <Button onClick={toggleCreating} variant={'ghost'}>
                    {isCreating ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <PlusCircle className={'h-4 w-4 mr-2'}/>
                            Add a chapter
                        </>
                    )}
                </Button>
            </div>

            {isCreating && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4 mt-4'}>
                        <FormField name={'title'} control={form.control} render={
                            ({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input disabled={isSubmitting} placeholder={'e.g. Introduction to the course'}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )
                        }/>
                        <Button disabled={!isValid || isSubmitting} type={'submit'}>
                            Create
                        </Button>
                    </form>
                </Form>
            )}
            {!isCreating && (
                <div className={cn('text-sm mt-2',
                    !initialData.chapters.length && 'text-slate-500 italic'
                )}>
                    {!initialData.chapters.length && 'No chapters'}
                    <ChaptersList onEdit={isEdit} onReorder={onReorder} items={initialData.chapters || []}/>
                </div>
            )}


        </div>
    )
}