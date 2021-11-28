<template>
  <div>
    <router-view></router-view>
    <van-tabbar active-color='rgb(33, 185, 122)' inactive-color='#7d7e80' route>
      <van-tabbar-item to="/home">
      首页
      <template #icon>
        <van-icon name="wap-home-o" />
      </template>
      </van-tabbar-item>
      <van-tabbar-item to="/serach">
        找房
        <template #icon>
          <van-icon name="search" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/information">
        咨询
        <template #icon>
          <van-icon name="newspaper-o" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/account">
        我的
        <template #icon>
          <van-icon name="contact" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },

  created () {

  },

  methods: {

  }
}
</script>

<style scoped lang='less'>

</style>
