<template>
    <div>
        <el-card>
            <div slot='header'>
                <span>社員マスタ</span>
            </div>
            <div slot='default'>
                <el-form :model="data.search.model" :rules="data.search.validation" ref="searchForm" label-width="120px">
                    <div class="row">
                        <div class='col-3'>
                            <label for='社員検索' class='col-form-label px-1' style='width:100%;'>社員名</label>
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
                        <el-form :model="data.master.model" :rules="data.master.validation" ref="masterForm" label-width="120px" style="white-space:nowrap;overflow-x:scroll;">
                            <div style="text-align:center;">
                                <el-button type='primary'
                                           style='width:40%;display:inline;'
                                           @click="addMeisai(data.newID,'', '', '','', null, null, '', false, false, false, false, 1, 3)"
                                           :disabled="data.disabled.save">明細を追加</el-button>
                            </div>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>
                                            社員コード
                                        </th>
                                        <th>
                                            社員名
                                        </th>
                                        <th>
                                            フリガナ
                                        </th>
                                        <th>
                                            パスワード
                                        </th>
                                        <th>
                                            デフォルト車両
                                        </th>
                                        <th>
                                            デフォルト行先
                                        </th>
                                        <th>
                                            長距離勤務or地場勤務
                                        </th>

                                        <th style="width:7%;">
                                            運行者
                                        </th>
                                        <th style="width:7%;">
                                            点呼者
                                        </th>
                                        <th style="width:7%;">
                                            運行管理者
                                        </th>
                                        <th style="width:7%;">
                                            統括運行管理者
                                        </th>
                                        <th>
                                            権限
                                        </th>

                                    </tr>
                                </thead>
                                <tr v-for="(meisai_data,index) in data.master.model.meisai" v-if="meisai_data.Crud != 2">
                                    <td>
                                        <el-button type="primary" name="name" v-on:click="removeMeisai(meisai_data,index)" :disabled="data.disabled.save">削除</el-button>
                                    </td>
                                    <td>
                                        <el-form-item label-width="0"
                                                      :prop="'meisai[' + index + '].Member.MemberCode'"
                                                      :rules="{
                                                              required: true, message: '社員コードが入力されていません', trigger: 'blur'
                                                              }">
                                            <el-input type='text'
                                                      style='width:100%;'
                                                      v-model="meisai_data.Member.MemberCode"
                                                      @change="masterCodeOverLap(meisai_data,index)"
                                                      :disabled="data.disabled.save"></el-input>
                                        </el-form-item>
                                    </td>
                                    <td>
                                        <el-form-item label-width="0"
                                                      :prop="'meisai[' + index + '].Member.MemberName'"
                                                      :rules="{
                                                              required: true, message: '社員名が入力されていません', trigger: 'blur'
                                                              }">
                                            <el-input type='text'
                                                      style='width:100%;'
                                                      v-model="meisai_data.Member.MemberName"
                                                      @change="changeCrud(meisai_data, 1)"
                                                      :disabled="data.disabled.save"></el-input>
                                        </el-form-item>
                                    </td>
                                    <td>
                                        <el-form-item label-width="0"
                                                      :prop="'meisai[' + index + '].Member.MemberPhoneticName'"
                                                      :rules="{
                                                              required: true, message: 'フリガナが入力されていません', trigger: 'blur'
                                                              }">
                                            <el-input type='text'
                                                      style='width:100%;'
                                                      v-model="meisai_data.Member.MemberPhoneticName"
                                                      @change="changeCrud(meisai_data, 1)"
                                                      :disabled="data.disabled.save"></el-input>
                                        </el-form-item>
                                    </td>
                                    <td>
                                        <el-form-item label-width="0"
                                                      :prop="'meisai[' + index + '].Member.Password'"
                                                      :rules="{
                                                              required: true, message: 'パスワードが入力されていません', trigger: 'blur'
                                                              }">
                                            <el-input type='text'
                                                      style='width:100%;'
                                                      v-model="meisai_data.Member.Password"
                                                      @change="changeCrud(meisai_data, 1)"
                                                      :disabled="data.disabled.save"></el-input>
                                        </el-form-item>
                                    </td>
  
                                    <td>
                                        <el-select name="name" v-model="meisai_data.Member.VehicleID" @change="changeCrud(meisai_data, 1)" :disabled="data.disabled.save">
                                            <el-option :value="null" label="選択しない"></el-option>
                                            <el-option v-for="vehicle in data.vehicles" :value="vehicle.VehicleID" :label="vehicle.VehicleName"></el-option>

                                        </el-select>
                                    </td>
                                    <td>
                                        <el-select name="name" v-model="meisai_data.Member.DestinationID" @change="changeCrud(meisai_data, 1)" :disabled="data.disabled.save">
                                            <el-option :value="null" label="選択しない"></el-option>
                                            <el-option v-for="destination in data.destinations" :value="destination.DestinationID" :label="destination.DestinationName"></el-option>
                                        </el-select>
                                    </td>
                                    <td>
                                        <el-form-item label-width="0"
                                                      :prop="'meisai[' + index + '].Member.IsLongDistance'"
                                                      :rules="{
                                                              required: true, message: '長距離or地場が選択されていません', trigger: 'blur'
                                                              }">

                                            <el-select name="name" v-model="meisai_data.Member.IsLongDistance"
                                                       @change="changeCrud(meisai_data, 1)"
                                                       :disabled="data.disabled.save">
                                                <el-option :value="false" label="地場"></el-option>
                                                <el-option :value="true" label="長距離"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </td>

                                    <td>
                                        <el-checkbox v-model="meisai_data.Member.IsDriver" @change="changeCrud(meisai_data, 1)" :disabled="data.disabled.save"></el-checkbox>
                                    </td>
                                    <td>
                                        <el-checkbox v-model="meisai_data.Member.IsRollCaller" @change="changeCrud(meisai_data, 1)" :disabled="data.disabled.save"></el-checkbox>
                                    </td>
                                    <td>
                                        <el-checkbox v-model="meisai_data.Member.IsOperationManager" @change="changeCrud(meisai_data, 1)" :disabled="data.disabled.save"></el-checkbox>
                                    </td>
                                    <td>
                                        <el-checkbox v-model="meisai_data.Member.IsGeneralOperationManager" @change="changeCrud(meisai_data, 1)" :disabled="data.disabled.save"></el-checkbox>
                                    </td>
                                    <td>
                                        <el-select v-model="meisai_data.Member.RoleID" @change="changeCrud(meisai_data, 1)" :disabled="data.disabled.save">
                                            <el-option v-for="role in data.roles" :value="role.RoleID" :label="role.RoleName"></el-option>
                                        </el-select>
                                    </td>

                                </tr>
                            </table>
                            <div style="text-align:center;">
                                <el-button type='primary'
                                           style='width:40%;display:inline;'
                                           @click="addMeisai(data.newID,'', '','', '', null, null, '', false, false, false, false, 1, 3)"
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
                                { required: true, message: '社員名が入力されていません', trigger: 'blur' },
                            ],
                        }
                    },
                    master: {
                        model: {
                            meisai: [],
                        },
                    },
                    vehicles: [],
                    destinations: [],
                    roles:[],
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

                        axios.get(url.ApiUrl().MemberSearch([{ key: "CompanyID", value: this.data.companyID }, { key: "Name", value: this.data.search.model.Name }]))
                            .then(response => {

                                console.log(response.data);

                                this.$set(this.data.master.model, "meisai", response.data);

                            })
                            .catch(response => console.log(response))

                    }
                })


            },
            masterCodeOverLap: function (meisai, index) {

                axios.get(url.ApiUrl().IsMemberCodeOverLap([{ key: "CompanyID", value: this.data.companyID }, { key: "MemberID", value: meisai.Member.MemberID }, { key: "MemberCode", value: meisai.Member.MemberCode }]))
                    .then(response => {
                        console.log(response.data);
                        if (!response.data) {

                            for (var i = 0; i < this.data.master.model.meisai.length; i++) {

                                if (this.data.master.model.meisai[i].Member.MemberCode == meisai.Member.MemberCode) {

                                    if (index != i && this.data.master.model.meisai[i].Crud != 2) {

                                        alert("入力されたコードは既に存在します");

                                        meisai.Member.MemberCode = "";

                                    }
                                }
                            }

                        } else {

                            alert("入力されたコードは既に存在します");

                            meisai.Member.MemberCode = "";

                        }


                    })
                    .catch(response => console.log(response))


                this.changeCrud(meisai, 1);
            },
            getMembers: function () {

                axios.get(url.ApiUrl().GetMembersMaster([{ key: "CompanyID", value: this.data.companyID }]))
                    .then(response => {
                        this.$set(this.data.master.model, "meisai", response.data);

                    })
                    .catch(response => console.log(response))

            },
            createMeisaiData: function (MemberID, MemberCode, MemberName, MemberPhoneticName, Password, VehicleID, DestinationID, IsLongDistance, IsDriver, IsRollCaller, IsOperationManager, IsGeneralOperationManager, RoleID, Crud) {

                return {
                    Member: {
                        MemberID: MemberID,
                        MemberCode: MemberCode,
                        MemberName: MemberName,
                        MemberPhoneticName: MemberPhoneticName,
                        Password: Password,
                        VehicleID: VehicleID,
                        DestinationID: DestinationID,
                        IsLongDistance: IsLongDistance,
                        IsDriver: IsDriver,
                        IsRollCaller: IsRollCaller,
                        IsOperationManager: IsOperationManager,
                        IsGeneralOperationManager: IsGeneralOperationManager,
                        RoleID: RoleID,
                        CompanyID: this.data.companyID,
                        EditorID: this.data.editorID,

                    },
                    Crud: Crud
                }
            },
            addMeisai: function (MemberID, MemberCode, MemberName, MemberPhoneticName, Password, VehicleID, DestinationID, IsLongDistance, IsDriver, IsRollCaller, IsOperationManager, IsGeneralOperationManager, RoleID, Crud) {


                var meisai = this.createMeisaiData(MemberID, MemberCode, MemberName, MemberPhoneticName, Password, VehicleID, DestinationID, IsLongDistance, IsDriver, IsRollCaller, IsOperationManager, IsGeneralOperationManager, RoleID, Crud);
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

                        meisai[i].Member.EditorID = this.data.editorID;
                    }
                }
            },
            submit: function () {

                this.$refs['masterForm'].validate((valid) => {

                    if (valid) {

                        this.changeEditorID(this.data.master.model.meisai);

                        //※axiosによる更新処理

                        this.data.disabled.save = true;

                        axios.post(url.ApiUrl().MembersMasterSave(), this.data.master.model.meisai)
                            .then(response => {

                                if (response.data) {

                                    this.$message({
                                        message: '登録に成功しました',
                                        type: 'success'
                                    });

                                    this.getMembers();
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

            this.getMembers();

            axios.get(url.ApiUrl().GetDestinations([{ key: "CompanyID", value: this.data.companyID }]))
                .then(response => {


                    this.$set(this.data, "destinations", response.data);

                })
                .catch(response => console.log(response))

            axios.get(url.ApiUrl().GetVehicles([{ key: "CompanyID", value: this.data.companyID }]))
                .then(response => {


                    this.$set(this.data, "vehicles", response.data);

                })
                .catch(response => console.log(response))

            axios.get(url.ApiUrl().GetRoles([{ key: "CompanyID", value: this.data.companyID }]))
                .then(response => {


                    this.$set(this.data, "roles", response.data);

                })
                .catch(response => console.log(response))

        },
        mounted: function () {


        },
        watch: {

        }
    }
</script>



