<template>
  <div>
    <div class="headline text-center">
      Attempt to implement billing on aiohttp
    </div>
    <v-chip
      v-for="currency in currencies"
      :key="currency.id"
      outlined
      color="primary"
    >
      <v-avatar>
        <span>{{currency.symbol}}</span>
      </v-avatar>
      {{currency.title}}
    </v-chip>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'home',
  components: {},
  computed: {
    ...mapGetters([
      'currencies',
    ]),
  },
};
</script>
