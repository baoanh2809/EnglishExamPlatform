import ThemeSwitch from '@/components/theme-switch'
import { Layout } from '@/components/custom/layout'
import { Separator } from '@/components/ui/separator'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/custom/button'
import { CrossCircledIcon, CheckCircledIcon } from '@radix-ui/react-icons'
// import { TopNav } from '@/components/top-nav'
import { DetailsForm } from './components/details-form'
import { useNavigate, useParams } from 'react-router-dom'
import { IconArrowLeft } from '@tabler/icons-react'

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
                Details information of Administrators
              </h1>
              <p className='text-muted-foreground'>Details information</p>
            </div>
            <div className='flex items-center space-x-2'>
              {/* Add event display 1 button */}
              {/* <Button onClick={() => {}}>
                <CrossCircledIcon className='mr-2 h-4 w-4' />
                Deactivate
              </Button>
              <Button onClick={() => {}}>
                <CheckCircledIcon className='mr-2 h-4 w-4' />
                Activate
              </Button> */}
            </div>
          </div>
          <Separator className='my-4' />
          <DetailsForm id={id} />
        </Layout.Body>
      </Layout>
    </>
  )
}

// const topNav = [
//   {
//     title: 'Information',
//     href: '',
//     isActive: true,
//   },
//   {
//     title: 'Statistic',
//     href: 'statistic',
//     isActive: false,
//   },
// ]
