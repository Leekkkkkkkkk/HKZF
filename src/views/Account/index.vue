<template>
  <div>
      <div class="My_title">
          <div class="bgimg"></div>
          <!--未登录页面 -->
          <div class="userinfo">
            <div class="avatar">
              <img src="http://liufusong.top:8080/img/profile/avatar.png" alt="">
            </div>
            <div class="user-login">
              <span class="username">youke</span>
              <van-button color='#21b97a' block size="normal" type="primary" to='/login'>去登陆</van-button>
            </div>
          </div>
        <!--！未登录页面 -->
      </div>

      <!-- 分类导航 -->
      <div>
        <van-grid :column-num="3">
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
        </van-grid>
      </div>
      <!-- ！分类导航 -->

      <!-- 广告 -->
      <div class='ad'><img src="http://liufusong.top:8080/img/profile/join.png" alt=""></div>
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
