import { Banner } from '@/components/banner/banner'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import { Actions } from './_components/actions'

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {

     const { userId } = auth()

     if (!userId) {
          return redirect('/')
     }
     const course = await db.course.findUnique({
          where: {
               id: params.courseId,
               userId
          },
          include: {
               chapters: {
                    orderBy: {
                         position: 'asc'
                    }
               },
               attachments: {
                    orderBy: {
                         createdAt: 'desc'
                    }
               }
          }
     })

     const categories = await db.category.findMany({
          orderBy: {
               name: 'asc'
          }
     })

     if (!course) {
          return redirect('/')
     }

     const requiredFields = [
          course.title,
          course.description,
          course.imageUrl,
          course.price,
          course.categoryId,
          course.chapters.some(chapter => chapter.isPublished)
     ]

     const totalFields = requiredFields.length
     const completedFields = requiredFields.filter(Boolean).length

     const completionText = `(${completedFields}/${totalFields}) `

     const isComplete = requiredFields.every(Boolean)





     return (
          <>
               {!course.isPublished && (
                    <Banner label={"This course is unpublished. It will not be visible to the students."} />
               )}

               <div className='p-6'>
                    <div className='flex items-center justify-between'>
                         <div className="flex flex-col gap-y-2">
                              <h1 className='text-2xl font-medium'>
                                   Course setup
                              </h1>
                              <span className='text-sm text-slate-700'>
                                   Complete all fields {completionText}
                              </span>
                         </div>
                         <Actions disabled={!isComplete} courseId={params.courseId} isPushlished={course.isPublished} />
                    </div>
               </div>

          </>
     )
}

export default CourseIdPage