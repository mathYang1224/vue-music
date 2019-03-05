import axios from 'axios'
import { commonParams } from './config'

export default function getAlbum(albummid) {
  const url = '/api/getAlbum'

  const data = Object.assign({}, commonParams, {
    albummid: albummid,
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
