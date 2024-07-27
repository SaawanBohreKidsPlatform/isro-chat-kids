import axios from 'axios'
import { toast } from 'sonner'
import { DEFAULT_ERROR_MESSAGE } from './constants'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 4000 * 1000,
})

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const e: any = error?.response?.data
    switch (error?.response?.status) {
      case 400:
      case 422:
      case 500:
      case 503:
      case 504:
        toast.error(e.detail ?? DEFAULT_ERROR_MESSAGE)
        break
      case 404:
        toast.error('Requested details could not be found')
        break
      default:
        toast.error(DEFAULT_ERROR_MESSAGE)
        break
    }
    return Promise.reject(error.response)
  }
)

export default instance
