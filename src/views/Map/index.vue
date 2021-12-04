<template>
   <div class="map">
      <van-nav-bar title="地图找房" >
        <template #left>
          <van-icon name="arrow-left" class="iconFont" @click="$router.back()" />
        </template>
      </van-nav-bar>
      <baidu-map class="map" :center="city.label" :zoom="zoom">
        <bm-scale anchor=" BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
        <bm-navigation anchor=" BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>
            <!-- BMAP_NAVIGATION_CONTROL_PAN -->
          <bm-overlay
          v-for="item in maphouseList "
          :key="item.value"
          pane="labelPane"
          :class="{sample: true, active}"
          @draw="draw($event,item.coord)"
          @mouseover.native="active = true"
          @mouseleave.native="active = false"
          @click.native="onClick(item)"
          @touchend.native='onClick(item)'
          >
          <p class="font_S">{{item.label}}{{item.count}}套</p>
        </bm-overlay>
      </baidu-map>
      <van-popup v-model="isshow" position="bottom" :style="{ height: '40%' }">
        <van-cell title="房屋列表" value="更多房源" />
        <commodity-card :card="houseList.list" />
      </van-popup>
   </div>
</template>

<script>
import { getMapHouse } from '@/api/area.js'
import { getAllHouses } from '@/api/house.js'
import { mapState } from 'vuex'
import { Toast } from 'vant'
import CommodityCard from '../../components/CommodityCard.vue'
export default {
  components: { CommodityCard },
  name: 'map-baidu',
  data () {
    return {
      maphouseList: [],
      active: false,
      city: [],
      show: 1,
      zoom: 11,
      houseList: [],
      isshow: false
    }
  },

  created () {
    this.getMapHouselist()
    this.city = this.ctiyName
  },
  computed: {
    ...mapState(['ctiyName'])
  },

  methods: {
    async  getMapHouselist () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await getMapHouse(this.ctiyName.value)
        console.log(res)
        this.maphouseList = res
        Toast.success('获取成功')
      } catch (error) {
        console.dir(error)
        Toast.fail('获取房源失败')
      }
    },
    draw ({ el, BMap, map }, { longitude, latitude }) {
      console.log(longitude, latitude)
      const pixel = map.pointToOverlayPixel(new BMap.Point(longitude, latitude))
      el.style.left = pixel.x - 60 + 'px'
      el.style.top = pixel.y - 20 + 'px'
    },
    async onClick (ite) {
      if (this.show === 3) {
        this.zoom = 16
      }
      if (this.show >= 3) {
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        this.zoom = 16
        console.log(ite)
        try {
          const res = await getAllHouses({
            cityId: ite.value
          })
          this.houseList = res
          this.isshow = true
          console.log(res)
          Toast.success('获取成功')
          return
        } catch (error) {
          console.dir(error)
          Toast.fail('获取失败')
        }
      }
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      console.log(ite)
      this.zoom = 13
      this.show++
      try {
        const res = await getMapHouse(ite.value)
        console.log(res)
        this.maphouseList = res
        Toast.success('获取成功')
      } catch (error) {
        console.dir(error)
        Toast.fail('获取房源失败')
      }
    }
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
.sample {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background: rgba(12,181,106,0.9);
  border: 2px solid hsla(0,0%,100%,.8);
  color: #fff;
  text-align: center;
  cursor: pointer;
  position: absolute;
  display: inline-block;
  line-height: 2;
}
  .font_S{
    font-size: 12px;
  }
.sample.active {
  background: rgba(0,0,0,0.75);
  color: #fff;
}
</style>
