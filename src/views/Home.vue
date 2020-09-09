<template>
  <div class="home">
    <el-button @click="logout">退出</el-button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  methods:{
    logout(){
      window.sessionStorage.clear();
      this.$router.push('/login')
    }

  }
}
</script>
