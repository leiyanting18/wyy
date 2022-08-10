<template>
<!-- 底部的播放组件 -->
  <div class="FooterMusic">
    <!-- 左侧 -->
    <!-- 点击跳转到磁盘页面 -->
    <div class="footerLeft" @click="this.$store.commit('updateDetailShow',true)">
      <img :src="playlist[playIndex].al.picUrl"/>
      <div>
        <!-- 歌名 -->
        <p>{{ playlist[playIndex].name }}</p>
        <!-- 歌手 -->
        <span class="singer" v-for="item in playlist[playIndex].ar" :key="item">{{item.name}}</span>
      </div>
    </div>

    <!-- 右边 -->
    <div class="footerRight">
      <i class="iconfont liebiao" @click="play" v-if="isBtnShow">&#xe624;</i>
      <i class="iconfont liebiao" @click="play" v-else>&#xe629;</i>
      <i class="iconfont liebiao">&#xeb7c;</i>
    </div>

    <!-- 音频 -->
    <audio ref="audio" :src="'https://music.163.com/song/media/outer/url?id='+playlist[playIndex].id+'.mp3'"></audio>

    <van-popup
      v-model:show="detailShow"
      position="right"
      :style="{ height: '100%', width: '100%'}"
      class="pop"
    >
    <!-- 弹出层显示的是磁盘页 -->
    <!-- 把footerMusic和musicDetail构成父子关系，为了可以同步控制音频 -->
      <MusicDetail
        :musicList="playlist[playIndex]"
        :play="play"
        :isBtnShow="isBtnShow"
        :addDuration="addDuration" 
      />
    </van-popup>
  </div>
</template>

<script>
import { mapState } from "vuex";
import musicDetail from '@/components/playlist/musicDetail.vue'

export default {
  data(){
    return{
      interval:0,
    }
  },
  computed: {
    ...mapState(["playlist", "playIndex", "isBtnShow","detailShow"]),
  },
  // 当组件第一次被成功的渲染到页面上之后调用
  mounted(){
    this.$store.dispatch("getLyric", this.playlist[this.playIndex].id);
    // 更新歌曲当前播放的时间
    this.updateTime()
  },
  // 数据源改变，组件被重新渲染完毕
  updated() {
    this.$store.dispatch("getLyric", this.playlist[this.playIndex].id);
    // 获取歌曲的时长
    this.$store.commit('updateDuration',this.$refs.audio.duration)
  },
  methods: {
    // 播放或暂停歌曲
    play() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.$store.commit('updataIsBtnShow',false)
        // 更新歌曲的播放时间
        this.updateTime()
      } else {
        this.$refs.audio.pause();
        this.$store.commit('updataIsBtnShow',true)
        // 清除定时器
        clearInterval(this.interval)
      }
    },
    // 更新歌曲的播放时间
    updateTime(){
      this.interval= setInterval(()=>{
        this.$store.commit('updateCurrentTime',this.$refs.audio.currentTime)
      },1000)
    },
    // 歌曲的时长
    addDuration(){
      this.$store.commit('updateDuration',this.$refs.audio.duration)
    },
  },
  watch: {
    // 歌曲下标
    playIndex() {
      // 如果下标发生了改变，就自动播放音乐
      this.$refs.audio.autoplay = true;
      // 如果下标没有变化，歌曲是暂停状态
      if (this.$refs.audio.paused) {
        // 改变图标，显示播放按钮
        this.$store.commit('updataIsBtnShow',false)
      }
    },
    // 播放的歌曲
    playlist() {
      if (this.isBtnShow) {
        this.$refs.audio.autoplay = true;
        this.$store.commit('updataIsBtnShow',false)
      }
    },
  },
  components: {
    musicDetail,
  },
};
</script>
<style lang="less" scoped>
.FooterMusic {
  width: 100%;
  height: 1.6rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  }

  .footerLeft{
    height: 100%;
    display: flex;
    align-items: center;
    font-size: .4rem;

    img{
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      margin-right: .2rem;
    }
    .singer{
      font-size: .28rem;
      margin-right: .2rem;
    }
  }
  .footerRight {
    width: 110px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .iconfont {
      font-size: 35px;
      padding-left: 10px;
    }
  }
</style>