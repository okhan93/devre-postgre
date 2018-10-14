<template>
  <v-layout justify-center>
    <v-flex xs8>
      <v-layout>
        <v-flex xs2 mr-2>
          <v-combobox
            v-on:change="filter"
            v-model="Bed"
            :items="['Any',1,2,3,4,5,6,7]"
            label="Bedrooms"
          />
        </v-flex>
        <v-flex xs2 mr-5>
          <v-combobox
            v-on:change="filter"
            v-model="Bath"
            :items="['Any',1,2,3,4,5,6,7]"
            label="Bathrooms"
          />
        </v-flex>
        <v-flex
          xs1
          pt-4
          mr-1
        >{{price[0].toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0})}}</v-flex>
        <v-flex pt-1 xs4>
          <v-range-slider
            v-model="price"
            :max="11000000"
            :min="0"
            :step="1000"
            v-on:change="filter"
          />
        </v-flex>
        <v-flex
          xs1
          pl-1
          pt-4
          ml-2
        >{{price[1].toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0})}}</v-flex>
        <v-flex xs2 pl-4 pt-1>
          <v-switch v-model="switch1" v-on:change="filter"></v-switch>
        </v-flex>
      </v-layout>
      <panel title="Listings">
        <v-container fluid grid-list-md>
          <v-layout row wrap="">
            <v-flex xs3 mb-1 v-for="listing in listings" :key="listing.MLS_Num">
              <card :listing="listing"/>
            </v-flex>
          </v-layout>
        </v-container>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/panel'
import Card from '@/components/card'
import ListingsService from '../services/ListingsService'
export default {
  data () {
    return {
      swtich1: false,
      Bed: null,
      Bath: null,
      songs: null,
      price: [0, 11000000],
      listings: [
      ]
    }
  },
  async mounted () {
    this.listings = (await ListingsService.index()).data
  },
  components: {
    Panel,
    Card
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

      whereStatement.price = { $between: [this.price[0], this.price[1]] }
      console.log(whereStatement)
      this.listings = (await ListingsService.filter({
        whereStatement: whereStatement,
        sort: sort
      })).data
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
