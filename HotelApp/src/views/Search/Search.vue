<template>
  <div class="home">
    <Card type="status" :title="title" :subTitle="subTitle">
      <template slot="header"></template>
      <template slot="default">
          <slot></slot>
      </template>
      <template slot="footer">
          <div style="text-align:right;width:100%;">
              <input type="button" :value="[ cancelValue || `キャンセル`]" class="btn" :class="[ `btn-${cancelClass}` || `btn-primary`]" />
              <input style="margin-left:2%;" type="button" :value="[ submitValue || `検索`]" class="btn"  :class="[`btn-${submitClass}` || `btn-info`]" />
          </div>
       </template>
    </Card>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/Card/Card.vue'

export default {
  name: '検索',
  components: {
    Card
  },
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
    }
  }
}
</script>
