import axios from 'axios'
import { commonParams } from './config'

export function getRank() {
  const url = '/api/getRank'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    platform: 'h5',
    needNewCode: 1,
    g_tk: 5381,
    inCharset: 'utf8',
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getRankSongs(id) {
  const url = '/api/getRankSongs'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    platform: 'h5',
    needNewCode: 1,
    g_tk: 5381,
    inCharset: 'utf8',
    format: 'json',
    tpl: 3,
    page: 'detail',
    type: 'top',
    topid: id
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}