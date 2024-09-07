// errorHandler.ts
import { message } from 'antd'

const handleApiError = (error: any) => {
  const { response } = error
  if (error.code === 'ECONNABORTED') {
    message.error('Please check your network connection again!')
  } else if (response && response.data && response.data.error) {
    const { code } = response.data
    switch (code) {
      case 'EMAIL_ALREADY_EXISTS':
        message.error('Email already exists!')
        break
      case 'INVALID_PASSWORD':
        message.error('Invalid Password!')
        break
      default:
        message.error('Please try again!')
        break
    }
  } else {
    message.error('An unknown error occurred.')
  }
  return Promise.reject(error)
}

export default handleApiError
