<template>
  <div>
    <GmapMap
      :center="{lat:10, lng:10}"
      :zoom="7"
      map-type-id="terrain"
      style="width: 100%; height: 100vh"
      ref="mapRef"
      @bounds_changed="getB"
    >
      <GmapMarker :position="{lat:13.52188491152531, lng:16.009521484375}"/>
      <GmapMarker :position="{lat: 7.355699331665435, lng: 0.716552734375}"/>
    </GmapMap>
    <v-button @click="fit">Fit</v-button>
  </div>
</template>

<script>
export default {
  mounted () {
    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)
    // console.log(this.$refs.mapRef)
  },
  methods: {
    getB () {
      this.viewMinLat = this.$refs.mapRef.$mapObject
        .getBounds()
        .getSouthWest()
        .lat()
      this.viewMaxLat = this.$refs.mapRef.$mapObject
        .getBounds()
        .getNorthEast()
        .lat()
      this.viewMinLng = this.viewMaxLng = this.$refs.mapRef.$mapObject
        .getBounds()
        .getNorthEast()
        .lng()
      //    console.log({NorthEast: [this.$refs.mapRef.$mapObject.getBounds().getNorthEast().lat(), this.$refs.mapRef.$mapObject.getBounds().getNorthEast().lng()],
      //    SouthWest: [this.$refs.mapRef.$mapObject.getBounds().getSouthWest().lat(), this.$refs.mapRef.$mapObject.getBounds().getSouthWest().lng()]})
    },
    fit () {
      this.$refs.mapRef.$mapPromise.then(map => {
        map.fitBounds(map.getBounds())
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
