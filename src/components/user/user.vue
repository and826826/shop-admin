<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <template>
  <el-table
    :data="tableData.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">

    <el-table-column
      label="姓名"
      prop="username">
    </el-table-column>
    <el-table-column
      label="邮箱"
      prop="email">
    </el-table-column>
    <el-table-column
      label="电话"
      prop="mobile">
    </el-table-column>
    <el-table-column
      label="角色"
      prop="role_name">
    </el-table-column>
    <el-table-column
      label="状态">
      <template slot-scope="scope">
    <el-switch
      v-model="scope.row.mg_state"      

      active-color="#13ce66"
      inactive-color="#ff4949">
    </el-switch>
      </template>
      
    </el-table-column>
    <el-table-column
      align="left" width="200px">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入姓名搜索" :m="scope"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
          <el-button
          size="mini"
          @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-setting"></i></el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync=queryInfo.pagenum
      :page-size=queryInfo.pagesize
      layout="prev, pager, next, jumper"
      :total=total>
    </el-pagination>
  </div>
  </template>
</div>
</template>

<script>

export default {
    data(){
        return{
         tableData: [],
        search: '',
        queryInfo:{
        query:'',
        pagenum:1,
        pagesize:3
        },
        total:0,

        }
    },
    created(){
        this.getuserlist();


    },
    methods: {
    async getuserlist(){
        const {data:d}=await this.$http.get('users',{params:this.queryInfo});
            if(d.meta.status!=200){
                return this.$message("获取用户失败")
            }
          console.log(d)
        this.tableData=d.data.users;
        this.total=d.data.total;
    },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
            handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.queryInfo.pagenum=val;
        console.log(this.queryInfo.pagenum)
      }
    
    },
    
}
</script>