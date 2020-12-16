<template>
    <div>
        <el-card>
            <div slot='header'>
                <span>点呼記録入力</span>
            </div>
            <div slot='default'>
                <el-form :model="data.search.model" :rules="data.search.validation" ref="searchForm" label-width="120px">
                    <div class="row">
                        <div class='col-md-3'>
                            <label for='運行日' class='col-form-label px-1' style='width:100%;'>運行日：</label>
                            <el-form-item label-width="0" prop="ServiceDate">
                                <el-input type="date"
                                          style='width:100%;'
                                          v-model="data.search.model.ServiceDate"></el-input>

                            </el-form-item>
                        </div>
                        <div class='col-md-9' style="text-align:right;">
                            <label class='col-form-label px-1' style='width:100%;'></label>
                            <el-button style='width: 40%;' type='warning' @click="$router.push('/RollCallLogInput')">戻る</el-button>
                        </div>

                    </div>
                    <div class="row">
                        <div class='col-md-3'>
                            <label for='運転手選択' class='col-form-label px-1' style='width:100%;'>運転手選択：</label>
                            <el-form-item label-width="0" prop="MemberID">
                                <el-select name="name" v-model="data.search.model.MemberID">
                                    <el-option v-for="driver in data.drivers" :value="driver.MemberID" :label="driver.MemberName"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class='col-md-3' style="">
                            <label class='col-form-label px-1' style='width:100%;'>検索：</label>
                            <el-button style='width:40%;' type='success' @click="search(false)" icon="el-icon-search" :disabled="data.isSave">検索</el-button>
                        </div>
                    </div>

                    <div class="row" style="margin-top:4%;">
                        <div class='col-md-3'>
                            <label for='選択中の運航日' class='col-form-label px-1' style='width:100%;'>選択中の運航日：</label>
                            <el-input v-model="data.log.serviceDate" readonly></el-input>

                        </div>
                        <div class='col-md-3' style="">
                            <label for='選択中の運転手' class='col-form-label px-1' style='width:100%;'>選択中の運転手：</label>
                            <el-input v-model="data.log.driverName" readonly></el-input>
                        </div>
                        <div class='col-md-3' style="">
                        </div>
                        <div class='col-md-3' style="">
                            <label for='最初に戻る' class='col-form-label px-1' style='width:100%;'>最初に戻る：</label>
                            <el-button style='width:40%;' type='info' @click="initInput()"　:disabled="data.isSave">最初に戻る</el-button>
                        </div>

                    </div>


                </el-form>
                <el-form :model="data.log" ref="logForm" label-width="120px">

                    <div class="row" style="margin-top:4%;">
                        <div class='col-12' style="text-align:right; margin-top:2%;">
                            <el-button style='width:30%;' type='danger' @click="save()" v-if="data.isSearch":disabled="data.isSave">保存</el-button>
                        </div>
                        <div class="col-12" v-for="(ServiceLog ,ServiceLogIndex) in data.log.service" style="margin-top:2%;">
                            <el-card>
                                <div class="row">
                                    <div class="col-2">
                                        <label for='行先選択' class='col-form-label px-1' style='width:100%;'>行先選択</label>
                                        <el-select name="name" v-model="ServiceLog.ServiceLog.DestinationID":disabled="data.isSave">
                                            <el-option v-for="destination in data.destinations" :value="destination.DestinationID" :label="destination.DestinationName"></el-option>
                                        </el-select>
                                    </div>
                                    <div class="col-2">
                                        <label for='車両選択' class='col-form-label px-1' style='width:100%;'>車両選択</label>
                                        <el-select name="name" v-model="ServiceLog.ServiceLog.VehicleID":disabled="data.isSave">
                                            <el-option v-for="vehicle in data.vehicles" :value="vehicle.VehicleID" :label="vehicle.VehicleName"></el-option>
                                        </el-select>
                                    </div>
                                    <div class="col-5"></div>
                                    <div class="col-3">
                                        <label for='運行順番の入れ替え' class='col-form-label px-1' style='width:100%;'>運行順番の入れ替え</label>
                                        <el-button type='info'
                                                   style=''
                                                   :disabled="ServiceLogIndex == 0 || data.isSave"
                                                   @click="changeServiceRogTurn(ServiceLogIndex,'up')">▲</el-button>
                                        <el-button type='info'
                                                   style=''
                                                   :disabled="ServiceLogIndex == data.log.service.length - 1 || data.isSave"
                                                   @click="changeServiceRogTurn(ServiceLogIndex,'down')">▼</el-button>
                                    </div>
                                    <div class="col-12" v-for="(RollCallLog ,RollCallLogIndex) in ServiceLog.RollCallLog">
                                        <el-card style="margin-top:2%;width:90%; float:left;">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            点呼時間
                                                        </th>
                                                        <th>
                                                            点呼方法
                                                        </th>
                                                        <th>
                                                            アルコール検知器の有無
                                                        </th>
                                                        <th>
                                                            酒気帯びの有無
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tr style="border-bottom:solid 0.5px #d3d3d3;">
                                                    <td>
                                                        <el-form-item label-width="0"
                                                                      :prop="'service[' + ServiceLogIndex + '].RollCallLog[' + RollCallLogIndex + '].RollCallTime'"
                                                                      :rules="{
                                                              required: true, message: '点呼時間が入力されていません', trigger: 'blur'
                                                              }">

                                                            <el-input type='datetime-local'
                                                                      style='width:100%;'
                                                                      v-model="RollCallLog.RollCallTime"
                                                                      :disabled="data.isSave"></el-input>
                                                        </el-form-item>
                                                    </td>
                                                    <td>
                                                        <el-select name="name" v-model="RollCallLog.RollCallMethodID" style="width:100%;":disabled="data.isSave">
                                                            <el-option v-for="rollcallmethod in data.rollcallmethods" :value="rollcallmethod.RollCallMethodID" :label="rollcallmethod.RollCallMethodName"></el-option>
                                                        </el-select>
                                                    </td>
                                                    <td>
                                                        <el-select name="name" v-model="RollCallLog.IsUseAlcoholDetector" style="width:100%;":disabled="data.isSave">
                                                            <el-option :value="true" label="有"></el-option>
                                                            <el-option :value="false" label="無"></el-option>
                                                        </el-select>
                                                    </td>
                                                    <td>
                                                        <el-select name="name" v-model="RollCallLog.IsDrinking" style="width:100%;":disabled="data.isSave">
                                                            <el-option :value="false" label="無"></el-option>
                                                            <el-option :value="true" label="有"></el-option>
                                                        </el-select>
                                                    </td>
                                                </tr>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            疾病・疲労等の有無
                                                        </th>
                                                        <th>
                                                            詳細
                                                        </th>
                                                        <th colspan="2">
                                                            備考
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tr style="border-bottom:solid 0.5px #d3d3d3;">
                                                    <td>
                                                        <el-select name="name" v-model="RollCallLog.IsDisease" style="width:100%;":disabled="data.isSave">
                                                            <el-option :value="true" label="有"></el-option>
                                                            <el-option :value="false" label="無"></el-option>
                                                        </el-select>
                                                    </td>
                                                    <td>
                                                        <el-select name="name" v-model="RollCallLog.DiseasesID" style="width:100%;" :disabled="!RollCallLog.IsDisease || data.isSave">
                                                            <el-option v-for="disease in data.diseases" :value="disease.DiseaseID" :label="disease.DiseaseName"></el-option>
                                                        </el-select>
                                                    </td>
                                                    <td colspan="2">
                                                        <el-input type='text'
                                                                  style='width:100%;'
                                                                  :disabled="data.diseases[getDiseasesIndex(RollCallLog.DiseasesID)] != undefined ? !data.diseases[getDiseasesIndex(RollCallLog.DiseasesID)].NoteFlag:true || data.isSave"
                                                                  v-model="RollCallLog.NoteOfDiseases"
                                                                  ></el-input>
                                                    </td>
                                                </tr>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            日常点検の有無
                                                        </th>
                                                        <th>
                                                            点呼執行者
                                                        </th>
                                                        <th>
                                                            指示事項
                                                        </th>
                                                        <th>
                                                            点呼種類
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tr style="border-bottom:solid 0.5px #d3d3d3;">
                                                    <td>
                                                        <el-select name="name" v-model="RollCallLog.IsPerformedDailyCheck" style="width:100%;":disabled="data.isSave">
                                                            <el-option :value="true" label="有"></el-option>
                                                            <el-option :value="false" label="無"></el-option>
                                                        </el-select>
                                                    </td>
                                                    <td>
                                                        <el-select name="name" v-model="RollCallLog.RollCallerID" style="width:100%;":disabled="data.isSave">
                                                            <el-option v-for="rollcaller in data.rollcallers" :value="rollcaller.MemberID" :label="rollcaller.MemberName"></el-option>
                                                        </el-select>
                                                    </td>
                                                    <td>
                                                        <el-select name="name" v-model="RollCallLog.InstructionID" style="width:100%;":disabled="data.isSave">
                                                            <el-option v-for="instruction in data.instructions" :value="instruction.InstructionID" :label="instruction.InstructionName"></el-option>
                                                        </el-select>
                                                    </td>
                                                    <td>
                                                        <el-form-item label-width="0"
                                                                      :prop="'service[' + ServiceLogIndex + '].RollCallLog[' + RollCallLogIndex + '].RollCallKind'"
                                                                      :rules="{
                                                              required: true, message: '点呼の種類が選択されていません', trigger: 'blur'
                                                              }">

                                                            <el-select name="name" v-model="RollCallLog.RollCallKind" style="width:100%;" :disabled="data.isSave">
                                                                <el-option :value="0" label="乗務前点呼"></el-option>
                                                                <el-option :value="1" label="乗務後点呼"></el-option>
                                                                <el-option :value="2" label="途中点呼"></el-option>
                                                            </el-select>
                                                        </el-form-item>
                                                    </td>
                                                </tr>

                                            </table>
                                            <div class="col-12" style="text-align:right;margin-top:2%;">
                                                <el-button type='info'
                                                           style='width:20%;display:inline;'
                                                           @click="removeRollCallMeisai(ServiceLogIndex,RollCallLogIndex)"
                                                           :disabled="data.isSave">点呼を削除</el-button>
                                            </div>
                                        </el-card>
                                        <div style="width:10%;float:left;text-align:center;margin-top:15%;">
                                            <div>
                                                <el-button type='info'
                                                           style=''
                                                           :disabled="RollCallLogIndex == 0 || data.isSave"
                                                           @click="changeRollCallRogTurn(ServiceLogIndex,RollCallLogIndex,'up')">▲</el-button>
                                            </div>
                                            <div style="margin-top:5%;">
                                                <el-button type='info'
                                                           style=''
                                                           :disabled="RollCallLogIndex == ServiceLog.RollCallLog.length - 1 || data.isSave"
                                                           @click="changeRollCallRogTurn(ServiceLogIndex,RollCallLogIndex,'down')">▼</el-button>

                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-12" style="text-align:center;margin-top:2%;">
                                        <el-button type='warning'
                                                   style='width:40%;display:inline;'
                                                   @click="addRollCallMeisai(ServiceLogIndex)"
                                                   :disabled="data.isSave">点呼を追加</el-button>
                                    </div>
                                    <div class="col-12" style="text-align:right;margin-top:2%;">
                                        <el-button type='info'
                                                   style='width:20%;display:inline;'
                                                   @click="remobeServiceMeisai(ServiceLogIndex)"
                                                   :disabled="data.isSave">運行を削除</el-button>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                        <div class="col-12" style="text-align:center;margin-top:2%;">
                            <el-button type='primary'
                                       style='width:40%;display:inline;'
                                       v-if="data.isSearch"
                                       @click="addServiceMeisai()"
                                       :disabled="data.isSave">運行を追加</el-button>
                        </div>
                        <div class='col-12' style="text-align:right; margin-top:2%;">
                            <el-button style='width:30%;' type='danger' @click="save()" v-if="data.isSearch" :disabled="data.isSave">保存</el-button>
                        </div>
                    </div>

                </el-form>

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
                    companyID: "",
                    search: {
                        model: {
                            MemberID: "",
                            ServiceDate: "2020-11-18",
                        },
                        validation: {
                            MemberID: [
                                { required: true, message: '社員名が入力されていません', trigger: 'blur' },
                            ],
                            ServiceDate: [
                                { required: true, message: '運行日が入力されていません', trigger: 'blur' },
                            ],
                        }
                    },
                    isSearch: false,
                    isSave: false,
                    log: {
                        service: [],
                        driverID: "",
                        driverName:"",
                        serviceDate: "",
                        deletes: {
                            ServiceLogs: [],
                            RollCallLogs: [],
                        },
                    },
                    meisai: [],
                    updateButton: "",
                    drivers: [],
                    rollcallers: [],
                    destinations: [],
                    vehicles: [],
                    rollcallmethods: [],
                    diseases: [],
                    instructions: [],

                },
            }
        },
        methods: {
            getDiseasesIndex: function (DiseaseID) {

                for (var i = 0; i < this.data.diseases.length; i++) {

                    if (this.data.diseases[i].DiseaseID == DiseaseID) {
                        return i;
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
            changeRollCallRogTurn: function (seviceIndex, index, kind) {

                var rollCallLog = this.data.log.service[seviceIndex].RollCallLog;

                if (kind == "up") {

                    rollCallLog.splice(index - 1, 2, rollCallLog[index], rollCallLog[index - 1]);

                } else if (kind == "down") {

                    rollCallLog.splice(index, 2, rollCallLog[index + 1], rollCallLog[index]);

                }

            },
            changeServiceRogTurn: function (index, kind) {

                var serviceLog = this.data.log.service;

                if (kind == "up") {

                    serviceLog.splice(index - 1, 2, serviceLog[index], serviceLog[index - 1]);

                } else if (kind == "down") {

                    serviceLog.splice(index, 2, serviceLog[index + 1], serviceLog[index]);

                }

            },
            addServiceMeisai: function () {

                var driver = this.getDriver(this.data.log.driverID);
                var vehicleID = driver.VehicleID;
                var destinationID = driver.DestinationID;


                this.data.log.service.push({
                    ServiceLog: {
                        DestinationID: destinationID,
                        VehicleID: vehicleID,
                        CompanyID: this.data.companyID,
                        EditorID: this.data.editorID,
                        ServiceLogID: -1,
                        DriverID: this.data.log.driverID,
                        ServiceDate: this.data.log.serviceDate
                    }, RollCallLog: [{
                        RollCallLogID: -1,
                        CompanyID: this.data.companyID,
                        EditorID: this.data.editorID
                    }]
                });


            },
            remobeServiceMeisai: function (ServiceLogIndex) {

                if (window.confirm("削除しますか？")) {

                    if (this.data.log.service[ServiceLogIndex].ServiceLog.ServiceLogID != -1) {


                        this.data.log.deletes.ServiceLogs.push(this.data.log.service[ServiceLogIndex].ServiceLog);

                        for (var i in this.data.log.service[ServiceLogIndex].RollCallLog) {

                            this.data.log.deletes.RollCallLogs.push(this.data.log.service[ServiceLogIndex].RollCallLog[i]);

                        }
                    } 

                    this.data.log.service.splice(ServiceLogIndex, 1);

                }

            },
            addRollCallMeisai: function (ServiceLogIndex) {

                this.data.log.service[ServiceLogIndex].RollCallLog.push({
                    CompanyID: this.data.companyID,
                    EditorID: this.data.editorID,
                    RollCallLogID: -1
                });

            },
            removeRollCallMeisai: function (ServiceLogIndex, RollCallLogIndex) {

                if (window.confirm("削除しますか？")) {

                    if (this.data.log.service[ServiceLogIndex].RollCallLog[RollCallLogIndex].RollCallLogID != -1) {

                        this.data.log.deletes.RollCallLogs.push(this.data.log.service[ServiceLogIndex].RollCallLog[RollCallLogIndex]);
                    }
                    console.log(this.data.log.deletes);
                    this.data.log.service[ServiceLogIndex].RollCallLog.splice(RollCallLogIndex, 1);

                }

            },
            search: function (initFlag) {

                this.$refs['searchForm'].validate((valid) => {

                    if (valid) {

                        if (this.data.isSearch) {

                            if (!initFlag) {
                                if (!window.confirm("点呼記録が保存されませんがよろしいですか？")) {
                                    return false;
                                }
                            } 
                            
                        }

                        this.init();

                        this.getRollCallLogsInput(initFlag);

                    }
                })

            },
            init: function () {

                this.$set(this.data.log, "service", []);

            },
            initInput: function () {

                if (!window.confirm("点呼記録が保存されませんがよろしいですか？")) {
                    return false;
                }
                this.init();
                this.data.isSearch = false;

            },
            getRollCallLogsInput: function (initFlag) {

                axios.get(url.ApiUrl().GetRollCallLogInputs([{ key: "MemberID", value: this.data.search.model.MemberID }, { key: "ServiceDate", value: this.data.search.model.ServiceDate }]))
                    .then(response => {

                        this.data.log.driverID = this.data.search.model.MemberID;
                        this.data.log.driverName = this.getDriver(this.data.search.model.MemberID).MemberName;
                        this.data.log.serviceDate = this.data.search.model.ServiceDate;
                        console.log(response.data);
                        if (response.data.length == 0) {

                            this.addServiceMeisai();

                        } else {

                            this.$set(this.data.log, "service", response.data);


                        }

                        this.data.isSearch = true;
                        console.log(initFlag);
                        if (initFlag) {
                            this.$store.commit('changeMoveRollCallLogInput', { ServiceDate: "", MemberID: "" });

                        }

                    })
                    .catch(response => {
                        this.data.isSearch = false;
                    })



            },
            save: function () {


                this.$refs['logForm'].validate((valid) => {

                    if (valid) {


                        for (var i in this.data.log.service) {

                            var beforDrivingRollCallLogCount = 0;
                            var afterDrivingRollCallLogCount = 0;

                            

                            for (var k in this.data.log.service[i].RollCallLog) {

                                if (this.data.log.service[i].RollCallLog[k].RollCallKind == 0) {

                                    beforDrivingRollCallLogCount++;

                                } else if (this.data.log.service[i].RollCallLog[k].RollCallKind == 1) {

                                    afterDrivingRollCallLogCount++;
                                }


                            }

                            console.log(beforDrivingRollCallLogCount, afterDrivingRollCallLogCount);

                            if (beforDrivingRollCallLogCount >= 2 || afterDrivingRollCallLogCount >= 2) {

                                alert("乗務前点呼及び乗務後点呼は2つ以上登録できません");

                                return false;
                            }

                        }



                        this.data.isSave = true;
                        axios.post(url.ApiUrl().RollCallLogInputsSave(), this.data.log.service)
                            .then(response => {

                                if (response.data) {


                                    axios.put(url.ApiUrl().RollCallLogInputsDelete(), this.data.log.deletes)
                                        .then(response => {

                                            if (response.data) {

                                                this.$message({
                                                    message: '登録に成功しました',
                                                    type: 'success'
                                                });

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

                                        });


       
                                } else {

                                    this.$message({
                                        message: '登録に失敗しました',
                                        type: 'error'
                                    });

                                }

 
                            })
                            .catch(response => {
                                this.$message({
                                    message: '通信に失敗しました',
                                    type: 'error'
                                });


                                this.data.isSave = false;

                            });

                    }
                })

            }

        },
        created: function () {

            this.data.companyID = this.$store.state.login.companyID;
            this.data.editorID = this.$store.state.login.userID;

            this.data.search.model.ServiceDate = time.nowJapanDateInput();

            axios.get(url.ApiUrl().GetRollCallLogInputMasterData([{ key: "CompanyID", value: this.data.companyID }]))
                .then(response => {

                    this.$set(this.data, "drivers", response.data.Drivers);
                    this.$set(this.data, "rollcallers", response.data.RollCallers);
                    this.$set(this.data, "destinations", response.data.Destinations);
                    this.$set(this.data, "vehicles", response.data.Vehicles);
                    this.$set(this.data, "rollcallmethods", response.data.RollCallMethods);
                    this.$set(this.data, "diseases", response.data.Diseases);
                    this.$set(this.data, "instructions", response.data.Instructions);

                    console.log(this.data.drivers);

                    if (this.$store.state.moveRollCallLogInput.ServiceDate != "") {

                        this.data.search.model.ServiceDate = this.$store.state.moveRollCallLogInput.ServiceDate;
                        this.data.search.model.MemberID = this.$store.state.moveRollCallLogInput.MemberID;

                        this.search(true);


                    }

                })
                .catch(response => console.log(response))

  


        },
        mounted: function () {

 
        },
        watch: {
        }
    }
</script>
