<template>
  <transition name='slide'>
      <music-list :rank='rank' :title='title' :bgImage='bgImage' :songs='songs'></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getRankSongs} from 'api/rank'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  
  export default {
    data() {
      return {
        songs: [],
        rank: true
      }
    },
    computed: {
      title() {
        return this.rankDetail.topTitle
      },
      bgImage() {
        if (this.songs.length) {
          return this.songs[0].image
        }
        return this.rankDetail.picUrl
      },
      ...mapGetters([
        'rankDetail'
      ])
    },
    created() {
      this._getRankSongs()
    },
    methods: {
      _getRankSongs() {
        if (!this.rankDetail.id) {
          this.$router.push('/rank')
          return
        }
        getRankSongs(this.rankDetail.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.songlist)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          let data = musicData.data
          if (data.songid && data.albumid) {
            ret.push(createSong(data))
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
  .slide-enter-active,.slide-leave-active
    transition:all 0.3s
  .slide-enter,.slide-leave-to
    transform: translate3d(100%,0,0)
</style>