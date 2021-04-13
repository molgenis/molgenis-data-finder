<template>
  <div class="checkbox-group">
    <label><input type="checkbox" value="female" v-model="checkedSex"/>Female</label>
    <label><input type="checkbox" value="male" v-model="checkedSex"/>Male</label>
    <label><input type="checkbox" value="unknown" v-model="checkedSex"/>Unknown</label>
    <label><input type="checkbox" value="undifferentiated" v-model="checkedSex"/>Undifferentiated</label>
  </div>
</template>

<script>
export default {
  name: 'filter-sex',
  data () {
    return {
      checkedSex: []
    }
  },
  watch: {
    value () {
      this.checkedSex = this.value
    },
    checkedSex () {
      this.$emit('input', this.checkedSex)
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
