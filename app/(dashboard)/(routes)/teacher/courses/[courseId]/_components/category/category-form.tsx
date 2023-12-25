'use client'
import * as z from 'zod'
import {Course} from "@prisma/client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Pencil} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Combobox} from "@/components/combobox/combobox";


interface CategoryFormProps {
    initialData: Course;
    courseId: string;
    options: { label: string; value: string; }[];
};

const formSchema = z.object({
    categoryId: z.string().min(1)
})

export const CategoryFrom = ({initialData, courseId, options}: CategoryFormProps) => {
    const [isEditing, setIsEditting] = useState(false)

    const toggleEdit = () => setIsEditting(current => !current)

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: initialData?.categoryId || ''
        }
    })

    const {isSubmitting, isValid} = form.formState
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
    }
     const selectedOption = options.find((option) => option.value === initialData.categoryId)
    return (
        <div className={'mt-6 border bg-slate-100 rounded-md p-4'}>
            <div className={'font-medium flex items-center justify-between'}>
                Course Categories
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2"/>
                            Edit category
                        </>
                    )}
                </Button>
            </div>
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        {/*<Combobox options={...options} {...field} />*/}
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}