<template>
  <div class="PlaylistItem">
      <!-- 顶部 -->
      <div class="top">
        <div class="topLeft">
          <i class="iconfont">&#xe624;</i>
          <span class="playAll">播放全部</span>
          <span class="number">(共{{itemList.length}}首)</span>
        </div>
        <div class="topRight">
          <i class="iconfont">&#xe727;</i>
          <span>收藏({{subscribedCount}})</span>
        </div>
      </div>

      <!-- 歌曲 -->
      <div class="searchResult">
      <div class="searchResult-item" v-for="(item,index) in itemList" :key="index">
        <!-- 左侧 -->
        <div class="item-left" @click="playMusic(index)">
           <div class="index">{{index+1}}</div>
           <div class="song">
              <div>{{item.name}}</div>
              <span class="singer" v-for="item2 in item.ar" :key="item2">{{item2.name}}</span> 
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
export default {
name:'playlistItem',
props:['itemList','subscribedCount'],
methods:{
  playMusic(index){
    // 更新播放的歌曲
    this.$store.commit('updatePlayList', this.itemList)
    // 更新播放列表的下标
    this.$store.commit('updatePlayListIndex',index)
  }
}
}
</script>

<style lang="less" scoped>
.PlaylistItem{
  width: 100%;
  height: 100%;
  margin: 20px 0;
  padding: 0 10px;
  background-color: #ffffff;
  border-radius: 20px 20px 0 0;
  margin-bottom: 65px;
}

// 顶部
.top{
  width: 100%;
  height: 60px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.iconfont{
  font-size: 25px;
  margin-right: 10px;
}
.playAll{
  font-weight: bold;
}
.number{
  font-size: 14px;
  font-weight: lighter;
}
.topRight{
  background-color: #ff0000;
  color: white;
  border-radius: 20px;
  padding: 7px 10px;
  font-size: 16px;
  .iconfont{
    font-size: 16px;
    margin-right: 5px;
  }
}

// 歌曲项
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
        margin-left: .3rem;
        font-size: 18px;
        font-weight: bold;

        .name{
          font-size: .36rem;
          font-weight: bold;
        }
        }
        .singer{
          font-size: .28rem;
          margin-right: .2rem;
          font-weight: normal;
          font-size: 14px;
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
</style>