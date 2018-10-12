<template>
  <div class="index">
    <div class="rightBox" id="registerBox" v-show="!registerOrLogin">
      <div class="title"><span>注册</span></div>
      <div class="line"><span class="colDark">用户名：</span><input v-model="username" name="username" type="text"></div>
      <div class="line"><span class="colDark">密码：</span><input  v-model="password" name="password" type="password"></div>
      <div class="line"><span class="colDark">确认：</span><input v-model="repassword" name="repassword" type="password"></div>
      <div class="line"><span class="colDark"></span><button @click="registerClick">注 册</button></div>
      <p class="textRight">已有账号？<a href="javascript:;" class="colMint" @click="gotoLogin('login')">马上登录</a>　</p>
      <p class="colWarning textCenter">{{registerMsg}}</p>
    </div>

    <div class="rightBox" id="loginBox" v-show="registerOrLogin">
      <div class="title"><span>登录</span></div>
      <div class="line"><span class="colDark">用户名：</span><input v-model="loginUsername" name="username" type="text"><em></em></div>
      <div class="line"><span class="colDark">密码：</span><input v-model="loginPassword" name="password" type="password"><em></em></div>
      <div class="line"><span class="colDark"></span><button @click="loginClick">登 录</button></div>
      <p class="textRight">还没注册？<a href="javascript:;" class="colMint" @click="gotoLogin('register')">马上注册</a>　</p>
      <p class="colWarning textCenter">{{loginMsg}}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import utils from '@static/util/util.js'
export default {
  name: 'index',
  data () {
    return {
      username: '',
      password: '',
      repassword: '',
      registerMsg: '请填写注册信息',
      registerOrLogin: true,
      loginUsername: '',
      loginPassword: '',
      loginMsg: '请填写登录信息'
    }
  },
  mounted () {
    this.checkCookie()
  },
  methods: {
    checkCookie () {
      let userInfo = JSON.parse(utils.getCookie('userInfo'))
      if( JSON.parse(utils.getCookie('userInfo'))){

        this.loginUsername = userInfo.username;
        this.loginPassword = userInfo.password;

      }
    },
    //注册按钮
    registerClick () {
      if( !this.username || !this.password || !this.repassword){
        this.registerMsg = '请填写完整的注册信息';
        return;
      }
      axios.post('/api/user/register', {
        'username': this.username,
        'password': this.password,
        'repassword': this.repassword
      })
      .then((res)=>{
        this.registerMsg = res.message;
        if(res.sucess){
          this.registerOrLogin = false;
        }
      })

    },
    //登陆按钮
    loginClick () {
      let that = this;
      if( !this.loginUsername || !this.loginPassword){
        alert('请填写完整登陆信息')
        return;
      }

      axios.post('/api/user/login', {
        'username': this.loginUsername,
        'password': this.loginPassword,
      })
      .then((res)=>{
        if(res.sucess){
          this.loginMsg = "登录成功"

          setTimeout(()=>{
            that.$router.push({
              path: '/list'
            })
          }, 1000)
        }
      })

      
    },
    gotoLogin (type) {
      
      this.registerOrLogin = type =='login' ? true : false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index{
  background: #fff;
  padding: 16px 30px;
  width: 360px;
  height: 344px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.rightBox .title {
  border-bottom: 1px solid #ebebeb;
  font-size: 18px;
  margin-bottom: 20px;
}
.rightBox .title span {
  display: inline-block;
  margin-bottom: -1px;
  height: 36px;
  line-height: 36px;
  border-bottom: 1px solid #e67e22;
  padding: 0px 20px 0px 0px;
}
.rightBox button {
  background: #e67e22;
  width: 100%;
  height: 34px;
  cursor: pointer;
  border-radius: 3px;
  color: #fff;
  font-size: 12px;
  font-family: '微软雅黑';
}
.rightBox .line {
  margin-bottom: 10px;
  position: relative;
}
.rightBox .line.error em {
  width: 20px;
  height: 20px;
  display: block;
  position: absolute;
  top: 8px;
  right: 25px;
  cursor: pointer;
  /* background: url(../images/close.png) no-repeat center center; */
  background-size: 80% 80%;
}
.rightBox .line span {
  width: 60px;
  display: inline-block;
  text-align: right;
}
.rightBox .line input {
  width: 210px;
  height: 34px;
  line-height: 34px;
  border: 1px solid #ddd;
  background: none;
  padding: 0px 5px;
}
.rightBox .line button {
  background: #e67e22;
  width: 222px;
  height: 34px;
  cursor: pointer;
  border-radius: 3px;
  color: #fff;
  font-size: 12px;
  font-family: '微软雅黑';
}
.rightBox .line em {
  display: none;
}
</style>
