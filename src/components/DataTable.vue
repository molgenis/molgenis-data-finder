<template>
  <div>
    <div v-if="error!=''" class="alert alert-danger" role="alert">
      {{error}}
    </div>
    <div v-else>

      <table class="table table-bordered">
        <TableHeader
          v-bind:visibleColumns="getColumns"
          v-bind:sortColumnName="sorting"
          v-bind:isSortOrderReversed="isReversed"
          v-on:sort="(newValue) => {
            isReversed =  ( sorting === newValue && isReversed == false )
            sorting = newValue
          }">
        </TableHeader>
        <TableRow
            v-for="(entity, index) in getData"
            v-bind:id="getEntityId(entity)"
            v-bind:key="index"
            v-bind:row-index="index"
            v-bind:table-name="this.table"
            v-bind:row-data="entity"
            v-bind:visible-columns="getColumns"
            v-bind:is-selected="false"
            v-bind:is-editable="false"
            v-bind:show-selected="false"
        >
          <template v-slot:edit-buttons>
            <router-link
              class="btn btn-sm text-secondary"
              role="button"
            >
              details
            </router-link>
          </template>
        </TableRow>
      </table>

      <!--
      <table class='table table-sm table-hover table-striped' style='overflow: auto'>
        <thead>
          <tr>
            <th class="text-nowrap" v-for="col in getColumns" :key="col.id" >{{col.label}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in getData" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="text-nowrap">{{cell}}</td>
          </tr>
        </tbody>
      </table>
      -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { TableRow, TableHeader } from '@molgenis-ui/components-library'

export default {
  name: 'DataTable.vue',
  components: { TableRow, TableHeader },
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
      idAttribute: ''
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
          // Find id atribute
          this.idAttribute = this.metadata.data.attributes.items.find(item => item.data.idAttribute === true).data.name
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
  computed: {
    getColumns () {
      if (this.metadata !== null) {
        return this.metadata.data.attributes.items.map(item => ({ id: item.data.id, label: item.data.label, description: item.data.description }))
      }
      return []
    },
    getData () {
      if (this.data !== null) {
        return this.data.items.map(item => {
          return Object.values(item.data)
        })
      }
      return []
    }
  },
  created () {
    this.doRequest()
  }
}
</script>

<style scoped lang="scss">
</style>
