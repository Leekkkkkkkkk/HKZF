<template>
   <div class="map">
      <van-nav-bar title="地图找房" >
        <template #left>
          <van-icon name="arrow-left" class="iconFont" @click="$router.back()" />
        </template>
      </van-nav-bar>
      <!-- :center="{lng: 116.449979, lat: 39.912338}" -->
      <baidu-map class="map" center="上海" :zoom="11">
        <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
        <bm-navigation anchor="BMAP_NAVIGATION_CONTROL_PAN BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>
      </baidu-map>
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
.map {
  width: 100%;
  height: 622px;
}
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
</style>
