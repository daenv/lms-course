"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChapterDescriptionFromProps {
     initialData: Chapter
     courseId: string
     chapterId: string
}
const formSchema = z.object({
     description: z.string().min(1)
})

export const ChapterDescriptionForm = ({ initialData, courseId, chapterId }: ChapterDescriptionFromProps) => {
     const [isEditing, setIsEditing] = useState(false)
     const toggleEdit = () => setIsEditing((current) => !current)
     const router = useRouter()
     const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: {
               description: initialData.description || ""
          }
     })

     const { isSubmitting, isValid } = form.formState
     const onSubmit = () =>{}
     return (
          <div className="mt-6 border bg-slate-100 rounded-md p-4">
               <div className='font-medium flex items-center justify-between'>
                    Chapter description
                    <Button onClick={toggleEdit} variant='ghost'>
                         {isEditing ? (
                              <> Cancel</>
                         ) : (
                              <>
                                   <Pencil className='h-4 w-4 mr-2' />
                                   Edit description
                              </>
                         )}
                    </Button>
               </div>

               {!isEditing && (
                    <div className={cn(
                         'text-sm mt-2',
                         !initialData.description && 'text-slate-500 italic'
                    )}>
                         {!initialData.description && 'No description '}
                         {initialData.description &&(
                              // <Preview value={initialData.description}/>
                              <div>
                                   init
                              </div>
                         ) }
                    </div>
               )

               }
          </div>

     )
}