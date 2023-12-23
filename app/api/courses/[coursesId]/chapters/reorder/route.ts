import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { coursesId: string } }) {
     try {
          const { userId } = auth();
          if (!userId) {
               return new NextResponse('Unauthorized', { status: 401 });
          }

          const { list } = await req.json();

          const ownCourse = await db.course.findUnique({
               where: {
                    id: params.coursesId,
                    userId: userId,
               },
          });

          if (!ownCourse) {
               return new NextResponse('Unauthorized', { status: 401 });
          }

          for (let item of list) {
               await db.chapter.update({
                    where: {
                         id: item.id,
                    },
                    data: { position: item.position },
               });
          }
          return new NextResponse('OK', { status: 200 });
     } catch (error) {
          console.log('[CHAPTER_ID_REORDER]', error);
          new NextResponse('Internal Server Error', { status: 500 });
     }
}
