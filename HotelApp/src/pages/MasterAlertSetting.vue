<template>
    <div>
        <el-card>
            <div slot='header'>
                <span>アラート設定マスタ</span>
            </div>
            <div slot='default'>
                <div class="row" style="margin-top:4%;">
                    <div class="col-12">
                        <el-form :model="data.master.model" :rules="data.master.validation" ref="masterForm" label-width="120px">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>
                                            アラート設定種類
                                        </th>
                                        <th>
                                            アラート色
                                        </th>
                                        <th>
                                            アラート表示時間間隔
                                        </th>
                                    </tr>
                                </thead>
                                <tr v-for="(meisai_data,index) in data.master.model.meisai" v-if="meisai_data.Crud != 2">
                                    <td>
                                        {{getAlertKindName(meisai_data.AlertSetting.AlertKind)}}
                                    </td>
                                    <td>
                                        <el-form-item label-width="0"
                                                      :prop="'meisai[' + index + '].AlertSetting.AlertColor'"
                                                      :rules="{
                                                              required: true, message: 'アラート色が入力されていません', trigger: 'blur'
                                                              }">
                                               <el-color-picker style='width:100%;'
                                                             v-model="meisai_data.AlertSetting.AlertColor"
                                                             @change="changeCrud(meisai_data, 1)"
                                                             :disabled="data.disabled.save"></el-color-picker>
                                        </el-form-item>
                                    </td>
                                    <td>
                                        <el-form-item label-width="0"
                                                      :prop="'meisai[' + index + '].AlertSetting.AlertInterval'"
                                                      :rules="{
                                                              required: true, message: 'アラート表示時間間隔が入力されていません', trigger: 'blur'
                                                              }"
                                                      v-if="meisai_data.AlertSetting.AlertKind != 2"
                                                      >
                                            <el-input-number type='text'
                                                             style='width:100%;'
                                                             v-model="meisai_data.AlertSetting.AlertInterval"
                                                             @change="changeCrud(meisai_data, 1)"
                                                             :min="0"
                                                             controls-position="right"
                                                             :disabled="data.disabled.save"></el-input-number>
                                        </el-form-item>
                                    </td>
                                </tr>
                            </table>
                        </el-form>
                        <div style="text-align:right;">
                            <el-button style='margin-left:2%;width:10%;' type='danger' :disabled="data.disabled.save" @click="submit">保存</el-button>
                        </div>
                    </div>
                </div>



            </div>
        </el-card>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Card from '@/components/Card/Card.vue'
    import arrayFunction from '@/js/array.js'
    import url from '@/js/api_url.js'

    export default {
        name: 'niukeSyukei',
        components: {
            Card
        },
        data: function () {
            return {
                data: {
                    companyID: "",
                    //新規作成のIDは-1ととりあえず置いておく
                    //CRUDKeyは0が何もなし、1が編集,2が削除,3が新規
                    newID: -1,
                    search: {
                        model: {
                            memberName: ""
                        },
                        validation: {
                            Name: [
                                { required: true, message: 'アラート設定名が入力されていません', trigger: 'blur' },
                            ],
                        }
                    },
                    master: {
                        model: {
                            meisai: [],
                        },
                    },
                    disabled: {
                        save: false,
                    },
                },
            }
        },
        methods: {
            getAlertKindName: function (AlertKind) {

                if (AlertKind == 0) {

                    return "点呼間隔";

                } else if (AlertKind == 1) {

                    return "休憩間点呼";

                } else if (AlertKind == 2) {

                    return "両方当てはまる場合"
                }

            },
            getAlertSettings: function () {

                axios.get(url.ApiUrl().GetAlertSettingsMaster([{ key: "CompanyID", value: this.data.companyID }]))
                    .then(response => {


                        this.$set(this.data.master.model, "meisai", response.data);

                    })
                    .catch(response => console.log(response))

            },
            changeCrud: function (meisai, value) {

                if (meisai.Crud != 3) {

                    this.$set(meisai, 'Crud', value)

                }
            },
            changeEditorID: function (meisai) {

                for (var i in meisai) {

                    if (meisai[i].Crud != 0) {

                        meisai[i].AlertSetting.EditorID = this.data.editorID;
                    }
                }
            },
            submit: function () {

                this.$refs['masterForm'].validate((valid) => {

                    if (valid) {

                        this.changeEditorID(this.data.master.model.meisai);

                        //※axiosによる更新処理

                        this.data.disabled.save = true;

                        axios.post(url.ApiUrl().AlertSettingsMasterSave(), this.data.master.model.meisai)
                            .then(response => {

                                if (response.data) {

                                    this.$message({
                                        message: '登録に成功しました',
                                        type: 'success'
                                    });

                                    this.getAlertSettings();
                                } else {

                                    this.$message({
                                        message: '登録に失敗しました',
                                        type: 'error'
                                    });

                                }


                                this.data.disabled.save = false;

                            })
                            .catch(response => {
                                this.$message({
                                    message: '通信に失敗しました',
                                    type: 'error'
                                });

                                this.data.disabled.save = false;

                            });
                    }
                })

            }
        },
        created: function () {
            this.data.companyID = this.$store.state.login.companyID;
            this.data.editorID = this.$store.state.login.userID;

            this.getAlertSettings();

        },
        mounted: function () {


        },
        watch: {

        }
    }
</script>
