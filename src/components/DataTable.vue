<template>
  <div>
    <div v-if="error!=''" class="alert alert-danger" role="alert">
      {{error}}
    </div>
    <div v-else>
      <ApiTable
        v-if="data!=null && metadata!=null"
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
      <b-modal
        id="reference-table-modal"
        :title="refTableMetaData.label || refTableMetaData.id"
        hide-footer
        body-class="ref-modal-body"
        dialog-class="ref-modal-dialog"
        @hidden="resetRefState"
      >
        <RefTable
          :is-data-loaded="isReferenceModalDataLoaded"
          :entities-to-show="refTableData"
          :meta-data="refTableMetaData"
        />
      </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import { ApiTable, RefTable } from '@molgenis-ui/components-library'

export default {
  name: 'DataTable.vue',
  components: { ApiTable, RefTable },
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
      isReversed: false,
      isReferenceModalDataLoaded: false,
      refTableData: [],
      refTableMetaData: {}
    }
  },
  methods: {
    getEntityId (entity) {
      return entity[this.idAttribute].toString()
    },
    doRequest () {
      this.error = ''
      // Get metadata
      axios.get(`/api/metadata/${this.table}?flattenAttributes=true`)
        .then((response) => {
          console.log(response.data)
          this.metadata = response.data
        })
        .catch((error) => {
          this.error = error
        })
      // Get entity data
      axios.get(`/api/data/${this.table}?page=0&size=20&expand=sex1,mid`, {
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
    },
    // Value is either refObject {id {string}, label{string}} or list of refObjects (mref)
    async requestShowRefTable ({ refEntityType, value }) {
      // fetch data / metadata for the references
      this.refTableData = []
      this.refTableMetaData = {}
      this.isReferenceModalDataLoaded = true
      this.$bvModal.show('reference-table-modal')
    },
    resetRefState () {
      this.isReferenceModalDataLoaded = false
      this.refTableData = []
      this.refTableMetaData = {}
    }
  },
  created () {
    this.doRequest()
    this.$eventBus.$on('show-reference-table', this.requestShowRefTable)
  },
  destroyed () {
    this.$eventBus.$off('show-reference-table')
  }
}
</script>

<style lang="scss">
.modal-backdrop{
  opacity: 0.3;
}
</style>
