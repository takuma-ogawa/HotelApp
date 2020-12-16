<template>
    <div class="home">
        <h1>ようこそ {{$store.state.login.userName}} さん</h1>
        <h3>
            今日は<br />{{nowDate()}} です
        </h3>
    </div>
</template>

<script>
    import time from '@/js/status/time.js'

    export default {
        name: 'Home',
        data: function () {
            return {
                data: {
                    kaisu: {
                        number: null,
                        disabled: true,
                    }
                }


            }
        },
        methods: {
            nowDate: function () {
                return time.nowJapanDateJapaStyle();
            },
        },
        mounted: function () {

            this.data.kaisu.number = this.$store.state.login.kaisu;

        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

