'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

interface ChapterActionProps {
     onPublished: boolean
     courseId: string
     chapterId: string
     disabled: boolean
}

export const ChapterAction = ({ onPublished, courseId, chapterId, disabled }: ChapterActionProps) => {
     const router = useRouter()
     const [isLoading, setIsLoading] = useState(false)
     const onClick = async () => {
          try {
               setIsLoading(true)
               if (onPublished) {
                    await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`)
                    toast.success('Chapter unpublished')
               } else {
                    await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`)
                    toast.success('Chapter published')
               }
               router.refresh()
          } catch {
               toast.error('Something went wrong')
          } finally {
               setIsLoading(false)
          }
     }
     const onDelete = async () => {
          try {
               setIsLoading(true);
               await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
               toast.success("Chapter deleted");
               router.refresh();
               router.push(`/teacher/courses/${courseId}`);
          } catch {
               toast.error("Something went wrong");
          } finally {
               setIsLoading(false);
          }
     }
     return (
          <div className="flex items-center gap-x-2">
               <Button onClick={onClick} disabled={disabled || isLoading} variant={'outline'} size={'sm'}>
                    {onPublished ? 'UnPublish' : 'Publish'}
               </Button>
               <ConfirmModal onConfirm={onDelete}>
                    <Button size={'sm'} disabled={isLoading}>
                         <Trash className="w-4 h-4" />
                    </Button>
               </ConfirmModal>
          </div>
     )
}

