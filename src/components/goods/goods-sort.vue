<template>
    <div>
        <el-button type="primary" @click="handleadd">添加分类</el-button>
        <tree-table :data="tableData" :columns="columns"
        :selection-type="false" :expand-type="false"
        show-index border :show-row-hover="false" >

        <template slot="isok" slot-scope="scope">
            <i class="el-icon-success" v-if="scope.row.cat_deleted==false" style="color:green;"></i>
            <i class="el-icon-error" v-else style="color:red;"></i>

        </template>

        <template slot="order" slot-scope="scope">
            <el-tag v-if="scope.row.cat_level==0">一级</el-tag>
            <el-tag v-else-if="scope.row.cat_level==1">二级</el-tag>
            <el-tag v-else>三级</el-tag>

        </template>

        <template slot="action" slot-scope="scope" >
            <el-button  @click="editcategory(scope.row)">编辑</el-button>
            <el-button @click="deletecategory(scope.row.cat_id)">删除</el-button>

        </template>

        </tree-table>
   <div class="block">
    <span class="demonstration">调整每页显示条数</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="sizes, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>

<el-dialog
  title="修改分类"
  :visible.sync="editcategoriesVisible"
  width="30%"
>
<div>
    <el-form  :rules="rules" ref="categoriesForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="分类名称" prop="name">
    <el-input v-model="editcategories.cat_name"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="editcategoriesVisible=false">取消</el-button>
    <el-button type="primary" @click="puteditcategories">确认</el-button>
  </el-form-item>
</el-form>


</div>
</el-dialog>

  
<el-dialog
  title="分配角色"
  :visible.sync="addcategoriesVisible"
  width="30%"
>
<div>
    <el-form  :rules="rules" ref="categoriesForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="分类名称" prop="name">
    <el-input v-model="cat_name"></el-input>
  </el-form-item>
  <el-form-item label="父级分类"> 
    <div class="block">

  <el-cascader
    v-model="value"  :clearable=true
    :options="parent"
    :props="{ expandTrigger:'hover',value:'cat_id',label:'cat_name',checkStrictly :true }"
    ></el-cascader>
  </div>
  </el-form-item>
  
  <el-form-item>
    <el-button type="primary" @click="addcategoriesVisible=false">取消</el-button>
    <el-button type="primary" @click="addcategories">确认</el-button>
  </el-form-item>
</el-form>


</div>
</el-dialog>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        categories:{
            type:3,
            pagenum:1,
            pagesize:5,
        },
        rules:{
            // name:[
            //      { required: true, message: '请输入分类名称', trigger: 'blur' },
            // ]


        },
        cat_name:'',
        addcategoriesVisible:false,
        addcategory:{},
        editcategoriesVisible:false,
        editcategories:{},
        parent:{},
        addcat:{
          cat_name:'',
          cat_pid:0,
          cat_level:0

        },
        value:[],
        total:0,
        columns:[
            {
                label:'分类名称',
                prop:'cat_name'
            },
            {
                label:'是否有效',
                type:'template',
                template:'isok'
            },
            {
                label:'排序',
                type:'template',
                template:'order'
            },
            {
                label:'操作',
                type:'template',
                template:'action'
            }
        ]
      }
    },
    created(){
        this.getcategories()

    },
    methods:{
      async deletecategory(id){
        const reslut=await this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          }); })   
          console.log(reslut,id)
          if(reslut=='confirm'){
            const {data:d}=await this.$http.delete(`categories/${id}`)
            console.log(d)
            if(d.meta.status!=200){
              return this.$message.error('删除失败')
            }
            this.$message.success('删除成功');
            this.getcategories()
          } 


      },
      editcategory(item){
        console.log(item.cat_name)
        this.editcategories=item;
        this.editcategoriesVisible=true;


      },
      async puteditcategories(){
        console.log(this.editcategories);
        if(this.editcategories.cat_name){
          const {data:d}=await this.$http.put(`categories/${this.editcategories.cat_id}`,this.editcategories);
          if(d.meta.status!=200){
            return this.$message.error('修改失败')
          }
          this.$message.success('修改成功')
          this.getcategories()
          this.editcategoriesVisible=false
        }

      },

        async handleadd(){
            const {data:d}=await this.$http.get('categories',{params:{type:2}})
            console.log(d);
            if(d.meta.status!=200){
                return this.$message.error('获取父级分类失败')
            }
            this.parent=d.data;

            this.addcategoriesVisible=true

        },
        async addcategories(){
          this.addcategory.cat_name=this.cat_name;
          if(this.value.length<1){
            this.addcategory.cat_level=0;
            this.addcategory.cat_pid=0;
          }
          else{
            this.addcategory.cat_pid=this.value[this.value.length-1];
            this.addcategory.cat_level=this.value.length;

          }
          
  

          console.log(this.value.length)

          console.log(this.value[this.value.length-1]);
          console.log(this.cat_name);
          const {data:d}=await this.$http.post('categories',this.addcategory)
          if(d.meta.status!=201){
            return this.$message.error('添加失败')
          }
          this.$message.success('添加成功')
          this.getcategories()
          this.addcategoriesVisible=false;



        },
        async getcategories(){
            const {data :d}=await this.$http.get('categories',{params:this.categories})
            console.log(d)
            if(d.meta.status!=200){
                return this.$message.error('获取失败')
            }
            this.tableData=d.data.result;

            this.total=d.data.total;

        },
        handleSizeChange(i){
            this.categories.pagesize=i;
        },
        handleCurrentChange(pagenum){
            this.categories.pagenum=pagenum;
            this.getcategories()

        }
    }
  }
</script>