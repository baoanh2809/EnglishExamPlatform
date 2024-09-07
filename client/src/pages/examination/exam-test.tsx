import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { UserNav } from '@/components/user-nav'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useNavigate, useParams } from 'react-router-dom'
import ThemeSwitch from '@/components/theme-switch'
import useFetchData from '@/services/components/getData'
import ConfirmSubmit from './components/confirm-submit'
import QuestionCard from './components/question-card'
import { useEffect, useState } from 'react'
import { formatTime } from '@/lib/utils'

export default function Apps() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data } = useFetchData(`/api/exam/${id}`)

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questionData, setQuestionData] = useState({})

  // console.log(questionData)
  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0))
  }

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, data?.questions?.length - 1)
    )
  }

  const [timeLeft, setTimeLeft] = useState<number>(data.duration * 60 || 0)

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

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
      <Layout.Body className='flex flex-col items-center'>
        <div className='mb-2'>
          <h1 className='text-3xl font-bold tracking-tight'>
            {data.title || 'Examination name'}
          </h1>
        </div>
        <Separator className='shadow' />
        <div className='faded-bottom no-scrollbar flex w-full gap-4 overflow-auto pb-16 pt-4'>
          <div className='w-[70%] space-y-2'>
            <Card className=''>
              <div className='flex w-full items-center justify-between px-5 py-2'>
                <Button
                  variant='outline'
                  className='relative h-8 w-8'
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  <IconArrowLeft className='z-1 absolute' />
                </Button>
                <div className='text-lg font-semibold'>
                  Question {currentQuestionIndex + 1}
                </div>
                <Button
                  variant='outline'
                  className='relative h-8 w-8'
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === data.questions?.length - 1}
                >
                  <IconArrowRight className='z-1 absolute' />
                </Button>
              </div>
              {Array.isArray(data.questions) && (
                <QuestionCard question={data.questions[currentQuestionIndex]} setQuestionData={setQuestionData} />
              )}
            </Card>
          </div>{' '}
          <div className='w-[30%] space-y-2'>
            <Card className=''>
              <div className='rounded-lg p-4 hover:shadow-md'>
                <h2 className='mb-1 font-semibold'>Time</h2>
                <p className='text-3xl font-bold'>
                  {formatTime(timeLeft) || '00 : 60 : 00'}
                </p>
              </div>
            </Card>
            <Card className=''>
              <div className='grid gap-2 rounded-lg p-4 hover:shadow-md md:grid-cols-6 lg:grid-cols-10'>
                {Array.isArray(data.questions) &&
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  data.questions?.map(( question: any, index: any) => (
                    <Button
                      key={`btn-question-${index}`}
                      variant='outline'
                      size='sm'
                      className={
                        currentQuestionIndex === index ? 'bg-accent' : ''
                      }
                      onClick={() => setCurrentQuestionIndex(index)}
                    >
                      {index + 1}
                    </Button>
                  ))}
              </div>
            </Card>
            <ConfirmSubmit data={questionData} />
          </div>
        </div>
      </Layout.Body>
    </Layout>
  )
}
