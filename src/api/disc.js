import axios from 'axios'
import { commonParams } from './config'

export default function getDisc(disstid) {
  const url = '/api/getDisc'

  const data = Object.assign({}, commonParams, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid: disstid,
    platform: 'yqq.json',
    needNewCode: 0,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    inCharset: 'utf8',
    format: 'json',
    order: 'listen'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
