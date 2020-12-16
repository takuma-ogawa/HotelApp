<template>
    <div class="wrapper">
        <el-container style="height:100%;">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu>
                    <el-menu-item style="padding:0;">
                        <router-link :class="openedClass(0,0)" to="/uedaunyu/" style="color:black;display:block;padding-left:10%;" @click.native="changeOpenMenuIndex(0,0)">HOME</router-link>
                    </el-menu-item>
                    <el-menu-item style="padding:0;">
                        <router-link :class="openedClass(1,0)" to="/uedaunyu/rollCallStatus" style="color:black;display:block;padding-left:10%;" @click.native="changeOpenMenuIndex(1,0)">点呼状況</router-link>
                    </el-menu-item>
                    <el-menu-item style="padding:0;">
                        <router-link :class="openedClass(2,0)" to="/uedaunyu/rollCallLogInput" style="color:black;display:block;padding-left:10%;" @click.native="changeOpenMenuIndex(2,0)">点呼記録入力</router-link>
                    </el-menu-item>
                    <el-menu-item style="padding:0;">
                        <router-link :class="openedClass(3,0)" to="/uedaunyu/rollCallLogFormOutput" style="color:black;display:block;padding-left:10%;" @click.native="changeOpenMenuIndex(3,0)">点呼記録簿出力</router-link>
                    </el-menu-item>
                    <el-submenu>
                        <template slot="title">
                            マスタ
                        </template>
                         <el-menu-item style="padding:0;" v-for="(sidebar,sidebarIndex) in sidebarmenu" v-bind:key="sidebar.number" v-if="displayFlag(sidebar)">
                            <router-link :to="sidebar.link" :class="openedClass(4,sidebarIndex)" style="color:black;display:block;padding-left:10%;" @click.native="changeOpenMenuIndex(4,sidebarIndex)">{{sidebar.name}}</router-link>
                        </el-menu-item>

                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header style="background-color:#93C5F9;color:white;"><span style="display:block;float:right;"><el-button type="info" @click="logout">ログアウト</el-button></span></el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-footer style="background-color:#C0C4CC;color:white;"></el-footer>
            </el-container>
        </el-container>
    </div>

</template>
<style>
    .el-aside {
        color: #333;
    }
</style>
<script>
    import login from '@/js/status/login.js'

    export default {

        data: function () {
            return {
                sidebarmenu: [
                ],
            };
        },
        methods: {

            logout: function () {

                //※とりあえずログイン画面に戻す

                //login.logout(this)

                this.$router.push('/');
            },
            displayFlag: function (sidebar) {

                return true;
            },
                   
            changeOpenMenuIndex: function (categoryIndex, sidebarIndex) {

                this.$store.commit('changeOpenedMenuIndex', { categoryIndex, sidebarIndex });

            },
            openedClass: function (categoryIndex,sidebarIndex) {


                if (this.$store.state.openedMenuIndex.categoryIndex == categoryIndex && this.$store.state.openedMenuIndex.sidebarIndex == sidebarIndex) {

                    return "selectedMenu";
                } else {

                    return "";
                }

            },

        },
        created: function () {

            //Ｍメニュー/メニューコード = Ｍ担当/権限よりＭメニューのメニュー名称とメニューパスを取ってくる
            this.sidebarmenu = [
                { name: "社員マスタ", link: "/uedaunyu/masterMember" },
                { name: "行先マスタ", link: "/uedaunyu/masterDestination" },
                { name: "車両マスタ", link: "/uedaunyu/masterVehicle" },
                { name: "疾病マスタ", link: "/uedaunyu/masterDisease" },
                { name: "指示事項マスタ", link: "/uedaunyu/masterInstruction" },
                { name: "アラート設定マスタ", link: "/uedaunyu/masterAlertSetting" },
            ];

        }

    }
</script>

<style scoped>
    .selectedMenu {
        background-color: #409EFF;
        color: white !important;
        opacity: 0.6;
    }
</style>
