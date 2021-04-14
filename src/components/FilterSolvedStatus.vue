<template>
  <div class="checkbox-group">
    <label><input type="checkbox" value="solved" v-model="solvedStatus"/>Solved</label>
    <label><input type="checkbox" value="unsolved" v-model="solvedStatus"/>Unsolved</label>
  </div>
</template>

<script>
export default {
  name: 'filter-solved-status',
  data () {
    return {
      solvedStatus: []
    }
  },
  watch: {
    value () {
      this.solvedStatus = this.value
    },
    solvedStatus () {
      this.$emit('input', this.solvedStatus)
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox-group {
  label {
    display: block;
    input {
      margin-right: 4px;
    }
  }
}
</style>
