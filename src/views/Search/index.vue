<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @input="onInput"
        @cancel="$router.back()"
      />
    </form>
    <van-cell :value="item.communityName" v-for="(item,index) in homeList" :key="index" @click="onClickData(item)"/>
  </div>
</template>

<script>
import { community } from '@/api/area.js'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      value: '',
      homeList: []
    }
  },
  computed: {
    ...mapState(['ctiyName'])
  },
  created () {

  },

  methods: {
    onInput (val) {
      setTimeout(async _ => {
        const res = await community(val, this.ctiyName.value)
        this.homeList = res
      }, 800)
    },
    onClickData (ite) {
      this.$router.back()
      this.$store.commit('CommunityData', ite)
    }
  }
}
</script>

<style scoped lang='less'>

</style>
