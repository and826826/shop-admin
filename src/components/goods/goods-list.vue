<template>
    <div>
        <el-input v-model="goodsquery.query" placeholder="请输入内容" clearable @clear="getlist">
            <el-button slot="append" icon="el-icon-search" @click="getlist"></el-button>

        </el-input>
        <el-button @click="addgoods">添加商品</el-button>
        <el-table
    :data="tabledata"
    border
    style="width: 100%">
     <el-table-column
      type="index"
      width="50">
     </el-table-column>
    <el-table-column
      prop="goods_name"
      label="商品名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="goods_price"
      label="商品价格"
      width="180">
    </el-table-column>
    <el-table-column
      prop="goods_weight"
      label="商品重量">
    </el-table-column>
        <el-table-column
      prop="add_time"
      label="创建时间">
      <template slot-scope="scope">
          {{scope.row.add_time | dataFormat}}
      </template>
    </el-table-column>
        <el-table-column

      label="操作">
      <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleedit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handledelete(scope.row.goods_id)">删除</el-button>

      </template>
    </el-table-column>
  </el-table>
    <div class="block">
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            tabledata:[],
            goodsquery:{
                query:'',
                pagenum:1,
                pagesize:'10',
            },
            total:0

        }
    },
    created(){
        this.getlist()
        
    },
    methods:{
        handleSizeChange(i){
            this.goodsquery.pagesize=i
            this.getlist()

        },
        handleCurrentChange(i){
            this.goodsquery.pagenum=i
            this.getlist()

        },
        async getlist(){ 

            console.log('qqq')
            const {data:d}=await this.$http.get('goods',{params:this.goodsquery});
            if(d.meta.status!=200){
                return this.$message.error('获取商品失败')
            }
            this.tabledata=d.data.goods;
            this.total=d.data.total;
            console.log(d)
            console.log(this.total)
        },
        handleedit(){

        },
        async handledelete(id){
            console.log(id)
            const result=await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(res=>res)
        console.log(result)

        if(result=='confirm'){
            const {data:d}=await this.$http.delete(`goods/${id}`)
            console.log(d)
            if(d.meta.status!=200){
                return this.$message.error('删除失败')
            }
            this.$message.success('删除成功')
            this.getlist()
        }
        

        },
        addgoods(){
            this.$router.push('/goods/add')

        },
    }
    
}
</script>