<template>
  <v-card
    class="mx-auto"
    outlined
  >
    <v-list-item>
      <v-list-item-content>
        <div class="overline mb-4">History</div>
        <v-autocomplete
          v-model="from"
          label="Wallet"
          :items="userWallets"
          item-text="description"
          item-value="account"
          dense
        ></v-autocomplete>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <router-view></router-view>
    </v-card-text>
  </v-card>
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
  data: () => ({
    from: '',
  }),
  created() {
    this.fetchData();
  },
  /* watch: {
    // при изменениях маршрута запрашиваем данные снова
    $route: 'fetchData';
  }, */
  methods: {
    fetchData() {
      console.log(`fetchData ${this.from}`);
    },
  },
};
</script>

<style scoped>

</style>
