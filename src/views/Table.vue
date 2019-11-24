<template>
  <v-data-table
    :headers="headers"
    :items="history"
    :items-per-page="5"
    :search="search"
    dense
  >
    <template v-slot:item.history="{ item }">
      <v-btn text small link :to="`/history/${item.id}`">
        <v-icon>mdi-history</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Table',
  props: {
    wallet: {
      type: String,
      default: '',
    },
    search: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    headers: [
      { text: 'Wallet', value: 'wallet' },
      { text: 'Sum', value: 'sum', align: 'end' },
      { text: 'Date', value: 'date' },
    ],
  }),
  computed: {
    ...mapGetters([
      'history',
    ]),
  },
};
</script>

<style scoped>

</style>
