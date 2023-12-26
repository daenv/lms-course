'use client';
import {BarChart, Compass, Layout, List} from "lucide-react"
import {SidebarItem} from "./sidebar-item";
import {usePathname} from "next/navigation";

const guestRoutes = [
    {
        icon: Layout,
        label: 'Dashboard',
        path: '/'
    },
    {
        icon: Compass,
        label: 'Browse',
        path: '/search'
    },
]
const teacherRoutes = [
    {
        icon: List,
        label: 'Courses',
        path: '/teacher/courses'
    },
    {
        icon: BarChart,
        label: 'Analytics',
        path: '/teacher/analytics'
    }
]
const SidebarRoutes = () => {
    const pathname = usePathname()
    const isTeacherPage = pathname?.includes('/teacher')

    const routes = isTeacherPage ? teacherRoutes : guestRoutes
    return (
        <div className='flex flex-col w-full'>
            {routes.map((route, index) => (
                <SidebarItem
                    key={index}
                    icon={route.icon}
                    label={route.label}
                    href={route.path}
                />
            ))}
        </div>
    )
}
export default SidebarRoutes