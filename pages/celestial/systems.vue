<template>
  <v-card>
    <v-card-title>
      Systems
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-spacer></v-spacer>
    <v-card flat>
      <reports-table
        :headers="headers"
        :records="systems"
        :search="search"
      ></reports-table>
    </v-card>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import ReportsTable from '../../components/ReportsTable'

export default {
  components: { ReportsTable },
  data() {
    return {
      search: '',
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
        { text: 'Locked', value: 'edsmCoordLocked' },
        { text: 'Region', value: 'region.name' },
        { text: 'Star Type', value: 'primaryStar.type' },
        { text: 'Scoopable', value: 'primaryStar.isScoopable' }
      ]
    }
  },
  computed: {
    ...mapState({
      systems: state => state.celestial.systems
    })
  },
  created() {
    this.$store.dispatch('celestial/fetchSystems')
    this.loading = false
  }
}
</script>
