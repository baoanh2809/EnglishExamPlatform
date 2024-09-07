import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Separator } from '@/components/ui/separator'
import { UserNav } from '@/components/user-nav'
import { IconArrowLeft } from '@tabler/icons-react'
import { useNavigate, useParams } from 'react-router-dom'
import { DetailsForm } from './components/details-form'

export default function DetailUserForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <>
      <Layout>
        {/* ===== Top Heading ===== */}
        <Layout.Header sticky>
          <Button variant='ghost' className='relative h-8 w-8 rounded-full' onClick={() => navigate(-1)}>
            <IconArrowLeft className='absolute' />
          </Button>
          {/* <TopNav links={topNav} /> */}
          <div className='ml-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
        </Layout.Header>

        <Layout.Body>
          <div className='mb-2 flex items-center justify-between space-y-2'>
            <div>
              <h1 className='text-3xl font-bold tracking-tight'>
                Details information of Exam
              </h1>
              <p className='text-muted-foreground'>Details information</p>
            </div>
            <div className='flex items-center space-x-2'>
            </div>
          </div>
          <Separator className='my-4' />
          <DetailsForm id={id} />
        </Layout.Body>
      </Layout>
    </>
  )
}
