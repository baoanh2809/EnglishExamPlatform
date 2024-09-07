import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useNavigate } from 'react-router-dom'
import { UserNav } from '@/components/user-nav'
import { IconArrowLeft } from '@tabler/icons-react'
import SearchInput from '@/components/ui/search-input'
import Conversations from '@/components/ui/conversations'
import MessageContainer from '@/components/ui/messageContainer'

export default function UiChat() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate()

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
            <Avatar className='h-8 w-8'>
              <AvatarImage src='/avatars/01.png' alt='@shadcn' />
              <AvatarFallback>
                <IconArrowLeft />
              </AvatarFallback>
            </Avatar>
          </Button>
          <div className='flex items-center space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>
      </Layout.Header>
      {/* ===== Content ===== */}
      <Layout.Body className='grid grid-cols-6 flex-col gap-4'>
        <div className='divider col-start-1 block px-3'>
          <SearchInput />
          <Conversations />
        </div>
        <div className='col-start-2 col-end-7'>
          <MessageContainer />
        </div>
      </Layout.Body>
    </Layout>
  )
}
