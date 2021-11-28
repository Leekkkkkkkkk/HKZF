import axios from 'axios'
const request = axios.create({
  baseURL: 'http://liufusong.top:8080',
  timeout: 3000
})
export default request
