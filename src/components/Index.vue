<template>
  <div class="index">
    <v-header></v-header>
    <div style="width: 100%;height:calc(100% - 70px);display: flex">
      <!-- 侧边栏 -->
      <v-sidebar></v-sidebar>
      <div class="cen">
        <!-- 面包屑 -->
        <v-tags></v-tags>
        <!-- 内容 -->
        <div class="content">
          <!-- 动画 -->
          <transition name="move" mode="out-in">
            <!-- 保持其他的页面 -->
            <keep-alive :include="tagsList">
              <!-- 展示页面 -->
              <router-view></router-view>
            </keep-alive>
          </transition>
          <el-backtop target=".content"></el-backtop>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import vHeader from '../components/navigation/Header'
import vSidebar from '../components/navigation/Sidebar'
import vTags from '../components/navigation/Tags'

export default {
  name: 'Index',
  components: {
    vHeader,
    vSidebar,
    vTags
  },
  data() {
    return {
      collapse: false,
      tagsList:[]
    }
  }
}
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
}
.cen{
  /*background-color:#2d8cf0;*/
  float: left;
  height: 100%;
  flex: 1
}
.content{
  margin-top: 35px;
  padding: 5px;
}
</style>
