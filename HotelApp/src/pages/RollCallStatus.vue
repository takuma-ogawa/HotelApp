<template>
    <div>
        <el-card>
            <div slot='header'>
                <span>点呼状況</span>
            </div>
            <div slot='default'>
                <el-form :model="data.search.model" :rules="data.search.validation" ref="searchForm" label-width="120px">
                    <div class="row">
                        <div class='col-md-3'>
                            <label for='運行日' class='col-form-label px-1' style='width:100%;'>運行日</label>
                            <el-form-item label-width="0" prop="ServiceDate">
                                <el-input type="date"
                                          style='width:100%;'
                                          v-model="data.search.model.ServiceDate"
                                          @change="serviceLogSearch()"
                                          ></el-input>

                            </el-form-item>
                        </div>
                        <div class="col-3">
                            <label for='運行形態選択' class='col-form-label px-1' style='width:100%;'>運行形態選択</label>
                            <el-form-item label-width="0" prop="IsLongDistance">
                                <el-select name="name" v-model="data.search.model.IsLongDistance" placeholder="選択してください" @change="changeVisibilityIsLongDistance()">
                                    <el-option :value="null" label="選択しない"></el-option>
                                    <el-option :value="true" label="長距離"></el-option>
                                    <el-option :value="false" label="地場"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="col-3">
                            <el-button style='margin-top:13%;width:80%;' type='primary' @click="sendEmail()">更新</el-button>
                        </div>
                    </div>
                    <div class="row" style="margin-top:2%;">
                        <div class='col-md-3'>
                            <label for='アラートのみ' class='col-form-label px-1' style='width:100%;'></label>
                            <el-checkbox style="margin-left:5%;" v-model="data.search.model.IsAlert" @change="changeVisibilityIsAlert()">アラートのみ</el-checkbox>
                        </div>
                        <div class='col-md-3'>
                            <label for='社員検索' class='col-form-label px-1' style='width:100%;'>社員名検索</label>
                            <el-form-item label-width="0" prop="syoriKubun">
                                <el-input type='text'
                                          style='width:100%;'
                                          v-model="data.search.model.memberName"
                                          @change="changeVisibilityMemberName()"
                                          ></el-input>

                            </el-form-item>
                        </div>
                        <div class='col-md-2'>
                            <label for='社員検索' class='col-form-label px-1' style='width:100%;'>運行追加</label>
                            <el-button type='warning' @click="addServiceLogAllDrivers()">全社員分追加</el-button>
                        </div>
                        <div class='col-md-3'>
                            <label for='社員検索' class='col-form-label px-1' style='width:100%;'>社員を指定して追加</label>
                            <el-select name="name" v-model="data.search.model.selectedDrivers" style="margin-right:2%" multiple>
                                <el-option v-for="driver in data.drivers" :value="driver.MemberID" :label="driver.MemberName"></el-option>
                            </el-select>
                            <el-button type='warning' @click="addServiceLogBySelectedDrivers()">運行を追加</el-button>
                        </div>
                    </div>
                    <div class="row" style="margin-top:2%;">
                        <div class='col-md-3'>
                            <el-radio style="margin-left:5%;" v-model="data.search.model.NarrowDestination" label="decided" @change="changeVisibilityDestination()">行先決定済みのみ</el-radio>
                        </div>
                        <div class='col-md-3'>
                            <el-radio style="margin-left:5%;" v-model="data.search.model.NarrowDestination" label="unDecided" @change="changeVisibilityDestination()">行先未決定のみ</el-radio>
                        </div>
                        <div class='col-md-3'>
                            <el-radio style="margin-left:5%;" v-model="data.search.model.NarrowDestination" label="all" @change="changeVisibilityDestination()">すべて</el-radio>
                        </div>

                    </div>
                    <div class="row" style="margin-top:2%;">
                        <div class='col-md-9'>
                        </div>
                        <div class='col-md-3'>
                            <el-button style='margin-top:13%;width:80%;' type='danger'@click="save()">変更を保存</el-button>
                        </div>
                   
                    </div>

                </el-form>
                <div class="row" style="margin-top:4%;">
                    <div class="col-12">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>
                                        社員名
                                    </th>
                                    <th>
                                        行先
                                    </th>
                                    <th>
                                        乗務前点呼時間
                                    </th>
                                    <th>
                                        最終電話点呼時間
                                    </th>
                                    <th>
                                        乗務後点呼時間
                                    </th>
                                    <th>
                                        点呼内容を表示
                                    </th>
                                    <th>
                                        運行を削除
                                    </th>

                                </tr>
                            </thead>
                            <tbody v-for="meisai_data in data.meisai" v-bind:key="meisai_data.index" style="border-bottom:solid 0.5px #d3d3d3;" v-if="judgeDisplayServiceLog(meisai_data.Visibility)">
                                <tr v-bind:style="getAlertColor(meisai_data)">
                                    <td>
                                        {{meisai_data.ServiceLog.MemberName}}
                                    </td>
                                    <td style="width:20%;">
                                        <el-select name="name" v-model="meisai_data.ServiceLog.DestinationID" style="width:100%;" @change="meisai_data.IsEdit = true" :disabled="meisai_data.IsDelete">
                                            <el-option v-for="destination in data.destinations" :value="destination.DestinationID" :label="destination.DestinationName"></el-option>
                                        </el-select>
                                    </td>
                                    <td>
                                        {{meisai_data.ServiceLog.BeforDrivingRollCallTime}}
                                    </td>
                                    <td>
                                        {{meisai_data.ServiceLog.LastRollCallTime}}
                                    </td>
                                    <td>
                                        {{meisai_data.ServiceLog.AfterDrivingRollCallTime}}
                                    </td>
                                    <td style="width:10%;">
                                        <el-button type='success' @click="moveRollCallInput(meisai_data)" style="width:100%;" :disabled="meisai_data.ServiceLog.ServiceLogID == -1">点呼内容表示</el-button>
                                    </td>
                                    <td style="width:10%;">
                                        <el-button type='primary' @click="$set(meisai_data,'IsDelete',!meisai_data.IsDelete)" style="width:100%;">{{meisai_data.IsDelete ?"復帰" : "削除"}}</el-button>
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>



            </div>
        </el-card>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Card from '@/components/Card/Card.vue'
    import config from '@/config.js'
    import ElIncrementSearch from '@/components/IncrementSearch.vue'
    import arrayFunction from '@/js/array.js'
    import url from '@/js/api_url.js'
    import time from '@/js/status/time.js'


    export default {
        name: 'niukeSyukei',
        components: {
            Card, ElIncrementSearch
        },
        data: function () {
            return {
                data: {
                    search: {
                        model: {
                            memberName: "",
                            ServiceDate: "",
                            IsLongDistance: "",
                            IsAlert: false,
                            NarrowDestination: "all",
                            selectedDrivers: [],
                        },
                        validation: {
                            memberName: [
                                { required: true, message: '社員名が入力されていません', trigger: 'blur' },
                            ],
                        }
                    },
                    AlertColor: {
                        0: "",
                        1: "",
                        2: "",
                    },
                    drivers: [],
                    destinations: [],
                    meisai: [],
                    isSave: false,
                },
            }
        },
        methods: {

            moveRollCallInput: function (meisai_data) {

                if (window.confirm("変更が保存されませんがよろしいですか？")) {

                    this.$store.commit('changeMoveRollCallLogInput', { ServiceDate: meisai_data.ServiceLog.ServiceDate, MemberID: meisai_data.ServiceLog.DriverID });

                    this.$router.push('/uedaunyu/rollCallLogInput');

                }
            },
            getAlertColor: function (meisai_data) {

                var alertKind = meisai_data.AlertKind;

                if (meisai_data.IsDelete) {

                    return "background-color:#a9a9a9;"

                } else {
                    if (alertKind == 0 || alertKind == 1 || alertKind == 2) {

                        return "background-color:" + this.data.AlertColor[alertKind] + ";";

                    } else {

                        return "";
                    }
                }

               

            },
            getDriversIndex: function (DriverID) {

                for (var i = 0; i < this.data.drivers.length; i++) {

                    if (this.data.drivers[i].MemberID == DriverID) {
                        return i;
                    }
                }


            },
            getDriver: function (DriverID) {

                return this.data.drivers[this.getDriversIndex(DriverID)];
            },
            addServiceLogAllDrivers: function () {

                for (var i = 0; i < this.data.drivers.length; i++) {

                    var driver = this.data.drivers[i];

                    console.log(driver);

                    this.addServiceLog(driver.IsLongDistance, driver.DestinationID, -1, driver.MemberID,this.data.search.model.ServiceDate, driver.MemberName, "", "", "");

                }

            },
            addServiceLogBySelectedDrivers: function () {

                for (var i = 0; i < this.data.search.model.selectedDrivers.length; i++) {

                    var driverID = this.data.search.model.selectedDrivers[i];

                    for (var k = 0; k < this.data.drivers.length; k++) {

                        var driver = this.data.drivers[k];

                        if (driver.MemberID == driverID) {

                            this.addServiceLog(driver.IsLongDistance, driver.DestinationID, -1, driver.MemberID, this.data.search.model.ServiceDate, driver.MemberName, "", "", "");
                        }
                        
                    }

                }


            },
            addServiceLog: function (IsLongDistance, DestinationID, ServiceLogID, DriverID, ServiceDate, MemberName, BeforDrivingRollCallTime, LastRollCallTime, AfterDrivingRollCallTime) {

                this.data.meisai.push(this.createServiceLog(IsLongDistance, DestinationID, ServiceLogID, DriverID, ServiceDate, MemberName, BeforDrivingRollCallTime, LastRollCallTime, AfterDrivingRollCallTime));

                console.log(this.data.meisai);
                
            },
            createServiceLog: function (IsLongDistance, DestinationID, ServiceLogID, DriverID, ServiceDate, MemberName, BeforDrivingRollCallTime, LastRollCallTime, AfterDrivingRollCallTime) {


                var Visibility = this.createVisibilityObject();

                return {
                    IsLongDistance: IsLongDistance,
                    Visibility: Visibility,
                    IsDelete: false,
                    IsEdit: false,
                    AlertKind: null,
                    ServiceLog: {
                        DestinationID: DestinationID,
                        CompanyID: this.data.companyID,
                        EditorID: this.data.editorID,
                        ServiceLogID: ServiceLogID,
                        DriverID: DriverID,
                        ServiceDate: ServiceDate,
                        MemberName: MemberName,
                        BeforDrivingRollCallTime: BeforDrivingRollCallTime,
                        LastRollCallTime: LastRollCallTime,
                        AfterDrivingRollCallTime: AfterDrivingRollCallTime,

                    }
                }
            },
            createVisibilityObject: function () {

                return {
                    IsLongDistance: true,
                    MemberName: true,
                    IsAlert: true,
                    IsDecidedDestination: true,
                }
            },
            changeVisibilityIsLongDistance: function () {

                var isLongDistance = this.data.search.model.IsLongDistance;
                for (var i = 0; i < this.data.meisai.length; i++) {

                    if (!this.data.meisai[i].IsDelete) {

                        var visibility = true;

                        if (isLongDistance != null) {

                            if (this.data.meisai[i].IsLongDistance != isLongDistance) {
                                visibility = false;
                            }
                        }

                        this.data.meisai[i].Visibility.IsLongDistance = visibility;
                    }

                }

            },
            changeVisibilityIsAlert: function () {

                var isAlert = this.data.search.model.IsAlert;

                for (var i = 0; i < this.data.meisai.length; i++) {
                    if (!this.data.meisai[i].IsDelete) {

                        var visibility = true;

                        if (isAlert) {

                            if (this.data.meisai[i].AlertKind == null) {
                                visibility = false;

                            }
                        }

                        this.data.meisai[i].Visibility.IsAlert = visibility;
                    }
                }

            },
            changeVisibilityMemberName: function () {

                var memberName = this.data.search.model.memberName;

                for (var i = 0; i < this.data.meisai.length; i++) {
                    if (!this.data.meisai[i].IsDelete) {

                        var visibility = true;

                        if (memberName != "") {

                            if (this.data.meisai[i].ServiceLog.MemberName.indexOf(memberName) == -1) {

                                visibility = false;

                            }
                        }

                        this.data.meisai[i].Visibility.MemberName = visibility;
                    }
                }

            },
            changeVisibilityDestination: function () {

                var destination = this.data.search.model.NarrowDestination;

                for (var i = 0; i < this.data.meisai.length; i++) {
                    if (!this.data.meisai[i].IsDelete) {

                        var visibility = true;

                        if (destination != "all") {

                            var destinationID = this.data.meisai[i].ServiceLog.DestinationID;

                            if (destination == "unDecided") {
                                if (destinationID != null) {
                                    visibility = false;
                                }
                            } else if (destination == "decided") {
                                if (destinationID == null) {
                                    visibility = false;
                                }
                            }
                        }

                        this.data.meisai[i].Visibility.IsDecidedDestination = visibility;
                    }
                }

            },


            judgeDisplayServiceLog: function (visibility) {

                var result = true;

                for (var i in visibility) {

                    if (!visibility[i]) {
                        result = false;
                    }

                }
                return result
            },
            serviceLogSearch: function () {

                axios.get(url.ApiUrl().GetRollCallStatus([{ key: "CompanyID", value: this.data.companyID }, { key: "ServiceDate", value: this.data.search.model.ServiceDate }]))
                    .then(response => {

                        console.log(response.data);
                        this.$set(this.data, "meisai", response.data);

                        for (var i in this.data.meisai) {

                            this.$set(this.data.meisai[i], "Visibility", this.createVisibilityObject());

                            this.$set(this.data.meisai[i].ServiceLog, "MemberName", this.getDriver(this.data.meisai[i].ServiceLog.DriverID).MemberName);

                        }

                        console.log(this.data.meisai);

              
                    })
                    .catch(response => {
                    })


            },
            save: function () {

                this.data.isSave = true;
                axios.put(url.ApiUrl().RollCallStatusSave(), this.data.meisai)
                    .then(response => {

                        console.log(response.data);
                        if (response.data) {

                            this.$message({
                                message: '登録に成功しました',
                                type: 'success'
                            });

                            this.serviceLogSearch();

                        } else {

                            this.$message({
                                message: '登録に失敗しました',
                                type: 'error'
                            });

                        }


                        this.data.isSave = false;

                    })
                    .catch(response => {

                        this.$message({
                            message: '通信に失敗しました',
                            type: 'error'
                        });

                        this.data.isSave = false;

                    })

            },
            sendEmail: function () {

                this.data.isSave = true;
                axios.post(url.ApiUrl().RollCallStatusSendEmail(), this.data.meisai)
                    .then(response => {

                        console.log(response.data);
                        if (response.data) {

                            this.$message({
                                message: '登録及び違反者へのメール送信に成功しました',
                                type: 'success'
                            });

                            this.serviceLogSearch();

                        } else {

                            this.$message({
                                message: '登録及び違反者へのメール送信に失敗しました',
                                type: 'error'
                            });

                        }


                        this.data.isSave = false;

                    })
                    .catch(response => {

                        this.$message({
                            message: '通信に失敗しました',
                            type: 'error'
                        });

                        this.data.isSave = false;

                    })

            }


        },
        created: function () {


            this.data.companyID = this.$store.state.login.companyID;
            this.data.editorID = this.$store.state.login.userID;

            this.data.search.model.ServiceDate = time.nowJapanDateInput();

            axios.get(url.ApiUrl().GetRollCallStatusMasterData([{ key: "CompanyID", value: this.data.companyID }]))
                .then(response => {

                    console.log(response.data.Drivers);

                    this.$set(this.data, "drivers", response.data.Drivers);
                    this.$set(this.data, "destinations", response.data.Destinations);

                    this.$set(this.data, "AlertColor", response.data.AlertColor);


                    this.serviceLogSearch();

                })
                .catch(response => console.log(response))


        },
        mounted: function () {

        },
        watch: {

        }
    }
</script>

<style scoped>

    .search {
        background-color: blue;
        color: white;
    }
</style>