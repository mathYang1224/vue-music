import axios from 'axios'
import { commonParams } from './config'

export default function getSingerDetail(singermid) {
  const url = '/api/getSingerDetail'

  const data = Object.assign({}, commonParams, {
    ct: 24,
    platform: 'yqq.json',
    needNewCode: 0,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    inCharset: 'utf8',
    format: 'json',
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1,
    singermid: singermid
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
