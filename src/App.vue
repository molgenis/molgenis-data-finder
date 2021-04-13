<template>
  <page-component id="app" @contextLoaded="setContext">
    <div class="d-flex h-100">
      <aside class="menu h-100 p-3">
        <h2 class="h2">Find data</h2>
        <form @submit.prevent>
          <fieldset>
            <legend>Select a table</legend>
            <filter-menu @change="updateSelectedTable"/>
          </fieldset>
          <fieldset>
            <legend>Select a Freeze</legend>
            <filter-freeze v-model="selectedFreeze"></filter-freeze>
          </fieldset>
          <div v-show="selectedTable === 'Samples'">
            <fieldset>
              <legend>Select Tissue Types</legend>
              <!-- this should be a multifilter -->
            </fieldset>
            <fieldset>
              <legend>Select Organisation</legend>
              <!-- this should be a multifilter -->
            </fieldset>
            <fieldset>
              <legend>Select an ERN</legend>
              <!-- this should be a multifilter -->
            </fieldset>
          </div>
          <div v-show="selectedTable === 'Patients'">
            <fieldset>
              <legend>Select Sex</legend>
              <filter-sex v-model="selectedSex"></filter-sex>
            </fieldset>
            <fieldset>
              <legend>Filter by Affected Status</legend>
              <filter-affected-status v-model="selectedAffectedStatus"></filter-affected-status>
            </fieldset>
            <fieldset>
              <legend>Filter by Solved Status</legend>
            </fieldset>
            <fieldset>
              <legend>Filter by Phenotype</legend>
            </fieldset>
            <fieldset>
              <legend>Select Organisation</legend>
              <!-- this should be a multifilter -->
            </fieldset>
            <fieldset>
              <legend>Select an ERN</legend>
              <!-- this should be a multifilter -->
            </fieldset>
          </div>
          <div v-show="selectedTable === 'Experiments'">
            <fieldset>
              <legend>Enrichment Kit</legend>
            </fieldset>
            <fieldset>
              <legend>Library Source</legend>
            </fieldset>
            <fieldset>
              <legend>Sequencing Type</legend>
              <!-- this should be a multifilter -->
            </fieldset>
          </div>
          <div v-show="selectedTable === 'Files'">
            <fieldset>
              <legend>File Type</legend>
              <!-- this should be a multifilter -->
            </fieldset>
          </div>
        </form>
      </aside>
      <main class="p-3">
      <p><code>Table: {{ selectedTable }}</code></p>
      <p><code>Freeze: {{ selectedFreeze }}</code></p>
      <p><code>Sex: {{ selectedSex }}</code></p>
      <p><code>Affected Status: {{ selectedAffectedStatus }}</code></p>
      <!-- {{ query() }}-->
      </main>
    </div>
  </page-component>
</template>

<script>
import PageComponent from '@molgenis/molgenis-ui-context/src/components/PageComponent.vue'
import FilterMenu from './components/FilterMenu'
import FilterFreeze from './components/FilterFreeze'
import FilterSex from './components/FilterSex'
import FilterAffectedStatus from './components/FilterAffectedStatus'
// import axios from 'axios'

export default {
  data () {
    return {
      selectedTable: '',
      selectedFreeze: '',
      selectedSex: '',
      selectedAffectedStatus: ''
    }
  },
  components: { FilterMenu, PageComponent, FilterFreeze, FilterSex, FilterAffectedStatus },
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
    form {
      fieldset {
        margin-bottom: 16px;
      }
      legend {
        font-size: 12pt;
      }
    }
  }
</style>
