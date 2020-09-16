<template>
    <div></div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    created(){
        this.getlist()
        
    },
    methods:{
        async getlist(){
            console.log('qqq')
            const {data:d}=await this.$http.get('goods');
            console.log(d)
        }
    }
    
}
</script>