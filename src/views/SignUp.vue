<template>
  <v-card
    class="elevation-12 mx-auto"
    max-width="500"
  >
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>signUp form</v-toolbar-title>
    </v-toolbar>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-card-text>
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
        <v-text-field
          v-model="confirm"
          :rules="confirmRules"
          id="confirm"
          label="Confirm password"
          name="confirm"
          prepend-icon="mdi-lock-outline"
          type="password"
        ></v-text-field>
        <v-text-field
          v-model="name"
          id="name"
          label="Name"
          name="name"
          type="text"
          prepend-icon=" "
        ></v-text-field>
        <v-text-field
          v-model="name"
          id="surname"
          label="Surname"
          name="surname"
          type="text"
          prepend-icon=" "
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          :disabled="!valid"
          class="mr-4"
          @click="validate()"
        >signUp</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'SignUp',
  data: () => ({
    valid: true,
    email: 'user4@example.com',
    pass: '12345678',
    confirm: '12345678',
    name: 'Иван',
    surname: 'Иванов',
    passRules: [
      v => !!v || 'Password is required',
      v => (v && v.length > 0) || 'Password must be larger than 0 characters',
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
  }),
  computed: {
    confirmRules() {
      return [
        v => !!v || 'Confirmation password is required',
        () => (this.pass === this.confirm) || 'Password must match',
      ];
    },
  },
  methods: {
    signUp() {
      this.$store.dispatch('SignUp', {
        email: this.email,
        password: this.pass,
        name: this.name,
        surname: this.surname,
      });
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.signUp();
        this.$router.push('wallet');
      }
    },
  },
};
</script>

<style scoped>

</style>
