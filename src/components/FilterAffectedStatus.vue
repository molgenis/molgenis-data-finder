<template>
  <div class="checkbox-group">
    <label><input type="checkbox" value="affected" v-model="checkedStatus"/>Affected</label>
    <label><input type="checkbox" value="unaffected" v-model="checkedStatus"/>Not Affected</label>
  </div>
</template>

<script>
export default {
  name: 'filter-affected-status',
  data () {
    return {
      checkedStatus: []
    }
  },
  watch: {
    value () {
      this.checkedStatus = this.value
    },
    checkedStatus () {
      this.$emit('input', this.checkedStatus)
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
