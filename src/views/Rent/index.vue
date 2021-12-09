<template>
  <div class="rent">
    <van-nav-bar title="房屋管理" >
      <template #left>
        <van-icon name="arrow-left" class="iconFont" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <div class="ren_publish" v-if="housesLis.length === 0">
      <img src="http://liufusong.top:8080/img/not-found.png" alt="">
      <p>您还没有房源,<a href="javascript:;" @click="$router.push('/add')">去发布房源</a>吧~</p>
    </div>
    <commodity-card :card="housesLis"  />
  </div>
</template>

<script>
import CommodityCard from '../../components/CommodityCard.vue'
import { mapState, createNamespacedHelpers } from 'vuex'
const { mapActions: maprentActions, mapState: maphoulist } = createNamespacedHelpers('rent')
export default {
  components: { CommodityCard },
  name: 'rent',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['user']),
    ...maphoulist(['housesLis'])
  },
  created () {
    this.getList(this.user)
  },

  methods: {
    ...maprentActions(['getList'])
  }
}
</script>

<style scoped lang='less'>
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
.ren_publish{
  text-align: center;
  img{
    width: 150px;
    height: 100px;
    margin-top: 20px;
  }
  p{
    font-size: 14px;
    a{
      color: #21b97a;
    }
  }
}
</style>
