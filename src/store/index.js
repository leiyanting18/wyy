import {
  createStore
} from 'vuex'
import {
  getMusicLyric
} from '@/request/playlist.js'

export default createStore({
  state: {
    // 默认播放的歌曲
    playlist: [{
      // 默认播放的歌曲
      al: {
        id: 39355990,
        name: "我们在中场相遇",
        pic: 109951165958895020,
        picUrl: "http://p4.music.126.net/VYZejIv5M-K4RsHKkyXQFQ==/109951165958895028.jpg",
        pic_str: "109951165958895028",
      },
      id: 541687281,
      name: "慢慢喜欢你",
      ar: [{
        name: "莫文蔚"
      }]
    }],
    // 播放歌曲的默认下标
    playIndex: 0,
    // 控制磁盘页的显示
    detailShow: false,
    // 播放或暂停按钮的控制
    isBtnShow: true,
    // 歌曲的当前时间
    currentTime: 0,
    // 歌曲的总时长
    duration: 0,
    // 歌词
    lyrics: {},
    // 控制底部组件的显示
    isfooterMusic: true,
  },
  getters: {},
  mutations: {
    // 控制底部播放音乐组件的显示
    updateIsFooterMusic(state, value) {
      state.isFooterMusic = value
    },
    // 更新歌单列表
    updatePlayList(state, value) {
      state.playlist = value
    },
    // 添加进播放列表
    pushPlaylist(state, value) {
      state.playlist = value
    },
    // 更新播放歌曲的下标，播放和歌单列表对应id的歌曲
    updatePlayListIndex(state, value) {
      state.playIndex = value
    },
    // 点击显示磁盘页
    updateDetailShow(state, value) {
      state.detailShow = value
    },
    // 暂停或播放按钮的控制
    updataIsBtnShow(state, value) {
      state.isBtnShow = value
    },
    // 更新歌曲的当前时间
    updateCurrentTime(state, value) {
      state.currentTime = value
    },
    // 更新歌曲的总时长
    updateDuration(state, value) {
      state.duration = value
    },
    // 更新歌词
    updateLyrics(state, value) {
      state.lyrics = value
    },
    // 更新磁盘页和歌词页的显示
    updateIsLyricShow(state, value) {
      state.isLyricShow = value
    }
  },
  actions: {
    // 获取歌词
    async getLyric(context, value) {
      const res = await getMusicLyric(value)
      // context.commit——触发mutation中的方法
      // context.state——获取state
      // context.getters ——获取getters
      context.commit('updateLyrics', res.data.lrc)
    }
  },
  modules: {}
})