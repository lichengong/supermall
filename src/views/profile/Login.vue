<template>
  <div class="login">
    <div class="title">用户登录</div>
    <div class="content">
      <form action>
        <InputGroup label="账号" placeholder="请填写邮箱" v-model="user.email" @input="getEmail"/>
        <InputGroup label="密码" placeholder="请填写密码" v-model="user.password" @input="getPassword" type="password" />
        <button class="login-btn" @click.prevent="login">登陆</button>
      </form>
    </div>
    <div class="footer">
      <button class="register" @click="$router.push('/register')">|&nbsp;&nbsp;注册&nbsp;&nbsp;|</button>
    </div>
  </div>
</template>

<script>
import InputGroup from "components/common/input/InputGroup.vue";
export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
    };
  },
  methods:{
    login(){
      if(this.user.email==''){
          this.$message("账号不能为空");
      }else if(this.user.password==''){
          this.$message("密码不能为空");
      }else{
            this.axios.post(process.env.NODE_ENV === "production"
            ? "http://101.132.129.41:3000/api/users/login" 
            : "api/users/login" ,this.user).then(res => {
            if (res.data.status == 401) {
              this.$message("亲！" + res.data.message);
            } else if(res.data.status == 402){
              this.$message("亲！" + res.data.message);
            }else {
              localStorage.setItem("user", JSON.stringify(res.data));
              this.$message({
                message: "登录成功",
                type: "success"
              });
              this.$router.push("/home");
            }
          });
      }
    },
    getEmail(value){
      this.user.email=value
    },
    getPassword(value){
      this.user.password=value
    }
  },
  components: {
    InputGroup
  }
};
</script>

<style>
.login {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 15px;
  background-color: #fff;
}
.login-btn{
  margin-top: 15px;
  width:100%;
  height: 40px;
  color: #fff;
  font-size: 18px;
  background-color: #007AFF;
}
.title {
  margin-top: 80px;
  font-size: 22px;
  text-align: center;
}
.footer {
  position: absolute;
  left: 0;
  bottom: 50px;
  width: 100%;
  text-align: center;
  color: #888;
  font-size: 16px;
}
.footer .register {
  display: inline-block;
  outline: none;
  border: none;
  color: #7b8ca9;
  font-size: 16px;
  background-color: transparent;
  vertical-align: middle;
}
</style>