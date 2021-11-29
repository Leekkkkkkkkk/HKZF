import axios from 'axios'
import { getStorage } from '@/utils/storage.js'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://liufusong.top:8080',
  timeout: 4000
})

request.interceptors.request.use((config) => {
  if (getStorage('hkzf-user')) {
    config.headers.Authorization = store.state.user.token
  }
  return config
})
request.interceptors.response.use((res) => {
  return res.data.body
})
export default request
