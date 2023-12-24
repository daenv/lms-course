'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Course } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

interface DescriptionFormProps {
     initialData: Course
     courseId: string
}
const formSchema = z.object({
     description: z.string().min(1, {
          message: 'Description is required'
     })
})

export const DescriptionForm = ({ initialData, courseId }: DescriptionFormProps) => {
     const [isEditing, setIsEditing] = useState(false)

     const toggleEdit = () => setIsEditing((current) => !current)

     const router = useRouter()

     const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: {
               description: initialData?.description || ""
          }
     })
     

     return ( 
          <div></div>

     )
}