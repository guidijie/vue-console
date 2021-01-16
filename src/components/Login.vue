<template>
  <div class="l">
    <el-card class="box-card">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="uname">
          <el-input type="text" v-model="ruleForm.uname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

// import axios from "axios";

export default {
  name: "Login",
  data() {
    let validateUName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名!'));
      } else {
        let str = /[a-zA-Z0-9]{3,16}$/
        if (!str.test(value)) {
          callback(new Error('请输入3~16范围的字母!'));
        }
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码!'));
      } else {
        let str = /[a-zA-Z0-9]{4,16}$/
        if (!str.test(value)) {
          callback(new Error('请输入4~16范围的数字和字母!'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      let str = /[a-zA-Z0-9]{4,16}$/
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (!str.test(value)) {
        callback(new Error('请输入4~16范围的数字和字母!'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        uname: '',
        pass: '',
        checkPass: '',
        role: ''
      },
      rules: {
        uname: [
          {validator: validateUName, trigger: 'blur'}
        ],
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          let user ={
            username : this.ruleForm.uname,
            password : this.ruleForm.pass
          }

          this.$http.post("http://localhost:8080/login",user).then(data =>{
            let user = data.data.data;
            //判断是否查询到数据
            if(user !== null){

              //判断是否是admin角色
              if(user.role === 'admin'){
                //存入session
                localStorage.setItem("user", JSON.stringify(user));
                this.$router.push("/");
              }else{
                this.$message.error('你不是管理员用户没有权限登录');
              }
            }else{
              this.$message.error('账号或密码错误');
            }
          }).catch(() =>{
            this.$message.error('哎呀~服务器遇见问题了无法登陆！');
          })

        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
}
</script>

<style scoped>
.l {
  width: 500px;
  margin: auto;
  position: relative;
  top: 50%;
  margin-top: -230px;
}

.el-card {
  width: 500px;
  border-radius: 20px;
}

.demo-ruleForm {
  margin-top: 30px;
  width: 420px;
}
</style>
