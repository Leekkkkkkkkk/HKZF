<template>
  <div class="favorate">
    <van-nav-bar title="收藏列表" >
      <template #left>
        <van-icon name="arrow-left" class="iconFont" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-text='itpText' success-duration='1500'>
      <van-card
        @click="JumpDetail(item.houseCode)"
        v-for="(item,index) in favoritesList"
        :key="index"
        :desc="item.desc"
        :title="item.title"
        currency=''
        :thumb="'http://liufusong.top:8080'+item.houseImg"
        >
          <template #tags>
            <van-tag color="#e1f5f8" text-color="#39becd" size="medium" v-for="(item,index) in item.tags" :key="index" >{{item}}</van-tag>
          </template>
          <template #price>
            <div class="houseItem">
              <span>{{item.price}}</span>元/月
            </div>
          </template>
      </van-card>
    </van-pull-refresh>
  </div>
</template>

<script>
import { favorites } from '@/api/user.js'
export default {
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
    },
    JumpDetail (houseCode) {
      // this.$store.commit('houseCd', houseCode)
      console.log(this.$store.state.id)
      this.$router.push({
        name: 'detail',
        params: {
          id: houseCode
        }
      })
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
  .houseItem{
    color: #fa5741;
    span{
      font-size: 16px;
      font-weight: bolder;
    }
    font-size: 12px;
  }
  .van-tag--medium{
    margin-top: 5px;
  }
  .van-card__title{
    font-size: 15px;
    color: #394043;
    font-weight: 700;
  }
  .van-card{
    background-color: transparent;
  }
  .van-card:not(:first-child){
    border-bottom: 1px solid #e5e5e5;
  }
  .van-pull-refresh{
    overflow: visible;
  }
}
</style>
