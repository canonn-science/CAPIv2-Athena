<template>
  <v-card>
    <v-card-title>
      Biology Reports
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
        :desserts="systems"
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
          value: 'name'
        },
        { text: 'Government', value: 'government' },
        { text: 'Allegiance', value: 'allegiance' },
        { text: 'State', value: 'state' },
        { text: 'Population', value: 'population' },
        { text: 'Security', value: 'security' }
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
  }
}
</script>
