<template>
    <div>
        <el-card>
            <div slot='header'>
                <span>行先マスタ</span>
            </div>
            <div slot='default'>
                <el-form :model="data.search.model" :rules="data.search.validation" ref="searchForm" label-width="120px">
                    <div class="row">
                        <div class='col-3'>
                            <label for='行先検索' class='col-form-label px-1' style='width:100%;'>行先名</label>
                            <el-form-item label-width="0" prop="syoriKubun">
                                <el-input type='text'
                                          style='width:100%;'
                                          v-model="data.search.model.Name"></el-input>

                            </el-form-item>
                        </div>
                        <div class="col-3">
                            <label for='' class='col-form-label px-1' style='width:100%;'>検索</label>
                            <el-button style='margin-left:2%;' type='warning' icon="el-icon-search" @click="searchName">検索</el-button>
                        </div>
                    </div>
                </el-form>
                <div class="row" style="margin-top:4%;">
                    <div class="col-12">
                        <div style="text-align:right;">
                            <el-button style='margin-left:2%;width:10%;' type='danger' :disabled="data.disabled.save" @click="submit">保存</el-button>
                        </div>
                        <el-form :model="data.master.model" :rules="data.master.validation" ref="masterForm" label-width="120px">
                            <div style="text-align:center;">
                                <el-button type='primary'
                                           style='width:40%;display:inline;'
                                           @click="addMeisai(data.newID,'','','',3)"
                                           :disabled="data.disabled.save">明細を追加</el-button>
                            </div>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>

                                        </th>
                                        <th>
                                            行先コード
                                        </th>
                                        <th>
                                            行先名
                                        </th>
                                        <th>
                                            長距離or地場
                                        </th>
                                    </tr>
                                </thead>
                                <tr v-for="(meisai_data,index) in data.master.model.meisai" v-if="meisai_data.Crud != 2">
                                    <td>
                                        <el-button type="primary" name="name" v-on:click="removeMeisai(meisai_data,index)" :disabled="data.disabled.save">削除</el-button>
                                    </td>
                                    <td>
                                        <el-form-item label-width="0"
                                                      :prop="'meisai[' + index + '].Destination.DestinationCode'"
                                                      :rules="{
                                                              required: true, message: '行先コードが入力されていません', trigger: 'blur'
                                                              }">
                                            <el-input type='text'
                                                      style='width:100%;'
                                                      v-model="meisai_data.Destination.DestinationCode"
                                                      @change="masterCodeOverLap(meisai_data,index)"
                                                      :disabled="data.disabled.save"></el-input>
                                        </el-form-item>
                                    </td>
                                    <td>
                                        <el-form-item label-width="0"
                                                      :prop="'meisai[' + index + '].Destination.DestinationName'"
                                                      :rules="{
                                                              required: true, message: '行先名が入力されていません', trigger: 'blur'
                                                              }">
                                            <el-input type='text'
                                                      style='width:100%;'
                                                      v-model="meisai_data.Destination.DestinationName"
                                                      @change="changeCrud(meisai_data, 1)"
                                                      :disabled="data.disabled.save"></el-input>
                                        </el-form-item>
                                    </td>
                                    <td>
                                        <el-form-item label-width="0"
                                                      :prop="'meisai[' + index + '].Destination.IsLongDistance'"
                                                      :rules="{
                                                              required: true, message: '長距離or地場が選択されていません', trigger: 'blur'
                                                              }">

                                            <el-select name="name" v-model="meisai_data.Destination.IsLongDistance"
                                                       @change="changeCrud(meisai_data, 1)"
                                                       :disabled="data.disabled.save">
                                                <el-option :value="false" label="地場"></el-option>
                                                <el-option :value="true" label="長距離"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </td>
                                </tr>
                            </table>
                            <div style="text-align:center;">
                                <el-button type='primary'
                                           style='width:40%;display:inline;'
                                           @click="addMeisai(data.newID,'','','',3)"
                                           :disabled="data.disabled.save">明細を追加</el-button>
                            </div>
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
                                { required: true, message: '行先名が入力されていません', trigger: 'blur' },
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
            searchName: function () {

                this.$refs['searchForm'].validate((valid) => {

                    if (valid) {
                        
                        axios.get(url.ApiUrl().DestinationSearch([{ key: "CompanyID", value: this.data.companyID }, { key: "Name", value: this.data.search.model.Name }]))
                            .then(response => {

                                console.log(response.data);

                                this.$set(this.data.master.model, "meisai", response.data);

                            })
                            .catch(response => console.log(response))

                    }
                })


            },
            masterCodeOverLap: function (meisai, index) {

                console.log(url.ApiUrl().IsDestinationCodeOverLap([{ key: "CompanyID", value: this.data.companyID }, { key: "DestinationID", value: meisai.Destination.DestinationID }, { key: "DestinationCode", value: meisai.Destination.DestinationCode }]))
                axios.get(url.ApiUrl().IsDestinationCodeOverLap([{ key: "CompanyID", value: this.data.companyID }, { key: "DestinationID", value: meisai.Destination.DestinationID }, { key: "DestinationCode", value: meisai.Destination.DestinationCode }]))
                    .then(response => {
                        if (!response.data) {

                            for (var i = 0; i < this.data.master.model.meisai.length; i++) {

                                if (this.data.master.model.meisai[i].Destination.DestinationCode == meisai.Destination.DestinationCode) {

                                    if (index != i && this.data.master.model.meisai[i].Crud != 2) {

                                        alert("入力されたコードは既に存在します");

                                        meisai.Destination.DestinationCode = "";

                                    }
                                }
                            }

                        } else {

                            alert("入力されたコードは既に存在します");

                            meisai.Destination.DestinationCode = "";

                        }


                    })
                    .catch(response => console.log(response))


                this.changeCrud(meisai, 1);
            },
            getDestinations: function () {

                axios.get(url.ApiUrl().GetDestinationsMaster([{ key: "CompanyID", value: this.data.companyID }]))
                    .then(response => {


                        this.$set(this.data.master.model, "meisai", response.data);

                    })
                    .catch(response => console.log(response))


            },
            createMeisaiData: function (DestinationID, DestinationCode, DestinationName, IsLongDistance, Crud) {

                return {
                    Destination: {
                        DestinationID: DestinationID,
                        DestinationCode: DestinationCode,
                        DestinationName: DestinationName,
                        IsLongDistance: IsLongDistance,
                        CompanyID: this.data.companyID,
                        EditorID: this.data.editorID,

                    },
                    Crud: Crud
                }
            },
            addMeisai: function (DestinationID, DestinationCode, DestinationName, IsLongDistance, Crud) {

                var meisai = this.createMeisaiData(DestinationID, DestinationCode, DestinationName, IsLongDistance, Crud);
                this.data.master.model.meisai.push(meisai);

                console.log(this.data.master.model.meisai);
            },
            removeMeisai: function (meisai, index) {

                if (meisai.Crud == 3) {
                    this.data.master.model.meisai.splice(index, 1);
                } else {

                    this.$set(meisai, 'Crud', 2)

                }

            },
            changeCrud: function (meisai, value) {

                if (meisai.Crud != 3) {

                    this.$set(meisai, 'Crud', value)

                }
            },
            changeEditorID: function (meisai) {

                for (var i in meisai) {

                    if (meisai[i].Crud != 0) {

                        meisai[i].Destination.EditorID = this.data.editorID;
                    }
                }
            },
            submit: function () {

                this.$refs['masterForm'].validate((valid) => {

                    if (valid) {

                        this.changeEditorID(this.data.master.model.meisai);

                        //※axiosによる更新処理

                        this.data.disabled.save = true;

                        axios.post(url.ApiUrl().DestinationsMasterSave(), this.data.master.model.meisai)
                            .then(response => {

                                if (response.data) {

                                    this.$message({
                                        message: '登録に成功しました',
                                        type: 'success'
                                    });

                                    this.getDestinations();

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

            this.getDestinations();

        },
        mounted: function () {


        },
        watch: {

        }
    }
</script>
