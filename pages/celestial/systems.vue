<template>
  <v-card>
    <v-card-title>
      Systems
      <v-spacer></v-spacer>
      <v-text-field
        v-model="options.search"
        append-icon="mdi-magnify"
        label="Search System Name"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-spacer></v-spacer>
    <v-card flat>
      <v-data-table
        :headers="headers"
        :items="systems"
        :options.sync="options"
        :server-items-length="systemsCount"
        :footer-props="{ 'items-per-page-options': [10, 15, 30, 50] }"
        :items-per-page="15"
        :loading="loading"
      >
        <template v-slot:[`item.edsmCoordLocked`]="{ item }">
          <v-simple-checkbox v-model="item.edsmCoordLocked" disabled>
          </v-simple-checkbox>
        </template>
        <template v-slot:[`item.primaryStar.isScoopable`]="{ item }">
          <v-simple-checkbox v-model="item.primaryStar.isScoopable" disabled>
          </v-simple-checkbox>
        </template>
      </v-data-table>
    </v-card>
  </v-card>
</template>

<script>
import axios from 'axios'
import consola from 'consola'

// Got this code from: https://next.vuetifyjs.com/en/components/data-tables/#server-side-paginate-and-sort

export default {
  data() {
    return {
      systemsCount: 0,
      systems: [],
      loading: true,
      options: {
        search: ''
      },
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'systemName'
        },
        { text: 'Coord X', value: 'edsmCoordX' },
        { text: 'Coord Y', value: 'edsmCoordY' },
        { text: 'Coord Z', value: 'edsmCoordZ' },
        { text: 'Coords Locked', value: 'edsmCoordLocked' },
        { text: 'Region', sortable: false, value: 'region.name' },
        { text: 'Star Type', sortable: false, value: 'primaryStar.type' },
        {
          text: 'Scoopable',
          sortable: false,
          value: 'primaryStar.isScoopable'
        }
      ]
    }
  },
  watch: {
    options: {
      async handler() {
        const data = await this.getDataFromApi()
        this.systems = data.items
        this.systemsCount = data.total
      },
      deep: true
    }
  },
  mounted() {
    this.getDataFromApi().then(data => {
      this.systems = data.items
      this.systemsCount = data.total
    })
  },
  methods: {
    async getDataFromApi() {
      this.loading = true
      const { sortBy, sortDesc, page, itemsPerPage, search } = this.options

      const data = await this.getSystems(
        page,
        itemsPerPage,
        sortBy,
        sortDesc,
        search
      )

      this.loading = false
      return {
        items: data.systems,
        total: data.count
      }
    },
    async getSystems(page, limit, sortBy, sortDesc, search) {
      const host = 'https://api.canonn.tech/systems'
      let url = `${host}?_limit=${limit}`
      let start = 0

      // Set pages
      // Need to figure out how to construct the start from the page
      if (page > 1) {
        start = page * start
      }

      // Apply sorting
      if (sortBy.length > 0) {
        if (sortDesc[0] === true) {
          url = url + `&_sort=${sortBy[0]}:desc`
        } else {
          url = url + `&_sort=${sortBy[0]}:asc`
        }
      }

      // Apply Searching
      // Need to fix search + paging, if user has paged then searches returns nothing
      if (search) {
        url = url + `&_q=${search}`
      }

      url = url + `&_start=${start}`
      consola.log(url)
      const response = await axios.get(url)

      return {
        systems: response.data,
        count: parseInt(response.headers['content-range'])
      }
    }
  }
}
</script>
