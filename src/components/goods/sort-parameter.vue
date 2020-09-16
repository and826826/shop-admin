<template>
    <div>
          <el-alert
    title="只能选中三级分类"
    type="warning"
    show-icon  :closable="false">
  </el-alert>
  <el-row >
      <el-col>
          <span> 选择商品分类</span>
          <div class="block">
        <span class="demonstration">单选选择任意一级选项</span>
            <el-cascader
            :options="allcategories"
            :props="{ value:'cat_id',label:'cat_name',children:'children',expandTrigger: 'hover',checkStrictly: true }"
            clearable  v-model="choosecategories" @change="handlechange"></el-cascader>
</div>
      </el-col>
  </el-row>
  <el-row>
        <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="动态参数" name="many">
    <el-button type="primary" size="mini" :disabled="isdisable" @click="handleadd">添加参数</el-button>
    <el-table :data="manydata" border stripe>
        <el-table-column type="expand">
            <template slot-scope="scope">
                {{scope.row.attr_vals}}

            </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="参数名称" prop="attr_name"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit"
                @click="handleedit(scope.row)">
                    编辑

                </el-button>
                <el-button size="mini" type="danger" icon="el-icon-edit"
                @click="handledelete(scope.row)">
                    删除

                </el-button>
            </template>

        </el-table-column>

    </el-table>
    </el-tab-pane>

    <el-tab-pane label="添加属性" name="only">
    <el-button type="primary" size="mini" :disabled="isdisable" @click="handleadd">添加属性</el-button>
        <el-table :data="onlydata" border stripe>
        <el-table-column type="expand"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="参数名称" prop="attr_name"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit"
                @click="handleedit(scope.row)">
                    编辑

                </el-button>
                <el-button size="mini" type="danger" icon="el-icon-edit"
                @click="handledelete(scope.row)">
                    删除

                </el-button>
            </template>

        </el-table-column>

    </el-table>
    </el-tab-pane>
  </el-tabs>
  </el-row>
<el-dialog
  :title="'添加'+titletext"
  :visible.sync="adddialogVisible"
  width="30%">
  <el-form :model="addfrom" ref="addValidateForm" label-width="100px" class="demo-ruleForm">
  <el-form-item
    label="参数名"
    prop="attr_name"
    :rules="[
      { required: true, message: '参数名不能为空',trigger:'blur'},
    
    ]"
  >
    <el-input  v-model="addfrom.attr_name" ></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="adddialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addparams">确 定</el-button>
  </span>
</el-dialog>

    <el-dialog :title="'修改'+titletext" :visible.sync="editVisible" width="50%" >
      <el-form :model="editfrom" ref="editform" >
          <el-form-item :label="titletext" prop="attr_name">
              <el-input v-model="editfrom.attr_name"></el-input>
              </el-form-item> 
               </el-form>
             <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="editparams">确 定</el-button>
            </span>

  </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            allcategories:[],
            choosecategories:'',
            activeName:'many',
            manydata:[],
            onlydata:[],
            addfrom:{
                attr_name:''
            },
            editfrom:{
                attr_name:''
            },
            adddialogVisible:false,
            editVisible:false,
            addrule:{
                attr_name:[{
                    required:true,message:'不能为空',trigger:'blur'
                }]
            }

        }
    },
    created(){
        this.getcategories()
    },
    methods:{
        async handledelete(item){
            console.log(item.attr_id)
            console.log(this.choseid)
            const result=await this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(res=>res)
        console.log(result)
        if(result=='confirm'){
            const {data:d}=await this.$http.delete(`categories/${this.choseid}/attributes/${item.attr_id}`)
            console.log(d)
            if(d.meta.status!=200){
                return this.$message.error('删除失败')
            }
            this.$message.success('删除成功')
            this.get()

        }

        },
        editparams(){
            this.$refs.editform.validate(
                async valid=>{
                    if(!valid){ return }
                    const {data:d}=await this.$http.put(`categories/${this.choseid}/attributes/${this.editfrom.attr_id}`,this.editfrom)
                    console.log(d)
                    if(d.meta.status!=200){
                        return this.$message.error('修改失败')
                        
                    }
                    this.$message.success('修改成功')
                    this.get()
                    this.editVisible=false
                }
            )

        },
        addparams(){
            console.log('add')
            this.$refs.addValidateForm.validate(
                async valid=>{
                    console.log(valid)
                    if(!valid) {return}
                    const {data:d}=await this.$http.post(`categories/${this.choseid}/attributes`,{attr_name:this.addfrom.attr_name,
                    attr_sel:this.activeName});
                    if(d.meta.status!=201){
                       return this.$message.error('添加失败')
                    }
                    this.$message.success('添加成功');
                    this.get()
                    this.adddialogVisible=false;



                }
            )
            console.log('aaa')
            this.addVisible=false
        },
        handleedit(itme){
            this.editfrom=itme
            this.editVisible=true
            

        },
        handleClick(){
            this.get()

        },
        handlechange(){
            this.get()

        },
        async get(){
            if(this.choosecategories.length!=3){
                this.choosecategories=[]
                return

            }
            console.log(this.choosecategories)
            const {data:d}=await this.$http.get(`categories/${this.choseid}/attributes`,{
                params:{sel:this.activeName}
            })
            console.log(d);
            if(d.meta.status!=200){
                this.$message.error('获取失败')
            }
            if(this.activeName=='many'){
                this.manydata=d.data
            }
            else{
                this.onlydata=d.data
            }


        },
        async getcategories(){
            const {data:d}=await this.$http.get('categories');
            if(d.meta.status!=200){
                return this.$message.error('获取商品分类失败')
            }
            this.allcategories=d.data;

        },
        handleadd(){
            this.adddialogVisible=true;
        },
        addclose(){
            this.$refs.addfromref.resetFields()
        }
    }
    ,
    computed:{
        isdisable(){
            if(this.choosecategories.length!=3){
                return true
            }
            return false
        },
        choseid(){
            if(this.choosecategories.length==3){
                return this.choosecategories[2]
            }
            return null
        },
        titletext(){
            if(this.activeName=='many'){
                return '动态参数'
            }
            return '静态参数'
        }
    }
    
}
</script>