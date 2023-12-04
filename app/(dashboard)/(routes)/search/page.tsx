import React from "react";
import {auth} from "@clerk/nextjs";
import {redirect} from "@clerk/backend";

interface SearchPageProps {
    searchParams: {
        title: string,
        categoryId: string,
    }
}

const SearchPage: React.FC<SearchPageProps> = async ({searchParams}) => {
    const {userId} = auth();
    if (!userId) {
        // return redirect("/");
    }

    return (
        <>
            <div className='px-6 pt-6 md:hidden md:mb-0 block'>
                {/*<SearchInput />*/}
                This is search page
            </div>
            <div className='p-6 space-y-4'>
                {/*<Categories/>*/}
                {/*<CoursesList />*/}
            </div>
        </>
    )
}
export default SearchPage