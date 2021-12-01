<template>
  <div class="favorate">
    <van-nav-bar title="收藏列表" >
      <template #left>
        <van-icon name="arrow-left" class="iconFont" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-text='itpText' success-duration='1500'>
      <commodity-card :card='favoritesList' />
    </van-pull-refresh >
  </div>
</template>

<script>
import { favorites } from '@/api/user.js'
import CommodityCard from '../../components/CommodityCard.vue'
export default {
  components: { CommodityCard },
  name: 'favorate',
  data () {
    return {
      favoritesList: [],
      isLoading: false,
      itpText: ''
    }
  },

  created () {
    this.getFavorites()
  },

  methods: {
    async getFavorites () {
      try {
        const res = await favorites()
        this.favoritesList = res
      } catch (error) {

      }
    },
    async onRefresh () {
      try {
        const res = await favorites()
        this.favoritesList.unshift(...res)
        this.isLoading = false
        this.itpText = '刷新成功'
      } catch (error) {
        this.itpText = '刷新失败,请稍后重试'
      }
    }
  }
}
</script>

<style scoped lang='less'>
.favorate{
  height: 80vh;
    .van-nav-bar{
    background-color: #21b97a;
    /deep/.van-nav-bar__title{
      font-size: 18px;
      color: #fff;
    }
      .iconFont{
      color: #fff;
      font-size: 18px;
    }
  }

}
</style>
