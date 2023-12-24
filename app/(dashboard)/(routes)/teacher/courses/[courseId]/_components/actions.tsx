'use client'

import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/useConfettiStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ActionsProps {
     disabled: boolean;
     courseId: string;
     isPushlished: boolean;
}

export const Actions = ({ disabled, courseId, isPushlished }: ActionsProps) => {

     const router = useRouter();
     const confetti = useConfettiStore();
     const [isLoading, setIsLoading] = useState(false);

     const onClick = async () => {

     }
     const onDelete = async () => { 

     }

     return (
          <div className="flex items-center gap-x-2">
               <Button variant={'outline'} size={'sm'} onClick={onClick} disabled={disabled || isLoading}>
                    {isPushlished ? 'Unpublish' : 'Publish'}
               </Button>
               
          </div>
     )
}