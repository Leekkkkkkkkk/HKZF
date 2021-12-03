<template>
  <div class="list">
      <van-nav-bar>
        <template #left>
          <van-icon name="arrow-left" class="iconFont" @click="$router.back()" />
            <van-search  placeholder="请输入搜索关键词" class="search">
              <template #left>
                <div class="cityList" @click="$router.push('/city')">
                  {{$store.state.ctiyName.label}}
                  <van-icon name="arrow-down" />
                </div>
              </template>
            </van-search>
            <van-icon name="location-o" color="#fff" @click="$router.push('/map')" />
        </template>
      </van-nav-bar>
      <!-- 筛选 -->
      <van-dropdown-menu>
        <!-- 区域 -->
        <van-dropdown-item v-model="value"  title='区域' ref="toAS">
          <template>
            <van-picker
            show-toolbar
            value-key='label'
            toolbar-position='bottom' :columns="areaSubway" ref="getValue" @confirm="onAs"  @cancel="onCancel">
              <template #confirm>
                <div><van-button type="info">提交</van-button></div>
              </template>
              <template #cancel>
                <van-button type="danger">取消</van-button>
              </template>
            </van-picker>
          </template>
        </van-dropdown-item>
        <!-- 方式 -->
        <van-dropdown-item v-model="value"   title="方式" ref="toRT">
          <template>
            <van-picker show-toolbar value-key='label' toolbar-position='bottom' :columns="rentType" @confirm="onRt"  @cancel="onCancel" >
              <template #confirm>
                <div><van-button type="info">提交</van-button></div>
              </template>
              <template #cancel>
                <van-button type="danger">取消</van-button>
              </template>
            </van-picker>
          </template>
        </van-dropdown-item>
        <!-- 租金 -->
        <van-dropdown-item v-model="value"   title="租金" ref="toPR">
          <template>
            <van-picker show-toolbar toolbar-position='bottom' value-key='label' :columns="price" @confirm="onPrice"  @cancel="onCancel" >
              <template #confirm>
                <div><van-button type="info">提交</van-button></div>
              </template>
              <template #cancel>
                <van-button type="danger">取消</van-button>
              </template>
            </van-picker>
          </template>
        </van-dropdown-item>
        <van-dropdown-item title="筛选" @open="show=true" />
      </van-dropdown-menu>
      <!-- 筛选 -->
        <van-popup v-model="show"  position="right" :style="{ height: '100%', }"  style="width:80%">
          <van-cell title="户型" />
          <div class="tag_s">
            <van-tag plain type="primary" size="large" v-for="item in roomType" @click="onRoomType(item)" :key="item.value">{{item.label}}</van-tag>
          </div>
          <van-cell title="朝向" />
          <div class="tag_s">
            <van-tag plain type="primary" size="large" v-for="item in oriented" @click="onOriented(item)" :key="item.value">{{item.label}}</van-tag>
          </div>
          <van-cell title="楼层" />
          <van-tag plain type="primary" size="large" v-for="item in floor " @click="onFloor(item)" :key="item.value">{{item.label}}</van-tag>
          <van-cell title="房屋亮点" />
          <van-tag plain type="primary" size="large" v-for="item in characteristic " @click="onCharacteristic(item)" :key="item.value">{{item.label}}</van-tag>
          <van-button type="warning" @click="show = false" >取消</van-button>
          <van-button type="info" @click="onClick">提交</van-button>
        </van-popup>
      <!-- 刷新 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
      error-text="请求失败，点击重新加载"
      >
        <commodity-card :card='allhouse' />
    </van-list>
  </div>
</template>

<script>
import { getCondition, getAllHouses } from '@/api/house.js'
import { mapState } from 'vuex'
import CommodityCard from '../../components/CommodityCard.vue'
import { Toast } from 'vant'
// import { Toast } from 'vant'
export default {
  components: { CommodityCard },
  name: 'list',
  data () {
    return {
      error: false,
      show: false,
      // 下拉刷新
      isLoading: false,
      value: 0,
      // 区域 // 地铁
      areaSubway: [],
      // 方式
      rentType: [],
      // 价格
      price: [],
      // 楼层
      floor: [],
      // 朝向
      oriented: [],
      // 户型
      roomType: [],
      // 房屋亮点
      characteristic: [],
      // 渲染房屋数据
      allhouse: [],
      loading: false,
      finished: false,
      start: 1,
      // 发送请求数据
      state: {
        // 区域
        area: '',
        // 地铁
        subway: '',
        // 方式
        rentType: 'null',
        // 价格
        price: 'null',
        // 复合传输
        more: [],
        // 户型
        roomType: '',
        // 朝向
        oriented: '',
        // 房屋亮点
        characteristic: '',
        // 楼层
        floor: ''
      }
    }
  },
  computed: {
    ...mapState(['ctiyName'])
  },
  created () {
    this.GetCondition()
  },

  methods: {
    // 区域
    onAs (label, index) {
      console.log(label)
      // const inx = index
      // console.log(index)
      // const res = this.$refs.getValue.getColumnValue(2)
      // console.log(res)
      const inx = index[0]
      const inx1 = index[1]
      const inx2 = index[2]
      // console.log(inx, inx1, inx2)
      // 区域
      if (inx === 0) {
        if (inx1 !== 0 && inx2 === 0) {
          this.state.area = this.areaSubway[inx].children[inx1].value
        }
        if (inx2 !== 0 && inx1 !== 0) {
          this.state.area = this.areaSubway[inx].children[inx1].children[inx2].value
        }
      }
      // 地铁
      if (inx === 1) {
        if (inx1 !== 0 && inx2 === 0) {
          this.state.subway = this.areaSubway[inx].children[inx1].value
        }
        if (inx2 !== 0 && inx1 !== 0) {
          this.state.subway = this.areaSubway[inx].children[inx1].children[inx2].value
        }
      }
      this.$refs.toAS.toggle()
      this.getAllhouse()
    },
    // 方式
    onRt (val, inx) {
      this.state.rentType = val.value
      this.$refs.toRT.toggle()
      this.getAllhouse()
    },
    // 租金
    onPrice (val, inx) {
      console.log(val, inx)
      this.state.price = val.value
      this.$refs.toPR.toggle()
      this.getAllhouse()
    },
    // 户型
    onRoomType (ite) {
      console.log(ite)
      this.state.more.push(ite.value)
    },
    // 朝向
    onOriented (ite) {
      console.log(ite)
      this.state.more.push(ite.value)
    },
    // 楼层
    onFloor (ite) {
      console.log(ite)
      this.state.more.push(ite.value)
    },
    // 房屋亮点
    onCharacteristic (ite) {
      console.log(ite)
      this.state.more.push(ite.value)
    },
    onClick () {
      this.getAllhouse()
    },
    onCancel (val) {
    },
    // 获取查询条件
    async GetCondition () {
      const res = await getCondition(this.ctiyName.value)
      console.log(res)
      this.$set(res.area.children[0], 'children', [{ label: '不限' }])
      this.areaSubway.push(res.area)
      this.$set(res.subway.children[0], 'children', [{ label: '不限' }])
      this.areaSubway.push(res.subway)
      this.rentType = res.rentType
      this.price = res.price
      this.floor = res.floor
      this.oriented = res.oriented
      this.roomType = res.roomType
      this.characteristic = res.characteristic
    },
    async onLoad () {
      try {
        // 1.发送请求获取数据
        const res = await getAllHouses({
          cityId: this.ctiyName.value,
          area: this.state.area,
          subway: this.state.subway,
          rentType: this.state.rentType,
          price: this.state.price,
          more: this.state.more.join('|'),
          roomType: this.state.roomType,
          oriented: this.state.oriented,
          floor: this.state.floor,
          start: this.start,
          end: 20
        })
        // 2.保存数据
        console.log(res)
        this.allhouse.push(...res.list)
        // 3.让当前这一次加载状态结束
        this.loading = false
        // 4.数据全部加载完成
        if (!res.list.length) {
          this.finished = true
        } else {
          this.start++
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async getAllhouse () {
      try {
        const res = await getAllHouses({
          cityId: this.ctiyName.value,
          area: this.state.area,
          subway: this.state.subway,
          rentType: this.state.rentType,
          price: this.state.price,
          more: this.state.more.join('|'),
          // roomType: this.state.roomType,
          // oriented: this.state.oriented,
          // floor: this.state.floor,
          start: this.start,
          end: 20
        })
        this.allhouse = res.list
        Toast.success('筛选成功')
      } catch (error) {
        Toast.fail('筛选失败')
      }
    }
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
.list{
  position: relative;

    .search{
      width: 100%;
      height: 34px;
      margin: 0 10px;
      padding: 5px  5px 5px 8px;
      border-radius: 3px;
      background-color: #fff;
    }
    .van-search__content{
      background-color: transparent;
    }
    .cityList{
      font-size: 14px;
    }
    .van-icon{
      line-height: 34px;
    }
    /deep/.van-overlay{
      background-color: rgba(0,0,0,.5)
    }
    .tag_s{
      display: flex;
      justify-content: center;
      margin-left: 40px;
    }
}

</style>
