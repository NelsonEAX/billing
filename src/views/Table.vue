<template>
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
</template>

<script>
export default {
  name: 'Table',
  props: {
    id: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>

</style>
