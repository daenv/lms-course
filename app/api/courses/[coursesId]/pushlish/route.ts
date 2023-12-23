import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { courseId: string } }) {
     try {
          const { userId } = auth();
          if (!userId) {
               return new NextResponse('Unauthorized', { status: 401 });
          }
          const course = await db.course.findUnique({
               where: {
                    id: params.courseId,
                    userId,
               },
               include: {
                    chapters: {
                         include: {
                              muxData: true,
                         },
                    },
               },
          });

          if (!course) {
               return new NextResponse('Course Not Found', { status: 404 });
          }

          const hasPushlishedChapter = course.chapters.some((chapter) => chapter.isPublished);

          if (!course.title || !course.description || !course.imageUrl || !course.categoryId || !hasPushlishedChapter) {
               return new NextResponse('Course is not ready to be published', { status: 401 });
          }

          const pushlishedCourse = await db.course.update({
               where: {
                    id: params.courseId,
                    userId,
               },
               data: {
                    isPublished: true,
               },
          });

          return NextResponse.json(pushlishedCourse);
     } catch (error) {
          console.log('[COURSE_ID_PUSHLISH]', error);
          return new NextResponse('Internal Server Error', { status: 500 });
     }
}
