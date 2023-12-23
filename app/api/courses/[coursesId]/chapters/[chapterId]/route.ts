import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';
import Mux from '@mux/mux-node';

const { Video } = new Mux(process.env.MUX_TOKEN_ID || '', process.env.MUX_TOKEN_SECRET || '');

export async function DELETE(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
     try {
          const { userId } = auth();
          if (!userId) {
               return new NextResponse('Unauthorized', { status: 401 });
          }

          const ownCourse = await db.course.findUnique({
               where: {
                    id: params.courseId,
                    userId: userId,
               },
          });

          if (!ownCourse) {
               return new NextResponse('Unauthorized', { status: 401 });
          }

          const chapter = await db.chapter.findUnique({
               where: {
                    id: params.chapterId,
               },
          });

          if (!chapter) {
               return new NextResponse('Not Found', { status: 404 });
          }
          if (chapter.videoUrl) {
               const existingMuxData = await db.muxData.findFirst({
                    where: {
                         chapterId: params.chapterId,
                    },
               });

               if (existingMuxData) {
                    await Video.Assets.del(existingMuxData.assetId);
                    await db.muxData.delete({
                         where: {
                              id: existingMuxData.id,
                         },
                    });
               }
          }
          const deletedChapter = await db.chapter.delete({
               where: {
                    id: params.chapterId,
               },
          });

          const pushlishedChaptersInCourse = await db.chapter.findMany({
               where: {
                    courseId: params.courseId,
                    isPublished: true,
               },
          });

          if (!pushlishedChaptersInCourse.length) {
               await db.course.update({
                    where: {
                         id: params.courseId,
                    },
                    data: {
                         isPublished: false,
                    },
               });
          }
          return NextResponse.json(deletedChapter);
     } catch (error) {
          console.log('[Chapters] DELETE', error);
          return new NextResponse('Internal Error', { status: 500 });
     }
}
