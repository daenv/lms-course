'use client'

import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { z } from "zod";

interface ImageFormProps {
     initialData: Course;
     courseId: string
}
const formSchema = z.object({
     imgUrl: z.string().min(1, {
          message: "Image URL is required"
     })
})

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {

     const [isEditting, setIsEditing] = useState(false)

     const toggleEdit = () => setIsEditing((current) => !current)
     return (
          <div className="mt-6 border bg-slate-100 rounded-md p-4">
               <div className="font-medium flex items-center justify-between">
                    Course Image
                    <Button onClick={toggleEdit} variant={'ghost'}>
                         {isEditting && (
                              <>Cancel</>
                         )}
                         {!isEditting && !initialData.imageUrl && (
                              <>
                                   <PlusCircle className="w-4 h-4 mr-2" />
                                   Add an image
                              </>
                         )}
                         {!isEditting && initialData.imageUrl && (
                              <>
                                   <Pencil className="w-4 h-4 mr-2" />
                                   Edit image
                              </>
                         )

                         }
                    </Button>
               </div>
               {!isEditting && (
                    !initialData.imageUrl ? (
                         <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                              <ImageIcon className="w-10 h-10 text-slate-500" />
                         </div>
                    ) : (
                         <div className="relative aspect-video mt-2">
                              <Image alt="Upload" fill className="object-cover rounded-md" src={initialData.imageUrl} />
                         </div>
                    )
               )
               }
               {isEditting && (
                    <div>
                         {/* <FileUpload /> */}
                    </div>
               )}

          </div>
     )

}
