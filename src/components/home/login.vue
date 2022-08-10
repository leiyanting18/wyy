<template>
    <topNav></topNav>
    <div class="myUser-container">
        <!-- 网易云图片 -->
        <img src="@/assets/logo.png" alt="网易云" class="logo">

        <!-- 登录表单 -->
        <van-form>
            <van-cell-group inset>
                <van-field
                    v-model.trim="phone"
                    name="用户名"
                    label="用户名"
                    placeholder="请输入用户名"
                />
                <van-field
                    v-model.trim="password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="请输入密码"
                />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block native-type="submit" class="btn" @click="login">登录</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import topNav from '@/components/home/topNav.vue'
export default {
name:'login',
data(){
    return{
        phone:'',
        password:'',
    }
},
methods:{
    // 登录
    async login(){
        // 调用api，获取登录数据(这里api出错,获取不到数据)
        // const res=await getPhoneLogin(this.phone,this.password)
        // 判断是否填写账号密码
        if(this.phone==='' || this.password===''){
            return alert('请输入账号或密码')
        }
        // 判断账号是否正确
        if(this.phone==='123'&&this.password==='123'){
            this.$router.push('/myUser')
        }else{
            alert('账号或密码错误')
            this.password=''
        }
    }
},
components:{
    topNav,
}
}
</script>

<style lang="less" scoped>
.logo{
    width: 1.4rem;
    height: 1.4rem;
    margin-left: 50%;
    transform: translateX(-50%);
}
.van-form {
    margin-top: .4rem;
}
.btn{
    background-color: #db1716;
    color: white;
    font-size: .4rem;
}
.user{
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    vertical-align: middle;
    margin-left: .2rem;
}
span{
    font-size: .4rem;
    margin-left: .4rem;
}
</style>