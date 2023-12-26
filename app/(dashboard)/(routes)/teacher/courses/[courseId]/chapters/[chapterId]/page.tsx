
import { Banner } from "@/components/banner/banner";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChapterActions } from "./_components/";


const ChapterIdPage = async ({ params }: { params: { courseId: string; chapterId: string } }) => {
    const { userId } = auth()
    if (!userId) {
        return redirect('/')
    }

    const chapter = await db.chapter.findUnique({
        where: {
            id: params.chapterId,
            courseId: params.courseId
        }
    })

    if (!chapter) return redirect('/')

    const requiredFields = [
        chapter.title,
        chapter.description,
        chapter.videoUrl
    ]

    const totalFields = requiredFields.length
    const completedFields = requiredFields.filter(Boolean).length
    const completionText = `(${completedFields}/${totalFields})`

    const isComplete = requiredFields.every(Boolean)

    return (
        <>
            {!chapter.isPublished && (
                <Banner variant={'warning'} label="This chapter is unpublished. It will be not visible in the course" />
            )}

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="w-full">
                        <Link
                            href={`/teacher/courses/${params.courseId}`}
                            className="flex items-center text-sm hover:opacity-75 transition mb-6"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to course setup
                        </Link>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex flex-col gap-x-2">
                                <h1 className="text-2xl font-medium">Chapter Creation</h1>
                                <span className="text-sm text-slate-700"> Complete all fields {completedFields}</span>
                            </div>
                            {/* Chapter Action */}
                            <ChapterActions
                                isPublished={chapter.isPublished}
                                courseId={params.courseId}
                                chapterId={params.chapterId}
                                disabled={!isComplete} />

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default ChapterIdPage
