<template>
  <div>
    <strong>Filter data</strong>
    <div class="d-flex">
      <button type="button" class="tab-button">Samples</button>
      <button type="button" class="tab-button selected">Patients</button>
      <button type="button" class="tab-button">Labs</button>
      <button type="button" class="tab-button">Files</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterMenu.vue'
}
</script>

<style scoped lang="scss">
  .tab-button{
    flex-grow: 1;
    border: none;
    background-color: white;
    margin-left:1px;
    height: 3rem;
    &:hover{
      background-color: #daedff;
    }
    &.selected{
      background-color: #017FFD;
      color: white;
    }
  }
</style>
