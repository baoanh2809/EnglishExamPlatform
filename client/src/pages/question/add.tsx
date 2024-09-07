import ThemeSwitch from '@/components/theme-switch'
import { Layout } from '@/components/custom/layout'
import { Separator } from '@/components/ui/separator'
import { UserNav } from '@/components/user-nav'
import { AddQuestionForm } from './components/add-form'
import { Button } from '@/components/custom/button'
import { IconArrowLeft } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

export default function AddTeacherForm() {
  const navigate = useNavigate();
  return (
    <>
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
              <h1 className='text-3xl font-bold tracking-tight'>Add Question</h1>
              <p className='text-muted-foreground'>Add new Questions</p>
            </div>
          </div>
          <Separator className='my-4' />
          <AddQuestionForm />
        </Layout.Body>
      </Layout>
    </>
  )
}
