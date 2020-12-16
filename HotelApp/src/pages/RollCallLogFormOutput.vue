<template>
    <div>
        <el-card>
            <div slot='header'>
                <span>点呼記録簿出力</span>
            </div>
            <div slot='default'>
                <el-form :model="data.model" :rules="data.validation" ref="form" label-width="120px">
                    <div class='row'>
                        <div class='col-md-3'>
                            <label for='運行日' class='col-form-label px-1' style='width:100%;'>運行日</label>
                            <el-form-item label-width="0" prop="serviceDate">
                                <el-input v-model="data.model.serviceDate"
                                          type='date'
                                          ></el-input>
                            </el-form-item>
                        </div>
                    </div>

                </el-form>
                <div class='row'>
                    <div class='col-md-12'style='text-align:left;margin-top:2%;'>
                        <el-button style='width:20%;' type='primary' v-on:click="output()">出力</el-button>
                    </div>
                </div>

            </div>
        </el-card>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Card from '@/components/Card/Card.vue'
    import time from '@/js/status/time.js'
    import url from '@/js/api_url.js'


    export default {
        name: 'niukeNyuryokuSyoki',
        components: {
            Card
        },
        data: function () {
            return {
                data: {
                    model: {
                        serviceDate: "",
                    },
                    validation: {
                        serviceDate: [
                            { required: true, message: '出荷日付が入力されていません', trigger: 'blur' },
                        ],
                    }
                },
            }
        },
        methods: {

            output: function () {

                axios.get(url.ApiUrl().GetRollCallLogFormOutputURL([{ key: "CompanyID", value: this.data.companyID }, { key: "ServiceDate", value: this.data.model.serviceDate }]))
                    .then(response => {

                        var url = response.data.url;

                        if (url != null) {
                            window.open(url);

                        } else {
                            this.$message({
                                message: '運行データが無いため帳票が出力されません',
                                type: 'error'
                            });

                        }

                        console.log(response.data);
                    })
                    .catch(response => console.log(response))

                
            }
        },
        created: function () {
            this.data.companyID = this.$store.state.login.companyID;
            this.data.editorID = this.$store.state.login.userID;

            this.data.model.serviceDate = time.nowJapanDateInput();

        }
    }
</script>
