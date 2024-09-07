import ComingSoon from '@/components/coming-soon'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { TopNav } from '@/components/top-nav'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserNav } from '@/components/user-nav'
import useFetchData from '@/services/components/getData'
import {
  IconEdit,
  IconMessageQuestion,
  IconReportSearch,
  IconUsers
} from '@tabler/icons-react'

export default function Dashboard() {
  const { data: user } = useFetchData('/api/admin/user')
  const { data: exam } = useFetchData('/api/admin/exam')
  const { data: question } = useFetchData('/api/admin/question')
  const { data: document } = useFetchData('/api/admin/document')

  const userCount = user?.user?.length || 0;
  const examCount = exam?.exam?.length || 0;
  const questionCount = question?.question?.length || 0;
  const documentCount = document?.document?.length || 0;
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
          <div className='flex items-center space-x-2'>
            {/* <Button>Download</Button> */}
          </div>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='analytics'>Analytics</TabsTrigger>
              <TabsTrigger value='reports'>Reports</TabsTrigger>
              <TabsTrigger value='notifications'>Notifications</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total Users
                  </CardTitle>
                  <IconUsers />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+ {userCount}</div>
                  {/* <p className='text-xs text-muted-foreground'>
                    +20.1% from last month
                  </p> */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total Examinations
                  </CardTitle>
                  <IconEdit />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+ {examCount}</div>
                  {/* <p className='text-xs text-muted-foreground'>
                    +180.1% from last month
                  </p> */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total Questions
                  </CardTitle>
                  <IconMessageQuestion />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+ {questionCount}</div>
                  {/* <p className='text-xs text-muted-foreground'>
                    +19% from last month
                  </p> */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total Documents
                  </CardTitle>
                  <IconReportSearch />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+ {documentCount}</div>
                  {/* <p className='text-xs text-muted-foreground'>
                    +201 since last hour
                  </p> */}
                </CardContent>
              </Card>
            </div>
            {/* <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <Overview />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div> */}
          </TabsContent>
          <TabsContent value='analytics' className='space-y-4'>
            <ComingSoon />
          </TabsContent>
          <TabsContent value='reports' className='space-y-4'>
            <ComingSoon />
          </TabsContent>
          <TabsContent value='notifications' className='space-y-4'>
            <ComingSoon />
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
  },
  {
    title: 'User',
    href: '/user',
    isActive: false,
  },
  {
    title: 'Exam',
    href: '/exam',
    isActive: false,
  },
  {
    title: 'Question',
    href: '/question',
    isActive: false,
  },
  {
    title: 'Document',
    href: '/document',
    isActive: false,
  },
]
