 export async function  getuserlist(){
    const {data:d}=await Vue.$http.get('users',{params:this.queryInfo});
    if(d.meta.status!=200){
        return this.$message("获取用户失败")
    }
    this.tableData=d.data.users;
    this.total=d.data.total;
    console.log(this.total)
}