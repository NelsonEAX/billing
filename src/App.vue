<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/about">
          <v-list-item-action>
            <v-icon>mdi-information-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!userEmail" link to="/signin">
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>SignIn</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!userEmail" link to="/signup">
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>SignUp</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="userEmail" link to="/wallet">
          <v-list-item-action>
            <v-icon>mdi-credit-card</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Wallet</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="userEmail" link to="/transaction">
          <v-list-item-action>
            <v-icon>mdi-credit-card-multiple</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Transaction</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="userEmail" link to="/history">
          <v-list-item-action>
            <v-icon>mdi-history</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>History</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Billing</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>{{userEmail}}</div>
      <v-btn outlined v-if="userEmail" @click.stop="signOut()">SignOut</v-btn>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <router-view></router-view>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>

</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  props: {
    source: String,
  },
  components: {},
  data: () => ({
    drawer: null,
  }),
  computed: {
    ...mapGetters([
      'userEmail',
    ]),
  },
  created() {
    // this.$vuetify.theme.dark = true;
    this.$store.dispatch('Settings');
    this.$store.dispatch('Currencies');
    this.$store.dispatch('Rates');
    this.$store.dispatch('CheckSession');
  },
  methods: {
    signOut() {
      this.$store.dispatch('SignOut');
      this.$router.push('/');
    },
  },
};
</script>
