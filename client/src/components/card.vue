<template>
  <v-card>
    <v-img :src="listing.picture" aspect-ratio="2.75" height="150px"></v-img>
    <v-layout>
      <v-flex xs12>
        <h1
          class="mt-1 mb-1 text-xs-center"
        >{{(listing.price).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0})}}</h1>
        <div class="stayonline pr-2 pl-2">
          <h3 class="mb-0 address-padding">{{listing.address}}</h3>
        </div>
      </v-flex>
    </v-layout>
    <v-container pb-1 pr-1 pl-1 pt-1 mt-1 grey lighten-4>
      <v-layout align-center justify-center row fill-height>
        <v-flex pt-2 xs4>
          <img height="40px" src="https://image.flaticon.com/icons/svg/952/952772.svg">
        </v-flex>
        <v-flex xs2>
          <h1>{{listing.Bed}}</h1>
        </v-flex>
        <v-flex pt-2 xs4>
          <img height="40px" src="https://image.flaticon.com/icons/svg/112/112537.svg">
        </v-flex>
        <v-flex xs2 pr-3>
          <h1>{{parseInt(listing.Bath)}}</h1>
        </v-flex>
      </v-layout>
    </v-container>
    <v-layout>
      <v-flex></v-flex>
      <v-flex xs8>
        <v-btn
          flat
          dark
          class="cyan"
          router
          :to="{ name: 'listing', params: { MLSNum: listing.MLS_Num }}"
        >More Details</v-btn>
      </v-flex>
      <v-flex xs4>
        <v-btn icon mr-1 @click="addBookmark">
          <v-icon :color="bookmark === true ? `red` : `grey`">favorite</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import UserActivityService from '../services/UserActivityService'
export default {
  data () {
    return {
      houses: [
        'https://images.adsttc.com/media/images/59a4/c624/b22e/389d/3e00/02a3/newsletter/MHA.JR_201708_038.jpg?1503970808',
        'https://photos.zillowstatic.com/p_e/ISaxrg4yothxwh0000000000.jpg',
        'https://static.dezeen.com/uploads/2018/07/aspire-house-process-architecture-housing-usa_dezeen_2364_hero-852x479.jpg',
        'https://www.texasmonthly.com/wp-content/uploads/2017/04/House-Houston.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBYNhfXw5WrG9IC6iSN3GlAUK0YDK5UIC4JTKmHJ2x1cPttFVq',
        'https://photos.zillowstatic.com/p_e/ISa95r26pca9880000000000.jpg',
        'https://bossip.files.wordpress.com/2016/08/orlando-scandrick-house-2.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn3KXvCRk_FTqwJRk4AbjtJQugCY_y_zt2oZ1wO5nl0Lz5AOgJ',
        'https://www.renoassistance.ca/wp-content/uploads/2017/06/House-siding.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvK5-viLmna9b2c67UN5qU0hvbx9nKSb_5uF3j1j7YI2L6GiV5'
      ],
      bookmark: false,
    }
  },
  methods: {
    async addBookmark () {
      if ( this.$store.state.isUserLoggedIn ) {
        if ( this.bookmark != true ) {
          try {
            await UserActivityService.addActivity( {
              User_ID: this.$store.state.user.id,
              MLS_Num: this.listing.MLS_Num,
              Activity_Type: 2
            }
            )
            this.bookmark = true
          } catch ( error ) { console.log( 'error' ) }
        }
        else {
          try {
            await UserActivityService.removeActivity( {
              User_ID: this.$store.state.user.id,
              MLS_Num: this.listing.MLS_Num,
              Activity_Type: 2
            }
            )
            console.log( 'Bookmark Removed' )
            this.bookmark = !this.bookmark
          } catch ( error ) { console.log( 'error' ) }
        }
      }
    },
    isListingBookmarked () {
      if ( this.$store.state.bookmarked.includes( this.listing.MLS_Num ) ) {
        this.bookmark = true
      }
    }
  },
  mounted () {
    this.isListingBookmarked()
  },
  props: [
    'listing'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .border {
    border: 1px solid black;
  }
  .stayonline {
    overflow: hidden;
    white-space: nowrap;
  }
  .address-padding {
    padding-top: 4px;
    padding-right: 4px;
    padding-bottom: 4px;
    padding-left: 4px;
  }
</style>
