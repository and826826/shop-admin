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
                    <el-tag closable>{{item1.authName}}</el-tag>
                    <i class="el-icon-right"></i>
                </el-col>
                <!-- 渲染二级权限 -->
                <el-col :span="19">
                    <el-row v-for="item2 in item1.children" :key="item2.id">
                        <el-col :span="6">
                            <el-tag type="success" closable>{{item2.authName}}</el-tag>
                            <i class="el-icon-right"></i>
                        </el-col>
                        <el-col :span="18" >
                            <el-tag type="warning" closable v-for="item3 in item2.children" :key="item3.id">
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
          @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-setting"></i></el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

<el-dialog
  title="修改角色"
  :visible.sync="roleformVisible"
  width="30%"
  :before-close="handleClose">
  <span>

      <el-form :model="roleform"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="角色名称" prop="roleName">
    <el-input v-model="roleform.roleName" ></el-input>
  </el-form-item>
    <el-form-item label="角色描述" prop="roleDesc">
    <el-input v-model="roleform.roleDesc"></el-input>
  </el-form-item>
      </el-form>

    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
    data(){
        return {
            tableData: [],
            roleform:{},
            roleformVisible:false

        }
    },
    methods:{
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
            this.roleform=d.data;
            this.roleformVisible=true;

        }
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