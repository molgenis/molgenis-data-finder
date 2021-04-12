<template>
  <page-component id="app" @contextLoaded="setContext">
    <div class="d-flex h-100">
      <aside class="menu h-100 p-3">
        <h2 class="h2">Find data</h2>
        <p>Find data and customize the view.</p>
        <form @submit.prevent>
          <fieldset>
            <legend>Select a table</legend>
            <p>Choose a table to start with.</p>
            <filter-menu @change="updateSelectedTable"/>
          </fieldset>
        </form>
      </aside>
      <main class="p-3">
        <p><strong>Selected Table:</strong> {{ selectedTable }}</p>
<!-- {{ query() }}-->
      </main>
    </div>
  </page-component>
</template>

<script>
import PageComponent from '../node_modules/@molgenis/molgenis-ui-context/src/components/PageComponent.vue'
import FilterMenu from './components/FilterMenu'
// import axios from 'axios'

export default {
  data () {
    return {
      selectedTable: null
    }
  },
  components: { FilterMenu, PageComponent },
  methods: {
    setContext (context) {
      console.log('context: ' + context)
    },
    updateSelectedTable (data) {
      this.selectedTable = data
    }
    // async query () {
    //   const bla = await axios.get('/api/data/rd3_freeze1_subject')
    //   return bla.data
    // }
  }
}
</script>

<style lang="scss">
  body{
    height: 100%;
  }
  .menu{
    max-width: 25rem;
    min-width: 25rem;
    background-color: rgba(0,0,0,0.1);
  }
</style>
