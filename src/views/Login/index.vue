<template>
  <div class="login">
    <van-nav-bar
      title="账号登录"
      @click-left="onClickLeft"
    >
    <template #left>
      <van-icon name="cross" class="iconFont" />
    </template>
    </van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="Form.username"
        name="用户名"
        placeholder="请输入账号"
        :rules="[
        { required: true, message: '请填写4到16位包括字母，数字，下划线，减号' },
        {pattern:/^[a-zA-Z0-9_-]{4,16}$/}
        ]"
      />
      <van-field
        v-model="Form.password"
        type="password"
        name="密码"
        placeholder="请输入密码"
        :rules="[
        { required: true, message: '请填写最少6位，包括至少1个大写字母，1个小写字母' },
        {pattern:/^[a-zA-Z0-9_-]{4,16}$/}
        ]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <div class="login_reg">
      <a href="">还没有账号，去注册~</a>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  data () {
    return {
      Form: {
        username: '',
        password: ''
      }
    }
  },

  created () {

  },

  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    async onSubmit () {
      const res = await login(this.Form)
      console.log(res)
    }
  }
}
</script>

<style scoped lang='less'>
.login{
  .van-nav-bar{
    background-color: #21b97a;
    .iconFont{
      color: #fff;
      font-size: 18px;
    }
    /deep/.van-nav-bar__title{
      font-size: 18px;
      color: #fff;
    }
  }
  .van-button{
    background-color: #21b97a;
    border:none;
  }
  .login_reg{
    font-size: 14px;
    text-align: center;
    a{
      color: #666;
    }
  }
}
</style>
