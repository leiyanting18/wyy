<template>
  <div class="musicDetail">
    <!-- 背景图片 -->
    <img :src="playlist[playIndex].al.picUrl" class="bg"/>

    <!-- 顶部 -->
    <div class="top">
      <div class="topLeft">
        <i class="iconfont" @click="back">&#xe625;</i>
        <div>
          <Vue3Marquee class="marquee">{{ playlist[playIndex].name }}</Vue3Marquee>
          <span v-for="item in playlist[playIndex].ar" :key="item">{{item.name}}</span>
        </div>
      </div>
      <i class="topRight iconfont">&#xe86e;</i>
    </div>

    <!-- 磁盘页 -->
    <div class="main"  v-show="!isLyricShow">
      <img src="@/assets/needle-ab.png" class="needle" :class="{needleActive:!isBtnShow}">
      <img src="@/assets/cd.png" class="cd">
      <img 
        :src="playlist[playIndex].al.picUrl" 
        class="picture" 
        :class="{pictureActive:!isBtnShow,picturePaused:isBtnShow}"
        @click="isLyricShow=true"/>
    </div>

    <!-- 歌词页 -->
    <div class="lyrics"  ref="lyrics" v-show="isLyricShow">
      <p v-for="item in lyric" :key="item" :class="{lyricsActive:currentTime * 1000 >= item.time && currentTime * 1000 < item.pre}">{{item.lrc}}</p>
    </div> 

    <div class="footer">
      <!-- 底部icon图标 -->
      <div class="icon">
        <i class="iconfont">&#xeca1;</i>
        <i class="iconfont">&#xe668;</i>
        <i class="iconfont">&#xe683;</i>
        <i class="iconfont">&#xec3b;</i>
        <i class="iconfont">&#xe603;</i>
      </div>

      <!-- 进度条 -->
      <div class="progress">
        <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
      </div>

      <!-- 切换歌曲 -->
      <div class="change">
        <i class="iconfont">&#xea75;</i>
        <i class="iconfont" @click="goPlay(-1)">&#xe78a;</i>
        <i class="iconfont big" v-if="isBtnShow" @click="play">&#xe624;</i>
        <i class="iconfont big" v-else @click="play">&#xe629;</i>
        <i class="iconfont" @click="goPlay(1)">&#xe7a5;</i>
        <i class="iconfont">&#xeb7c;</i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
name:'musicDetail',
data(){
  return{
    isLyricShow:false,
  }
},
props:['play','addDuration'],
computed:{
  ...mapState(['currentTime','lyrics','duration','playlist','playIndex','isBtnShow']),

  // 歌词的处理
    lyric() {
      let arr
      if (this.lyrics.lyric) {
          arr = this.lyrics.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lrc = item.slice(11, item.length);
          let time =parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time =parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }
          return { min, sec, mill, lrc, time };
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 100000;
          } else {
            item.pre = arr[i + 1].time;
          }
        });
      }
      return arr;
    },
},
methods:{
  // 退出
  back(){
    this.isLyricShow=false
    this.$store.commit('updateDetailShow',false)
  },
  // 切换上一首或下一首
  goPlay(num){
    const index=this.playIndex+num
    if(index<0){
      index=this.playlist.length-1
    }else if(index=this.playlist.length){
      index=0
    }
    this.$store.commit('updatePlayListIndex', index)
  },
},
watch:{
  currentTime(newVal){
    const lyricsActive=document.querySelector('.lyricsActive')
    if(lyricsActive){
      if(lyricsActive.offsetTop>200){
        this.$refs.lyrics.scrollTop=lyricsActive.offsetTop-200
      }
    }
    if(newVal===this.duration){
      if(this.playIndex===this.playlist.length-1){
        this.$store.commit('updatePlayListIndex',0)
        this.play()
      }else{
        this.$store.commit('updatePlayListIndex', this.playIndex+1)
      }
    }
  }
}
}
</script>

<style lang="less" scoped>
.musicDetail{
  width: 100%;
  position: relative;
}
// 虚化背景
.bg{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  filter: blur(30px);
  z-index: -999;
}
// 顶部
.top{
  width: 100%;
  height: 60px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: -60px;
  z-index: 999;
  color: white;
}
.iconfont{
  font-size: 30px;
}
.topLeft{
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;

  div{
    width: 100%;
    margin-left: 15px;
    font-size: 20px;

    .marquee{
      width: 140px;
      margin-left: 0;
    }
    
    span{
      font-size: 14px;
    }
  }
}

// 磁盘页
.main{
  width: 100%;
  height: 400px;
  position: relative;
  margin-top: 60px;
}
.needle{
  width: 130px;
  height: 190px;
  transform: translateX(-50%);
  transform-origin: 0 0;
  position: absolute;
  left: 40%;
  z-index: 1;
  transform: rotate(-20deg);
  transition: all 2s;
}
.needleActive{
  transform: rotate(-1deg);
}
.cd{
  width: 280px;
  height: 280px;
  position: absolute;
  left: 50%;
  top: 107px;
  transform: translateX(-50%);
}
.picture{
  width: 175px;
  height: 175px;
  border-radius: 50%;
  position: absolute;
  top: 160px;
  left: 27%;
  animation: roatePic 10s linear infinite;
}
@keyframes roatePic{
  0%{
    transform: rotateZ(0deg);
  }
  100%{
    transform: rotateZ(360deg);
  }
}
.pictureActive{
  animation-play-state: running;
}
.picturePaused{
  animation-play-state: paused;
}

// 歌词
.lyrics{
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  margin-top: 10px;
  font-size: 18px;
  margin-top: 60px;
  color: white;

  p{
    margin: 10px 0;
  }
}
.lyricsActive{
  font-size: 25px;
  font-weight: bold;

}

// 底部
.footer{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.icon{
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.iconfont{
  font-size: 35px;
  color: white;
}
.progress{
  width: 100%;
}
.range{
  width: 100%;
  height: 1px;
}
.change{
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.big{
  font-size: 55px;
}
</style>