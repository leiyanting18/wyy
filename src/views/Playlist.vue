<template>
<!-- 歌单详情页 -->
    <!-- 歌单简介 -->
    <playlistTop :playlistDetail="state.playlistDetail"></playlistTop>
    <!-- 歌单列表 -->
    <playlistItem :itemList="state.itemList" :subscribedCount="state.playlistDetail.subscribedCount"></playlistItem>

</template>

<script>
import playlistTop from '@/components/playlist/PlaylistTop.vue'
import playlistItem from '@/components/playlist/PlaylistItem.vue'
import {getPlaylistDetail} from '@/request/playlist.js'
import {reactive} from 'vue'
import { onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'

export default {
name:'playlist',
setup(){
    const state=reactive({
        playlistDetail:[],
        itemList:[]
    })
    onMounted(async ()=>{
        // 获取歌单信息详情
        const id=useRoute().query.id
        const res=await getPlaylistDetail(id)
        state.playlistDetail=res.data.playlist
        // 获取歌单中的歌曲
        state.itemList=state.playlistDetail.tracks
        sessionStorage.setItem('playlist',JSON.stringify(state))
    })
    return {state}

},
components:{
    playlistTop,
    playlistItem
}
}
</script>

<style>

</style>