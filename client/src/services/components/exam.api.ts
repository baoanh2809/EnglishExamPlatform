// import { Product, ProductList, ProductListConfig } from "src/types/product.type"
import http from "./http"
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
const URL = '/api/exam'
const examsApi = {
    getExams(params: ExamListConfig) {
        return http.get(URL, { params })
    }
}

export default examsApi