'use client'

import { Chapter } from "@prisma/client"

interface ChapterVideoFormProps {
     initialData: Chapter
     chapterId: string
     courseId: string
}

export const ChapterVideoForm = ({initialData, courseId, chapterId} : ChapterVideoFormProps) => {
     return (
          <div>
               test
          </div >
     )
}