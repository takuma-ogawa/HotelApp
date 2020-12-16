<template>
        <el-autocomplete style='width:30%; margin-right:2%;'
                         v-model="data.code"
                         :fetch-suggestions="querySearch"
                         :placeholder="placeholder"
                         :disabled="disabled"
                         :autofocus="autofocus"
                         @select="autocompleteSelect"
                         @change="autocompleteChange">
            <template slot-scope="{ item }">
                <div style="border-top:solid 0.5px lightgray;">コード:{{ item.value }}</div>
                <div v-for="display in display">{{display.name}}:{{ item[display.key] }}</div>
                <div ></div>
            </template>
        </el-autocomplete>
</template>

<script>
    import search from '@/js/search/autocomplete.js'
    import exsist from '@/js/status/exsist.js'
    import array from '@/js/array/key_change.js'
    import url from '@/js/api_url.js'


    export default {
        name: 'el-increment-search',
        model: {
            prop: 'code',
            event: "change",
        },
        props: {
            code: {
                type: String,
            },
            autoComplete: {
                type: Array,
            },
            display: {
                type:Array,
            },
            required: {
                type: Boolean,
            },
            kind: {
                type: String,
            },
            disabled: {
                type: Boolean,
            },
            autofocus: {
                type: Boolean,
            }
        },
        data: function () {

            return {
                data: { code: null },
                autoCompleteData: {},
                querySearchData: [
                ],
                placeholder: null,
                message: {
                    error: "",
                }
            }
        },
        methods: {
            querySearch: function (queryString, cb) {

                var list = this.querySearchData;
                var results = queryString ? list.filter(search.createSearchFilter(queryString, "value")) : list;
                // call callback function to return suggestions
                cb(results);
            },
            autocompleteSelect: function (item) {

                for (var i in this.autoComplete) {

                    this.autoCompleteData[this.autoComplete[i]] = item[this.autoComplete[i]];
                }

                this.$emit('change', item.value)
                this.$emit('update', this.autoCompleteData);


            },
            autocompleteChange: function (value) {

                if (value == "") {

                    for (var i in this.autoComplete) {

                        this.autoCompleteData[this.autoComplete[i]] = "";
                    }

                    this.$emit('change', "")
                    this.$emit('update', this.autoCompleteData);



                    return false;
                }

                var result = exsist.is_exsist_by_object_value(value, this.querySearchData, "value");

                if (!result) {

                    if (this.required) {
                        alert(this.message.error);

                        for (var i in this.autoComplete) {

                            this.autoCompleteData[this.autoComplete[i]] = "";
                        }

                        this.$emit('change', "")
                        this.$emit('update', this.autoCompleteData);



                    }

                    return false;
                }

                for (var i in this.autoComplete) {

                    this.autoCompleteData[this.autoComplete[i]] = result[this.autoComplete[i]];
                }

                this.$emit('change', value)

                this.$emit('update', this.autoCompleteData);



            },
            createValueKey: function (array,codeKey) {
              
                for (var i in array) {
                    array[i].value = String(array[i][codeKey]);
                }

            }

        },
        created: function () {
            //今は定数データを入れているがサーバーからaxiosでデータを取ってくる

            if (this.kind == "商品") {
                this.placeholder = "商品コード"
                this.message.error = "入力したコードの商品は存在しません";




                axios.get(url.syouhinMaster)
                    .then(response => {


                        array.createValueKey(response.data, "syohinCD", "string");

                        this.querySearchData = response.data;

                        console.log(this.querySearchData);

                    })
                    .catch(response => console.log(response))


                

            }

        
            if (this.kind == "生産者") {
                this.placeholder = "生産者コード"
              this.message.error = "入力したコードの生産者は存在しません";

                axios.get(url.seisansyaMaster)
                    .then(response => {

                        array.createValueKey(response.data, "seisansyacd", "string");

                        this.querySearchData = response.data;

 
                    })
                    .catch(response => console.log(response))


            }

            if (this.kind == "品種") {
                this.placeholder = "品種コード"
               this.message.error = "入力したコードの品種は存在しません";

                var data = [
                    { code: "0", name: "三社" },
                    { code: "1", name: "平核" },
                ];

                //codeの部分は本番環境のコードのキーに変える
                this.createValueKey(data, "code");

                this.querySearchData = data;

            }

            if (this.kind == "等級") {
                this.placeholder = "等級コード"
                this.message.error = "入力したコードの等級は存在しません";

                var data = [
                    { code: "0", name: "上" },
                    { code: "99", name: "特上" },
                    { code: "2", name: "中" },
                    { code: "3", name: "下" },
                    { code: "4", name: "特下" },

                ];

                //codeの部分は本番環境のコードのキーに変える
                this.createValueKey(data, "code");

                this.querySearchData = data;

            }

            if (this.kind == "支所") {
                this.placeholder = "支所コード"
                this.message.error = "入力したコードの支所は存在しません";

                axios.get(url.shisyoMaster)
                    .then(response => {

                        array.createValueKey(response.data, "shisyoCD", "string");

                        this.querySearchData = response.data;

                        this.data.code = this.code;

                        if (this.code != "") {

                            this.autocompleteChange(this.data.code);
                        }

    
                    })
                    .catch(response => console.log(response))

            }


                   if (this.kind == "サイズ") {
                this.placeholder = "サイズコード"
                this.message.error = "入力したコードのサイズは存在しません";

                var data = [
                    { code: "0", name: "S" },
                    { code: "1", name: "L" },
                    { code: "2", name: "M" },
                
                ];

                //codeの部分は本番環境のコードのキーに変える
                this.createValueKey(data, "code");

                this.querySearchData = data;

            }


            if (this.kind == "市場") {
                this.placeholder = "市場コード"
                this.message.error = "入力したコードの市場は存在しません";


                axios.get(url.shijoMaster)
                    .then(response => {

                        array.createValueKey(response.data, "shijyoCD", "string");

                        this.querySearchData = response.data;

           

                    })
                    .catch(response => console.log(response))


            }

            if (this.kind == "部門") {
                this.placeholder = "部門コード"
                this.message.error = "入力したコードの部門は存在しません";

                axios.get(url.bumonMaster)
                    .then(response => {

                        array.createValueKey(response.data, "bumoncd", "string");

                        this.querySearchData = response.data;


                    })
                    .catch(response => console.log(response))

            }

            if (this.kind == "包装") {
                this.placeholder = "包装コード"
                this.message.error = "入力したコードの包装は存在しません";

                axios.get(url.hosoMaster)
                    .then(response => {

                        array.createValueKey(response.data, "hosoCD", "string");

                        this.querySearchData = response.data;

                        this.data.code = this.code;

                        if (this.code != "") {

                            this.autocompleteChange(this.data.code);
                        }


                    })
                    .catch(response => console.log(response))


            }

            if (this.kind == "地区") {
                this.placeholder = "地区コード"
                this.message.error = "入力したコードの地区は存在しません";

                axios.get(url.chikuMaster)
                    .then(response => {

                        array.createValueKey(response.data, "chikuCD", "string");

                        this.querySearchData = response.data;

                        this.data.code = this.code;

                        if (this.code != "") {

                            this.autocompleteChange(this.data.code);
                        }


                    })
                    .catch(response => console.log(response))


            }



            if (this.kind == "資材") {
                this.placeholder = "資材コード"
                this.message.error = "入力したコードの資材は存在しません";

                axios.get(url.shizaiMaster)
                    .then(response => {

                        array.createValueKey(response.data, "shizaiCD", "string");

                        this.querySearchData = response.data;

                        this.data.code = this.code;

                        console.log(this.querySearchData);

                        if (this.code != "") {

                            this.autocompleteChange(this.data.code);
                        }


                    })
                    .catch(response => console.log(response))


            }


            if (this.kind == "運賃") {
                this.placeholder = "運賃コード"
                this.message.error = "入力したコードの運賃は存在しません";

                axios.get(url.unchinMaster)
                    .then(response => {

                        array.createValueKey(response.data, "unchinCD", "string");

                        this.querySearchData = response.data;


                        console.log(this.querySearchData);

                    })
                    .catch(response => console.log(response))


            }



        
        },
        mounted: function () {

        },
        watch: {
            'code': function () {
                this.data.code = this.code;


              }
   
        },
    }
</script>

<style scoped>
</style>