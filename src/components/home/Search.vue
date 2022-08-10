<template>
<!-- 搜索页面 -->
  <div class="search-container">
    <!-- 顶部搜索框 -->
    <div class="search">
      <i class="iconfont" @click="this.$router.go(-1)">&#xe625;</i>
      <input type="text" placeholder="陈奕迅" v-model.trim="searchKey" @keydown.enter="search">
      <button @click="search">搜索</button>
    </div>

    <!-- 搜索历史 -->
    <div class="searchHistory">
      <div class="history-top">
        <span>历史</span>
        <i class="iconfont" @click="deleteHistory">&#xe8b6;</i>
      </div>
      <span class="history-main" v-for="item in keyWorldList" :key="item" @click="searchHistory(item)">{{item}}</span>
    </div>

    <!-- 搜索结果 -->
    <div class="searchResult">
      <div class="searchResult-item" v-for="(item,index) in searchResult" :key="index">
        <!-- 左侧 -->
        <div class="item-left" @click="playMusic(item)">
           <div class="index">{{index+1}}</div>
           <div class="song">
              <span class="name">{{item.name}}</span>
              <span class="singer" v-for="item2 in item.artists" :key="item2">{{item2.name}}</span> 
           </div>
        </div>
        <!-- 右侧 -->
        <div class="item-right">
          <i class="iconfont mv" v-if="item.mvid!=0">&#xe602;</i>
          <i class="iconfont">&#xeb7c;</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getSearchMusic} from '@/request/home.js'
export default {
name:'search',
data(){
  return{
    // 搜索关键词
    searchKey:[],
    // 搜索历史
    keyWorldList:[],
    // 搜索结果
    searchResult:[],
  }
},
mounted(){
  this.keyWorldList=JSON.parse(localStorage.getItem('keyWorldList'))?JSON.parse(localStorage.getItem('keyWorldList')):[]
},
methods:{
  // 用户输入值后回车事件
  async search(){
    if(this.searchKey!==''){
      this.keyWorldList.unshift(this.searchKey)
      this.keyWorldList=[...new Set(this.keyWorldList)]
      if(this.keyWorldList.length>10){
        this.keyWorldList.splice(this.keyWorldList.length-1,1)
      }
      localStorage.setItem('keyWorldList',JSON.stringify(this.keyWorldList))
      const res = await getSearchMusic(this.searchKey)
      this.searchResult=res.data.result.songs
      this.searchKey=''
    }
  },
  // 删除搜索历史
  deleteHistory(){
    localStorage.removeItem('keyWorldList')
    this.keyWorldList=[]
  },
  // 点击搜索结果，播放歌曲
  async searchHistory(item){
    const res=await getSearchMusic(item)
    this.searchResult=res.data.result.songs
  },
  // 点击歌曲的左侧，添加进播放列表，播放歌曲
  playMusic(item){
    item.al=item.album
    item.al.picUrl=item.album.artist.img1v1Url
    this.$store.commit('pushPlaylist',item)
    this.$store.commit('updatePlayListIndex',this.$store.state.playlist.length-1)

  },
},
}
</script>

<style lang="less" scoped>
// 顶部搜索框
.search{
  width: 100%;
  height: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 .2rem;

  .iconfont{
    font-size: .6rem;
  }

  input{
    display: inline-block;
    width: 70%;
    height: .8rem;
    font-size: 18px;
    border: none;
    border-bottom: 1px solid ;
    padding: .1rem;
  }

  button{
    font-size: .4rem;
    border: none;
    background-color: white;
  }

}

// 搜索历史
.searchHistory{
  width: 100%;
  padding: 0 .2rem;
  margin-top: .2rem;

  .history-top{
    width: 100%;
    height: .6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    margin-bottom: .2rem;

    .iconfont{
      font-size: 20px;
    }
  }

  .history-main{
    // 设置了这个，元素就不会拆开换行，而是整个元素换行
    display: inline-block;
    margin: .1rem;
    background-color: #e2e2e2;
    padding: .1rem .2rem;
    border-radius: .3rem;
  }
}

// 搜索结果
.searchResult{
  width: 100%;
  padding: .2rem;

  .searchResult-item{
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: .6rem 0;

    .item-left{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .index{
        font-size: .4rem;
      }

      .song{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: .3rem;

        .name{
          font-size: .4rem;
          font-weight: bold;
        }
      }
    }

    .item-right{
      height: 100%;

      .mv{
        margin-right: 15px;
      }

      .iconfont{
        font-size: 30px;
      }
    }
  }
}
</style>