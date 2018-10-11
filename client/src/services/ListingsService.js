import Api from '@/services/Api'

export default {
  index () {
    return Api().get('listings')
  },
  filter (listing) {
    return Api().post('listings', listing)
  }
}
