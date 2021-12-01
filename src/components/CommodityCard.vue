<template>
  <div>
    <van-card
      @click="JumpDetail(item.houseCode)"
      v-for="(item,index) in card"
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
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Array,
      required: true
    }
  },
  data () {
    return {

    }
  },

  created () {

  },

  methods: {
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
</style>
