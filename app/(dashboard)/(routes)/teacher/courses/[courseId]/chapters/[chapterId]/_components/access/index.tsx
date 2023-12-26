'use client'

import React from 'react'

interface ChapterActionProps {
     onPublished: boolean
     courseId: string
     chapterId: string
     disabled: boolean
}

export const ChapterAction = async ({ onPublished, courseId, chapterId, disabled }: ChapterActionProps) => {
     return (
          <div>ChapterAction</div>
     )
}

