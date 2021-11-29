<template>
  <div>
      <div class="My_title">
          <div class="bgimg"></div>
          <!--未登录页面 -->
          <div class="userinfo" v-if="!user">
            <div class="avatar">
              <img src="http://liufusong.top:8080/img/profile/avatar.png" alt="">
            </div>
            <div class="user-login">
              <span class="username">youke</span>
              <van-button color='#21b97a' block size="normal" type="primary" to='/login'>去登陆</van-button>
            </div>
          </div>
        <!--！登录页面 -->
          <div class="userinfo" v-else>
              <div class="avatar">
                <img :src="'http://liufusong.top:8080'+userInfo.avatar" alt="">
              </div>
              <div class="user-login">
                <span class="username">{{userInfo.nickname}}</span>
                <van-button class="login_out" color='#21b97a' round type="info" size="normal" @click="login_out">退出</van-button>
                <div class="user_">编辑个人资料<van-icon name="play" /></div>
              </div>
          </div>
      </div>

      <!-- 分类导航 -->
      <div>
        <van-grid :column-num="3" :border='false' clickable>
          <van-grid-item icon="star-o" text="我的收藏" to="/favorate" />
          <van-grid-item icon="wap-home-o" text="我的出租" to="/rent" />
          <van-grid-item icon="clock-o" text="看房记录" />
          <van-grid-item icon="idcard" text="成为房主" />
          <van-grid-item icon="contact" text="个人资料" />
          <van-grid-item icon="service-o" text="联系我们" />
        </van-grid>
      </div>
      <!-- ！分类导航 -->
      <!-- 广告 -->
      <div class='ad'><img src="http://liufusong.top:8080/img/profile/join.png" alt=""></div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { mapState } from 'vuex'
import { user } from '@/api/user.js'
export default {
  nma: 'accout',
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.getUserInfo()
  },

  methods: {
    login_out () {
      Dialog.confirm({
        title: '提示',
        message: '是否确定退出'
      })
        .then(() => {
          // on confirm
          this.$store.commit('removeStorage')
        })
        .catch(() => {
          // on cancel
        })
    },
    async getUserInfo () {
      try {
        const res = await user()
        this.userInfo = res
      } catch (error) {

      }
    }
  }
}
</script>

<style scoped lang='less'>
//登录头部
.My_title{
  position: relative;
  width: 100%;
  min-height: 300px;
  .bgimg{
  height: 191px;
  // background-color: aqua;
  background-image: url(http://liufusong.top:8080/img/profile/bg.png);
  background-size: 100% 100%;
}
// 用户信息
.userinfo{
    position: absolute;
    background: #fff;
    width: 280px;
    height: 165px;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 10px 3px #ddd;
    margin: 50px auto 0;
    padding: 0 20px;
    text-align: center;
    font-size: 13px;
// 头像
    .avatar{
    position: absolute;
    top: -50px;
    left: 125px;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    border: 5px solid #f5f5f5;
    display: inline-block;
    box-shadow: 0 2px 2px #bdbdbd;
    img{
      width: 100%;
    }
    }
    // 按钮登录
    .user-login{
      margin-top: 50px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .username{
        font-size: 14px;
      }
      .van-button{
        margin-top: 15px;
        width: 71px;
        height: 30px;
        padding: 0;
        border-radius: 10%;
        // height: 58px;
      }
      .login_out{
        border-radius: 30px;
        color: #fff;
        padding: 2px 15px;
        background-color: #21b97a;
        font-size: 12px;
        margin-bottom: 15px;
      }
       .user_{
          font-size: 12px;
          color: #999;
        }
    }
}
}
// 广告
.ad{
  // box-sizing: border-box;
  width: 375px;
  height: 87px;
  text-align: center;
  img{
    width: 92%;
    height: 100%;
  }
}
</style>
