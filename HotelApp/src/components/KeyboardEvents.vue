<template>
  <div style="display: none;"></div>
</template>

<script>
  export default {
    name: 'keyboard-events',
    created() {
      const component = this;
      this.handler = function (e) {
        component.$emit('keydown', e);
      }
      window.addEventListener('keydown', this.handler);
    },
    beforeDestroy() {
      window.removeEventListener('keydown', this.handler);
    }
  }
</script>