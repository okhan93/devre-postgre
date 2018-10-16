<template>
  <!-- <v-container fill-height pl-0> -->
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
    <v-flex xs4>
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
      viewMinLat: null,
      viewMaxLat: null,
      viewMinLng: null,
      viewMaxLng: null,
      cardPerGrid: 20,
      page: 1,
      swtich1: false,
      Bed: null,
      Bath: null,
      price: [0, 11000000],
      listings: [],
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
    this.loadListings()
  },

  methods: {
    async filter () {
      var whereStatement = {}
      var sort = []
      if (this.Bed !== 'Any' && this.Bed != null) {
        whereStatement.Bed = this.Bed
      }
      if (this.Bath !== 'Any' && this.Bath != null) {
        whereStatement.Bath = this.Bath
      }
      if (this.switch1) {
        sort = [['price', 'ASC']]
      } else { sort = [['price', 'DESC']] }
      whereStatement.latitude = { $between: [this.viewMinLat, this.viewMaxLat] }
      whereStatement.longitude = { $between: [this.viewMinLng, this.viewMaxLng] }

      whereStatement.price = { $between: [this.price[0], this.price[1]] }
      console.log(whereStatement)
      this.listings = (await ListingsService.filter({
        whereStatement: whereStatement,
        sort: sort
      })).data
    },
    async loadListings () {
      this.listings = (await ListingsService.index()).data
    },
    getB () {
      this.viewMinLat = this.$refs.mapRef.$mapObject.getBounds().getSouthWest().lat()
      this.viewMaxLat = this.$refs.mapRef.$mapObject.getBounds().getNorthEast().lat()
      this.viewMinLng = this.$refs.mapRef.$mapObject.getBounds().getSouthWest().lng()
      this.viewMaxLng = this.$refs.mapRef.$mapObject.getBounds().getNorthEast().lng()
      console.log({
        NorthEast: [this.$refs.mapRef.$mapObject.getBounds().getNorthEast().lat(), this.$refs.mapRef.$mapObject.getBounds().getNorthEast().lng()],
        SouthWest: [this.$refs.mapRef.$mapObject.getBounds().getSouthWest().lat(), this.$refs.mapRef.$mapObject.getBounds().getSouthWest().lng()]
      })
      this.filter()
    }
  },
  components: {
    Panel,
    Card
  },
  computed: {
    grid () {
      return this.listings.slice(this.page * this.cardPerGrid - this.cardPerGrid, this.page * this.cardPerGrid)
    },
    numPages () {
      return Math.ceil(this.listings.length / this.cardPerGrid)
    }
  }
}

</script>

<style scoped>
  .border {
    border: 1px solid black;
  }
</style>
