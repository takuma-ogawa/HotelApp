<template>

    <el-card>
        <div slot='header'>
            <span>ログイン</span>
        </div>
        <div slot='default'>
            <el-form :model="login" :rules="validation" ref="loginForm" label-width="120px" class="demo-ruleForm">
                <div class='row'>
                    <div class='col-md-12'>
                        <el-form-item label="会社ID" prop="companyID">
                            <el-input v-model="login.companyID"
                                      style="width:40%;"></el-input>
                        </el-form-item>
                    </div>
                    <div class='col-md-12'>
                        <el-form-item label="社員ID" prop="memberID">
                            <el-input v-model="login.memberID"
                                      style="width:40%;"></el-input>
                        </el-form-item>
                    </div>
                    <div class='col-md-12'>
                        <el-form-item label="パスワード" prop="password">
                            <el-input v-model="login.password"
                                      style="width:40%;"></el-input>
                        </el-form-item>
                    </div>
                </div>
            </el-form>

            <div class='row'>
                <div class='col-md-12'>
                    <div style='text-align:right;width:100%;'>
                        <el-button style='margin-right:3%;' type='primary' @click="submitForm()">ログイン</el-button>
                    </div>
                </div>
            </div>
            
        </div>
    </el-card>

</template>

<script>
    import login from '@/js/status/login.js'
    import url from '@/js/api_url.js'

    export default {
        name: 'login',
        data: function () {

            return {
                login: {
                    companyID: "",
                    memberID: "",
                    password: "",
                },
                validation: {
                    companyID: [
                        { required: true, message: '会社IDが入力されていません', trigger: 'blur' },
                    ],
                    memberID: [
                        { required: true, message: '社員IDが入力されていません', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: 'パスワードが入力されていません', trigger: 'blur' },
                    ],
                }
            }
        },
        methods: {
            submitForm: function () {
                this.$refs['loginForm'].validate((valid) => {

                    if (valid) {

                        this.loginCheck();
                    } 
                });

            },
            loginCheck: function () {

                //urlは違うやつ

                axios.get(url.ApiUrl().Login([{ key: "CompanyCode", value: this.login.companyID }, { key: "MemberCode", value: this.login.memberID }, { key: "Password", value: this.login.password }]))
                    .then(response => {

                        console.log(response.data);
                        if (response.data.IsLogin) {

                            var member = response.data.Member;
                            login.login(this, { userID: member.MemberID, userName: member.MemberName, userPass: member.Password, companyID: member.CompanyID, role: member.RoleID, loggedIn: true });



                            this.$router.push('/uedaunyu/');
                        } else {
                            this.$message({
                                message: '会社ID、社員ID又はパスワードが違います',
                                type: 'error'
                            });

                        }
                    })
                    .catch(response => {
                        console.log(response);
                        this.$message({
                            message: '通信に失敗しました',
                            type: 'error'
                        });

                    })
                
            }
        },

    }
</script>

<style scoped>
</style>