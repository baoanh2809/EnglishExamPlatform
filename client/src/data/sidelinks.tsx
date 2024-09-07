import {
  IconEdit,
  IconLayoutDashboard,
  IconListDetails,
  IconMessageQuestion,
  IconReportSearch,
  IconRocket,
  IconUsers
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
  role: 'Admin' | 'Teacher' | 'Student';
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/dashboard',
    icon: <IconLayoutDashboard size={18} />,
    role:  'Admin'
  },
  {
    title: 'User Management',
    label: '',
    href: '/user',
    icon: <IconUsers size={18} />,
    role: 'Admin'
  },
  {
    title: 'Exam Management',
    label: '',
    href: '/exam',
    icon: <IconEdit size={18} />,
    role: 'Admin'
  },
  {
    title: 'Question Management',
    label: '',
    href: '/question',
    icon: <IconMessageQuestion size={18} />,
    role: 'Admin'
  },
  {
    title: 'Document Management',
    label: '',
    href: '/document',
    icon: <IconReportSearch size={18} />,
    role: 'Admin'
  },
  {
    title: 'Examination',
    label: '',
    href: '/examination',
    icon: <IconEdit size={18} />,
    role: 'Student'
  },
  {
    title: 'Document',
    label: '',
    href: '/docs',
    icon: <IconReportSearch size={18} />,
    role: 'Student'
  },
  // {
  //   title: 'Requests',
  //   label: '10',
  //   href: '/requests',
  //   icon: <IconRouteAltLeft size={18} />,
  //   sub: [
  //     {
  //       title: 'Trucks',
  //       label: '9',
  //       href: '/trucks',
  //       icon: <IconTruck size={18} />,
  //     },
  //     {
  //       title: 'Cargos',
  //       label: '',
  //       href: '/cargos',
  //       icon: <IconBoxSeam size={18} />,
  //     },
  //   ],
  // },
]
