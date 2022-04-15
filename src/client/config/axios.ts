import axios from 'axios'
import { path } from './basePath'

const instance = axios.create({
    baseURL: path,
})

export default instance