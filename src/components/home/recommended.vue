<template>
  <div class="recommended-container">
    <!-- 轮播图 -->
    <div class="swiper">
      <van-swipe :autoplay="3000" lazy-render :loop="true" indicator-color="red">
        <van-swipe-item v-for="item in state.images" :key="item">
          <img :src="item.pic" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- icon图标 -->
    <div class="icon">
      <i class="iconfont">&#xe6bf;</i>
      <i class="iconfont">&#xe63b;</i>
      <i class="iconfont">&#xe660;</i>
      <i class="iconfont">&#xe600;</i>
    </div>

    <!-- 发现好歌单 -->
    <div class="playlist">
      <div class="playlist-title">
        <span class="title">发现好歌单</span>
        <span class="more">查看更多</span>
      </div>
      <van-swipe :loop="false" :width="130" :show-indicators="false">
        <van-swipe-item v-for="item in state.recommendPlaylist" :key="item"> 
          <router-link :to="{path:'/playlist',query:{id:item.id}}">
            <img :src="item.picUrl" >
            <i class="iconfont playCount">&#xe624;&nbsp;{{changeCount(item.playCount)}}</i>
            <span>{{item.name}}</span>
          </router-link>
        </van-swipe-item>
     </van-swipe>
    </div>

    <!-- 排行榜 -->
    <div class="rank">
      <div class="rank-title">排行榜</div>
      <div class="rankList">
        <div class="rankList-item" v-for="item in state.rankList.slice(0,10)" :key="item"> 
          <img :src="item.coverImgUrl" class="cover">
          <div class="rankList-right">
            <span class="description">{{item.description}}</span>
            <span>{{item.updateFrequency}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getSwiper,getRecommendPlaylist,getRank} from '@/request/home.js'
import { onMounted,reactive } from '@vue/runtime-core';

export default {
  name:'recommended',
  setup() {
    const state =reactive({
      images:[],
      recommendPlaylist:[],
      rankList:[],
    });
    onMounted(async ()=>{
      // 获取轮播图数据
      const res1=await getSwiper()
      if(res1.status!==200){
        console.log('获取轮播图数据失败')
      }
      state.images=res1.data.banners
      // 获取推荐歌单数据
      const res2=await getRecommendPlaylist()
      if(res2.status!==200){
        console.log('获取推荐歌单失败')
      }
      state.recommendPlaylist=res2.data.result
      // 获取排行榜数据
      const res3=await getRank()
      if(res3.status!==200){
        console.log('获取排行榜数据失败')
      }
      state.rankList=res3.data.list
    });
    // 对播放量单位的处理
    function changeCount(num){
      if(num>=100000000){
        return (num/100000000).toFixed(1)+'亿'
      }else if(num>=10000){
        return (num/10000).toFixed(1)+'万'
      }
    }
    // 记得导出changeCount
    return { state,changeCount };
  },

}
</script>

<style lang="less" scoped>
.recommended-container{
  width: 100%;
  margin-top: 60px;
}

// 轮播图
.swiper{
  width: 100%;
  height: 3.4rem;

  .van-swipe{
    width: 100%;
    height: 3.4rem;
    

    .van-swipe-item{
      width: 100%;
      height: 3.4rem;
      padding: 0 .2rem;

      img{
        width: 100%;
        height: 3.4rem;
        border-radius: .2rem;
      }
    }

}
}

// icon图标
.icon{
  width: 100%;
  height: 1.4rem;
  display: flex;
  justify-content:space-around;
  align-items: center;
  margin: .2rem 0;
  
  .iconfont{
    font-size: 1rem;
  }
}
// 发现好歌单
.playlist{
  width: 100%;
  padding: .2rem;


  .playlist-title{
    width: 100%;
    height: .6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title{
      font-weight: bold;
      font-size: .4rem;
    }

    .more{
      border: 1px solid gray;
      padding: 0 .1rem;
      border-radius: .3rem;
    }
  }

  .van-swipe{
    width: 100%;
    height: 4rem;

    .van-swipe-item{
      width: 2.6rem;
      border-radius: .3rem;
      margin: .1rem ;
      position: relative;

      img{
        width: 2.6rem;
        height: 2.6rem;
        border-radius: .3rem;
      }
      .playCount{
        width: 1.7rem;
        height: .5rem;
        position: absolute;
        top: .1rem;
        right: .06rem;
        border-radius: .5rem;
        background-color: gray;
        color: white;
        line-height: .5rem;
        font-weight: 100;
      }
    }
  }
}

// 排行榜
.rank{
  width: 100%;
  margin-top: .2rem;
  padding: 0 .2rem;
  margin-bottom: 85px;
}
.rank-title{
  font-size: .4rem;
  font-weight: bold;
}
.rankList{
  width: 100%;
  margin-top: .2rem;
}
.rankList-item{
  width: 100%;
  height: 2rem;
  margin-bottom: .2rem;
  display: flex;

  .cover{
    width: 2rem;
    height: 2rem;
    border-radius: .4rem;
  }

  .rankList-right{
    display: flex;
    flex-direction: column;
    padding-left: .2rem;
    padding-top: .2rem;

    .description{
      display: inline-block;
      width: 100%;
      height: 70%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      padding-bottom: .2rem;
    }
  }
}
</style>