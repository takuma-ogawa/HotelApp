<template>
    <div class="container">
        <h4 style="margin-top:4%;">キーボード</h4>
        <div class="row" style="margin-top:4%;">
            <div class="col-4">
            </div>
            <div class="col-3">
            </div>
            <div class="col-5">
                <el-button type="primary" :plain="clickedButtonID != 12" @click="clickedButton(12,'Clear')" style="display:block;width:100%;">Clear</el-button>
            </div>
        </div>
        <div class="row" style="margin-top:4%;">
            <div class="col-4">
                <el-button type="primary" :plain="clickedButtonID != 7" @click="clickedButton(7,'7')" style="display:block;width:100%;">7</el-button>
            </div>
            <div class="col-4">
                <el-button type="primary" :plain="clickedButtonID != 8" @click="clickedButton(8,'8')" style="display:block;width:100%;">8</el-button>
            </div>
            <div class="col-4">
                <el-button type="primary" :plain="clickedButtonID != 9" @click="clickedButton(9,'9')" style="display:block;width:100%;">9</el-button>
            </div>
        </div>
        <div class="row" style="margin-top:4%;">
            <div class="col-4">
                <el-button type="primary" :plain="clickedButtonID != 4" @click="clickedButton(4,'4')" style="display:block;width:100%;">4</el-button>
            </div>
            <div class="col-4">
                <el-button type="primary" :plain="clickedButtonID != 5" @click="clickedButton(5,'5')" style="display:block;width:100%;">5</el-button>
            </div>
            <div class="col-4">
                <el-button type="primary" :plain="clickedButtonID != 6" @click="clickedButton(6,'6')" style="display:block;width:100%;">6</el-button>
            </div>
        </div>
        <div class="row" style="margin-top:4%;">
            <div class="col-4">
                <el-button type="primary" :plain="clickedButtonID != 1" @click="clickedButton(1,'1')" style="display:block;width:100%;">１</el-button>
            </div>
            <div class="col-4">
                <el-button type="primary" :plain="clickedButtonID != 2" @click="clickedButton(2,'2')" style="display:block;width:100%;">２</el-button>
            </div>
            <div class="col-4">
                <el-button type="primary" :plain="clickedButtonID != 3" @click="clickedButton(3,'3')" style="display:block;width:100%;">３</el-button>
            </div>
        </div>
        <div class="row" style="margin-top:4%;margin-bottom:4%;">
            <div class="col-4">
                <el-button type="primary" :plain="clickedButtonID != 10" @click="clickedButton(10,'0')" style="display:block;width:100%;">0</el-button>
            </div>
            <div class="col-4">
                <el-button type="primary" :plain="clickedButtonID != 11" @click="clickedButton(11,'00')" style="display:block;width:100%;">00</el-button>
            </div>
            <div class="col-4">
            </div>
        </div>

    </div>
    
</template>

<script>
  

    export default {
        name: 'keyboard',
        model: {
            prop: 'code',
            event: "change",
        },
        props: {
        },
        data: function () {

            return {
                clickedButtonID: "",

            }
        },
        methods: {
            clickedButton: function (id,text) {

                this.clickedButtonID = id;
                this.$emit('click', text);
                setTimeout(this.clickedButtonID = "", 2000);
            }
        },
        mounted: function () {

        },
        watch: {
  
        },
    }
</script>

<style scoped>
</style>