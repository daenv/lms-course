import {Button} from "@/components/ui/button";
import Link from "next/link";

const CoursesPage = () => {
    return (
        <div className={'p6'}>

            <Link href={'/teacher/create'}>
                <Button size={'sm'} variant={'ghost'}>
                    Create course
                </Button>
            </Link>
        </div>
    )
}
export default CoursesPage