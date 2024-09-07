import ThemeSwitch from '@/components/theme-switch'
import { Layout } from '@/components/custom/layout'
// import { Search } from '@/components/search'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
// import { tasks } from './data/tasks'
// import { columns } from './components/columns'
import { tasks } from '@/data/admin-tasks'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/custom/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom'

export default function Tasks() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/teacher/add')
  }

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        {/* <Search /> */}
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>
              Teachers
            </h1>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your teachers!
            </p>
          </div>
          <div className='flex items-center space-x-2'>
            <Button onClick={handleClick}>
              <PlusIcon className='mr-2 h-4 w-4' />
              Add Teacher
            </Button>
          </div>
        </div>
        <Separator />
        <div className='-mx-4 mt-3 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={tasks} columns={columns} />
        </div>
      </Layout.Body>
    </Layout>
  )
}
