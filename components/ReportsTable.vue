<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :search="search"
    :items-per-page="12"
    class="elevation-1"
  >
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
    desserts: {
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
