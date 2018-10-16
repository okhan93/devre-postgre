import Api from '@/services/Api'

export default {
  index () {
    return Api().get('useractivity')
  },
  addActivity (activity) {
    return Api().post('useractivity', activity)
  },
  removeActivity (activity) {
    return Api().post('useractivity', activity)
  }
}
