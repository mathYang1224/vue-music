<template>
  <transition name='slide'>
      <music-list :title='title' :bgImage='bgImage' :songs='songs'></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import getAlbum from 'api/album'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  
  export default {
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {
        return this.disc.albumname
      },
      bgImage() {
        return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.disc.albummid}.jpg?max_age=2592000`
      },
      ...mapGetters([
        'disc'
      ])
    },
    components: {
      MusicList
    },
    created() {
      this._getAlbum()
    },
    methods: {
      _getAlbum() {
        if (!this.disc.albummid) {
          this.$router.push('/')
        }
        getAlbum(this.disc.albummid).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active,.slide-leave-active
    transition:all 0.3s
  .slide-enter,.slide-leave-to
    transform: translate3d(100%,0,0)
</style>