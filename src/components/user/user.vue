<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <template>
      <el-button @click="dialogVisible=true">添加用户</el-button>
      <el-dialog
  title="添加"
  :visible.sync="dialogVisible"
  width="30%"
  @close="handleClose">
 <el-form :model="user" :rules="rules" ref="addform" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="user.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="user.password"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="user.email"></el-input>
  </el-form-item>
  <el-form-item label="手机" prop="mobile">
    <el-input v-model="user.mobile"></el-input>
  </el-form-item>
 </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="adduser">确 定</el-button>
  </span>
</el-dialog>
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
      inactive-color="#ff4949"  @change="statechange(scope.row)">
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
          @click="handleEdit(scope.row.id)"><i class="el-icon-edit"></i>
          </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete( scope.row.id)"><i class="el-icon-delete"></i></el-button>

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
      :current-page.sync="queryInfo.pagenum"
      :page-size="queryInfo.pagesize"
      layout="prev, pager, next, jumper"
      :total=total>
    </el-pagination>
  </div>

<el-dialog
  title="修改用户"
  :visible.sync="editVisible"
  width="30%"
  @close="editclose"
>
<el-form :model="editform" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="editform.username" disabled></el-input>
  </el-form-item>
    <el-form-item label="邮箱" prop="email">
    <el-input v-model="editform.email"></el-input>
  </el-form-item>
    <el-form-item label="电话" prop="mobile">
    <el-input v-model="editform.mobile"></el-input>
  </el-form-item>
</el-form> 
  <span slot="footer" class="dialog-footer">
    <el-button @click="editVisible = false">取 消</el-button>
    <el-button type="primary" @click="edituser()">确 定</el-button>
  </span>
</el-dialog>

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
        dialogVisible: false,
        editVisible:false,
        editform:{
        },
        user:{
          username:'',
          password:'',
          email:'',
          mobile:''
        },
        rules:{
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {min:3,max:10,message:'长度在3到10之间',trigger:'blur'}
          ],
          email: [
            { type: 'email', required: true, message: '请输入正确的邮箱', trigger: 'blur' }
          ],
          mobile: [
            {  required: true, message: '请输入手机号码', trigger: 'blur' }
          ]
        
        }

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
    async statechange(user){
      let {data:d}=await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
      if(d.meta.status!=200){
        user.mg_state=!user.mg_state;
        return this.$message.error('修改失败')
      }
      return this.$message.success("修改成功")

    },
    adduser(){
      this.$refs.addform.validate(
        async (valid)=>{
          if(valid) {
            const {data:d}= await this.$http.post('users',this.user);
            console.log(d)
            if(d.meta.status!=201){
              return this.$message.error('添加失败');
            }
            this.$message.success('添加成功');
            this.dialogVisible=false;
            this.getuserlist()
            
          }

        }
      )

    },
    handleClose() {
      this.$refs['addform'].resetFields();
      },
    editclose(){
      this.$refs.editForm.resetFields()

    },
    async handleEdit(id) {

        let {data:d}=await this.$http.get(`users/${id}`);
        this.editform=d.data;
        this.editVisible=true;

      },
      async handleDelete(id) {
        const reslut=await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });      
          });
        if(reslut=='confirm'){
          const {data:d}=await this.$http.delete(`users/${id}`)
          if(d.meta.status!=200){
            return this.$message.error('删除失败')
          }
          this.$message.success('删除成功')
          this.getuserlist()
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.queryInfo.pagenum=val;
        console.log(this.queryInfo.pagenum);
        this.getuserlist()
      }
    ,
    edituser(){
      this.$refs.editForm.validate(
        async valid=>{
          if(valid){
            const {data:d}= await this.$http.put(`users/${this.editform.id}`,{email:this.editform.email,mobile:this.editform.mobile});
            if(d.meta.status!=200){
              return this.$message.erro('修改失败');
            }
            this.$message.success('修改成功')
            this.editVisible=false;
            this.getuserlist();
          }
        }
      )

    }
    },
    
}
</script>