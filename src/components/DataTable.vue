<template>
  <div>
    <div v-if="error!=''" class="alert alert-danger" role="alert">
      {{error}}
    </div>
    <div v-else>
      <ApiTable
        v-bind:sortColumnName="sorting"
        v-bind:isSortOrderReversed="isReversed"
        v-bind:is-selectable="false"
        v-bind:data="data"
        v-bind:metadata="metadata"
        v-on:sort="(newValue) => {
        isReversed =  ( sorting === newValue && isReversed == false )
        sorting = newValue
        }"
      >
      </ApiTable>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ApiTable } from '@molgenis-ui/components-library'

export default {
  name: 'DataTable.vue',
  components: { ApiTable },
  props: {
    table: {
      type: String,
      required: true
    },
    freeze: {
      type: String,
      required: true
    },
    sex: {
      type: String,
      required: true
    },
    affectedStatus: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      metadata: null,
      data: null,
      error: '',
      sorting: '',
      isReversed: false
    }
  },
  methods: {
    getEntityId (entity) {
      return entity[this.idAttribute].toString()
    },
    doRequest () {
      this.error = ''
      // Get metadata
      axios.get(`/api/metadata/${this.table}`)
        .then((response) => {
          this.metadata = response.data
        })
        .catch((error) => {
          this.error = error
        })
      // Get entity data
      axios.get(`/api/data/${this.table}`, {
        params: {
          affectedStatus: this.affectedStatus
        }
      })
        .then((response) => {
          console.log(response.data)
          this.data = response.data
        })
        .catch((error) => {
          this.error = error
        })
    }
  },
  created () {
    this.doRequest()
  }
}
</script>

<style scoped lang="scss">
</style>
