<template>
    <div class="login">
        <el-form ref="login-form" :model="user" :rules="rules" label-width="80px" size="medium">
            <el-form-item label="用户名" prop="username">
            <el-input v-model="user.username" prefix-icon="el-icon-user" placeholder="请输入用户名" style="margin:20px 0;">
            </el-input>  
            </el-form-item>
            <el-form-item label="密码" prop="password">
            <el-input v-model="user.password" prefix-icon="el-icon-lock" placeholder="请输入密码" style="margin:20px 0;" type="password">
            </el-input >
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
            <el-button @click="clear">重置</el-button>
            </el-form-item>

        
        </el-form>
    </div>
</template>
<script>
export default {
    name:'login',
    data() {
      return {
          user:{
              username:'admin',
              password:'123456'
          },
          rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 10个字符', trigger: 'blur' }
          ],
          password:[
              {required: true, message: '请输入密码', trigger: 'blur' }, 
 
          ]  
      }
    }
    },
    methods:{
        onSubmit(){
            this.$refs['login-form'].validate( async (valid) => {
          if (valid) {
            let {data:d}=await this.$http.post("login",this.user)
            if(d.meta.status!=200){
              this.$message.error('登录失败');
              return
            }
            console.log(d)
            this.$message({
              message:'登录成功',
              type:'success'
            })
            window.sessionStorage.setItem('token',d.data.token)
            this.$router.push('/home')

          } else {
            console.log('error submit!!');
            return false;
          }
        });
        },
        clear(){
          this.$refs['login-form'].resetFields()

        }
    }

}
</script>
<style scoped>
.login{
    opacity: 0.8;
}
</style>