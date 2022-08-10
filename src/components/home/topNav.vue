<template>
  <div class="topNav-container">
    <!-- 左侧列表icon -->
    <div class="left">
        <i class="iconfont">&#xeb7c;</i>
    </div>

    <!-- 中间导航 -->
    <div class="main">
        <span @click="this.$router.push('/login')">我的</span>
        <span @click="this.$router.push('/')">发现</span>
        <span>云村</span>
        <span>视频</span>
    </div>

    <!-- 右侧搜索icon -->
    <i class="iconfont" @click="this.$router.push('/search')">&#xe693;</i>
  </div>
</template>

<script>
export default {
name:'topNav',
}
</script>

<style lang="less" scoped>
.topNav-container{
    width: 100%;
    height: 1.2rem;
    font-size: .4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 .2rem;
    position: absolute;
    top: 0;
    left: 0;
    background-color: white;
}
.iconfont{
    font-size: .7rem;
}

// 中间导航
.main{
    // 设置了样式，但是没有效果，原来是没有设置width
    width: 60%;
    height: 1.2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    span:active{
        font-weight: bold;
    }
}
</style>