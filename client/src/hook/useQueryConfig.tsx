import { isUndefined, omitBy } from 'lodash'
import useQueryParams from './useQueryParams'

type ExamListConfig = {
  page?: number | string
  limit?: number | string
  sort_by?: string
  title?: string
  level?: string
  examcontants?: string
  user_tests_min?: string
  user_tests_max?: string
  test_rate?: string
  user_views_min?: string
  user_views_max?: string
}

export type QueryConfig = {
  [key in keyof ExamListConfig]: string
}

export default function useQueryConfig() {
  const queryParams = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
        page: queryParams.page,
        limit: queryParams.limit,
        sort_by: queryParams.sort_by,
        title: queryParams.title,
        examcontants: queryParams.examcontants,
        level: queryParams.level,
        type: queryParams.type,
        user_tests_min: queryParams.user_tests_min,
        user_tests_max: queryParams.user_tests_max,
        test_rate: queryParams.test_rate,
        user_views_min: queryParams.user_views_min,
        user_views_max: queryParams.user_views_max,
    },
    isUndefined
  )
  return queryConfig
}
