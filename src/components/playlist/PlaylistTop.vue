<template>
  <div class="playlistTop-container">
    <!-- 虚化的背景 -->
    <img :src="playlistDetail.coverImgUrl" class="bg">
    
    <!-- 顶部导航栏 -->
    <div class="topNav">
        <i class="iconfont" @click="this.$router.go(-1)">&#xe625;</i>
        <div class="middle">
            <span>歌单</span>
            <i class="iconfont">&#xe693;</i>
        </div>
        <i class="iconfont">&#xeb7c;</i>
    </div>

    <!-- 中间主体内容 -->
    <div class="main">
        <!-- 左侧 -->
        <div class="main-left">
            <img :src="playlistDetail.coverImgUrl" class="main-left-img">
        </div>
        <!-- 右侧 -->
        <div class="main-right">
            <div class="playlistName">{{playlistDetail.name}}</div>
            <div class="description">{{playlistDetail.description}}</div>
        </div>
    </div>

    <!-- 底部icon图标 -->
    <div class="footer">
        <div>
            <i class="iconfont">&#xec3b;</i>
            <span>{{playlistDetail.commentCount}}</span>
        </div>
        <div>
            <i class="iconfont">&#xe86e;</i>
            <span>{{playlistDetail.shareCount}}</span>
        </div>
        <div>
            <i class="iconfont">&#xe668;</i>
            <span>下载</span>
        </div>
        <div>
            <i class="iconfont">&#xeb5f;</i>
            <span>多选</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
name:'playlistTop',
props:['playlistDetail'],
setup(props){
   if(props.playlistDetail.creator=""){
      props.playlistDetail.creator=JSON.parse(sessionStorage.getItem().playlistDetail).creator
    }
}
}
</script>

<style lang="less" scoped>
.bg{
    width: 100%;
    height: 8rem;
    filter: blur(20px);
    position: absolute;
    top: 0;
    left: 0;
    z-index: -999;
}
// 顶部导航栏
.topNav{
    width: 100%;
    height: 1.2rem;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .2rem;
    position: absolute;
    top: 0;
    left: 0;

    .middle{
        width: 70%;
        height: 1.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
.iconfont{
    font-size: .6rem;
}
// 中间主体
.main{
    width: 100%;
    height: 3.4rem;
    display: flex;
    padding: .4rem .2rem;
    margin-top: 60px;
        
    .main-left-img{
        width: 2.6rem;
        height: 2.6rem;
        margin-right: .2rem;
    }
    .playlistName{
        padding-bottom: .2rem;
        font-size: .36rem;
    }
    .description{
        display: inline-block;
        width: 100%;
        height: 74px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: .28rem;
    }
}

// 底部icon
.footer{
    width: 100%;
    height: 1.1rem;
    padding: 0 .2rem;
    margin: .2rem 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: .32rem;

    div{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        .iconfont{
            font-size: .7rem;
        }
    }
}
</style>