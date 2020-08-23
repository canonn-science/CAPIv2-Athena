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
import { capi } from '../../store/capi'

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

      let data = await capi.getSystems(
        page,
        itemsPerPage,
        sortBy,
        sortDesc,
        search,
        {}
      )

      // If user has increased page and searches with no response, reset page to 1
      if (page > 1 && data.systems.length === 0) {
        this.options.page = 1
        data = await capi.getSystems(
          this.options.page,
          itemsPerPage,
          sortBy,
          sortDesc,
          search,
          {}
        )
      }

      this.loading = false
      return {
        items: data.systems,
        total: data.count
      }
    }
  }
}
</script>
