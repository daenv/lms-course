'use client';

import {useAuth, UserButton} from "@clerk/nextjs";
import {usePathname} from "next/navigation";
import {LogOut} from "lucide-react";
import Link from "next/link";

import React from "react";
import { Button } from '@/components/ui/button';

export const NavbarRoutes = () => {
    const {userId} = useAuth();
    const pathname = usePathname();

    const isTeacherPage = pathname?.startsWith('/teacher')
    const isCoursePage = pathname?.includes('/course')
    const isSearchPage = pathname === '/search'
    return (
        <>
            {
                isSearchPage && (
                    <div className={'hidden md:block'}>
                        {/*<Search*/}
                    </div>
                )
            }
            <div className={'flex gap-x-2 ml-auto'}>
                {isTeacherPage || isCoursePage ? (
                    <Link href={'/'}>
                        <Button size={'sm'} variant={'ghost'} >
                            <LogOut className={'h-4 w-4 mr-2'}/>
                            Exit
                        </Button>
                    </Link>
                ) : (
                    <Button size={'sm'} variant={'ghost'}>
                        <Link href={'/teacher/courses'}> Teacher mode</Link>
                    </Button>
                )}
                <UserButton afterSignOutUrl={'/'}/>
            </div>
        </>
    )
}