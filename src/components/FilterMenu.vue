<template>
    <div class="radio-button-group">
      <div class="radio-button-item">
        <input id="filter-menu-samples" value="Samples" name="filter-menu" type="radio" @change="onChange" checked/>
        <label for="filter-menu-samples">Samples</label>
      </div>
      <div class="radio-button-item">
        <input id="filter-menu-patients" value="Patients" name="filter-menu" type="radio" @change="onChange"/>
        <label for="filter-menu-patients">Patients</label>
      </div>
      <div class="radio-button-item">
        <input id="filter-menu-experiments" value="Experiments" name="filter-menu" type="radio" @change="onChange"/>
        <label for="filter-menu-experiments">Experiments</label>
      </div>
      <div class="radio-button-item">
        <input id="filter-menu-files" value="Files" name="filter-menu" type="radio" @change="onChange"/>
        <label for="filter-menu-files">Files</label>
      </div>
    </div>
</template>

<script>
export default {
  name: 'FilterMenu.vue',
  methods: {
    onChange (event) {
      this.$emit('change', event.target.value)
    }
  },
  mounted () {
    this.$emit('change', 'Samples')
  }
}
</script>

<style scoped lang="scss">
.radio-button-group {
  display: flex;
  .radio-button-item {
    position: relative;
    flex-grow: 1;
    input[type='radio'] {
      position: absolute;
      margin: -1px;
      width: 1px;
      height: 1px;
      clip: rect(1px, 1px, 1px, 1px);
      clip: rect(1px 1px 1px 1px);
      white-space: nowrap;
      overflow:hidden;

      &:checked + label {
        background-color: #017FFD;
        color: #ffffff;
      }

      &:hover, &:focus {
        + label {
          background-color: #daedff;
          color: #000000;
        }
      }
    }
    label {
      display: flex;
      justify-content: center;
      padding: 6px 0;
      background-color: #ffffff;
      border: 1px solid #CCCCCC;
      font-size: 13pt;
      cursor: pointer;
    }
  }
}
</style>
