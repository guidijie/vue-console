<template>
  <div class="sidebar">
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo no-border"
             @select="select01"
             :collapse="isCollapse" background-color="#545c64"
             text-color="#fff"
             active-text-color="#409eff"
             router>
      <template v-for="item in items">
        <!-- 判断是否有子元素，有就遍历 -->
        <template v-if="item.subs">
          <!-- 渲染子菜单 -->
          <el-submenu :index="item.index" :key="item.index">
            <!-- 菜单的图标标题 -->
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <!-- 判断是否还有子元素，有就遍历 -->
            <template v-for="subItem in item.subs">
              <!-- 判断是否还有子元素，有就遍历 -->
              <el-submenu
                  v-if="subItem.subs"
                  :index="subItem.index"
                  :key="subItem.index"
              >
                <!-- 标题 -->
                <template slot="title">{{ subItem.title }}</template>
                <!-- 遍历子元素，输出title -->
                <el-menu-item
                    v-for="(threeItem,i) in subItem.subs"
                    :key="i"
                    :index="threeItem.index"
                >
                  {{ threeItem.title }}
                </el-menu-item>
              </el-submenu>
              <!-- 没有子元素，直接输出title -->
              <el-menu-item
                  v-else
                  :index="subItem.index"
                  :key="subItem.index"
              >
                <i :class="subItem.icon"></i>
                <span slot="title">{{ subItem.title }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!-- 没有子元素，直接渲染 -->
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import v from '../../commons/event';

export default {
  name: "Sidebar",
  data() {
    return {
      isCollapse: false,
      items: [
        {
          icon: 'el-icon-s-home',
          index: 'aaa',
          title: '系统首页'
        },
        {
          icon: 'el-icon-user-solid',
          index: 'bbb',
          title: '用户管理'
        },
        {
          icon: 'el-icon-shopping-bag-1',
          index: 'sp',
          title: '商品管理',
          subs: [
            {
              icon: 'el-icon-circle-plus',
              index: 'ccc',
              title: '新增商品'
            },
            {
              icon: 'el-icon-s-order',
              index: 'goodsType',
              title: '类别管理'
            },
            {
              icon: 'el-icon-zoom-in',
              index: 'goodsAll',
              title: '所有商品',
            }
          ]
        },
        {
          icon: 'el-icon-shopping-cart-2',
          index: 'order',
          title: '订单管理'
        },
        {
          icon: 'el-icon-error',
          index: 'error',
          title: '错误页面'
        },


      ]
    };
  },
  methods: {
    select01(key, keyPath) {
      console.log(key, keyPath);

    }
  },
  created() {
    // 通过 v 对象进行组件间通信，来折叠侧边栏
    v.$on('isShow', msg => {
      if (msg === 'true') {
        msg = true
      } else if (msg === 'false') {
        msg = false
      }
      this.isCollapse = msg;
    });
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 200px;
}

.sidebar {
  left: 0;
  bottom: 0;
  height: 100%;
  overflow-y: scroll;
}

.no-border {
  border-right: solid 0 #e6e6e6;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar > ul {
  height: 100%;
}
</style>
