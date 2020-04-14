<template>
  <v-data-table
    :headers="headers"
    :items="records"
    :search="search"
    :footer-props="{ 'items-per-page-options': [10, 15, 30, 50] }"
    :items-per-page="15"
    class="elevation-1"
  >
    <template v-slot:item.edsmCoordLocked="{ item }">
      <v-simple-checkbox
        v-model="item.edsmCoordLocked"
        disabled
      ></v-simple-checkbox>
    </template>
    <template v-slot:item.primaryStar.isScoopable="{ item }">
      <v-simple-checkbox
        v-model="item.primaryStar.isScoopable"
        disabled
      ></v-simple-checkbox>
    </template>
    <template v-slot:no-results>
      <v-alert :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'ReportsTable',
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    records: {
      type: Array,
      default: () => []
    },
    search: {
      type: String,
      default: undefined
    }
  }
}
</script>

<style scoped></style>
