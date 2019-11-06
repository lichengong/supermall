<template>
  <div id="app">
    <keep-alive exclude="Detail"><router-view/></keep-alive>
    <main-tab-bar class="tab-bar"/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'

export default {
  name: 'app',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import 'assets/css/base.css';
html,body{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app{
  width: 100%;
  height: 100%;
}
.tab-bar{
  background-color: #fff;
}
</style>
