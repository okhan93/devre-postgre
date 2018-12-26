import Api from '@/services/Api'

export default {
  individualListing(listing) {
    return Api().post('individualListing', listing)
  },
  index() {
    return Api().get('listings')
  },
  filter(listing) {
    return Api().post('listings', listing)
  },
  gridView(listing) {
    return Api().post('loadgridlistings', listing)
  }
}
