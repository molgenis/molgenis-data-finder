<template>
  <div class="checkbox-group">
    <label><input type="checkbox" value="freeze1_original" v-model="checkedFreezes"/>Freeze 1 Original</label>
    <label><input type="checkbox" value="freeze1_patch1" v-model="checkedFreezes"/>Freeze 1 Patch 1</label>
    <label><input type="checkbox" value="freeze2_original" v-model="checkedFreezes"/>Freeze 2 Original</label>
  </div>
</template>

<script>
export default {
  name: 'filter-freeze',
  data () {
    return {
      checkedFreezes: []
    }
  },
  watch: {
    value () {
      this.checkedFreezes = this.value
    },
    checkedFreezes () {
      this.$emit('input', this.checkedFreezes)
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
