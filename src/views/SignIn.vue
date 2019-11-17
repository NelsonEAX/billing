<template>
  <v-card class="elevation-12">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>signIn form</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Email"
          name="email"
          prepend-icon="mdi-account-outline"
          type="email"
        ></v-text-field>
        <v-text-field
          v-model="pass"
          :rules="passRules"
          id="password"
          label="Password"
          name="password"
          prepend-icon="mdi-lock-outline"
          type="password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        :disabled="!valid"
        class="mr-4"
        @click="validate()"
      >signIn</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'SignIn',
  data: () => ({
    valid: true,
    email: 'user1@example.com',
    pass: '12345678',
    passRules: [
      v => !!v || 'Password is required',
      v => (v && v.length > 0) || 'Password must be larger than 0 characters',
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
  }),
  methods: {
    signIn() {
      this.$store.dispatch('SignIn', { email: this.email, password: this.pass });
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.signIn();
        this.$router.push('wallet');
      }
    },
  },
};
</script>

<style scoped>

</style>
