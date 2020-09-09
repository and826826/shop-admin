<template>
    <div class="background">
        <div class="login-bk">
        <login class="login"></login>
        </div>
    </div>
</template>
<script>
import login from '../components/login'
export default {
    name:'Login',
    components:{
        login
    }
    
}
</script>
<style scoped>

.background{
    background-image: url('../assets/bk.jpg');
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    position: absolute;
    height: 100%;
    width: 100%;
}
.login-bk{
    position: relative;
    width: 50vh; 
    height: 50vh;
    background:rgba(252, 249, 249, 0.2);
    top: 50%;
    left: 50%;
    margin: -25vh -25vh auto;
    padding: 5vh ;
}
</style>