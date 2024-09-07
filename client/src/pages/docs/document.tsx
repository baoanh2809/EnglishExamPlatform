import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { UserNav } from '@/components/user-nav'
import useFetchData from '@/services/components/getData'
import {
  IconAdjustmentsHorizontal,
  IconArrowLeft,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from '@tabler/icons-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { apps } from './data'

export default function Apps() {
  const navigate = useNavigate()
  const [sort, setSort] = useState('ascending')
  const [appType, setAppType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

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
  const { data } = useFetchData('/api/doc')
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
      <Layout.Body className='flex flex-col'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Documents</h1>
          <p className='text-muted-foreground'>
            Here&apos;s a list of your Documents!
          </p>
        </div>
        <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
          <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
            <Input
              placeholder='Filter apps...'
              className='h-9 w-40 lg:w-[250px]'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className='w-16'>
              <SelectValue>
                <IconAdjustmentsHorizontal size={18} />
              </SelectValue>
            </SelectTrigger>
            <SelectContent align='end'>
              <SelectItem value='ascending'>
                <div className='flex items-center gap-4'>
                  <IconSortAscendingLetters size={16} />
                  <span>Ascending</span>
                </div>
              </SelectItem>
              <SelectItem value='descending'>
                <div className='flex items-center gap-4'>
                  <IconSortDescendingLetters size={16} />
                  <span>Descending</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator className='shadow' />
        <ul className='faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-4'>
          {Array.isArray(data) && data.map((doc: any) => (
            <Card key={doc._id} className=''>
            <div className='rounded-lg p-4 hover:shadow-md'>
              <img
                src={doc.imageUrl || 'https://picsum.photos/200'}
                alt={doc.title}
                className='h-[200px] w-full px-0'
              />
              <div className='mt-4'>
                <h2 className='mb-1 font-semibold'>{doc.title}</h2>
                <p className='line-clamp-2 text-gray-500'>{doc.description}</p>
              </div>
              <div className='mt-4 flex items-center justify-between'>
                <Button
                  size='sm'
                  className='w-full'
                  onClick={() => navigate(`/docs/detail/${doc._id}`)}
                >
                  Detail
                </Button>
              </div>
            </div>
          </Card>
          ))}
        </ul>
      </Layout.Body>
    </Layout>
  )
}
