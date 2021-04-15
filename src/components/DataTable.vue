<template>
  <div>
    <div v-if="error!=''" class="alert alert-danger" role="alert">
      {{error}}
    </div>
    <div v-else>
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
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DataTable.vue',
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
      error: ''
    }
  },
  methods: {
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
