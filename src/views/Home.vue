<template>
  <div class="home-container">
    <topNav></topNav>
    <recommended></recommended>
  </div>
</template>

<script>
import topNav from '@/components/home/topNav.vue'
import recommended from '@/components/home/recommended.vue'

export default {
  name: 'Home',
  components:{
    topNav,
    recommended,
  }
}
</script>

<style>

</style>
