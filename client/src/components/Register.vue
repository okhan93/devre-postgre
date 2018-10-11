<template>
<v-layout>
  <v-flex xs6 offset-xs3>
<panel title="Register">
  <v-text-field
            class="ml-2 mr-2 mt-2"
            name="First Name"
            placeholder="First Name"
            v-model="first_name"
            box>
         </v-text-field>
         <v-text-field
            class="ml-2 mr-2"
            name="Last Name"
            placeholder="Last Name"
            v-model="last_name"
            box>
         </v-text-field>
         <v-text-field
            class="ml-2 mr-2"
            type="email"
            name="email"
            placeholder="email"
            v-model="email"
            box>
         </v-text-field>
        <v-text-field
        class="ml-2 mr-2"
        type="password"
        name="password"
        placeholder="password"
        v-model="password"
        box>
        </v-text-field>
        <div class="error" v-if="error!=null">{{ error }}</div>
        <v-btn
        dark
        class="cyan"
        @click="register">
        Register
        </v-btn>
</panel>
  </v-flex>
</v-layout>

</template>

<script>
import AuthenticationService from '../services/AuthenticationService'
import Panel from '@/components/panel'

export default {
  data () {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)

        this.error = null
      } catch (error) {
        this.error = error.response.data.error
      }
      console.log(this.error)
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
  margin: 0px;
  color: white;
}
.border {
  border: 1px solid black;
}
</style>
