import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Separator } from '@/components/ui/separator'
import { UserNav } from '@/components/user-nav'
import { TeacherForm } from './components/add-form'

export default function AddTeacherForm() {
  return (
    <>
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
                Add Teacher
              </h1>
              <p className='text-muted-foreground'>Add a new Teacher</p>
            </div>
          </div>
          <Separator className='my-4' />
          <TeacherForm />
        </Layout.Body>
      </Layout>
    </>
  )
}
