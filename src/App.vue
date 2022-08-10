<template>
  <!-- 路由占位符，显示通过路由跳转或者router-link指定的页面 -->
  <router-view />

  <!-- 底部播放音乐组件 -->
  <footerMusic v-show="isfooterMusic"></footerMusic>
</template>

<script>
import footerMusic from '@/views/FooterMusic.vue'
import { mapState } from 'vuex'

export default {
    name:'app',
    components:{
        footerMusic
    },
    computed:{
        ...mapState(['isfooterMusic'])
    }

}
</script>

<style lang="less">
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
*{
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
}
a{
    color: black;
    text-decoration: none;
}
</style>