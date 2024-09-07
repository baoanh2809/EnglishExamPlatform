import ThemeSwitch from '@/components/theme-switch'
import { Layout } from '@/components/custom/layout'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
// import { tasks } from '@/data/admin-tasks'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/custom/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom'
import useFetchData from '@/services/components/getData'
import { IconArrowLeft } from '@tabler/icons-react'

export default function Tasks() {
  const navigate = useNavigate()
  const { data } = useFetchData('/admin/question')
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        <Button
          variant='ghost'
          className='relative h-8 w-8 rounded-full'
          onClick={() => navigate(-1)}
        >
          <IconArrowLeft className='absolute' />
        </Button>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>Questions</h1>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your questions!
            </p>
          </div>
          <div className='flex items-center space-x-2'>
            <Button onClick={() => navigate('/question/add')}>
              <PlusIcon className='mr-2 h-4 w-4' />
              Add Question
            </Button>
          </div>
        </div>
        <Separator />
        <div className='-mx-4 mt-3 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          {data && data.question ? (
            <DataTable data={data.question} columns={columns} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </Layout.Body>
    </Layout>
  )
}
