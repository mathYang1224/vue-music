<template>
  <transition name='slide'>
      <music-list :title='title' :bgImage='bgImage' :songs='songs'></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import getSingerDetail from 'api/singerDetail'
  import { ERR_OK } from 'api/config'
  import {createSong} from 'common/js/song'
  import MusicList from 'components/music-list/music-list'
  import {getSongVkey} from 'api/song.js'

  export default {
    computed: {
        ...mapGetters([
            'singer'
        ]),
        title() {
            return this.singer.singer_name
        },
        bgImage() {
            if (!this.singer.singer_mid) return ''
            return `https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.singer.singer_mid}.jpg?max_age=2592000`
        }
    },
    data() {
        return {
            songs: []
        }
    },
    created() {
        this._getSingerDetail()
    },
    methods: {
        _getSingerDetail() {
            if (!this.singer.singer_mid){
                this.$router.push('/singer')
                return
            }
            getSingerDetail(this.singer.singer_mid).then((res) => {
                if (res.code === ERR_OK) {
                  this.songs = this._normalizeSongs(res.data.list)
                }
            })
        },
        _normalizeSongs(list) {
            let ret =[]
            list.forEach((item) => {
                let {musicData} = item
                /* getSongVkey(musicData.songmid).then((res) => {
                  const vkey = res.data.items[0].vkey;
                  if (musicData.songid && musicData.albummid) {
                    ret.push(createSong(musicData, vkey))
                  }
                }) */
                if (musicData.songid && musicData.albumid) {
                    ret.push(createSong(musicData))
                }
            })
            return ret
        }
    },
    components: {
        MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .slide-enter-active,.slide-leave-active
    transition:all 0.3s
  .slide-enter,.slide-leave-to
    transform: translate3d(100%,0,0)
</style>