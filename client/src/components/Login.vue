<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <panel title="Login">
        <v-text-field
          class="ml-2 mr-2"
          type="email"
          name="email"
          placeholder="email"
          v-model="email"
          box
        ></v-text-field>
        <v-text-field
          class="ml-2 mr-2"
          type="password"
          name="password"
          placeholder="password"
          v-model="password"
          box
        ></v-text-field>
        <br>
        <div class="error" v-html="error"></div>
        <v-btn dark class="cyan" @click="login" router to="/mapview">Login</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService'
import UserActivityService from '../services/UserActivityService'
import Panel from '@/components/panel'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login( {
          email: this.email,
          password: this.password
        } )
        this.$store.dispatch( 'setToken', response.data.token )
        this.$store.dispatch( 'setUser', response.data.user )
        console.log( 'id:' + response.data.user.id )
        const bookmarked = await UserActivityService.getActivity( {
          User_ID: response.data.user.id,
          Activity_Type: 2
        } )
        //console.log( bookmarked.data.map( x => x[ 'MLS_Num' ] ) )
        this.$store.dispatch( 'setBookmarked', bookmarked.data.map( x => x[ 'MLS_Num' ] ) )
        //console.log( this.$store.state.bookmarked )
        this.error = null
      } catch ( error ) {
        this.error = error.response.data.error
      }
      console.log( 'error:' + this.error )
    }
  },
  components: {
    Panel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error {
    color: white;
  }
</style>
