<template>
        <v-layout>
            <v-flex xs2 class="">
            <panel :title="'Hi, '+ this.$store.state.user.first_name">
                <v-list>
                    <v-list-tile @click="dummy">
                <v-list-tile-title>Account Settings</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="dummy">
                <v-list-tile-title>Edit Profile</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </panel>
            </v-flex>
            <v-flex xs10 ml-2 class="">
                 <panel title="Recent Activity"></panel>
            </v-flex>
        </v-layout>
</template>

<script>
import Panel from '@/components/panel'
export default {
  data () {
    return {
      name: 'userr'
    }
  },
  components: {
    Panel
  },
  methods: {
    dummy () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.border {
  border: 1px solid black;
}
</style>
