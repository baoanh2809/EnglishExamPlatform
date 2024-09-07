import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Separator } from '@/components/ui/separator'
import { UserNav } from '@/components/user-nav'
import useFetchData from '@/services/components/getData'
import { IconArrowLeft } from '@tabler/icons-react'
import dayjs from 'dayjs'
// import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// import { apps } from './data'

export default function Apps() {
  const navigate = useNavigate()
  // const [sort, setSort] = useState('ascending')
  // const [appType, setAppType] = useState('all')
  // const [searchTerm, setSearchTerm] = useState('')

  // const filteredApps = apps
  //   .sort((a, b) =>
  //     sort === 'ascending'
  //       ? a.name.localeCompare(b.name)
  //       : b.name.localeCompare(a.name)
  //   )
  //   .filter((app) =>
  //     appType === 'connected'
  //       ? app.connected
  //       : appType === 'notConnected'
  //         ? !app.connected
  //         : true
  //   )
  //   .filter((app) => app.name.toLowerCase().includes(searchTerm.toLowerCase()))
  const { id } = useParams();
  const { data } = useFetchData(`/api/doc/${id}`);
  if (!data) {
    return <p>Loading...</p>
  }
  return (
    <Layout fixed>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <div className='flex w-full items-center justify-between'>
          <Button
            variant='ghost'
            className='relative h-8 w-8 rounded-full'
            onClick={() => navigate(-1)}
          >
            <IconArrowLeft className='absolute' />
          </Button>
          <div className='flex items-center space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>
      </Layout.Header>

      {/* ===== Content ===== */}
      <Layout.Body className='flex flex-col items-center'>
        <Separator className='shadow' />
        <div className='faded-bottom no-scrollbar flex gap-4 overflow-auto pb-16 pt-4'>
          <div className='my-4 items-end justify-between'>
            <div
              className='mt-6 flex flex-col items-center justify-center px-16'
            >
              <p className='text-3xl font-semibold'>{data.title}</p>
              <p className='mt-2 text-sm text-gray-500'>
                {dayjs(data.createdAt).format('DD/MM/YYYY - HH:mm:ss')}
              </p>
              <p className='mt-1 text-sm font-medium text-gray-500'>
                By Peter Pain
              </p>
              <img
                src='https://picsum.photos/200'
                alt=''
                className='mt-3 h-[350px] w-[900px] rounded-2xl'
              />
              <p className='mb-20 mt-8'>{data.content}</p>
            </div>
          </div>
        </div>
      </Layout.Body>
    </Layout>
  )
}
