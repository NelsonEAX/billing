<template>
  <div>
    <v-autocomplete
      v-model="from"
      label="Wallet"
      :items="userWallets"
      item-text="description"
      item-value="account"
      dense
    ></v-autocomplete>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'History',
  computed: {
    ...mapGetters([
      'userWallets',
      'allWallets',
      'fee',
    ]),
  },
};
</script>

<style scoped>

</style>
