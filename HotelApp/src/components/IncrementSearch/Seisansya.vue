<template>
    <div>
        <el-autocomplete style='width:30%; margin-right:2%;'
                         v-model="info.code"
                         :fetch-suggestions="querySearch"
                         placeholder="生産者コード"
                         @select="autocompleteSelect"
                         @change="autocompleteChange">
            <template slot-scope="{ item }">
                <div>コード:{{ item.value }}</div>
                <div style="border-bottom:solid 0.5px lightgray;">名前:{{ item.name }}</div>
            </template>
        </el-autocomplete>

        <el-input type='text'
                  style='width:60%;'
                  placeholder="生産者名(自動入力)"
                  v-model="info.name"
                  readonly></el-input>
    </div>

</template>

<script>
    import search from '@/js/search/autocomplete.js'
    import exsist from '@/js/status/exsist.js'


    export default {
        name: 'el-autocomplete-seisansya',
        model: {
            prop: 'info',
            event: "change",
        },
        props: {
            info: {
                type: Object,
            },
            searchValue: {
                type: String,
            },
        },
        data: function () {

            return {
                querySearchData: [
                    { value: "0", code: "0", name: "畠中慎一" },
                    { value: "1", code: "1", name: "駒井公" },
                    { value: "2", code: "2", name: "小川巧真" },
                    { value: "3", code: "3", name: "岩本燿" },
                ],
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
                this.info.name = item.name;

            },
            autocompleteChange: function (value) {

                if (value == "") {

                    this.info.name = "";
                    return false;
                }

                var result = exsist.is_exsist_by_object_value(value, this.querySearchData, this.searchValue);

                if (!result) {
                    alert("入力されたコードの生産者はいません");
                    this.info.code = "";
                    return false;
                }

                this.info.name = result.name;

            },

        },
        mounted: function () {

     
            
        },
        watch: {
            'info': function () {
                this.$emit('change', this.info);

            },

        }
    }
</script>

<style scoped>
</style>