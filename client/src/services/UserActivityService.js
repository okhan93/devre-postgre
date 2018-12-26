import Api from '@/services/Api'

export default {
  getActivity(activity) {
    return Api().post('getuseractivity', activity)
  },
  addActivity(activity) {
    return Api().post('adduseractivity', activity)
  },
  removeActivity(activity) {
    return Api().post('deleteuseractivity', activity)
  }
}
