<template>
    <topNav></topNav>
    <div class="myUser">
        <div class="myUser-left">
            <img src="@/assets/user.png" class="user">
            <span>kkk-y-</span>
        </div>
        <a class="myUser-right" @click="logout">退出登录</a>
    </div>
</template>

<script>
import topNav from '@/components/home/topNav.vue'
import {getLogout} from '@/request/home.js'

export default {
name:'myUser',
methods:{
    async logout(){
        const res=await getLogout()
        if(res.status!==200){
            console.log('退出登录失败')
        }
        this.$router.push('/login')
    }
},
components:{
    topNav,
}
}
</script>

<style lang="less" scoped>
.myUser{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .2rem;
}
.user{
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    vertical-align: middle;
}
span{
    font-size: .4rem;
    margin-left: .4rem;
}
</style>