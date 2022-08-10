import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import login from '../components/home/login.vue'
import myUser from '../views/myUser.vue'
import playlist from '../views/Playlist.vue'
import search from '../components/home/Search.vue'
import musicDetail from '@/components/playlist/musicDetail.vue'
import store from '@/store'

const routes = [{
  path: '/',
  name: 'home',
  component: Home,
}, {
  path: '/playlist',
  component: playlist
}, {
  path: '/search',
  component: search
}, {
  path: '/login',
  component: login
}, {
  path: '/myUser',
  component: myUser
}, {
  path: '/musicDetail',
  component: musicDetail,
}]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 控制底部组件的显示
router.beforeEach((to, from) => {
  if (to.path === '/musicDetail') {
    store.state.isfooterMusic = false
  } else {
    store.state.isfooterMusic = true
  }
})
export default router