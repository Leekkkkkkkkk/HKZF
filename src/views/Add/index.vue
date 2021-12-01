<template>
  <div class="add">
    <van-nav-bar title="发布房源" >
        <template #left>
          <van-icon name="arrow-left" class="iconFont" @click="$router.back()" />
        </template>
    </van-nav-bar>
    <van-cell title="房源信息"  class="van_tit"/>
    <van-form @submit="onSubmit">
      <van-field
        v-model="communityName"
        is-link
        readonly
        label="小区名称"
        placeholder="请输入小区名称"
        @click="$router.push('/search')"
      />
      <van-field  label="租金" placeholder="请输入租金/月"  v-model.number="state.price">
        <template #extra>
          ¥/月
        </template>
      </van-field>
      <van-field  label="建筑面积" placeholder="请输入建筑面积" v-model.number="state.size">
        <template #extra>
          m²
        </template>
      </van-field>
      <!-- 户型 -->
      <div>
        <van-field
          readonly
          clickable
          name="picker"
          :value="roomTypeTitle"
          label="户型"
          placeholder="请选择"
          right-icon="arrow"
          @click="roomType = true"
        />
        <van-popup v-model="roomType" position="bottom" >
          <van-picker
            show-toolbar
            :columns="Publish.roomType"
            value-key="label"
            @confirm="onRoomType"
            @cancel="roomType = false"
          />
        </van-popup>
      </div>
      <!-- 所在楼层 -->
      <div>
        <van-field
          readonly
          clickable
          name="picker"
          :value="floorTitle"
          label="所在楼层"
          placeholder="请选择"
          right-icon="arrow"
          @click="floor = true"
        />
        <van-popup v-model="floor" position="bottom">
          <van-picker
            show-toolbar
            :columns="Publish.floor"
            value-key="label"
            @confirm="onFloor"
            @cancel="floor = false"
          />
        </van-popup>
      </div>
      <!-- 朝向 -->
      <div>
        <van-field
          readonly
          clickable
          name="picker"
          :value="orientedTitle"
          label="朝向"
          placeholder="请选择"
          right-icon="arrow"
          @click="oriented = true"
        />
        <van-popup v-model="oriented" position="bottom">
          <van-picker
            show-toolbar
            :columns="Publish.oriented"
            value-key="label"
            @confirm="onOriented"
            @cancel="oriented = false"
          />
        </van-popup>
      </div>
      <van-cell title="房屋标题" />
      <van-field
        v-model="state.title"
        rows="1"
        autosize
        type="textarea"
        placeholder='请输入标题(例如:整租小区名 2室 5000元)'
      />
      <van-cell title="房屋图像" />
      <van-uploader v-model="imgFiles" multiple />
      <van-cell title="房屋配置" />
      <van-grid :border='false' :column-num="5" :clickable='true'>
        <van-grid-item icon="photo-o" :text="item.label" :class="{acvit:icon.includes(item.label)}" v-model="acvit" v-for="(item,index) in Publish.supporting" :key="index" @click="houseIco(item.label,index)" />
      </van-grid>
      <van-cell title="房屋描述" />
      <van-field
        v-model="state.description"
        rows="1"
        autosize
        type="textarea"
        class="describe"
        placeholder='请输入房屋描述信息'
      />
      <div class="fool">
        <van-button type="default">取消</van-button>
        <van-button type="primary" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { PublishHouse } from '@/api/house.js'
import { housesImg } from '@/api/area.js'
import { uploadHouses } from '@/api/user.js'
import { mapState } from 'vuex'
import { Toast } from 'vant'
export default {
  name: 'add',
  data () {
    return {
      floor: false,
      floorTitle: '',
      roomType: false,
      roomTypeTitle: '',
      oriented: false,
      orientedTitle: '',
      Publish: [],
      communityName: '',
      community: '',
      acvit: false,
      icon: [],
      imgFiles: [],
      state: {
      // 小区信息
        community: '',
        // 房型
        roomType: '',
        // 上传房屋图片路径字符
        houseImg: '', // ''
        // 房屋价格
        price: '',
        // 房屋朝向
        oriented: '',
        // 房屋楼层:
        floor: '',
        // 建筑面积
        size: '',
        // 房屋标题
        title: '',
        // 房屋配套
        supporting: '',
        // 房屋描述
        description: ''
      }
    }
  },

  created () {
    this.GetPublishHouse()
    this.comCtiy()
  },
  computed: {
    ...mapState(['Community'])
  },
  methods: {
    async onSubmit () {
      console.log(this.imgFiles)
      if (this.imgFiles.length) {
        const form = new FormData()
        this.imgFiles.forEach(item => form.append('file', item.file))
        const res = await housesImg(form)
        this.state.houseImg = res.join('|')
      } else {
        Toast.fail('请上传图片')
      }
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        console.log(this.state)
        this.state.supporting = this.icon.join('|')
        await uploadHouses(this.state)
        Toast.success('发布成功')
        this.$router.push('/home')
      } catch (error) {
        console.log(error)
        Toast.fail('发布失败')
      }
    },
    // onFinish ({ selectedOptions }) {
    //   this.show = false
    //   this.fieldValue = selectedOptions.map((option) => option.text).join('/')
    // },
    async GetPublishHouse () {
      const res = await PublishHouse()
      this.Publish = res
      // this.floorList = res.floor.map(item => item)
      // this.roomTypeList = res.roomType.map(item => item)
      // this.orientedList = res.oriented.map(item => item)
      // this.supporting = res.supporting.map(item => item)
      // res.roomType.map(item => {
      //   this.roomType.push(item.label)
      // })
      // this.roomType = res.roomType
      // this.oriented = res.oriented
      // res.oriented.map(item => {
      //   this.oriented.push(item.label)
      // })
    },
    onRoomType (val, index) {
      this.roomTypeTitle = val.label
      this.state.roomType = val.value
      this.roomType = false
    },
    onFloor (val, index) {
      this.floorTitle = val.label
      this.state.floor = val.value
      this.floor = false
    },
    onOriented (val, index) {
      this.orientedTitle = val.label
      this.state.oriented = val.value
      this.oriented = false
    },
    houseIco (name, inx) {
      const pl = this.icon.indexOf(name)
      if (pl !== -1) {
        this.icon.splice(pl, 1)
      } else {
        this.icon.push(name)
      }
      // this.state.supporting.push(name)
      // const pl = this.state.supporting.findIndex(item => {
      //   return item === item.label
      // })
      // if (pl !== -1) {
      //   this.state.supporting.splice(pl, 1)
      // } else {
      //   this.state.supporting.push(ite.label)
      // }
      // { console.log(pl) }
      this.acvit = inx
    },
    comCtiy () {
      // this.Community
      if (this.Community) {
        this.state.community = this.Community.community
        this.communityName = this.Community.communityName
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
/deep/.van_tit{
  color: #21b97a;
}
.describe{
  height: 128px;
}
.fool{
  height: 45px;
  display: flex;
  justify-content: space-evenly;
  .van-button{
    flex: 1;
  }
}
/deep/.acvit{
  color: #21b97a;
}
</style>
