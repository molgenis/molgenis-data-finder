<template>
  <div class="checkbox-group">
    <label><input type="checkbox" value="Genomic" v-model="librarySource"/>Genomic</label>
    <label><input type="checkbox" value="Transcriptomic" v-model="librarySource"/>Transcriptomic</label>
  </div>
</template>

<script>
export default {
  name: 'filter-library-source',
  data () {
    return {
      librarySource: []
    }
  },
  watch: {
    value () {
      this.librarySource = this.value
    },
    librarySource () {
      this.$emit('input', this.librarySource)
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
