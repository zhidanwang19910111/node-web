<template>
  <div id="app">
    <div class="header-wrap">
      <div class="logout" @click="logoutClick" v-show="isLogin">退出</div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios';

import Utils from '@static/util/util.js'
import {mapState} from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },
  methods: {
    logoutClick () {
      axios.post('/api/user/logout')
      .then( res => {
        console.log(res)
        if( res.sucess ){
          this.$store.dispatch('logout')
          this.$router.replace({
            path: '/'
          })
        }
      })
    }
  }
}
</script>

<style>
body{
  margin: 0px;
  background: #ebebeb;
  font-family: '微软雅黑';
  font-size: 14px;
}
/* LESS Document */
body {
  margin: 0px;
  background: #ebebeb;
  font-family: '微软雅黑';
  font-size: 14px;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
}
button {
  border: none;
}
.bgDefault {
  background-color: #515151!important;
  color: #FFF;
}
.bgPrimary {
  background-color: #579ddb!important;
  color: #FFF;
}
.bgInfo {
  background-color: #46b9d8!important;
  color: #FFF;
}
.bgSuccess {
  background-color: #97c664!important;
  color: #FFF;
}
.bgMint {
  background-color: #48c5a3!important;
  color: #FFF;
}
.bgWarning {
  background-color: #eaa642!important;
  color: #FFF;
}
.bgDanger {
  background-color: #f76447!important;
  color: #FFF;
}
.bgPink {
  background-color: #e15671!important;
  color: #FFF;
}
.bgPurple {
  background-color: #986291!important;
  color: #FFF;
}
.bgDark {
  background-color: #363c40!important;
  color: #FFF;
}
.bgBlue {
  background-color: #27b9dd!important;
  color: #FFF;
}
.bgGray {
  background-color: #CCC!important;
  color: #FFF;
}
.colDefault {
  color: #515151 !important;
}
.colPrimary {
  color: #579ddb !important;
}
.colInfo {
  color: #46b9d8 !important;
}
.colSuccess {
  color: #97c664 !important;
}
.colMint {
  color: #48c5a3 !important;
}
.colWarning {
  color: #eaa642 !important;
}
.colDanger {
  color: #f76447 !important;
}
.colPink {
  color: #e15671 !important;
}
.colPurple {
  color: #986291 !important;
}
.colDark {
  color: #363c40 !important;
}
.colBlue {
  color: #27b9dd !important;
}
.textRight {
  text-align: right;
}
.textLeft {
  text-align: left;
}
.textCenter {
  text-align: center;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clear:after,
.clear:before {
  content: "";
  display: table;
}
.clear:after {
  clear: both;
}
.clear {
  *zoom: 1;
}
</style>
