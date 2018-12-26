<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">MUVE</v-toolbar-title>
    <v-toolbar-items>
      <v-btn flat router to="/mapview">Browse</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn v-if="!$store.state.isUserLoggedIn" flat router to="/login">Login</v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn v-if="!$store.state.isUserLoggedIn" flat router to="/register">Sign Up</v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-menu offset-y v-if="$store.state.isUserLoggedIn">
        <v-btn slot="activator" class="cyan" flat>
          Hi, {{this.$store.state.user.first_name}} &nbsp;
          <v-icon>account_circle</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile @click="account" router to="/account">
            <v-list-tile-title>Account</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="logout" router to="/">
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch( 'setToken', null )
      this.$store.dispatch( 'setUser', null )
    },
    account () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
