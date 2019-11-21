<template>
  <v-card
    class="mx-auto"
    outlined
  >
    <v-list-item>
      <v-list-item-content>
        <div class="overline mb-4">Wallet</div>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="userWallets"
        :items-per-page="5"
      >
        <template v-slot:item.history="{ item }">
          <v-btn text small link :to="`/history/${item.id}`">
            <v-icon>mdi-history</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Wallet',
  data: () => ({
    headers: [
      { text: '#', sortable: false, value: 'id' },
      { text: 'Currency', value: 'title' },
      { text: 'Wallet', value: 'account' },
      { text: 'Balance', value: 'balance' },
      { text: 'History', value: 'history', sortable: false },
    ],
    desserts: [],
  }),
  computed: {
    ...mapGetters([
      'userWallets',
    ]),
  },
};
</script>

<style scoped>

</style>
