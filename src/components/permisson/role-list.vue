<template>
<div>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column type="expand">
        <template slot-scope="scope"> 
            <el-row v-for=" item1 in scope.row.children" :key="item1.id">
                <!-- 渲染一级权限 -->
                <el-col :span="5">
                    <el-tag closable @close="handleClose(scope.row,item1.id)">{{item1.authName}}</el-tag>
                    <i class="el-icon-right"></i>
                </el-col>
                <!-- 渲染二级权限 -->
                <el-col :span="19">
                    <el-row v-for="item2 in item1.children" :key="item2.id">
                        <el-col :span="6">
                            <el-tag type="success" closable @close="handleClose(scope.row,item2.id)">{{item2.authName}}</el-tag>
                            <i class="el-icon-right"></i>
                        </el-col>
                        <el-col :span="18" >
                            <el-tag type="warning" closable v-for="item3 in item2.children" :key="item3.id" @close="handleClose(scope.row,item3.id)">
                                {{item3.authName}}
                            </el-tag>
                            

                        </el-col>

                    </el-row>
                </el-col>
            </el-row>
        </template>
    </el-table-column>
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="roleName"
      label="角色名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="roleDesc"
      label="角色描述"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="操作"
      width="250">
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
          @click="handleConfig(scope.row)"><i class="el-icon-setting"></i></el-button>
      </template>
    </el-table-column>
  </el-table>
  
<el-dialog
  title="修改角色"
  :visible.sync="roleformVisible"
  width="30%">
  <span>

      <el-form :model="roleform" :rules="editrules" ref="roleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="角色名称" prop="roleName">
    <el-input v-model="roleform.roleName" ></el-input>
  </el-form-item>
    <el-form-item label="角色描述" prop="roleDesc">
    <el-input v-model="roleform.roleDesc"></el-input>
  </el-form-item>
      </el-form>

    <el-button @click="roleformVisible = false">取 消</el-button>
    <el-button type="primary" @click="putEdit">确 定</el-button>
  </span>
</el-dialog>

<el-dialog
  title="修改角色"
  :visible.sync="roletreeVisible"
  width="30%" @close="clear">
  <span>
    <el-tree
  :data="roletree"
  show-checkbox
  node-key="id"
  :default-expanded-keys="[2, 3]"
  :default-checked-keys="selected"
  :props="defaultProps" default-expand-all ref="tree">
</el-tree>

    <el-button @click="roletreeVisible = false">取 消</el-button>
    <el-button type="primary" @click="putrolerights" >确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
    data(){
        return {
            tableData: [],
            roleform:{
              
              roleId:'',
              roleName:'',
              roleDesc:''
            },
            roletree:{},
            roleformVisible:false,
            roletreeVisible:false,
            selected:[],
            roleid:0,
            defaultProps:{
              children: 'children',
              label: 'authName'
            },

            editrules:{
            rolename: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
           
          ],
            roleDesc:[
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
            }

        }
    },
    methods:{
      async putrolerights(){
        const key=[ ...this.$refs.tree.getHalfCheckedKeys(), ...this.$refs.tree.getCheckedKeys()];
        const rids=key.join(",");
        console.log(rids,this.roleid)
        const {data :d}=await this.$http.post(`roles/${this.roleid}/rights`,{rids:rids})
        if(d.meta.status!=200){
          return this.$message.error('修改失败')
        }
        this.$message.success('修改成功');
        this.getrolelist();
        this.roletreeVisible=false;
      },
      clear(){
        this.selected=[];

      },
      async handleConfig(item){
        const {data:d}=await this.$http.get('rights/tree')
        this.roletree=d.data;
        this.roleid=item.id;
        this.selectrights(item,this.selected);
        console.log(this.selected)
        this.roletreeVisible=true;


      },
      selectrights(item,selected){
        if(!item.children){
           return selected.push(item.id)
        }
        item.children.forEach(i => {
          this.selectrights(i,selected)
          
        });

      },
      async handleClose(item,id){
        console.log(item,id);
         const reslut=await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(re=>re)
        if(reslut=='confirm'){
          const {data :d}= await this.$http.delete(`roles/${item.id}/rights/${id}`);
          console.log(d);
          if(d.meta.status!=200){
            return this.$message.error('删除失败')
          }
          item.children=d.data;
        }

      },
      async handleDelete(id){
        console.log(id);
        const result=await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        if(result=='confirm'){
          const {data:d}= await this.$http.delete(`roles/${id}`);
          console.log(d);
          if(d.meta.status!=200){
            return this.$message.error('删除失败');
          }
          this.$message.success('删除成功');
          this.getrolelist();

        }
      },
      async getrolelist(){
            const {data:d}=await this.$http.get('roles');
            if(d.meta.status!=200){
                return this.$message.error('获取角色列表失败')
            }
            console.log(d)
            this.tableData=d.data;
        },
      async handleEdit(id){
            const {data:d}=await this.$http.get(`roles/${id}`)
            if(d.meta.status!=200){
                return this.$message.error('获取该角色失败')
            }
            // console.log(d.data)
            this.roleform=d.data;
            console.log(this.roleform)
            this.roleformVisible=true;

        },
      putEdit(){
          this.$refs.roleForm.validate(
            async valid=>{
              if(valid){
                const {data:d}= await this.$http.put(`roles/${this.roleform.roleId}`,{'roleName':this.roleform.roleName,'roleDesc':this.roleform.roleDesc});
                if(d.meta.status!=200){
                  return this.$message.error('修改失败');
                }
                this.$message.success('修改成功');
                this.roleformVisible=false;
                this.getrolelist()
                
              }
            }
          )
          
          

        },

        

    },
    created(){
        this.getrolelist()

    }
    
}
</script>

<style scoped>
.bdtop{
    border-top: 1px solid black;
}
</style>