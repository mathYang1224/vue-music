import axios from 'axios'
import { commonParams } from './config'
import jsonp from 'common/js/jsonp'

export default function getLyric(mid) {
  const url = '/api/lyrid'

  const data = Object.assign({}, commonParams, {
    pcachetime: 1547191469808,
    g_tk: 5381,
    songmid: mid,
    loginUin: 0,
    hostUin: 0,
    inCharset: 'utf8',
    format: 'json',
    platform: 'yqq.json',
    needNewCode: 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取歌曲的vkey
export function getSongVkey(songmid) {
    const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
    const data = Object.assign({}, {
        callback: 'musicJsonCallback',
        loginUin: 3051522991,
        format: 'jsonp',
        platform: 'yqq',
        needNewCode: 0,
        cid: 205361747,
        uin: 3051522991,
        guid: 5931742855,
        songmid: songmid,
        filename: `C400${songmid}.m4a`
    })
 
    return jsonp(url, data)
}