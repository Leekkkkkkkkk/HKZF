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
        <van-dropdown-item v-model="value"  title='区域'>
          <template>
            <van-picker show-toolbar title="标题" :columns="columns" />
          </template>
        </van-dropdown-item>
        <!-- 方式 -->
        <van-dropdown-item v-model="value"   title="方式">
          <template>
            <van-picker show-toolbar title="标题" :columns="columns" />
          </template>
        </van-dropdown-item>
        <!-- 租金 -->
        <van-dropdown-item v-model="value"   title="租金">
          <template>
            <van-picker show-toolbar title="标题" :columns="columns" />
          </template>
        </van-dropdown-item>
        <van-dropdown-item title="筛选" ref="item">
          <van-cell center title="包邮">
            <template #right-icon>
              <van-switch v-model="switch1" size="24" active-color="#ee0a24" />
            </template>
          </van-cell>
          <van-cell center title="团购">
            <template #right-icon>
              <van-switch v-model="switch2" size="24" active-color="#ee0a24" />
            </template>
          </van-cell>
          <div style="padding: 5px 16px;">
            <van-button type="danger" block round @click="onConfirm">
              确认
            </van-button>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 0,
      switch1: false,
      switch2: false,
      columns: [
        {
          text: '浙江',
          children: [
            {
              text: '杭州',
              children: [{ text: '西湖区' }, { text: '余杭区' }]
            }
          ]
        }
      ]
    }
  },

  created () {

  },

  methods: {
    onConfirm () {
      this.$refs.item.toggle()
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
}

</style>
