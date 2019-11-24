<template>
  <v-card
    class="mx-auto"
    outlined
  >
    <v-list-item>
      <v-list-item-content>
        <div class="overline mb-4">History</div>
        <v-autocomplete
          v-model="wallet"
          label="Wallet"
          :items="userWallets"
          item-text="description"
          item-value="account"
          dense
          @change="onChange()"
        ></v-autocomplete>

          <v-row>
            <v-col cols="12" md="6">
              <v-menu
                v-model="menuDates"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                show-current
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="dateRangeText"
                    label="Date range"
                    prepend-icon="mdi-calendar-multiple"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dates"
                  range
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="search"
                label="Search"
                prepend-icon="mdi-magnify"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <router-view :search="search"></router-view>
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
    dateRangeText() {
      return this.dates.join(' ~ ');
    },
  },
  data: () => ({
    wallet: '',
    search: '',
    dates: ['2019-08-25', '2019-11-25'],
    menuDates: false,
  }),
  watch: {
    menuDates(val) {
      if (!val) this.onChange();
    },
  },
  created() {
    this.wallet = this.$route.params.wallet || '';
    this.onChange();
  },
  methods: {
    onChange() {
      if (this.wallet === '') {
        return;
      }

      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      };

      const date1 = this.dates[0] ? new Date(this.dates[0]) : Date.now();
      const date2 = this.dates[1] ? new Date(this.dates[1]) : date1;

      this.$store.dispatch('History', {
        wallet: this.wallet,
        datefrom: (date1 < date2 ? date1 : date2).toLocaleString('ru', options),
        dateto: (date1 < date2 ? date2 : date1).toLocaleString('ru', options),
      });
      this.$router.push(`/history/${this.wallet}`);
    },
  },
};
</script>

<style scoped>

</style>
