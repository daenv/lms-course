import {Course} from "@prisma/client";

interface PriceFormProps {
    initialData: Course;
    courseId: string;
}

export const PriceForm = ({initialData, courseId}: PriceFormProps) => {
    return (
        <div>
            price form
        </div>
    )
}