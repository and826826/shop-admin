<template>
  <!-- <div class="home">
    <el-button @click="logout">退出</el-button>
  </div> -->
  <el-container>
  <el-header>商城后台管理系统
    <el-button @click="logout">用户退出</el-button>
  </el-header>

  <el-container>
    <el-aside :width="isCollapse ? '100px':'250px'">
      <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false" >展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group> -->
    <i class="el-icon-s-help" @click="change" style="margin:0 30%"></i>

<el-menu :default-active=$route.path class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" unique-opened router>
  <el-submenu :index="'/'+m.path" v-for="m in menu.data" :key="m.id">
    <template slot="title">
      <i :class="icons[m.id+'']"></i>
      <span slot="title">{{m.authName}}</span>
    </template> 
      <el-menu-item :index="'/'+c.path" v-for="c in m.children" :key="c.id">
        <template>
          <i class="el-icon-menu"></i>
          {{c.authName}}
        </template>
        

      </el-menu-item>
  </el-submenu>
  <!-- <el-submenu index="2">
    <template slot="title">
      <i class="el-icon-s-help"></i>
      <span slot="title">权限管理</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="2-1">角色列表</el-menu-item>
      <el-menu-item index="2-2">权限列表</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
  <el-submenu index="3">
    <template slot="title">
      <i class="el-icon-s-shop"></i>
      <span slot="title">商品管理</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="3-1">商品列表</el-menu-item>
      <el-menu-item index="3-2">分类参数</el-menu-item>
      <el-menu-item index="3-3">商品分类</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
    <el-submenu index="4">
    <template slot="title">
      <i class="el-icon-tickets"></i>
      <span slot="title">订单管理</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="4-1">订单列表</el-menu-item>
    </el-menu-item-group>
    </el-submenu>

    <el-submenu index="5">
    <template slot="title">
      <i class="el-icon-data-analysis"></i>
      <span slot="title">数据统计</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="5-1">数据报表</el-menu-item>
    </el-menu-item-group>
  </el-submenu> -->
</el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>


export default {
  name: 'Home',
  components: {
  },
  data(){
    return{
      isCollapse: false,
      menu:[],
      icons:{
        '125':'el-icon-user',
        '103':'el-icon-s-grid',
        '101':'el-icon-s-shop',
        '102':'el-icon-s-claim',
        '145':'el-icon-s-data'
      }
    }
  },
  created(){
    this.getlist()

  },
  methods:{
     async getlist(){
      const {data:d} =await this.$http.get('menus') ;
      console.log(d);
      this.menu=d;


    },
    logout(){
      window.sessionStorage.clear();
      this.$router.push('/login')
    },
    change(){
        console.log('true')
        this.isCollapse=!this.isCollapse;
      },

    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }

  }
}
</script>
<style scoped>
.el-header{
  background-color: #5f809f;
  color: white;
}
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>