<template>
  <div>
    <van-nav-bar title="用户登录" left-text="返回" left-arrow @click-left="goBack"/>

    <van-form validate-first @failed="onFailed" @submit="Login">
      <div class="register-panel">
        <van-field
          v-model="userName"
          label="用户名"
          icon="clear"
          placeholder="用户名"
          required
          :rules="[{ required: true, message: '请填写用户名' }]"
          @click-icon="userName = ''"
        />

        <van-field
          v-model="passWord"
          type="password"
          label="密码"
          required
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
        <div class="register-button">
          <van-button
            type="primary"
            size="large"
            :loading="getloadingFlagBtn"
          >登录</van-button>
        </div>
      </div>
    </van-form>
  </div>
</template>

<script>
import url from '@/server/serviceAPI.config.js'
export default {
  name: 'Login',
  data () {
    return {
      userName: '',
      passWord: ''
    }
  },
  created () {
    if (localStorage.userInfo) {
      this.$router.push('/')
    }
  },
  computed: {
    getloadingFlagBtn () {
      return this.$store.getters.getloadingFlagBtn
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    // 注册用户
    Login () {
      const rqData = {}
      rqData.userName = this.userName
      rqData.passWord = this.passWord
      this.$store.commit('setLoadingFlag', true)
      this.axios.post(url.login, rqData).then(res => {
        this.$store.commit('setLoadingFlag', false)
        this.$util.toastSuccess('登录成功')
        localStorage.userInfo = {userName: this.userName}
        this.$router.push('/')
      })
    },
    onFailed () {
      this.$util.toastFail('表单验证失败！')
    }
  }
}
</script>

<style scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.register-button {
  padding-top: 10px;
}
</style>
