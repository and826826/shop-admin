<template>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径"
      width="180">
    </el-table-column>
    <el-table-column
      prop="level"
      label="权限等级">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [

        ]
      }
    },
    created(){
        this.getpermissonlist()

    },
    methods:{
        async getpermissonlist(){
            const {data:d}= await this.$http.get('rights/list');
            if(d.meta.status!=200){
                return this.$message.error('获取权限列表失败');
            }
            this.tableData=d.data;
        }

    }
  }
</script>