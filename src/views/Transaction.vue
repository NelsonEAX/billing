<template>
  <v-card
    class="mx-auto"
    max-width="350"
    outlined
  >
    <v-list-item>
      <v-list-item-content>
        <div class="overline mb-4">Transaction</div>
        <v-tabs fixed-tabs>
          <v-tab @click.stop="myself = true">my wallets</v-tab>
          <v-tab @click.stop="myself = false">all wallets</v-tab>
        </v-tabs>
        <v-list-item-subtitle>{{description}}</v-list-item-subtitle>
      </v-list-item-content>

    </v-list-item>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-autocomplete
          v-model="from"
          :rules="walletRules"
          label="From"
          :items="walletsFrom"
          item-text="description"
          item-value="account"
          dense
        ></v-autocomplete>
        <v-autocomplete
          v-model="to"
          :rules="walletRules"
          label="To"
          :items="walletsTo"
          item-text="description"
          item-value="account"
          dense
        ></v-autocomplete>
        <v-text-field
          v-model="amount"
          :rules="amountRules"
          label="Transfer amount"
          :prefix="prefix"
          type="number"
          min="0"
          dense
          required
        ></v-text-field>
      </v-form>
      <v-alert
        dense
        text
        color="info"
      >
        <div>Сommission will be: {{commission}}{{prefix}}</div>
        <div>Will be charged: {{total}}{{prefix}}</div>
      </v-alert>
    </v-card-text>
    <v-card-actions>
      <v-btn outlined @click="clear">Clear</v-btn>
      <v-spacer></v-spacer>
      <v-btn outlined @click="transfer">Transfer</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Transaction',
  data: () => ({
    myself: true,
    valid: true,
    from: '',
    to: '',
    amount: 0,
    walletRules: [
      v => !!v || 'Wallet is required',
    ],
  }),
  computed: {
    ...mapGetters([
      'userWallets',
      'allWallets',
      'fee',
    ]),
    amountRules() {
      const wallet = this.userWallets.find(elem => elem.account === this.from);
      return [
        v => !!v || 'Amount is required',
        v => /^\d*[,.]?\d*$/.test(v) || 'Amount must be float',
        () => (wallet ? parseFloat(this.total) <= parseFloat(wallet.balance) : true) || 'More than account',
      ];
    },
    description() {
      return this.myself ? 'Transfer between your accounts with conversion, no commission'
        : 'Transfer with conversion to another person’s account with a commission';
    },
    prefix() {
      const wallet = this.userWallets.find(elem => elem.account === this.from);
      return wallet ? wallet.symbol : '';
    },
    walletsFrom() {
      // Show only accounts with a positive balance
      return this.userWallets.filter(wallet => wallet.balance > 0);
    },
    walletsTo() {
      // Show all accounts, except for the one selected as the sender
      const sourceWallets = this.myself ? this.userWallets : this.allWallets;
      return sourceWallets.filter(wallet => this.from !== wallet.account);
    },
    commission() {
      const wallet = this.userWallets.find(elem => elem.account === this.to);
      return wallet ? 0 : this.amount * this.fee * 0.01;
    },
    total() {
      return parseFloat(this.amount) + parseFloat(this.commission);
    },
  },
  methods: {
    clear() {
      this.from = '';
      this.to = '';
      this.amount = 0;
    },
    transfer() {
      console.log(`[transfer] from: '${this.from}', to: '${this.to}', amount: '${this.amount}'`);
      if (this.$refs.form.validate()) {
        this.$store.dispatch('Transaction', { from: this.from, to: this.to, amount: this.amount });
      }
    },
  },
};
</script>

<style scoped>

</style>
