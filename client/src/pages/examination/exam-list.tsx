import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { UserNav } from '@/components/user-nav'
import { IconArrowLeft } from '@tabler/icons-react'
import { useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import useQueryConfig from '@/hook/useQueryConfig'
import { sortBy, examcontants as exam, examLevels } from '@/constants/exams'
import { omit } from 'lodash'
import classNames from 'classnames'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import examsApi from '@/services/components/exam.api'

type ExamListConfig = {
  page?: number | string
  limit?: number | string
  sort_by?: 'createdAt' | 'doTest' | 'view'
  title?: string
  level?: string
  examcontants?: 'asc' | 'desc'
  user_tests_min?: string
  user_tests_max?: string
  test_rate?: string
  user_views_min?: string
  user_views_max?: string
}

export default function Apps() {
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()
  console.log('QueryConfig',queryConfig)
  const { sort_by = sortBy.createdAt, examcontants } = queryConfig

  // const { data } = useFetchData('/api/exam')
  // const data = useFetchData('/api/exam')
  const { data: examsList } = useQuery({
    queryKey: ['exams', queryConfig],
    queryFn: () => {
      return examsApi.getExams(queryConfig as ExamListConfig)
    },
    placeholderData: keepPreviousData,
    staleTime: 3 * 60 * 1000,
  })

  console.log(examsList)

  const data = examsList?.data
  const isActiveSortBy = (
    value: Exclude<ExamListConfig['sort_by'], undefined>
  ) => sort_by === value

  const handleSort = (value: Exclude<ExamListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: '/examination',
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: value,
          },
          ['examcontants']
        )
      ).toString(),
    })
  }

  const handleRateExam = (
    value: Exclude<ExamListConfig['examcontants'], undefined>
  ) => {
    navigate({
      pathname: '/examination',
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.rate_avg,
        examscontants: value,
      }).toString(),
    })
  }
  const handleTypeExam = (
    value: Exclude<ExamListConfig['level'], undefined>
  ) => {
    navigate({
      pathname: '/examination',
      search: createSearchParams({
        ...queryConfig,
        type: value,
      }).toString(),
    })
  }

  // const [sort, setSort] = useState('ascending')
  // const [appType, setAppType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  // const { exams } = useFetchData('');

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

  console.log(searchTerm)
  // console.log(data)
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
          <h1 className='text-2xl font-bold tracking-tight'>Examinations</h1>
          <p className='text-muted-foreground'>
            Here&apos;s a list of your Examinations!
          </p>
        </div>
        <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
          <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
            <Input
              placeholder='Filter exams...'
              className='h-9 w-40 lg:w-[250px]'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className='flex flex-wrap items-center gap-2'>
            <span>Sort by</span>
            <button
              className={classNames(
                'hover:bg-orange-80 h-8 bg-orange-500 px-4 text-center text-sm capitalize',
                {
                  'bg-orange-80 text-white hover:bg-orange-500': isActiveSortBy(
                    sortBy.user_views
                  ),
                  'bg-white text-black hover:bg-slate-100': !isActiveSortBy(
                    sortBy.user_views
                  ),
                }
              )}
              onClick={() => handleSort(sortBy.user_views)}
            >
              Popular
            </button>
            <button
              className={classNames(
                'hover:bg-orange-80 h-8 bg-orange-500 px-4 text-center text-sm capitalize',
                {
                  'bg-orange-80 text-white hover:bg-orange-500': isActiveSortBy(
                    sortBy.createdAt
                  ),
                  'bg-white text-black hover:bg-slate-100': !isActiveSortBy(
                    sortBy.createdAt
                  ),
                }
              )}
              onClick={() => handleSort(sortBy.createdAt)}
            >
              Latest
            </button>
            <button
              className={classNames(
                'hover:bg-orange-80 h-8 bg-orange-500 px-4 text-center text-sm capitalize',
                {
                  'bg-orange-80 text-white hover:bg-orange-500': isActiveSortBy(
                    sortBy.user_tests
                  ),
                  'bg-white text-black hover:bg-slate-100': !isActiveSortBy(
                    sortBy.user_tests
                  ),
                }
              )}
              onClick={() => handleSort(sortBy.user_tests)}
            >
              Do the most
            </button>
            <select
              className={classNames('capitaliz h-8 px-4 text-center text-sm', {
                'bg-orange-500 hover:bg-orange-500': isActiveSortBy(
                  sortBy.rate_avg
                ),
                'hover:bg-slate-100': !isActiveSortBy(sortBy.rate_avg),
              })}
              value={examcontants || ''}
              onChange={(e) =>
                handleRateExam(
                  e.target.value as Exclude<
                    ExamListConfig['examcontants'],
                    undefined
                  >
                )
              }
            >
              <option value='' disabled className='bg-white text-black'>
                Rate
              </option>
              <option value={exam.asc} className='bg-white text-black'>
                Rate: Low to High
              </option>
              <option value={exam.desc} className='bg-white text-black'>
                Rate: High to Low
              </option>
            </select>
            <select
              className={classNames('capitaliz h-8 px-4 text-center text-sm', {
                'bg-orange-500 hover:bg-orange-500': isActiveSortBy(
                  sortBy.type
                ),
                'hover:bg-slate-100': !isActiveSortBy(sortBy.type),
              })}
              value={examcontants || ''}
              onChange={(e) =>
                handleTypeExam(
                  e.target.value as Exclude<
                    ExamListConfig['examcontants'],
                    undefined
                  >
                )
              }
            >
              <option value='' disabled className='bg-white text-black'>
                Type
              </option>
              <option
                value={examLevels.secondarySchool}
                className='bg-white text-black'
              >
                SecondarySchool
              </option>
              <option
                value={examLevels.highSchool}
                className='bg-white text-black'
              >
                HighSchool
              </option>
              <option value={examLevels.ielts} className='bg-white text-black'>
                IELTS
              </option>
            </select>
          </div>
        </div>
        <Separator className='shadow' />
        <ul className='faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-4'>
          {Array.isArray(data) ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data.map((exam: any, index: any) => (
              <Card className='' key={`exam-${index}`}>
                <div className='rounded-lg p-4 hover:shadow-md'>
                  <h2 className='mb-1 font-semibold'>{exam.title}</h2>
                  <Separator className='my-2' />
                  <div className='space-y-1 text-sm text-gray-500'>
                    <p>Types: 1 correct answer</p>
                    <p>Time: {exam.duration || 0} minutes</p>
                    <p>Total Marks: 100</p>
                    <p>
                      Descriptions: Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Optio, corporis dolore? Nobis, aliquam
                      explicabo necessitatibus ullam tenetur, architecto autem
                      magnam molestiae.
                    </p>
                  </div>
                  <Separator className='my-2' />
                  <div className='mt-4 flex items-center justify-between'>
                    <Button
                      size='sm'
                      className='w-full'
                      onClick={() => navigate(`/examination/test/${exam._id}`)}
                    >
                      Join
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </ul>
      </Layout.Body>
    </Layout>
  )
}
