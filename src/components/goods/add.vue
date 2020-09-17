<template>
    <div>
        <el-alert
    title="添加商品信息"
    type="info" center :closable="false">
  </el-alert>

  <el-steps :space="200" :active="active" finish-status="success">
  <el-step title="基本信息"></el-step>
  <el-step title="商品参数"></el-step>
  <el-step title="商品属性"></el-step>
  <el-step title="商品图片"></el-step>
  <el-step title="商品内容"></el-step>
  <el-step title="完成"></el-step>
</el-steps>

<el-form v-model="addform" ref="addform" :rules="rules" 
 label-position="top">
<el-tabs v-model="active" tab-position="left" style="height: 200px;">
    <el-tab-pane label="基本信息" name="0">
        <el-form-item
    label="商品名称"
    prop="goodsname"

  >
    <el-input v-model="addform.goodsname" autocomplete="off"></el-input>
  </el-form-item>
    </el-tab-pane>
    <el-tab-pane label="商品参数" name="1">配置管理</el-tab-pane>
    <el-tab-pane label="商品属性" name="2">角色管理</el-tab-pane>
    <el-tab-pane label="商品图片" name="3">定时任务补偿</el-tab-pane>
    <el-tab-pane label="商品内容" name="4">角色管理</el-tab-pane>
  </el-tabs>
</el-form>

    </div>
    
</template>

<script>
export default {
    data(){
        return {
            active:0,
            addform:{

            },
            rules:[]
        }
    }
    
}
</script>

<style scoped>
.el-steps{
    margin: 20px 0;
}
</style>