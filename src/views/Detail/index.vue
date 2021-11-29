<template>
  <div class="detail">
    <!-- 头部 -->
    <van-nav-bar :title="houseDetail.community">
      <template #left>
        <van-icon name="arrow-left" class="iconFont" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <!-- ！头部 -->

    <!-- 图片信息 -->
    <div class="swipeImg">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in houseDetail.houseImg" :key="index">
          <van-image
            width="375"
            height="252"
            :src="'http://liufusong.top:8080'+item"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- ！图片信息 -->

    <!-- 房屋详细信息 -->
    <div class="houseInfo">
      <!-- 头部 -->
      <h3 class="houseInfoTitle">{{houseDetail.title}}</h3>
      <div class="tag">
        <span class="houseInfoTag" v-for="(item,index) in houseDetail.tags" :key="index">{{item}}</span>
      </div>
      <!-- ！头部 -->
      <!--  租金 房型 -->
      <div class="houseinfoPrice">
        <div class="houseitem">
          <h4>{{houseDetail.price}}/月</h4>
          <p>租金</p>
        </div>
        <div class="houseitem">
          <h4>{{houseDetail.roomType}}</h4>
          <p>房型</p>
        </div>
        <div class="houseitem">
          <h4>{{houseDetail.size}}㎡</h4>
          <p>面积</p>
        </div>
      </div>
      <!--  租金 房型 -->

      <!-- 装修 朝向 -->
      <div class="houseinfoBasic">
        <div class="BasicItem">
          装修:
          <span> 精装</span>
        </div>
        <div class="BasicItem">
          朝向:
          <span v-for="(item,index) in houseDetail.oriented" :key="index">{{item}}</span>
        </div>
        <div class="BasicItem">
          楼层:
          <span> {{houseDetail.floor}}</span>
        </div>
        <div class="BasicItem">
          类型:
          <span> 普通住宅</span>
        </div>
      </div>
      <!-- ！装修 朝向 -->
    </div>
    <!-- ！房屋详细信息 -->
    <!-- 地图 -->
    <div class="houseMap">
      <!-- 头 -->
      <div class="maptop">
        小区：
        <span>天山星城</span>
      </div>
      <!-- 主要 -->
      <!-- :center="{lng: 116.449979, lat: 39.912338}" -->
      <baidu-map class="map" :center="{lng: houseDetail.coord.longitude, lat: houseDetail.coord.latitude}" :zoom="17">
          <bm-marker :position="{lng: houseDetail.coord.longitude, lat: houseDetail.coord.latitude}"  animation="BMAP_ANIMATION_BOUNCE">
            <bm-label :content="houseDetail.community" icon='comment-o' :offset="{width: -30, height: -20}"/>
          </bm-marker>
      </baidu-map>
    </div>
    <!--！ 地图 -->
    <!-- q其他 -->
    <div class="about">
      <div class="about-info">房屋配套</div>
      <van-grid :border='false' >
        <van-grid-item icon="photo-o" :text="item" v-for="(item,index) in houseDetail.supporting" :key="index"/>

      </van-grid>
    </div>

    <!-- 房源大概 -->
    <div class="houseset">
      <div class="set-title">房源概况</div>
      <div>
        <div class="content">
          <!-- 头部 -->
          <div class="content-top">
          <!-- 头像 联系人 -->
            <div class="c-name">
              <img
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.cloud.itouchtv.cn%2F2019%2F0510%2F5d916afc50ea78f483b45d5e7f090062.gif&refer=http%3A%2F%2Fimg1.cloud.itouchtv.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639885241&t=0208221720b22445f5a972843ccd40c1"
                alt=""
              />
              <!-- 联系人 -->
              <div class="c-n-content">
                <p>wang</p>
                <span>认证博主</span>
              </div>

            </div>
            <!-- 按钮 -->
            <van-button size="small" plain type="primary">朴素按钮</van-button>
          </div>
          <!-- 内容 -->
          <div class="content-msg">
            1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。 2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。 3.人车分流，环境优美。 4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。
          </div>
        </div>
      </div>
    </div>
    <!-- ！房源大概 -->

    <!-- 猜你喜欢 -->
    <div class='user-like'>
    <div class="like-title">猜你喜欢</div>
    <div class="item-like">

    </div>
        </div>
        <!-- ！猜你喜欢 -->

        <!-- 底部 -->
        <div class='foot'>
          <div class="foot-item">
            <van-icon :name="light ? 'star' : 'star-o'"/>收藏
            <img src="" alt=""></div>
          <div class="foot-item">在线咨询</div>
          <div class="foot-item tel">电话预约</div>
        </div>
        <!-- ！底部 -->
  </div>
</template>

<script>
import { getHouses } from '@/api/house.js'
import { favoritesTr } from '@/api/user.js'
import { mapState } from 'vuex'
export default {
  name: 'detail',
  data () {
    return {
      id: this.$route.params.id,
      houseDetail: [],
      light: false
    }
  },
  computed: {
    ...mapState(['code'])
  },
  created () {
    this.getHouseList()
    this.getFavoritesTr()
  },

  methods: {
    async getHouseList () {
      try {
        const res = await getHouses(this.id)
        this.houseDetail = res
      } catch (error) {
        console.dir(error)
      }
    },
    async getFavoritesTr () {
      const res = await favoritesTr(this.id)
      this.light = res.isFavorite
    }
  }
}
</script>

<style scoped lang="less">
.detail {
  padding: 0;
  margin: 0;
  background-color: #f5f5f9;
  // 头部
  .van-nav-bar {
    background-color: #21b97a;
    /deep/.van-nav-bar__title {
      font-size: 18px;
      color: #fff;
    }
    .iconFont {
      color: #fff;
      font-size: 18px;
    }
  }
  // 轮播图
  .my-swipe {
    height: 252px;
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      line-height: 150px;
      text-align: center;
      background-color: #39a9ed;
    }
  }
  // 房屋详细信息
  .houseInfo {
    padding: 15px;
    background: #fff;
    // 标题
    .houseInfoTitle {
      font-weight: 400;
      font-size: 16px;
      color: #333;
    }
    // 标签
    .tag {
      margin: 10px 0;
      margin-left: 0;
      .houseInfoTag {
        color: #39becd;
        background: #e1f5f8;
        display: inline-block;
        font-size: 12px;
        border-radius: 3px;
        padding: 4px 5px;
        margin-right: 5px;
        line-height: 12px;
      }
    }
    // 租金 房型
    /deep/.houseinfoPrice {
      box-sizing: border-box;
      height: 84px;
      padding: 15px 0;
      border-top: 1px solid #cecece;
      border-bottom: 1px solid #cecece;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .houseitem {
        width: 110px;
        text-align: center;
        h4 {
          color: #fa5741;
          margin: 0;
          font-size: 18px;
          font-weight: bolder;
        }
        p {
          margin: 0;
          font-size: 14px;
          color: #999;
        }
      }
    }
    // 装修 朝向
    .houseinfoBasic {
      height: 52px;
      display: flex;
      flex-wrap: wrap;
      .BasicItem {
        height: 26px;
        // flex: 2;
        width: 168px;
        font-size: 13px;
        color: #999;
        span {
          margin-left: 5px;
          color: #000;
        }
      }
    }
  }

  // 地图
  .houseMap {
    box-sizing: border-box;
    margin-top: 10px;
    height: 189px;
    .maptop {
      padding-left: 10px;
      font-size: 14px;
      color: #666;
      height: 44px;
      line-height: 44px;
      background-color: #fff;
      span {
        color: #333;
      }
    }

    .map {
      width: 100%;
      height: 145px;
      background-color: #21b97a;
    }
  }
  // 其他
  .about {
    box-sizing: border-box;
    height: 75px;
    margin-bottom: 10px;
    padding: 0 10px;
    background: #fff;
    .about-info {
      box-sizing: border-box;
      font-weight: 600;
      font-size: 15px;
      padding: 10px 0;
      border-bottom: 1px solid #cecece;
      margin-bottom: 5px;
    }
    .title-empty {
      font-size: 14px;
    }
  }

  // 房源信息
  .houseset {
    box-sizing: border-box;
    margin: 10px 0;
    height: 266px;
    padding: 0 10px;
    line-height: 150%;
    background: #fff;
    .set-title {
      height: 21px;
      line-height: 21px;
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 10px;
      padding: 15px 0;
      border-bottom: 1px solid #cecece;
    }
    .content {
      // 头
      .content-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .c-name {
          margin-bottom: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 52px;
            height: 52px;
            margin: 10px 10px 0 0;
          }
          .c-n-content {
            width: 81px;
            p {
              height: 21px;
              margin: 0;
              font-size: 14px;
              font-weight: 600;
            }
            span {
              font-size: 12px;
              color: #fa5741;
            }
          }
        }
      }
      // 内容
      .content-msg{
        height: 112px;
        font-size: 14px;
        line-height: 1.6;
    padding: 10px 0;
    color: #333;
      }
    }
  }
  // 猜你喜欢
  .user-like{ background-color: #fff;
  padding: 0 10px;
    .like-title {

      height: 21px;
      line-height: 21px;
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 10px;
      padding: 15px 0;
      border-bottom: 1px solid #cecece;
    }
    .item-like{
      height: 360px;
      background-color: pink;

    }
  }
  //底部
  .foot{
    height: 49px;
    background-color: #39becd;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #cecece;
    text-align: center;
    font-size: 17px;
    color: #999;
    background-color: #fff;
    display: flex;
    .foot-item{
      flex:1
    }
    .tel{
background-color: #21b97a;
color: #fff;
    }
  }
}
</style>
