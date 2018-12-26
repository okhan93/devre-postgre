<template>
    <div>
        <v-layout xs12>
            <v-img :src="listing.picture"></v-img>
        </v-layout>
        <h1>{{listing.address}}</h1>
        <h2>{{(listing.price).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0})}}</h2>
        <h2>Bedrooms: {{listing.Bed}}</h2>
        <h2>Bathrooms: {{listing.Bath}}</h2>
    </div>
</template>

<script>
import ListingsService from '../services/ListingsService'
export default {
    data () {
        return {
            listing: null
        }
    },
    async mounted () {
        //console.log( this.$route.params.MLSNum )
        const listing = ( await ListingsService.individualListing( {
            MLS_Num: this.$route.params.MLSNum
        } ) ).data
        this.listing = listing
        console.log( listing )
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>