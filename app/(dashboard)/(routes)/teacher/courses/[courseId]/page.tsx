import { Banner } from '@/components/banner/banner'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {

     const { userId } = auth()

     if (!userId) {
          return redirect('/')
     }

     



     return (
          <>
               <Banner label={"This course is unpublished. It will not be visible to the students."} />

               <div className='p-6'>
                    <div className='flex items-center justify-between'>
                         <div className="flex flex-col gap-y-2">
                              <h1 className='text-2xl font-medium'>
                                   Course setup
                              </h1>
                              <span className='text-sm text-slate-700'>
                                   Complete all fields
                              </span>
                         </div>
                    </div>
               </div>

          </>
     )
}

export default CourseIdPage