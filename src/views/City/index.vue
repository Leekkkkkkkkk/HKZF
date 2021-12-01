<template>
  <div class="city">
      <van-nav-bar
        title="城市列表"
        fixed
        z-index='2'
      >
      <template #left>
        <van-icon name="cross" class="iconFont" @click="$router.back()" />
      </template>
      </van-nav-bar>

      <van-index-bar :index-list="indexList" sticky :sticky-offset-top='46'>
        <van-index-anchor index="#">当前城市</van-index-anchor>
        <van-cell :title="$store.state.ctiyName.label"/>
        <van-index-anchor index="热">热门城市</van-index-anchor>
        <van-cell :title="item.label"  v-for="(item,index) in HotCtiyList" :key="index" @click="hotCtiy(item)"/>
        <div class="box" v-for="item in newIndex" :key="item">
          <van-index-anchor :index="item" />
          <van-cell :title="item.label" v-for="(item,index) in allCityList[item]" :key="index" @click="getCity(item)"/>
        </div>
      </van-index-bar>
  </div>
</template>

<script>
import { cityList, hotList } from '@/api/area.js'
export default {
  name: 'city',
  data () {
    return {
      indexList: ['#', '热'],
      HotCtiyList: [],
      allCityList: {},
      newIndex: []
    }
  },

  async created () {
    this.getCityList()
    this.getHotCtiy()
  },

  methods: {
    async getHotCtiy () {
      const res = await hotList()
      this.HotCtiyList = res
    },
    async getCityList () {
      const res = await cityList(1)
      // this.allCityList = res
      let newIndex = res.map(item => {
        return item.short[0].toUpperCase()
      })
      newIndex = newIndex.reduce((sum, item) => {
        if (sum.indexOf(item) === -1) {
          sum.push(item)
        }
        return sum
      }, []).sort()
      // this.newIndex['热'] = []
      this.indexList.push(...newIndex)
      this.newIndex.push(...newIndex)
      // res.forEach(item => {
      //   this.allCityList[item.short[0].toUpperCase()] = []
      // })
      // res.forEach(item => {
      //   this.allCityList[item.short[0].toUpperCase()].push(item.label)
      // })
      res.map(item => {
        this.allCityList[item.short[0].toUpperCase()] = []
      })
      res.map(item => {
        this.allCityList[item.short[0].toUpperCase()].push(item)
      })
      console.log(this.allCityList)
      // console.log(test1)
      // console.log(this.test)
      // console.log(this.allCityList)
    },
    hotCtiy (ite) {
      this.$store.commit('initCity', ite)
      this.$router.push('/home')
    },
    getCity (ite) {
      this.$store.commit('initCity', ite)
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped lang='less'>
.van-nav-bar{
    background-color: #21b97a;
    .iconFont{
      color: #fff;
      font-size: 18px;
    }
    /deep/.van-nav-bar__title{
      font-size: 18px;
      color: #fff;
    }
  }
  .van-index-bar{
    margin-top: 46px;
  }
  /deep/.van-index-bar__sidebar{
    padding-top: 20px;
    height: 85%;
  }
  /deep/.van-index-bar__index{
    flex: 1;
    font-size: 15px;
    font-weight: 400;
  }
  /deep/.van-cell{
    height: 50px;
    font-size: 16px;
  }
  /deep/.van-index-anchor{
    font-size: 14px;
    padding: 10px 15px;
    color: #999;
  }
  /deep/.van-index-bar__index--active{
    color: #21b97a;
  }
</style>
