<template>
  <div class="register">
    <div class="header">
      <button @click="$router.back()">取消</button>
    </div>
    <div class="container">
      <div class="title">注册账户</div>
      <div class="content">
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model.number="ruleForm2.nickname"></el-input>
          </el-form-item>
          <el-form-item
            prop="email"
            label="邮箱"
            :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
    ]"
          >
            <el-input v-model="ruleForm2.email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import InputGroup from "components/common/input/InputGroup.vue";
export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("昵称不能为空"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        nickname: "",
        email: "",
        password: "",
        checkPass: ""
      },
      rules2: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        nickname: [{ validator: checkName, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios.post(process.env.NODE_ENV === "production"
            ? "http://101.132.129.41:3000/api/users/register" 
            : "api/users/register" , this.ruleForm2).then(res => {
            if (res.data.status == 401) {
              this.$message("亲！" + res.data.message);
            } else if(res.data.status == 402){
              this.$message("亲！" + res.data.message);
            }else {
              this.$message({
                message: "注册成功",
                type: "success"
              });
              this.$router.push("/login");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  components: {
    InputGroup
  }
};
</script>

<style>
.register {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.header {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding: 0 10px;
  line-height: 50px;
}
.header button {
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 16px;
  color: #20af0e;
}
.container {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.title {
  margin: 30px 0 28px 0;
  font-size: 22px;
  text-align: center;
}
</style>