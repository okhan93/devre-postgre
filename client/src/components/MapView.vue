<template>
  <v-layout row wrap="">
    <v-flex xs8 pr-2>
      <GmapMap
        :center="{lat:51.0486, lng:-114.0708}"
        :zoom="7"
        map-type-id="terrain"
        style="width: 100%; height: 85vh"
        ref="mapRef"
        @idle="getB"
      >
        <gmap-cluster :styles="clusterStyles">
          <gmap-marker
            v-for="listing in listings"
            :position="{lat:listing.latitude, lng:listing.longitude}"
            :key="listing.id"
            @click="showListing(listing.id)"
            icon="https://i.imgur.com/j2cl6Xx.png"
          ></gmap-marker>
        </gmap-cluster>
      </GmapMap>
    </v-flex>
    <v-flex :class="size" v-show="ok">
      <div>
        <v-layout>
          <v-flex xs3 mr-2 ml-2>
            <v-combobox
              v-on:change="filter"
              v-model="Bed"
              :items="['Any',1,2,3,4,5,6,7]"
              label="Bedrooms"
            />
          </v-flex>
          <v-flex xs3>
            <v-combobox
              v-on:change="filter"
              v-model="Bath"
              :items="['Any',1,2,3,4,5,6,7]"
              label="Bath"
            />
          </v-flex>
          <!-- <v-text-field class="pl-2" xs3 v-model="price[0]" v-on:change="filter"/>
          <v-text-field class="pl-2" xs3 v-model="price[1]" v-on:change="filter"/>-->
          <v-flex pt-1 xs6 pr-3 pl-2>
            <v-range-slider
              class="pl-2 pr-w"
              v-model="price"
              :max="5000000"
              :min="0"
              :step="1000"
              v-on:change="filter"
            />
          </v-flex>
        </v-layout>
        <div style="overflow:scroll; height:71vh;">
          <v-container fluid grid-list-md>
            <v-layout row wrap="">
              <v-flex xs6 mb-1 v-for="listing in grid" :key="listing.MLS_Num">
                <card :listing="listing"/>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
        <div style="height: 5.5vh; margin-top: 10px">
          <v-pagination v-model="page" :length="numPages"></v-pagination>
          <!-- </v-container> -->
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import ListingsService from '../services/ListingsService'

import Panel from '@/components/panel'
import Card from '@/components/card'
export default {
  data () {
    return {
      size: 'xs4',
      ok: 1,
      mapBounds: {
        MinLat: null,
        MaxLat: null,
        MinLng: null,
        MaxLng: null,
      },
      cardPerGrid: 20,
      page: 1,
      swtich1: false,
      Bed: null,
      Bath: null,
      grid: [],
      price: [ 0, 11000000 ],
      listings: [],
      listingIDs: [],
      height: 'height: 700px',
      clusterStyles: [
        {
          textColor: 'white',
          url: 'https://i.imgur.com/67r62Mx.png',
          height: 33,
          width: 33
        },
        {
          textColor: 'white',
          url: 'https://i.imgur.com/TxBR3G7.png',
          height: 46,
          width: 46
        },
        {
          textColor: 'white',
          url: 'https://i.imgur.com/Lptynh5.png',
          height: 64,
          width: 64
        }
      ]
    }
  },

  mounted () {
    this.filter()
  },

  methods: {
    async filter () {
      var whereStatement = {}
      var sort = []
      if ( this.Bed !== 'Any' && this.Bed != null ) {
        whereStatement.Bed = this.Bed
      }
      if ( this.Bath !== 'Any' && this.Bath != null ) {
        whereStatement.Bath = this.Bath
      }
      if ( this.switch1 ) {
        sort = [ [ 'price', 'ASC' ] ]
      } else { sort = [ [ 'price', 'DESC' ] ] }
      whereStatement.latitude = { $between: [ this.mapBounds.MinLat, this.mapBounds.MaxLat ] }
      whereStatement.longitude = { $between: [ this.mapBounds.MinLng, this.mapBounds.MaxLng ] }

      whereStatement.price = { $between: [ this.price[ 0 ], this.price[ 1 ] ] }
      //console.log( whereStatement )
      const { listings, ids } = ( await ListingsService.filter( {
        // page: this.page,
        // numPages: this.numPages,
        // cardPerGrid: this.cardPerGrid,
        whereStatement: whereStatement,
        sort: sort
      } ) ).data
      this.listings = listings
      this.listingIDs = ids


      //this.loadGridData()
    },
    async loadListings () {
      this.listings = ( await ListingsService.index() ).data
    },
    async loadGridData () {
      const gridListings = ( await ListingsService.gridView( {
        page: this.page,
        numPages: this.numPages,
        cardPerGrid: this.cardPerGrid,
        listingId: this.listingIDs
      } ) ).data
      this.grid = gridListings
    },
    getB () {
      this.mapBounds.MinLat = this.$refs.mapRef.$mapObject.getBounds().getSouthWest().lat()
      this.mapBounds.MaxLat = this.$refs.mapRef.$mapObject.getBounds().getNorthEast().lat()
      this.mapBounds.MinLng = this.$refs.mapRef.$mapObject.getBounds().getSouthWest().lng()
      this.mapBounds.MaxLng = this.$refs.mapRef.$mapObject.getBounds().getNorthEast().lng()
    }
  },
  components: {
    Panel,
    Card
  },
  computed: {
    numPages () {
      return Math.ceil( this.listings.length / this.cardPerGrid )
    }
  },
  watch: {
    page () {
      this.loadGridData()
    },
    listings () {
      this.page = 1
      this.loadGridData()
    },
    mapBounds: {
      handler ( val ) {
        console.log( 'bounds have changed' )
        this.filter()
      },
      deep: true
    }
  }
}

</script>

<style scoped>
  .border {
    border: 1px solid black;
  }
</style>
