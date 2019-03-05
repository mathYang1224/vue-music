<template>
  <scroll class="suggest"
          :data='result' 
          :pullup='pullup'
          @scrollToEnd='searchMore'
          ref='scroll'
          @beforeScroll='listScroll'
          :beforeScroll='beforeScroll'
  >
    <ul class="suggest-list" ref='suggestList'>
      <li class="suggest-item" v-for='item in result' @click='selectItem(item)'>
        <div class="icon">
          <i :class='getIconClass(item)'></i>
        </div>
        <div class="name">
          <p class="text" v-html='getDisplayName(item)'></p>
        </div>
      </li>
      <loading v-show='hasMore'></loading>
    </ul>
    <div class="no-result-wrapper" v-show='!hasMore && !result.length'>
      <no-result title='抱歉，暂无搜索结果'></no-result>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import {search} from 'api/search'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import Singer from 'common/js/singer'
  import {mapMutations, mapActions} from 'vuex'
  import {playlistMixin} from 'common/js/mixin'
  import NoResult from 'base/no-result/no-result'

  const TYPE_SINGER = 'singer'
  const TYPE_ALBUM = 'album'
  const PERPAGE = 20

  export default {
    mixins: [playlistMixin],
    props: {
      query: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        page: 1,
        result: [],
        pullup: true,
        hasMore: true,
        beforeScroll: true,
        album: []
      }
    },
    methods: {
      refresh() {
        this.$refs.scroll.refresh()
      },
      listScroll() {
        this.$emit('listScroll')
      },
      handlePlayList(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.suggestList.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      selectItem(item) {
        if (item.type === TYPE_SINGER) {
          const singer = new Singer({
            singer_mid: item.singermid,
            singer_name: item.singername
          })
          this.$router.push({
            path: `/s-singer/${singer.singer_mid}`
          })
          this.setSinger(singer)
        } else if (item.type === TYPE_ALBUM) {
          this.$router.push({
            path: `/s-album/${item.albummid}`
          })
          this.setDisc(item)
        } else {
          this.insertSong(item)
        }
        this.$emit('select')
      },
      searchMore() {
        if (!this.hasMore) {
          return
        }
        this.page++
        search(this.query, this.page, this.showSinger, PERPAGE).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this.result.concat(this._genResultMore(res.data))
            this._checkMore(res.data)
          }
        })
      },
      _search() {
        this.hasMore = true
        this.page = 1
        this.$refs.scroll.scrollTo(0, 0) 
        search(this.query, this.page, this.showSinger, PERPAGE).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this._genResult(res.data)
            this._checkMore(res.data)
          }
        })
      },
      _checkMore(data) {
        const song = data.song
        if (!song.list.length || (song.curnum + song.curpage * PERPAGE) > song.totalnum) {
          this.hasMore = false
        }
      },
      _genResult(data) {
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        } else if(data.zhida.albummid) {
          ret.push({...data.zhida, ...{type: TYPE_ALBUM}})
        }
        if (data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list))
        }
        return ret
      },
      _genResultMore(data) {
        let ret = []
        if (data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list))
        }
        return ret
      },
      _normalizeSongs(list) {
        let ret = []
        let musicData = list.data
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      },
      getIconClass(item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else if (item.type === TYPE_ALBUM) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      getDisplayName(item) {
        if (item.type === TYPE_SINGER) {
          return item.singername
        } else if (item.type === TYPE_ALBUM) {
          return `${item.albumname}-${item.singername}`
        } else {
          return `${item.name}-${item.singer}`
        }
      },
      ...mapMutations({
        setSinger: 'SET_SINGER',
        setDisc: 'SET_DISC'
      }),
      ...mapActions([
        'insertSong'
      ])
    },
    watch: {
      query() {
        this._search()
      }
    },
    components: {
      Scroll,
      Loading,
      NoResult
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>