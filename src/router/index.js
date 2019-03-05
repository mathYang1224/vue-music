import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Recommend = ((resolve) => {
  import('components/recommend/recommend').then((recommend) => {
    resolve(recommend)
  })
})

const Singer = ((resolve) => {
  import('components/singer/singer').then((singer) => {
    resolve(singer)
  })
})

const Rank = ((resolve) => {
  import('components/rank/rank').then((rank) => {
    resolve(rank)
  })
})

const Search = ((resolve) => {
  import('components/search/search').then((search) => {
    resolve(search)
  })
})

const SingerDetail = ((resolve) => {
  import('components/singerDetail/singerDetail').then((singerDetail) => {
    resolve(singerDetail)
  })
})

const Disc = ((resolve) => {
  import('components/disc/disc').then((disc) => {
    resolve(disc)
  })
})

const RankDetail = ((resolve) => {
  import('components/rankDetail/rank-detail').then((module) => {
    resolve(module)
  })
})

const Album = ((resolve) => {
  import('components/album/album').then((album) => {
    resolve(album)
  })
})

const User = ((resolve) => {
  import('components/user-center/user-center').then((module) => {
    resolve(module)
  })
})

export default new Router({
  routes: [
    {
      path: '/',
      component: Recommend,
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: RankDetail
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: '/s-singer/:id',
          component: SingerDetail
        },
        {
          path: '/s-album/:id',
          component: Album
        }
      ]
    },
    {
      path: '/user',
      component: User
    }
  ]
})
