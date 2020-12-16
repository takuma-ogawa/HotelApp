<template>
    <div style="text-align:right;width:100%;">
        <input v-for="info in btn_info" v-bind:key="info.index" style="margin-left:2%;" type="button" 
        :value="[ info.value || `検索`]" class="btn"  
        :class="[`btn-${info.class}` || `btn-info`]" 
        v-on:click="info.onclick"/>
    </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'ButtonFooter',
  props: {
    title: {
      type: String,
      description: '検索ビューのタイトル'
    },
    subTitle: {
      type: String,
      description: '検索ビューのサブタイトル'
    },
    submitValue: {
      type: String,
      description: '検索ボタンのテキスト'
    },
    cancelValue: {
      type: String,
      description: 'キャンセルボタンのテキスト'
    },
    submitClass: {
      type: String,
      description: '検索ボタンのクラス ex.( primary/danger etc...)'
    },
    cancelClass: {
      type: String,
      description: 'キャンセルボタンのクラス ex.( primary/danger etc...)'
    },
    btn_info: {
        type:Array
    }
  } 
}
</script>
