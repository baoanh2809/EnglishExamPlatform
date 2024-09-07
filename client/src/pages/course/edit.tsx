import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Separator } from '@/components/ui/separator'
import { UserNav } from '@/components/user-nav'
import { EditForm } from './components/edit-form'

export default function EditAdminForm() {
  return (
    <>
      <Layout>
        {/* ===== Top Heading ===== */}
        <Layout.Header sticky>
          <div className='ml-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
        </Layout.Header>

        <Layout.Body>
          <div className='mb-2 flex items-center justify-between space-y-2'>
            <div>
              <h1 className='text-3xl font-bold tracking-tight'>
                Update Teacher
              </h1>
              <p className='text-muted-foreground'>
                Update information for Teacher
              </p>
            </div>
          </div>
          <Separator className='my-4' />
          <EditForm />
        </Layout.Body>
      </Layout>
    </>
  )
}
