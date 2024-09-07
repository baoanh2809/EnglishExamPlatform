import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignIn from './pages/auth/sign-in'
import AppShell from './components/app-shell'
import ProtectedRoute from './components/protected-route'
import Dashboard from './pages/dashboard'
import User from './pages/user'
import AddUser from './pages/user/add'
import EditUser from './pages/user/edit'
import DetailUser from './pages/user/detail'
import Exam from './pages/exam'
import EditExam from './pages/exam/edit'
import DetailExam from './pages/exam/detail'
import Question from './pages/question'
import AddQuestion from './pages/question/add'
import EditQuestion from './pages/question/edit'
import DetailQuestion from './pages/question/detail'
import Document from './pages/document'
import AddDocument from './pages/document/add'
import EditDocument from './pages/document/edit'
import DetailDocument from './pages/document/detail'

import ComingSoon from '../src/components/coming-soon'
import Docs from '../src/pages/docs/document'
import DocsDetail from '../src/pages/docs/document-detail'
import Examination from '../src/pages/examination/exam-test'
import ExamList from '../src/pages/examination/exam-list'
import UiChat from '../src/pages/chat/ui-chat'


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<SignIn />} />
        <Route path='/' element={<AppShell />}>
          <Route
            path='dashboard'
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route path='user' element={<ProtectedRoute element={<User />} />} />
          <Route
            path='user/add'
            element={<ProtectedRoute element={<AddUser />} />}
          />
          <Route
            path='user/edit/:id'
            element={<ProtectedRoute element={<EditUser />} />}
          />
          <Route
            path='user/detail/:id'
            element={<ProtectedRoute element={<DetailUser />} />}
          />
          <Route path='exam' element={<ProtectedRoute element={<Exam />} />} />
          <Route
            path='exam/edit/:id'
            element={<ProtectedRoute element={<EditExam />} />}
          />
          <Route
            path='exam/detail/:id'
            element={<ProtectedRoute element={<DetailExam />} />}
          />
          <Route
            path='question'
            element={<ProtectedRoute element={<Question />} />}
          />
          <Route
            path='question/add'
            element={<ProtectedRoute element={<AddQuestion />} />}
          />
          <Route
            path='question/edit/:id'
            element={<ProtectedRoute element={<EditQuestion />} />}
          />
          <Route
            path='question/detail/:id'
            element={<ProtectedRoute element={<DetailQuestion />} />}
          />
          <Route
            path='document'
            element={<Document />}
            // element={<ProtectedRoute element={<Document />} />}
          />
          <Route
            path='document/add'
            element={<ProtectedRoute element={<AddDocument />} />}
          />
          <Route
            path='document/edit/:id'
            element={<ProtectedRoute element={<EditDocument />} />}
          />
          <Route
            path='document/detail/:id'
            element={<ProtectedRoute element={<DetailDocument />} />}
          />
          <Route path='course' element={<ComingSoon />} />
          <Route
            path='coming-soon'
            element={<ProtectedRoute element={<ComingSoon />} />}
          />
          <Route path='chatbox' element={<UiChat />} />
          <Route path='exam' element={<ExamList />} />
          <Route path='docs' element={<Docs />} />
          <Route path='docs/detail/:id' element={<DocsDetail />} />
          <Route path='examination' element={<ExamList />} />
          <Route path='examination/test/:id' element={<Examination />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRouter
